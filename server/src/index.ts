import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./db.js";

dotenv.config();

const PORT = Number(process.env.PORT) || 3001;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/app";

(async () => {
  await connectDB(MONGO_URI);
  app.listen(PORT, () => {
    console.log(` API listening on http://localhost:${PORT}`);
  });
})();
