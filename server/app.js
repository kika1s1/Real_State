import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path from "path";
import cookieParser from "cookie-parser";

import connectDB from "./config/connectDB.js";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import listingRoutes from "./routes/listings.js";
import commentRoutes from "./routes/comment.js"
import errorHandler from "./middleware/errorHandler.js";
dotenv.config();

connectDB();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Set static folder for profile images.
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/listing', listingRoutes);
app.use('/api/comment', commentRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server is running on port 3000!");
});
