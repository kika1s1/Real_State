import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";
dotenv.config();
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!(username && email && password)) {
    return next(new ErrorResponse("All fields are required.", 400));
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    const userEmail = await User.findOne({ email });
    const userUsername = await User.findOne({ username });
    if (userEmail) {
      return next(new ErrorResponse("Email already exists.", 400));
    }
    if (userUsername) {
      return next(new ErrorResponse("Username already exists.", 400));
    }
    await newUser.save();
    res.status(201).json({
      message: "User created successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return next(new ErrorResponse("All fields are required", 400));
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 400));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: pwd, ...userData } = user._doc;
    res
      .cookie("x-auth-token", token, { httpOnly: true })
      .status(200)
      .json(userData);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const { name, email, avatar } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pwd, ...userData } = user._doc;
      return res
        .cookie("x-auth-token", token, { httpOnly: true })
        .status(200)
        .json(userData);
    }
    const generatedPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);
    user = await User({
      username:
        name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4),
      email,
      password: hashedPassword,
      avatar,
    });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pwd, ...userData } = user._doc;

    res
      .cookie("x-auth-token", token, { httpOnly: true })
      .status(200)
      .json(userData);
  } catch (error) {
    next(error);
  }
};


