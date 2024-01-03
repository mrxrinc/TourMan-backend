import path from 'path';

import express from 'express';
import multer from 'multer';

import { URL } from '../config/environments.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';
import { User, Review } from '../models/index.js';
import getUserReviewsData from '../utils/getReviewsData.js';
import persianDate from '../utils/time.js';
import { checkInputs } from '../utils/validations.js';
import { userSchema } from '../utils/zodSchemas.js';

const router = express.Router();

router.get('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.params.id;
    // every time getting a user, it needs to calculate the reviews information
    const reviews = await Review.find({ parent: userId });
    const userReviewsData = getUserReviewsData(reviews);
    const user = await User.findByIdAndUpdate(
      { _id: userId },
      userReviewsData,
      { new: true },
    );
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const safeData = checkInputs(userSchema, req.body, next);
    if (!safeData) return;
    const userId = req.params.id;
    const user = await User.findByIdAndUpdate({ _id: userId }, safeData.data, {
      new: true,
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.put('/message/:id', isLoggedIn, (req, res, next) => {
  try {
    const data = {
      ...req.body,
      date: persianDate,
    };
    User.findOne({ _id: req.params.id })
      .then((user) => {
        const msgs = user.messages;
        msgs.push(data);
        User.findByIdAndUpdate({ _id: req.params.id }, { messages: msgs }).then(
          () => {
            User.findOne({ _id: req.params.id }).then((user) => {
              res.send(user.messages);
            });
          },
        );
      })
      .catch((err) => console.log(err));
  } catch (error) {
    next(error);
  }
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

router.post('/avatar', isLoggedIn, (req, res, next) => {
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
