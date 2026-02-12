import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Product from "@/lib/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { requireAdmin } from "@/lib/requireAdmin";
import { createAuditLog } from "@/lib/audit";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "admin") {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  try {
    await requireAdmin();
    await dbConnect();

    const body = await req.json();

    const product = await Product.create(body);
    await createAuditLog({
      user: session.user,
      action: "CREATE",
      entity: "Product",
      entityId: product._id.toString(),
      metadata: { name: product.name },
      req,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    console.error("POST /api/products error:", err);

    return NextResponse.json({ message: "Ürün eklenemedi" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const filter: any = {};

    if (category && category !== "hepsi") {
      filter.category = category;
    }

    if (search && search.trim()) {
      filter.name = { $regex: search, $options: "i" };
    }

    const products = await Product.find(filter).lean();

    return NextResponse.json(products);
  } catch (err) {
    console.error("PRODUCT GET ERROR:", err);
    return NextResponse.json({ error: "Ürünler alınamadı" }, { status: 500 });
  }
}
