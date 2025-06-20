import express from "express";
import {
  addMoviesToWatchlist,
  getGenres,
  getMovieCreditsHandler,
  getMovieDetailsHandler,
  getMovieRecommendationsHandler,
  getPopularMoviesHandler,
  searchMovieHandler,
} from "../controllers/movieController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.get("/popular", getPopularMoviesHandler);
router.post("/watchlist", protect, addMoviesToWatchlist);
router.get("/search", searchMovieHandler);
router.get("/genres", getGenres);
router.get("/:id", getMovieDetailsHandler);
router.get("/:id/credits", getMovieCreditsHandler);
router.get("/:id/recommendations", getMovieRecommendationsHandler);

export default router;
// Export the router
