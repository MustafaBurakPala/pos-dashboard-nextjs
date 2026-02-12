import { dbConnect } from "@/lib/db";
import Product from "@/lib/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  const categories = await Product.distinct("category");

  return NextResponse.json([
    { id: "hepsi", name: "Hepsi", icon: "grid" },
    ...categories.map((c: string) => ({
      id: c,
      name: c.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      icon: "grid",
    })),
  ]);
}
