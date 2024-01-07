import { Review, Home } from '../models/index.js';
import getUserReviewsData from '../utils/helpers.js';
import handleHomeFilters from '../utils/homeFilter.js';
import { checkInputs } from '../utils/validations.js';
import { homeSchema } from '../utils/zodSchemas.js';

export const getHome = async (req, res, next) => {
  try {
    const reviews = await Review.find({ parent: req.params.id });
    const homeReviews = getUserReviewsData(reviews);
    const home = await Home.findByIdAndUpdate(req.params.id, homeReviews, {
      new: true,
    });
    res.send(home);
  } catch (error) {
    next(error);
  }
};

export const getInArray = async (req, res, next) => {
  try {
    const array = req.params.array.split(',');
    const home = await Home.find({ _id: { $in: array } }).sort({ _id: -1 });
    res.send(home);
  } catch (error) {
    next(error);
  }
};

export const addHome = async (req, res, next) => {
  try {
    const safeData = checkInputs(homeSchema, req.body, next);
    if (!safeData) return;

    const home = await Home.create(safeData.data);

    res.send(home);
  } catch (error) {
    next(error);
  }
};

export const updateHome = async (req, res, next) => {
  try {
    const safeData = checkInputs(homeSchema, req.body, next);
    if (!safeData) return;

    const updatedHome = await Home.findByIdAndUpdate(
      { _id: req.params.id },
      safeData.data,
      { new: true },
    );
    res.send(updatedHome);
  } catch (error) {
    next(error);
  }
};

export const deleteHome = async (req, res, next) => {
  try {
    const result = await Home.deleteOne({ _id: req.params.id });
    res.send(result);
  } catch (error) {
    next(error);
  }
};

export const uploadImage = async (req, res, next) => {
  try {
    const homeId = req.body.id;
    const image = req.file.path;
    await Home.findByIdAndUpdate({ _id: homeId }, { image });
    res.send(image);
  } catch (error) {
    next(error);
  }
};

export const getHomes = async (req, res, next) => {
  try {
    const payload = handleHomeFilters(req.query);
    const home = await Home.find(payload).sort({ _id: -1 });
    res.send(home);
  } catch (error) {
    next(error);
  }
};
