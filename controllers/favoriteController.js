// controllers/favoriteController.js
import Favorite from "../models/favorite.js";

export const saveFavorite = async (req, res) => {
  try {
    const { movieId, title, posterPath, overview } = req.body;
    const userId = req.user.id;

    // Check if already exists
    const existing = await Favorite.findOne({ userId, movieId });
    if (existing) {
      return res.status(400).json({ message: "Movie already in favorites" });
    }

    const favorite = new Favorite({
      userId,
      movieId,
      title,
      posterPath,
      overview,
    });

    await favorite.save();

    res.json({ message: "Movie successfully added to favorites!", favorite });
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;

    const favorites = await Favorite.find({ userId });

    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error });
  }
};

export const deleteFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    await Favorite.deleteOne({ _id: id, userId });

    res.json({ message: "Favorite removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error });
  }
};
