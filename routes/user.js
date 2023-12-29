import path from 'path';

import express from 'express';
import jwt from 'jsonwebtoken';
import multer from 'multer';

import { SECRET_KEY, URL } from '../config/environments.js';
import { User, Review } from '../models/index.js';
import calculateReviews from '../utils/calculateReviews.js';
import persianDate from '../utils/time.js';
import validateUser from '../utils/validations.js';

const router = express.Router();

router.get('/:id', validateUser, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(403);
    } else {
      // every time getting a user, it needs to calculate the reviews information
      Review.find({ parent: req.params.id }).then((reviews) => {
        if (reviews.length) {
          // if user has Reviews
          const userNewData = calculateReviews(reviews);
          User.findByIdAndUpdate({ _id: req.params.id }, userNewData).then(
            () => {
              User.findOne({ _id: req.params.id }).then((data) => {
                res.send(data);
              });
            },
          );
        } else {
          // if user has'nt any Reviews
          const resetReviewInfo = {
            reviewsCount: 0,
            overallRate: 0,
          };
          User.findByIdAndUpdate({ _id: req.params.id }, resetReviewInfo).then(
            () => {
              User.findOne({ _id: req.params.id }).then((data) => {
                res.send(data);
              });
            },
          );
        }
      });
    }
  });
});

router.post('/signup', (req, res, next) => {
  const tokenData = {
    firstName: req.body.firstName.trim(),
    lastName: req.body.lastName.trim(),
    email: req.body.email.trim().toLowerCase(),
  };
  const token = jwt.sign({ tokenData }, SECRET_KEY);
  req.body.token = token;
  const safeInputData = {
    ...req.body,
    firstName: req.body.firstName.trim(),
    lastName: req.body.lastName.trim(),
    password: req.body.password.trim(),
    email: req.body.email.trim().toLowerCase(),
    avatar: `${URL}uploads/userAvatars/default_profile_photo.png`,
    registerDate: persianDate,
  };
  User.find({ email: safeInputData.email })
    .then((result) => {
      if (result.length) {
        res.json({ userState: 'duplicate' });
      } else {
        console.log(safeInputData);
        User.create(safeInputData).then((user) => {
          console.log('================');
          res.send(user);
        });
      }
    })
    .catch((err) => console.log(err));
});

router.post('/signin', (req, res) => {
  const email = req.body.email.trim().toLowerCase();
  const password = req.body.password.trim();
  User.find({ email, password })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.json({ userState: 'noUser' });
      }
    })
    .catch(() => console.log('Mongo connection Error'));
});

router.put('/update/:id', validateUser, (req, res, next) => {
  jwt.verify(req.token, SECRET_KEY, (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then(() => {
          User.findOne({ _id: req.params.id }).then((user) => {
            res.send(user);
          });
        })
        .catch((err) => console.log(err));
    }
  });
});

router.put('/message/:id', validateUser, (req, res, next) => {
  jwt.verify(req.token, SECRET_KEY, (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const data = {
        ...req.body,
        date: persianDate,
      };
      User.findOne({ _id: req.params.id })
        .then((user) => {
          const msgs = user.messages;
          msgs.push(data);
          User.findByIdAndUpdate(
            { _id: req.params.id },
            { messages: msgs },
          ).then(() => {
            User.findOne({ _id: req.params.id }).then((user) => {
              res.send(user.messages);
            });
          });
        })
        .catch((err) => console.log(err));
    }
  });
});

const userStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/userAvatars');
  },
  filename: (req, file, cb) => {
    const randomString = Math.random().toString(36).substring(2);
    cb(null, Date.now() + randomString + path.extname(file.originalname));
  },
});
const userFileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb('ERROR : NOT Allowed FORMAT');
  }
};
const userAvatarUpload = multer({
  storage: userStorage,
  limits: { fileSize: 1024 * 1024 * 6 },
  fileFilter: userFileFilter,
}).single('userAvatar');

router.post('/avatar', validateUser, (req, res, next) => {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  userAvatarUpload(req, res, (err) => {
    if (err) {
      res.send(err);
    } else {
      const avatarPath = URL + req.file.path.replace(/\\/g, '/');
      res.send(avatarPath);
    }
  });
});

export default router;
