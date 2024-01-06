/* eslint-disable no-unused-expressions */
import path from 'path';

import express from 'express';
import jwt from 'jsonwebtoken';
import multer from 'multer';

import { SECRET_KEY, URL } from '../config/environments.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';
import { User, Home, Review, Reserve } from '../models/index.js';
import getUserReviewsData from '../utils/getReviewsData.js';
const router = express.Router();

router.get('/homes', isLoggedIn, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      console.log('Query: ', req.query);
      const q = req.query;
      // console.log('PRICE ====> ', q.price[1])
      let payload = {};
      if (Object.keys(q).length !== 0) {
        // we have Filter properties
        const keys = Object.keys(q);
        keys.forEach((item) => {
          switch (item) {
            case 'host':
              q.host !== null
                ? (payload = { ...payload, 'host.id': q.host })
                : null;
              break;
            case 'province':
              q.province !== 'all'
                ? (payload = { ...payload, province: q.province })
                : null;
              break;
            case 'rooms':
              q.rooms !== '1'
                ? (payload = { ...payload, rooms: q.rooms })
                : null;
              break;
            case 'beds':
              q.beds !== '1' ? (payload = { ...payload, beds: q.beds }) : null;
              break;
            case 'bathrooms':
              q.bathrooms !== '1'
                ? (payload = { ...payload, bathrooms: q.bathrooms })
                : null;
              break;
            case 'adults':
              q.adults !== '1'
                ? (payload = {
                    ...payload,
                    'capacity.adults': { $gte: q.adults },
                  })
                : null;
              break;
            case 'children':
              q.children !== '0'
                ? (payload = {
                    ...payload,
                    'capacity.children': { $gte: q.children },
                  })
                : null;
              break;
            case 'instanceReserve':
              q.instanceReserve !== 'false'
                ? (payload = { ...payload, instanceReserve: q.instanceReserve })
                : null;
              break;
            case 'entire':
              q.entire !== 'false'
                ? (payload = { ...payload, 'homeType.entire': q.entire })
                : null;
              break;
            case 'privateRoom':
              q.privateRoom !== 'false'
                ? (payload = {
                    ...payload,
                    'homeType.privateRoom': q.privateRoom,
                  })
                : null;
              break;
            case 'sharedRoom':
              q.sharedRoom !== 'false'
                ? (payload = {
                    ...payload,
                    'homeType.sharedRoom': q.sharedRoom,
                  })
                : null;
              break;
            case 'luxury':
              q.luxury !== 'false'
                ? (payload = { ...payload, luxury: q.luxury })
                : null;
              break;
            case 'wifi':
              q.wifi !== 'false'
                ? (payload = { ...payload, 'amenities.wifi': q.wifi })
                : null;
              break;
            case 'tv':
              q.tv !== 'false'
                ? (payload = { ...payload, 'amenities.tv': q.tv })
                : null;
              break;
            case 'accessories':
              q.accessories !== 'false'
                ? (payload = {
                    ...payload,
                    'amenities.accessories': q.accessories,
                  })
                : null;
              break;
            case 'kitchen':
              q.kitchen !== 'false'
                ? (payload = { ...payload, 'amenities.kitchen': q.kitchen })
                : null;
              break;
            case 'washingMachine':
              q.washingMachine !== 'false'
                ? (payload = {
                    ...payload,
                    'amenities.washingMachine': q.washingMachine,
                  })
                : null;
              break;
            case 'cooler':
              q.cooler !== 'false'
                ? (payload = { ...payload, 'amenities.cooler': q.cooler })
                : null;
              break;
            case 'parkingLot':
              q.parkingLot !== 'false'
                ? (payload = {
                    ...payload,
                    'amenities.parkingLot': q.parkingLot,
                  })
                : null;
              break;
            case 'celebrationAllowed':
              q.celebrationAllowed !== 'false'
                ? (payload = {
                    ...payload,
                    'homeRules.celebrationAllowed': q.celebrationAllowed,
                  })
                : null;
              break;
            case 'smokingAllowed':
              q.smokingAllowed !== 'false'
                ? (payload = {
                    ...payload,
                    'homeRules.smokingAllowed': q.smokingAllowed,
                  })
                : null;
              break;
            case 'petsAllowed':
              q.petsAllowed !== 'false'
                ? (payload = {
                    ...payload,
                    'homeRules.petsAllowed': q.petsAllowed,
                  })
                : null;
              break;
            case 'popular':
              q.popular !== 'false'
                ? (payload = { ...payload, popular: q.popular })
                : null;
              break;
            case 'not':
              payload = { ...payload, _id: { $ne: q.not } };
              break;
            case 'price':
              q.price !== ['10', '1000']
                ? (payload = {
                    ...payload,
                    $and: [
                      { price: { $gte: q.price[0] } },
                      { price: { $lte: q.price[1] } },
                    ],
                  })
                : null;
              break;
            default:
              payload = { ...payload };
          }
        });
      }
      console.log('payload ==> ', payload);
      Home.find(payload)
        .sort({ _id: -1 })
        .then((data) => {
          console.log(res.data);
          res.send(data);
        })
        .catch((err) => console.log(err));
    }
  });
});

router.post('/homes', isLoggedIn, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      Home.create(req.body)
        .then((result) => {
          res.send(result);
        })
        .catch((err) => res.send(err));
    }
  });
});

router.put('/homes/:id', isLoggedIn, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      Home.findByIdAndUpdate({ _id: req.params.id }, { ...req.body })
        .then(() => {
          Home.findOne({ _id: req.params.id }).then((home) => {
            res.send(home);
          });
        })
        .catch((err) => console.log(err));
    }
  });
});

router.delete('/homes', isLoggedIn, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      // res.send(req.query.id)
      Home.deleteOne({ _id: req.query.id })
        .then((result) => {
          res.send(result);
        })
        .catch((err) => res.send(err));
    }
  });
});

router.get('/homes/:id', isLoggedIn, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      // every time getting a user, it needs to calculate the reviews information
      Review.find({ parent: req.params.id }).then((reviews) => {
        if (reviews.length) {
          // if home has Reviews
          const homeNewData = getUserReviewsData(reviews);
          Home.findByIdAndUpdate({ _id: req.params.id }, homeNewData).then(
            () => {
              Home.findOne({ _id: req.params.id }).then((data) => {
                res.send(data);
              });
            },
          );
        } else {
          // if home has'nt any Reviews
          const resetReviewInfo = {
            reviewsCount: 0,
            overallRate: 0,
          };
          Home.findByIdAndUpdate({ _id: req.params.id }, resetReviewInfo).then(
            () => {
              Home.findOne({ _id: req.params.id }).then((data) => {
                res.send(data);
              });
            },
          );
        }
      });
    }
  });
});

router.get('/homes/getInArray/:array', isLoggedIn, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      console.log(req.params.array);
      const array = req.params.array.split(',');
      Home.find({ _id: { $in: array } })
        .sort({ _id: -1 })
        .then((data) => {
          res.send(data);
        })
        .catch((err) => console.log(err));
    }
  });
});

const homeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/homeImages');
  },
  filename: (req, file, cb) => {
    const randomString = Math.random().toString(36).substring(2);
    cb(null, Date.now() + randomString + path.extname(file.originalname));
  },
});

const homeFileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb('ERROR : NOT Allowed FORMAT');
  }
};

const homeAvatarUpload = multer({
  storage: homeStorage,
  limits: { fileSize: 1024 * 1024 * 3 }, // means 3MB
  fileFilter: homeFileFilter,
}).single('homeImage');

router.post('/homes/image', isLoggedIn, (req, res, next) => {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  homeAvatarUpload(req, res, (err) => {
    if (err) {
      res.send(err);
    } else {
      const avatarPath = URL + req.file.path.replace(/\\/g, '/');
      res.send(avatarPath);
    }
  });
});

export default router;
