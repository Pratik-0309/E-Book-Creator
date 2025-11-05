import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found for token generation");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    if (!accessToken || !refreshToken) {
      throw new Error("Token generation failed — missing return in schema methods?");
    }

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { refreshToken, accessToken };
  } catch (error) {
    console.error("Token generation error:", error);
    throw new Error("Something went wrong while generating tokens");
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
        user : user,
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

    const options = {
      httpOnly: true,
      secure: true,
    };

    console.log("User logged in:", loggedInuser.email);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        user: loggedInuser,
      });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const loggedInuser = await User.findById(userId);

    if (!loggedInuser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
     user: loggedInuser
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
 const userId = req.user._id;
 const {name} = req.body;

 if(!name){
    return res.status(400).json({message:"Name is required"});
 }

 if(!userId){
    return res.status(401).json({message:"User not authorized"});
 }

 const loggedInuser = await User.findById(userId);

 if(!loggedInuser){
    return res.status(404).json({message:"User not found"});
 }  

 loggedInuser.name = name 
 loggedInuser.save();

 console.log("Profile updated for user:", loggedInuser.email);

 return  res.status(200).json({ 
    user : loggedInuser,
    message: "Profile updated successfully"
 });

};

export { registerUser, LoginUser, getProfile, updateProfile };
