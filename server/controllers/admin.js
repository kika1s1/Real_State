import User from '../models/User.js'; 
import ErrorResponse from '../utils/errorResponse.js'; 

export const promoteDemoteAdmin = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return next(new ErrorResponse("User not found", 404));
        }
        user.isAdmin = !user.isAdmin;
        await user.save();
        res.status(200).json({
            "message": "User has been promoted to admin",
        });
    } catch (err) {
        next(err);
    }
};

