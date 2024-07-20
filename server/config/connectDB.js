import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const URI = process.env.MONGO

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
