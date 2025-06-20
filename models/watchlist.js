import mongoose from "mongoose";

const WatchlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  movieId: {
    type: String, // e.g. IMDb or TMDB ID
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  posterPath: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
});

// Prevent duplicate watchlist entries for the same user
WatchlistSchema.index({ userId: 1, movieId: 1 }, { unique: true });

export default mongoose.model("Watchlist", WatchlistSchema);
