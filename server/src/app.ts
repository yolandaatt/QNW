import express from "express";
import productsRouter from "./routes/products.js";

const app = express();

app.use(express.json());

app.set("json spaces", 2);

// routes

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/products", productsRouter);

export default app;
