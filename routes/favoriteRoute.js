// routes/favorite.js
import express from "express";
import {
  deleteFavorite,
  getFavorites,
  saveFavorite,
} from "../controllers/favoriteController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", protect, saveFavorite);
router.get("/", protect, getFavorites);
router.delete("/:id", protect, deleteFavorite);

export default router;
