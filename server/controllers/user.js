import bcrypt from "bcryptjs";
import User from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";
import Listing from "../models/Listing.js";
import getUserDetailsFromToken from "../utils/getUserDetailsFromToken.js";
export const test = (req, res) => {
  res.status(200).json({
    message: "Api route is working",
  });
};

// Update user
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(
      new ErrorResponse("You can  only update your own account", 401)
    );
  }
  const { username, email, password } = req.body;
  const profileImage = req.file ? req.file.filename : null; // Handle profile image update if provided

  try {
    let user = await User.findById(req.user.id);

    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    // Update fields
    user.username = username;
    user.email = email;
    user.avatar = profileImage
      ? `http://localhost:3000/uploads/${profileImage}`
      : user.avatar;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    const { password: pwd, ...userData } = user._doc;

    res.status(200).json({
      success: true,
      message: "User updated successfully",

      ...userData,
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (req.user.id !== req.params.id && !user.isAdmin)
      return next(
        new ErrorResponse("You can only delete your own account!", 401)
      );

    await User.findByIdAndDelete(req.params.id);
    if (req.user.id === req.params.id) {
      res.clearCookie("x-auth-token");
    }
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(new ErrorResponse("You can only view your own listings!", 401));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return next(new ErrorResponse("User not found", 404));

    const { password: pass, ...rest } = user._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.isAdmin) {
      return next(
        new ErrorResponse("You are not allowed to see all users", 403)
      );
    }

    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};

export const searchUser = async (req, res, next) => {
  try {
    const { search } = req.body;

    const query = new RegExp(search, "i", "g");

    const user = await User.find({
      $or: [{ name: query }, { email: query }],
    }).select("-password");

    return res.json({
      message: "all user",
      data: user,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const userDetails = async (req, res) => {
  try {
    
    const token = req.cookies["x-auth-token"] || "";

    const user = await getUserDetailsFromToken(token);
    // console.log("token", token);

    return res.status(200).json({
      message: "user details",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};
