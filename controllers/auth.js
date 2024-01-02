import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import z from 'zod';

import { SECRET_KEY } from '../config/environments.js';
import { User } from '../models/index.js';
import Error from '../services/error.js';
import Log from '../utils/logger.js';
import persianDate from '../utils/time.js';
import { inputValidationError, VALIDATION } from '../utils/validations.js';

const signinSchema = z.object({
  email: z.string().trim().email().toLowerCase(),
  password: z.string().min(1).trim(),
});

export const signin = async (req, res, next) => {
  try {
    const result = signinSchema.safeParse(req.body);
    const validationErrors = inputValidationError(result);
    if (validationErrors) {
      next(
        new Error(validationErrors, {
          status: VALIDATION.status,
          type: VALIDATION.type,
        }),
      );
      return;
    }

    const { email, password } = result.data;
    const user = await User.find({ email });
    if (user.length === 0) {
      throw new Error('User not found', {
        status: VALIDATION.status,
        type: VALIDATION.type,
      });
    }
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      throw new Error('Incorrect password', {
        status: VALIDATION.status,
        type: VALIDATION.type,
      });
    }
    const token = jwt.sign({ user }, SECRET_KEY);
    res.json({ token });
  } catch (error) {
    next(error);
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
