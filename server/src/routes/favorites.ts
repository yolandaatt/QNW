import { Router } from "express";
import {
  getMyFavorites,
  addFavorite,
  removeFavorite,
} from "../controllers/favoriteController.js";
import { authenticateJWT } from "../middleware/auth.js";

const router = Router();

router.get("/", authenticateJWT, getMyFavorites);
router.post("/", authenticateJWT, addFavorite);
router.delete("/:productId", authenticateJWT, removeFavorite);

export default router;
