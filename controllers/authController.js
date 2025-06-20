import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message:
          "Please provide a valid username, email and password and try again.",
      });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        message:
          "User already exists with this email, try login in to your account.",
      });
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({
        message:
          "User already exists with this username, choose another username and try again.",
      });
    }

    const user = await User.create({ username, email, password });
    return res.status(201).json({
      message: "You have successfully registered an account.",
      token: generateToken(user._id),
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error("Error occured while registering user:", error);
    return res.status(500).json({
      message:
        "An error occurred while trying to register your account. Please, try again later.",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide a valid email and password and try again.",
      });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        message:
          "The email or password you entered are invalid. Please check them and try again.",
      });
    }

    res.json({
      message: "You have successfully logged in.",
      token: generateToken(user._id),
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(
      "Error occurred while trying to login into your account:",
      error
    );
    return res.status(500).json({
      message:
        "An error occurred while trying to log you in. Please, try again later.",
    });
  }
};
