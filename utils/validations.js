export const VALIDATION = {
  type: 'validation',
  status: 422,
};

export default function validateUser(req, res, next) {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

export function inputValidationErrors(err) {
  if (err?.error?.name !== 'ZodError') return null;
  const { issues } = err.error;
  return issues.map((issue) => issue.message);
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
