import axios from "axios";
import { TMDB_API_KEY, TMDB_BASE_URL } from "../envConfig.js";

const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: { api_key: TMDB_API_KEY },
});

// Function to get now playing movies
export async function getNowPlayingMoviesFromTmdb(page = 1) {
  try {
    const response = await tmdbApi.get("/movie/now_playing", {
      params: { page, region: "NG" },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    throw error;
  }
}

// Function to get top rated movies
export async function getTopRatedMoviesFromTmdb(page = 1) {
  try {
    const response = await tmdbApi.get("/movie/top_rated", {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    throw error;
  }
}

// Function to get upcoming movies
export async function getUpcomingMoviesFromTmdb(page = 1) {
  try {
    const response = await tmdbApi.get("/movie/upcoming", {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
}

// Function to get popular movies from TMDB
export async function getPopularMoviesFromTmdb(page = 1) {
  try {
    const response = await tmdbApi.get("/movie/popular", {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
}

// Function to get movie details by ID from TMDB
export async function getMovieDetailsById(movieId) {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error(
      `TMDB Error [Movie ID: ${movieId}]:`,
      error?.message || error
    );
    throw new Error("Failed to fetch movie details from TMDB");
  }
}

// Function to get cretdits for a movie by ID from TMDB
export async function getMovieCreditsById(movieId) {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}/credits`);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching credits for movie ${movieId}:`,
      error.message
    );
    throw new Error("Failed to fetch movie credits from TMDB");
  }
}

// Get movie recommendations by ID from TMDB
export async function getMovieRecommendationsById(movieId) {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}/recommendations`);
    return response.data.results;
  } catch (error) {
    console.error(
      `Error fetching recommendations for movie ${movieId}:`,
      error.message
    );
    throw new Error("Failed to fetch movie recommendations from TMDB");
  }
}

// Movie search by name, genre, and year
export const searchMovies = async ({ title, genre, year, page = 1 }) => {
  try {
    const params = {
      with_genres: genre || undefined,
      primary_release_year: year || undefined,
      page,
      sort_by: "popularity.desc",
    };

    // Switch to search/movie if there is title
    if (title) {
      const response = await tmdbApi.get("/search/movie", {
        params: {
          query: title,
          year: year || undefined,
          page,
        },
      });
      let movies = response.data.results;

      // optional filter
      if (genre) {
        movies = movies.filter((movie) =>
          movie.genre_ids.includes(parseInt(genre))
        );
      }

      return {
        results: movies,
        total_pages: response.data.total_pages,
      };
    }

    // Otherwise use discover/movie
    const response = await tmdbApi.get("discover/movie", { params });
    return {
      results: response.data.results,
      total_pages: response.data.total_pages,
    };
  } catch (err) {
    console.error("TMDB Search Error:", err);
    throw new Error("Failed to fetch data from TMDB.");
  }
};

// fetch genres endpoint
export const fetchGenres = async () => {
  const response = await tmdbApi.get(`${TMDB_BASE_URL}/genre/movie/list`, {
    params: {
      api_key: TMDB_API_KEY,
    },
  });

  return response.data.genres;
};
