import "dotenv/config";

export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI;
export const SECRET_KEY = process.env.JWT_SECRET;
export const BASE_URL = process.env.BASE_URL + PORT;
