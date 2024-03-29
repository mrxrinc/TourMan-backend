import { BASE_URL, PORT } from '../config/environments.js';
import { ReportUser, Review, User } from '../models/index.js';
import persianDate from '../utils/date.js';
import getUserReviewsData from '../utils/helpers.js';
import { checkInputs } from '../utils/validations.js';
import {
  userSchema,
  messageSchema,
  reportUserSchema,
} from '../utils/zodSchemas.js';

export const getUserById = async (req, res, next) => {
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
};

export const updateUser = async (req, res, next) => {
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
};

export const addMessage = async (req, res, next) => {
  try {
    const safeData = checkInputs(messageSchema, req.body, next);
    if (!safeData) return;
    const data = {
      ...safeData.data,
      date: persianDate,
    };
    const userId = req.params.id;
    const user = await User.findOne({ _id: userId });
    const { messages } = user;
    const updatedMessages = [...messages, data];
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { messages: updatedMessages },
      { new: true },
    );
    res.send(updatedUser.messages);
  } catch (error) {
    next(error);
  }
};

export const avatarUpload = async (req, res, next) => {
  try {
    const userId = req.body.id;
    const avatar = req.file.path;
    await User.findByIdAndUpdate({ _id: userId }, { avatar, thumb: avatar });
    res.send(avatar);
  } catch (error) {
    next(error);
  }
};

export const report = async (req, res, next) => {
  try {
    const safeData = checkInputs(reportUserSchema, req.body, next);
    if (!safeData) return;
    console.log(safeData.data);
    const reportUserResult = await ReportUser.create(safeData.data);
    res.send(reportUserResult);
  } catch (error) {
    next(error);
  }
};
