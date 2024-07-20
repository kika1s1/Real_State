import bcryptjs from 'bcryptjs'
import User from "../models/User.js";
import ErrorResponse from '../utils/errorResponse.js';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    const userEmail = await User.findOne({email})
    const userUsername = await User.findOne({username})
    if(userEmail || userUsername){
        return next(new ErrorResponse("Email already exists.", 400))
    }
    await newUser.save();
    res.status(201).json({
        message:"User created successfully!"
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.find({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = user.generateToken();
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ message: "User signed in", user: user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
