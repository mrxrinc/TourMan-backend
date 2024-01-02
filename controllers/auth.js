import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { DEFAULT_AVATAR } from '../config/constants.js';
import { SECRET_KEY } from '../config/environments.js';
import { User } from '../models/index.js';
import Error from '../services/error.js';
import persianDate from '../utils/time.js';
import { checkInputs, VALIDATION } from '../utils/validations.js';
import { signinSchema, signupSchema } from '../utils/zodSchemas.js';

export const signin = async (req, res, next) => {
  try {
    const safeData = checkInputs(signinSchema, req.body, next);
    if (!safeData) return;
    const { email, password } = safeData.data;
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
    const tokenData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
    const token = jwt.sign({ tokenData }, SECRET_KEY);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

export const signup = async (req, res, next) => {
  try {
    const safeData = checkInputs(signupSchema, req.body, next);
    if (!safeData) return;
    const { firstName, lastName, email, password } = safeData.data;
    const avatar = DEFAULT_AVATAR;
    // eslint-disable-next-line no-sync
    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(password, salt);
    const inputData = {
      ...req.body,
      firstName,
      lastName,
      password: hash,
      email,
      avatar,
      registerDate: persianDate,
    };
    const user = await User.find({ email });
    if (user.length) {
      throw new Error('User already exists', {
        status: VALIDATION.status,
        type: VALIDATION.type,
      });
    }
    const newUser = await User.create(inputData);
    const tokenData = { firstName, lastName, email };
    const token = jwt.sign({ tokenData }, SECRET_KEY);
    res.json({ token, user: newUser });
  } catch (error) {
    next(error);
  }
};
