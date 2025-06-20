import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    tmdbId: { type: Number, required: true, unique: true },
    title: String,
    overview: String,
    posterPath: String,
    releaseDate: String,
  },
  {
    timestamps: true,
  } // Automatically adds createdAt and updatedAt fields
);

const Movie = mongoose.model("Movie", movieSchema);
// Export the Movie model for use in other modules
export default Movie;