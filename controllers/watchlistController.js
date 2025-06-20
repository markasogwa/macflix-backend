import Watchlist from "../models/watchlist.js";

// Add movie to watchlist
export const saveToWatchlist = async (req, res) => {
  try {
    const { movieId, title, posterPath, overview } = req.body;
    const userId = req.user.id;

    // Check for duplicate
    const existing = await Watchlist.findOne({ userId, movieId });
    if (existing) {
      return res.status(400).json({ message: "Movie already in watchlist" });
    }

    const watchlistItem = new Watchlist({
      userId,
      movieId,
      title,
      posterPath,
      overview,
    });

    await watchlistItem.save();

    res.json({ message: "Movie added to watchlist", watchlistItem });
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error });
  }
};

// Get all watchlist items for the user
export const getWatchlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const watchlist = await Watchlist.find({ userId });

    res.json(watchlist);
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error });
  }
};

// Remove movie from watchlist
export const deleteWatchlistItem = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    await Watchlist.deleteOne({ _id: id, userId });

    res.json({ message: "Movie removed from watchlist" });
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error });
  }
};
