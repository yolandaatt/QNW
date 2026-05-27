import { RequestHandler } from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const createOrder: RequestHandler = async (req, res) => {
  try {
    const { items, deliveryAddress, phone, paymentMethod, totalPrice } =
      req.body;

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res
          .status(404)
          .json({ message: `Produkt hittades inte: ${item.productId}` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Otillräckligt lagersaldo för ${product.title}. Endast ${product.stock} kvar.`,
        });
      }

      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity },
        inStock: product.stock - item.quantity > 0,
      });
    }

    const order = await Order.create({
      userId: req.user!.id,
      items,
      deliveryAddress,
      phone,
      paymentMethod,
      totalPrice,
      status: "pending",
    });

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Kunde inte skapa order" });
  }
};

export const getMyOrders: RequestHandler = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user!.id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Kunde inte hämta ordrar" });
  }
};

export const getAllOrders: RequestHandler = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate(
        "userId",
        "name email deliverAddress phone paymentMethod status",
      )
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch {
    res.status(500).json({ message: "Kunde inte hämta ordrar" });
  }
};

export const updateOrderStatus: RequestHandler = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );
    if (!order) return res.status(404).json({ message: "Order hittades inte" });
    res.json(order);
  } catch {
    res.status(500).json({ message: "Kunde inte uppdatera status" });
  }
};
