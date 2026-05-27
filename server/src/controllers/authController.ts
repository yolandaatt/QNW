import { Request, Response, RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email används redan" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" },
    );

    res.status(201).json({
      token,
      role: user.role,
      name: user.name,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Serverfel" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Felaktiga upgifter" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Felaktiga uppgifter" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" },
    );

    res.json({
      token,
      role: user.role,
      name: user.name,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Serverfel" });
  }
};

export const getMe: RequestHandler = async (req, res) => {
  try {
    const user = await User.findById(req.user!.id).select("-password");
    if (!user)
      return res.status(404).json({ message: "Användaren hittades inte" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Serverfel" });
  }
};

export const updateMe: RequestHandler = async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user!.id,
      { name, phone, address },
      { new: true, runValidators: true },
    ).select("-password");

    if (!user)
      return res.status(404).json({ message: "Användaren hittades inte" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Serverfel" });
  }
};
