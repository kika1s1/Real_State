import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import ErrorResponse from "./errorResponse.js";
dotenv.config()

export const verifyToken = async (req, res, next) => {
  const token = req.cookies["x-auth-token"];

  if (!token) {
    return next(new ErrorResponse("No token, authorization denied",401 ));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return next(new ErrorResponse("Forbidden",403 ));
  }
};


