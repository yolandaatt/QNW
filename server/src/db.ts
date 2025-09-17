import mongoose from "mongoose";

export async function connectDB(uri: string) {
  if (!uri) throw new Error("Missing MONGO_URI");
  await mongoose.connect(uri);
  return mongoose.connection;
}
