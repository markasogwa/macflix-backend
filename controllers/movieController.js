import * as tmdbService from "../services/tmdbService.js";

// Helper to validate ID param (basic example)
const isValidId = (id) => {
  return id && !isNaN(Number(id));
};

// controller for movie credits
export const getMovieCreditsHandler = async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    return res.status(400).json({ error: "Invalid movie ID" });
  }
  try {
    const credits = await tmdbService.getMovieCreditsById(id);
    return res.status(200).json(credits);
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    return res.status(500).json({
      error: "Failed to fetch movie credits, please try again later",
    });
  }
};

// controller for movie recommendations
export const getMovieRecommendationsHandler = async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    return res.status(400).json({ error: "Invalid movie ID" });
  }
  try {
    const recommendations = await tmdbService.getMovieRecommendationsById(id);
    return res.status(200).json(recommendations);
  } catch (error) {
    console.error("Error fetching movie recommendations:", error);
    return res.status(500).json({
      error: "Failed to fetch movie recommendations, please try again later",
    });
  }
};

// Now Playing movies function
export const getNowPlayingMoviesHandler = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // get page param from query or default to 1
  try {
    const movies = await tmdbService.getNowPlayingMoviesFromTmdb(page || 1);
    return res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch now playing movies" });
  }
};

// Top Rated movies endpoint
export const getTopRatedMoviesHandler = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // get page param from query or default to 1
  try {
    const movies = await tmdbService.getTopRatedMoviesFromTmdb(page || 1);
    return res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch top rated movies" });
  }
};

// Upcoming movies endpoint
export const getUpcomingMoviesHandler = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // get page param from query or default to 1
  try {
    const data = await tmdbService.getUpcomingMoviesFromTmdb(page || 1);
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    return res.status(500).json({ message: "Failed to fetch upcoming movies" });
  }
};

// Function to get popular movies from TMDB
export const getPopularMoviesHandler = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  if (page !== undefined && (isNaN(page) || page < 1)) {
    return res.status(400).json({ error: "Invalid page number" });
  }
  try {
    const movies = await tmdbService.getPopularMoviesFromTmdb(page || 1);
    return res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return res.status(500).json({
      error: "Failed to fetch popular movies please try again later",
    });
  }
};

// Function to get movie details by ID from TMDB
export const getMovieDetailsHandler = async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    return res.status(400).json({ error: "Invalid movie ID" });
  }
  try {
    const movie = await tmdbService.getMovieDetailsById(id);
    return res.status(200).json(movie);
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return res.status(500).json({
      error: "Failed to fetch movie details, please try again later",
    });
  }
};

// function to search movies by title, year and genre
export const searchMovieHandler = async (req, res) => {
  const { title = "", year = "", genre = "", page = "1" } = req.query;
  const pageNum = parseInt(page);

  if (page && (isNaN(pageNum) || pageNum < 1)) {
    return res.status(400).json({ error: "Invalid page number" });
  }

  try {
    const movieData = await tmdbService.searchMovies({
      title,
      year,
      genre,
      page: pageNum || 1,
    });
    return res.status(200).json(movieData);
  } catch (error) {
    console.error("Error searching movies:", error);
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error" });
  }
};

// function to filter movie by rate, year and popularity
export const filterMoviesHandler = async (req, res) => {
  const {
    genre = "",
    year = "",
    minRating = "",
    sortBy = "popularity.desc",
    page = "1",
  } = req.query;
  const pageNum = parseInt(page);

  if (page && (isNaN(pageNum) || pageNum < 1)) {
    return res.status(400).json({ error: "Invalid page number" });
  }

  if (minRating && isNaN(parseFloat(minRating))) {
    return res.status(400).json({ error: "Invalid minRating" });
  }

  try {
    const data = await tmdbService.filterMovies({
      genre,
      year,
      minRating,
      sortBy,
      page: pageNum,
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error filtering movies:", error);
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error" });
  }
};

// fetch genres
export const getGenres = async (req, res) => {
  try {
    const genres = await tmdbService.fetchGenres();
    return res.status(200).json(genres);
  } catch (error) {
    console.error("Error fetching genres:", error);
    return res.status(500).json({ message: "Failed to fetch genres" });
  }
};
