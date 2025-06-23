import express from "express";
import {
  filterMoviesHandler,
  getGenres,
  getMovieCreditsHandler,
  getMovieDetailsHandler,
  getMovieRecommendationsHandler,
  getNowPlayingMoviesHandler,
  getPopularMoviesHandler,
  getTopRatedMoviesHandler,
  getUpcomingMoviesHandler,
  searchMovieHandler,
} from "../controllers/movieController.js";
import { getMovieTrailer } from "../controllers/movieTrailerController.js";

const router = express.Router();

router.get("/now_playing", getNowPlayingMoviesHandler);
router.get("/top_rated", getTopRatedMoviesHandler);
router.get("/upcoming", getUpcomingMoviesHandler);
router.get("/popular", getPopularMoviesHandler);
router.get("/search", searchMovieHandler);
router.get("/filter", filterMoviesHandler);
router.get("/genres", getGenres);

// More specific dynamic routes first:
router.get("/:id/trailer", getMovieTrailer);
router.get("/:id/credits", getMovieCreditsHandler);
router.get("/:id/recommendations", getMovieRecommendationsHandler);
// Then the general /:id route last:
router.get("/:id", getMovieDetailsHandler);

export default router;
