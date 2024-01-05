import { Privacy } from '../models/index.js';
import { checkInputs } from '../utils/validations.js';
import { privacySchema } from '../utils/zodSchemas.js';

export const getPrivacies = async (_req, res, next) => {
  try {
    const privacies = await Privacy.find();
    res.send(privacies);
  } catch (error) {
    next(error);
  }
};

export const addPrivacy = async (req, res, next) => {
  try {
    const safeData = checkInputs(privacySchema, req.body, next);
    if (!safeData) return;
    const privacies = await Privacy.create(safeData.data);
    res.send(privacies);
  } catch (error) {
    next(error);
  }
};
