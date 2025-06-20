import express from "express";
import {
  saveToWatchlist,
  getWatchlist,
  deleteWatchlistItem,
} from "../controllers/watchlistController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", protect, saveToWatchlist);
router.get("/", protect, getWatchlist);
router.delete("/:id", protect, deleteWatchlistItem);

export default router;
