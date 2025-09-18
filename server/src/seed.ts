import mongoose from "mongoose";
import Product from "./models/Product.js";

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/qnw");

    // Rensa gamla produkter först
    await Product.deleteMany({});

    // Lägg in testprodukter
    await Product.insertMany([
      {
        title: "Äpple",
        price: 12.5,
        imageUrl: "https://via.placeholder.com/150",
        description: "Ett fräscht rött äpple",
        category: "Frukt",
        inStock: true,
      },
      {
        title: "Banan",
        price: 8.0,
        imageUrl: "https://via.placeholder.com/150",
        description: "En söt gul banan",
        category: "Frukt",
        inStock: true,
      },
      {
        title: "Apelsin",
        price: 15.0,
        imageUrl: "https://via.placeholder.com/150",
        description: "En saftig apelsin full av C-vitamin",
        category: "Frukt",
        inStock: true,
      },
    ]);

    console.log("Seedade testprodukter!");
    process.exit();
  } catch (err) {
    console.error("Error seeding products:", err);
    process.exit(1);
  }
}

seed();
