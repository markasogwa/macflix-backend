// models/Favorite.js
import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  movieId: {
    type: String, // IMDb IDs (like tt12345)
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

// Compound index to avoid duplicates per user
FavoriteSchema.index({ userId: 1, movieId: 1 }, { unique: true });

export default mongoose.model("Favorite", FavoriteSchema);
