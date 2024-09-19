import User from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";

const verifyAdmin = async(req, res, next) => {

    try {
        const id = req.user.id;
        const user = await User.findById(id);
        if (!user.isAdmin) {
            return next(new ErrorResponse("You are not authorized to perform this action", 403));
          }
    } catch (error) {
        next(error);
        
    }
  next();
}
export default verifyAdmin;