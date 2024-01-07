import Error from '../services/error.js';
import Log from '../utils/logger.js';

export const VALIDATION = {
  type: 'validation',
  status: 422,
};

export function inputValidationErrors(err) {
  if (err?.error?.name !== 'ZodError') return null;
  Log.error(err);
  const { issues } = err.error;
  return issues.map((issue) => [issue.path[0], issue.message]);
}

export function checkInputs(schema, data, next) {
  const safeData = schema.safeParse(data);
  const validationErrors = inputValidationErrors(safeData);
  if (validationErrors) {
    next(
      new Error(validationErrors, {
        status: VALIDATION.status,
        type: VALIDATION.type,
      }),
    );
    return false;
  }
  return safeData;
}
