import { Router } from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { authenticateJWT } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

router.post("/", authenticateJWT, createOrder);
router.get("/my", authenticateJWT, getMyOrders);
router.get("/all", authenticateJWT, requireAdmin, getAllOrders);
router.put("/:id/status", authenticateJWT, requireAdmin, updateOrderStatus);

export default router;
