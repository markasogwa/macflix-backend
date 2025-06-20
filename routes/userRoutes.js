import express from "express";

const router = express.Router();

import {
  getProfile,
  getWatchlist,
  updateProfile,
} from "../controllers/userController.js";
import { protect } from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";
// Import necessary modules and controllers

router.get("/watchlist", protect, getWatchlist);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, upload.single("profilePicture"), updateProfile);

export default router;
// Export the router
