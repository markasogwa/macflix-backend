import Movie from "../models/Movie.js";
import User from "../models/User.js";

class bkRecommendationService {
  /**
   * Get personalized movie recommendations for a user with pagination.
   * @param {string} userId
   * @param {number} page - page number (1-based)
   * @param {number} limit - number of items per page
   * @returns {Promise<{movies: Array, total: number}>}
   */
  static async getRecommendationsForUser(userId, page = 1, limit = 10) {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const skip = (page - 1) * limit;

    // Base filter: exclude watched movies
    const baseFilter = {
      _id: { $nin: user.watchedMovies },
    };

    // Build preference filters
    const preferenceFilters = [];

    if (user.preferences.genres && user.preferences.genres.length > 0) {
      preferenceFilters.push({ genres: { $in: user.preferences.genres } });
    }
    if (user.preferences.actors && user.preferences.actors.length > 0) {
      preferenceFilters.push({ actors: { $in: user.preferences.actors } });
    }
    if (user.preferences.directors && user.preferences.directors.length > 0) {
      preferenceFilters.push({ director: { $in: user.preferences.directors } });
    }

    // Combine filters: must match at least one preference if any set
    if (preferenceFilters.length > 0) {
      baseFilter.$or = preferenceFilters;
    }

    // Query movies with pagination
    const moviesPromise = Movie.find(baseFilter)
      .sort({ rating: -1 }) // highest rating first
      .skip(skip)
      .limit(limit);

    const countPromise = Movie.countDocuments(baseFilter);

    const [movies, total] = await Promise.all([moviesPromise, countPromise]);

    return { movies, total };
  }
}

export default bkRecommendationService;
