import User from "../models/User.js";

export const getWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("watchlist");
    res.json(user.watchlist);
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    return res
      .status(500)
      .json({ error: "Failed to fetch watchlist, please try again later" });
  }
};

// Get user profile
export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.json(user);
};

// Update user profile
export const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) return res.status(404).json({ error: "User not found" });

  console.log("Uploaded file:", req.file);

  user.username = req.body.username || user.username;
  user.bio = req.body.bio || user.bio;
  user.socialLink = req.body.socialLink || user.socialLink;

  if (req.file) {
    user.profilePicture = `/uploads/${req.file.filename}`;
  }

  await user.save();

  res.json({
    message: "Profile updated successfully",
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      socialLink: user.socialLink,
      profilePicture: user.profilePicture,
      createdAt: user.createdAt,
    },
  });
};
