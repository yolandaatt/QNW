import { RequestHandler } from "express";
import Favorites from "../models/Favorites.js";

export const getMyFavorites: RequestHandler = async (req, res) => {
  try {
    const favorites = await Favorites.find({ userId: req.user!.id })
      .populate("productId")
      .sort({ createdAt: -1 });

    res.json(favorites);
  } catch {
    res.status(500).json({ message: "Kunde inte hämta favoriter " });
  }
};

export const addFavorite: RequestHandler = async (req, res) => {
  try {
    const { productId } = req.body;

    const favorite = await Favorites.create({
      userId: req.user!.id,
      productId,
    });

    const populated = await favorite.populate("productId");

    res.status(201).json(populated);
  } catch (err) {
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      err.code === 11000
    ) {
      return res.status(400).json({ message: "Produkten är redan en favorit" });
    }
    res.status(500).json({ message: "Kunde inte lägga till favorit" });
  }
};
export const removeFavorite: RequestHandler = async (req, res) => {
  try {
    await Favorites.findOneAndDelete({
      userId: req.user!.id,
      productId: req.params.productId,
    });

    res.json({ message: "Favorit borttagen" });
  } catch {
    res.status(500).json({ message: "Kunde inte ta bort favorit" });
  }
};
