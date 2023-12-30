import jwt from 'jsonwebtoken';
import z from 'zod';

import { SECRET_KEY } from '../config/environments.js';
import { User } from '../models/index.js';
import logger from '../utils/logger.js';
import persianDate from '../utils/time.js';

const signinSchema = z.object({
  email: z
    .string()
    .trim()
    .email()
    .transform((val) => val.trim().toLowerCase()),
  password: z
    .string()
    .min(1)
    .transform((val) => val.trim()),
});

export const signin = (req, res) => {
  const result = signinSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: 'Invalid data' });
    return;
  }

  const { email, password } = result.data;
  User.find({ email, password })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.json({ userState: 'noUser' });
      }
    })
    .catch((err) => {
      console.log('Mongo connection Error', err);
    });
};

export const signup = (req, res, next) => {
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
};
