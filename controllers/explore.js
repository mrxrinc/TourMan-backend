import { General } from '../models/index.js';
import { checkInputs } from '../utils/validations.js';
import { exploreSchema } from '../utils/zodSchemas.js';

export const getExplores = async (_req, res, next) => {
  try {
    const explores = await General.find();
    res.send(explores);
  } catch (error) {
    next(error);
  }
};

export const addExplore = async (req, res, next) => {
  try {
    const safeData = checkInputs(exploreSchema, req.body, next);
    if (!safeData) return;
    const explores = await General.create(safeData.data);
    res.send(explores);
  } catch (error) {
    next(error);
  }
};

export const updateExplore = async (req, res, next) => {
  try {
    const safeData = checkInputs(exploreSchema, req.body, next);
    if (!safeData) return;
    const exploreId = req.params.id;
    const updatedExplores = await General.findByIdAndUpdate(
      { _id: exploreId },
      safeData.data,
      { new: true },
    );
    res.send(updatedExplores);
  } catch (error) {
    next(error);
  }
};
