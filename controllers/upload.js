import { BASE_URL, PORT } from '../config/environments.js';
import handleAvatarUpload from '../services/upload.js';

const avatarUpload = (req, res, next) => {
  try {
    handleAvatarUpload(req, res, () => {
      const avatarPath = `${BASE_URL}:${PORT}/${req.file.path.replace(
        /\\/g,
        '/',
      )}`;
      res.send(avatarPath);
    });
  } catch (error) {
    next(error);
  }
};

export default avatarUpload;
