import { Router, Request, Response } from "express";
import Product from "../models/Product.ts";

const router = Router();

// GET /products
router.get("/", async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Kunde inte hämta produkter" });
  }
});

// GET /products/:id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Produkten hittades inte" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Kunde inte hämta produkten" });
  }
});

export default router;
