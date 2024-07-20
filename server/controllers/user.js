import bcrypt from "bcryptjs"
import User from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";
export const test = (req, res) => {
  res.status(200).json({
    message: "Api route is working",
  });
};



// Update user 
export const updateUser = async (req, res, next) => {
 

  if(req.user.id !== req.params.id){
    return next(new ErrorResponse("You can  only update your own account", 401))
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
    user.avatar = profileImage? `http://localhost:3000/uploads/${profileImage}` : user.avatar;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    const { password: pwd, ...userData } = user._doc;

    res.status(200).json({
      success: true,
      message:"User updated successfully",

         ...userData });
  } catch (err) {
    console.log(err.message)
    next(err);
  }
};
