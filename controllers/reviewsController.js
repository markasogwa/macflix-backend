import Review from "../models/Reviews.js";

// ✅ Create Review
export const createReviews = async (req, res) => {
  try {
    const { movieId, rating, text } = req.body;

    if (!movieId || rating == null) {
      return res
        .status(400)
        .json({ message: "movieId and rating are required." });
    }

    const newReview = new Review({
      movieId,
      rating,
      text,
      userId: req.user._id,
    });

    await newReview.save();

    res.status(201).json({ message: "Review created", review: newReview });
  } catch (error) {
    console.error("Create Review Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Get Reviews for a Movie
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.movieId }).populate(
      "userId",
      "username"
    );

    res.json(reviews);
  } catch (error) {
    console.error("Get Reviews Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Update Review
export const updateReviews = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this review" });
    }

    review.text = req.body.text || review.text;
    review.rating = req.body.rating ?? review.rating;

    await review.save();

    res.json({ message: "Review updated", review });
  } catch (error) {
    console.error("Update Review Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Delete Review
export const deleteReviews = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this review" });
    }

    await review.deleteOne();

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Delete Review Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Get Average Rating
export const getAverage = async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.movieId });

    if (reviews.length === 0) return res.json({ average: 0 });

    const total = reviews.reduce((acc, item) => acc + item.rating, 0);
    const average = Number((total / reviews.length).toFixed(1));

    res.json({ average });
  } catch (error) {
    console.error("Average Rating Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
