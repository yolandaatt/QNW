import { Router, Request, Response } from "express";
import Product from "../models/Product.js";

const router = Router();

// GET /products
router.get("/", async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch {
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
  } catch {
    res.status(500).json({ error: "Kunde inte hämta produkten" });
  }
});

//CREATE product
router.post("/", async (req: Request, res: Response) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch {
    res.status(400).json({ error: "Kunde inte skapa produkt" });
  }
});

//UPDATE product
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ error: "Produkten hittades inte" });
    }
    res.json(updated);
  } catch {
    res.status(400).json({ error: "Kunde inte uppdatera produkt" });
  }
});

//DELETE product
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Produkten hittades inte" });
    }
    res.json({ message: "Produkten har raderats" });
  } catch {
    res.status(500).json({ error: "Kunde inte radera produkt" });
  }
});

export default router;
