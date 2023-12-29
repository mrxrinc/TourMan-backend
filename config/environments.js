import "dotenv/config";

export const MONGO_URI = process.env.MONGO_URI;
export const SECRET_KEY = process.env.JWT_SECRET;
export const PORT = process.env.PORT || 3000;
export const API_PATH = process.env.API_PATH;
export const BASE_URL = process.env.BASE_URL;
export const URL = `${BASE_URL}:${PORT}${API_PATH}`;
