import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    console.log("No token provided.");

    return res.status(401).json({
      message: "Access denied. No token provided. Please log in to continue.",
    });
  }
  try {
    token = req.headers.authorization.split(" ")[1];
    console.log("Token received:");

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user information to the request object
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      console.log("User not found.");

      return res.status(401).json({
        message:
          "Authorization failed. User not found. Please register an account.",
      });
    }

    req.user = user; // Attach user information to the request object

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error in auth middleware:", error);
    return res
      .status(401)
      .json({ message: "Invalid or expired token. Please log in again." });
  }
};
