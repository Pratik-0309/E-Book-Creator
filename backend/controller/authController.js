// controllers/authController.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction, // secure only in production
  sameSite: isProduction ? "none" : "lax",
   path: "/",  
};

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found for token generation");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    if (!accessToken || !refreshToken) {
      throw new Error(
        "Token generation failed — missing return in schema methods?"
      );
    }

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Token generation error:", error);
    throw new Error("Something went wrong while generating tokens");
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      return res.status(404).json({
        message: "Refresh token is missing or unauthorized.",
      });
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken._id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid user ID found in refresh token." });
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      return res.status(401).json({
        message: "Refresh Token is Expired or Used (Logout required).",
      });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json({
        message: "Access token refreshed successfully",
      });
  } catch (error) {
    console.error("Token refresh failed:", error);

    return res
      .status(401)
      .clearCookie("accessToken", cookieOptions)
      .clearCookie("refreshToken", cookieOptions)
      .json({ message: "Could not refresh token. Please log in again." });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    console.log("user Created :", name);
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      return res.json({
        user: user,
        message: "User registered successfully",
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    if (!user.password) {
      return res.status(500).json({ message: "User password missing in DB" });
    }

    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const { refreshToken, accessToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    const loggedInuser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    console.log("User logged in:", loggedInuser.email);

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json({
        user: loggedInuser,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const LogoutUser = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (userId) {
      await User.findByIdAndUpdate(userId, { refreshToken: "" });
    }

    return res
      .clearCookie("accessToken", cookieOptions)
      .clearCookie("refreshToken", cookieOptions)
      .json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error while logging out" });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const loggedInuser = await User.findById(userId).select(
      "-password -refreshToken"
    );

    if (!loggedInuser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      user: loggedInuser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const loggedInuser = await User.findById(userId);

    if (!loggedInuser) {
      return res.status(404).json({ message: "User not found" });
    }

    loggedInuser.name = name;
    await loggedInuser.save();

    console.log("Profile updated for user:", loggedInuser.email);

    return res.status(200).json({
      user: loggedInuser,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export {
  registerUser,
  LoginUser,
  LogoutUser,
  getProfile,
  updateProfile,
  refreshAccessToken,
};
