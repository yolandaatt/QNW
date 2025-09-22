import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

//Register
router.post("/register", async (req, res) => {
  const { email, password, role } = req.body;

  const existingUSer = await User.findOne({ email });
  if (existingUSer) return res.status(400).json({ message: "User exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashed, role: role || "user" });
  await user.save();

  res.status(201).json({ message: "User created" });
});

//Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1d",
    },
  );

  res.json({ token });
});

export default router;
