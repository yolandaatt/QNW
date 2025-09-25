import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI as string;

async function testConnection() {
  try {
    await mongoose.connect(uri);
    console.log(" Connected to MongoDB Atlas");
    process.exit(0);
  } catch (err) {
    console.error(" Error connecting to MongoDB:", err);
    process.exit(1);
  }
}

testConnection();
