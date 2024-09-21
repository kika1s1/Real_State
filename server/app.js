import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path from "path";
import cookieParser from "cookie-parser";

import connectDB from "./config/connectDB.js";

import adminRoutes from "./routes/admin.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import listingRoutes from "./routes/listings.js";
import commentRoutes from "./routes/comment.js"

import {server, app} from './socket/index.js'
import errorHandler from "./middleware/errorHandler.js";
dotenv.config();

connectDB();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors({
  origin : process.env.FRONTEND_URL,
  credentials : true
}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())


// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname); // Get the file extension
    cb(null, file.fieldname + '-' + uniqueSuffix + ext); // Append the file extension
  }
});
// Initialize upload variable
const upload = multer({ storage: storage });

// Endpoint for uploading files
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    res.status(200).json({ url: `http://localhost:3000/uploads/${req.file.filename}` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Set static folder for profile images.
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/listing', listingRoutes);
app.use('/api/comment', commentRoutes);
app.use("/api/admin", adminRoutes);
app.use(errorHandler);

server.listen(PORT, () => {
  console.log("Server is running on port 3000!");
});
