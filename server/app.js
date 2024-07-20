import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from 'body-parser'

import connectDB from "./config/connectDB.js";

import userRoutes from './routes/user.js'
import authRoutes from './routes/auth.js'
import errorHandler from "./middleware/errorHandler.js";
dotenv.config();

connectDB();
const PORT = process.env.PORT || 3000
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log("Server is running on port 3000!");
});

