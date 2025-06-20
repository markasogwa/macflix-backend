import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const MONGODB_URI = process.env.MONGODB_URI;
export const TMDB_API_KEY = process.env.TMDB_API_KEY;
export const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
export const CLIENT_URL = process.env.CLIENT_URL;
