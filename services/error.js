import Log from '../utils/logger.js';
// import { hasInputValidationError } from '../utils/validations.js';

const errorHandler = (err, req, res) => {
  console.log('===========================');
  //   hasInputValidationError(err);
  try {
    Log.error(err);
    const status = err?.status || 500;
    if (err?.name === 'ZodError') {
      const { issues } = err;
      const errorMessages = issues.map((issue) => issue.message);
      res.status(status).json({ error: errorMessages });
      return;
    }
    res.status(status).json({ error: err.message });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error on processing Data! Try Again!' });
    return;
  }
};

export default errorHandler;
