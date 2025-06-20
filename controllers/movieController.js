import Movie from "../models/Movie.js";
import User from "../models/User.js";
import * as tmdbService from "../services/tmdbService.js";

// controller for movie credits
export const getMovieCreditsHandler = async (req, res) => {
  const { id } = req.params;
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

// Function to get popular movies from TMDB
export const getPopularMoviesHandler = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const movies = await tmdbService.getPopularMoviesFromTmdb(page);
    return res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return res
      .status(500)
      .json({ error: "Failed to fetch popular movies please try again later" });
  }
};

// Function to get movie details by ID from TMDB
export const getMovieDetailsHandler = async (req, res) => {
  const { id } = req.params;
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

// Function to add the selected movie to the user's watchlist
export const addMoviesToWatchlist = async (req, res) => {
  try {
    const { tmdbId, title, overview, posterPath, releaseDate } = req.body;
    let movie = await Movie.findOne({ tmdbId });

    if (!movie) {
      movie = await Movie.create({
        tmdbId,
        title,
        overview,
        posterPath,
        releaseDate,
      });
    }

    const user = await User.findById(req.user._id);
    if (!user.watchlist.includes(movie._id)) {
      user.watchlist.push(movie._id);
      await user.save();
    }

    res.status(200).json(user.watchlist);
  } catch (error) {
    console.error("Error adding movie to watchlist:", error);
    return res.status(500).json({
      error: "Failed to add movie to watchlist, please try again later",
    });
  }
};

// function to search movies by title, year and genre
export const searchMovieHandler = async (req, res) => {
  const { title = "", year = "", genre = "", page = 1 } = req.query;

  try {
    const movieData = await tmdbService.searchMovies({
      title,
      year,
      genre,
      page,
    });
    res.json(movieData);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

// fetch genres
export const getGenres = async (req, res) => {
  try {
    const genres = await tmdbService.fetchGenres();
    res.json(genres);
  } catch (error) {
    console.error("Error fetching genres:", error);
    res.status(500).json({ message: "Failed to fetch genres" });
  }
};
