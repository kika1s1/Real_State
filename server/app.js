import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRoutes from './routes/user.js'
import authRoutes from './routes/auth.js'
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });
const PORT = process.env.PORT || 3000
const app = express();
app.use(express.json());

app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
  console.log("Server is running on port 3000!");
});
