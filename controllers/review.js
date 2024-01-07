import { Review } from '../models/index.js';
import persianDate from '../utils/date.js';
import { checkInputs } from '../utils/validations.js';
import { reviewSchema } from '../utils/zodSchemas.js';

export const getReviews = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const reviews = await Review.find({ parent: userId }).sort({
      _id: -1,
    });
    res.send(reviews);
  } catch (error) {
    next(error);
  }
};

export const addReview = async (req, res, next) => {
  try {
    const safeData = checkInputs(reviewSchema, req.body, next);
    if (!safeData) return;
    const data = {
      ...safeData.data,
      date: persianDate,
    };
    const review = await Review.create(data);
    res.send(review);
  } catch (error) {
    next(error);
  }
};
