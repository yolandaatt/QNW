import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productsRouter from "./routes/products.js";
import authRoutes from "./routes/auth.js";
import ordersRouter from "./routes/orders.js";
import favoritesRouter from "./routes/favorites.js";
import path from "path";
import { upload } from "./middleware/upload.js";

dotenv.config();

const app = express();

app.use(express.json());

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes("*")) {
        callback(null, true);
        return;
      }
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.set("json spaces", 2);

// routes

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/products", productsRouter);

app.use("/api/auth", authRoutes);

app.use("/api/orders", ordersRouter);

app.use("/api/favorites", favoritesRouter);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Ingen fil uppladdad" });
  }
  const imageUrl = `${process.env.BASE_URL}/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

export default app;
