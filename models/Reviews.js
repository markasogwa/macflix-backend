import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    movieId: { type: Number, required: true }, // TMDB movieId
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: { type: Number, min: 0, max: 10, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Review", ReviewSchema);
