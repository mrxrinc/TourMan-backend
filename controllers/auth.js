import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import z from 'zod';

import { SECRET_KEY } from '../config/environments.js';
import { User } from '../models/index.js';
import Error from '../services/error.js';
import Log from '../utils/logger.js';
import persianDate from '../utils/time.js';
import { inputValidationError } from '../utils/validations.js';

const signinSchema = z.object({
  email: z.string().trim().email().toLowerCase(),
  password: z.string().min(1).trim(),
});

export const signin = async (req, res, next) => {
  const result = signinSchema.safeParse(req.body);
  const validationErrors = inputValidationError(result);
  if (validationErrors) {
    return Error({
      error: { message: validationErrors },
      status: 422,
      req,
      res,
    });
  }
  const { email, password } = result.data;
  try {
    const user = await User.find({ email });
    if (!user) {
      return Error({
        error: { message: 'User not found' },
        status: 404,
        req,
        res,
      });
    }
    if (user.length) {
      res.json(user[0]);
    } else {
      res.json({ userState: 'noUser' });
    }

    // .catch((err) => {
    //   console.log('Mongo connection Error', err);
    // });
  } catch (err) {
    next(err);
  }
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
