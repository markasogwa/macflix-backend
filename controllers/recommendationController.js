import bkRecommendationService from "../services/bkRecommendationService.js";

export async function getPersonalizedRecommendations(req, res) {
  try {
    const userId = req.user.id; // from auth middleware
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const { movies, total } =
      await bkRecommendationService.getRecommendationsForUser(
        userId,
        page,
        limit
      );

    res.json({ movies, total, page, limit });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// export default getPersonalizedRecommendations;
