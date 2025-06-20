import express from "express";
import {
  createReviews,
  deleteReviews,
  getAverage,
  getReviews,
  updateReviews,
} from "../controllers/reviewsController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

// Get reviews for a particular movie
router.get("/:movieId", getReviews);

// Create a new review
router.post("/", protect, createReviews);

// Update a review (by owner)
router.put("/:id", protect, updateReviews);

// Delete a review
router.delete("/:id", protect, deleteReviews);

// Average rating for a movie
router.get("/average/:movieId", getAverage);

// Export router
export default router;
