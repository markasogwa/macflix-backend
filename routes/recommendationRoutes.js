// routes/recommendationRoutes.js
import express from "express";
import { getPersonalizedRecommendations } from "../controllers/recommendationController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", protect, getPersonalizedRecommendations);

export default router;
