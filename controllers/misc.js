import { Help, Feedback, User } from '../models/index.js';
import persianDate from '../utils/date.js';
import { checkInputs } from '../utils/validations.js';
import { feedbackSchema } from '../utils/zodSchemas.js';

export const help = async (_req, res, next) => {
  try {
    const helps = await Help.find();
    res.send(helps);
  } catch (error) {
    next(error);
  }
};

export const feedback = async (req, res, next) => {
  try {
    const safeData = checkInputs(feedbackSchema, req.body, next);
    if (!safeData) return;
    const userId = req.body.userId;
    const user = await User.findOne({ _id: userId });
    const feedbackData = {
      userId,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      mobile: user.mobile,
      date: persianDate,
      text: safeData.data.text,
    };
    const feedback = await Feedback.create(feedbackData);
    res.send(feedback);
  } catch (error) {
    next(error);
  }
};
