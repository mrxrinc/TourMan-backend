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

export function inputValidationError(err) {
  if (err?.error.name !== 'ZodError') return false;
  const { issues } = err.error;
  const errorMessages = issues.map((issue) => issue.message);
  return errorMessages;
}
