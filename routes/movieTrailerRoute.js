// routes/movies.js
import express from "express";
const router = express.Router();

// Get Movie Trailer by Movie ID
router.get("/movie/:id/trailer", getMovieTrailer);

// export router
export default router;
