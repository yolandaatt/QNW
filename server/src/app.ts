import express from "express";
import mongoose from "mongoose";
import productsRouter from "./routes/products.js";

const app = express();

app.use(express.json());

// routes

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});


app.use("/products", productsRouter);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/qnw";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(" MongoDB connected");
    app.listen(PORT, () =>
      console.log(` Server running on http://localhost:${PORT}`),
    );
  })
  .catch((err) => console.error(" Mongo connection error:", err));

export default app;
