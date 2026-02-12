import "dotenv/config";
import mongoose from "mongoose";
import Product from "../lib/models/Product";
import { products } from "../lib/data";

const MONGODB_URI = process.env.MONGODB_URI!;

async function seed() {
  console.log("🌱 Seeding başladı...");

  await mongoose.connect(process.env.MONGODB_URI!);

  await Product.deleteMany();

  await Product.insertMany(
    products.map((p) => ({
      name: p.name,
      price: p.price,
      category: p.category,
      image: p.image,
      unit: p.unit,
      stock: 100,
    })),
  );

  console.log("✅ Products seeded!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed error:", err);
  process.exit(1);
});
