import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Product from "@/lib/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createAuditLog } from "@/lib/audit";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  await dbConnect();

  // 🔐 Session al
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "admin") {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  // 🔥 params await edilmek zorunda
  const { id } = await context.params;

  const deleted = await Product.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 });
  }

  // 🛡 Audit Log
  await createAuditLog({
    user: session.user,
    action: "DELETE",
    entity: "Product",
    entityId: id,
    metadata: { name: deleted.name },
    req,
  });

  return NextResponse.json({ success: true });
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  await dbConnect();

  // 🔐 Session al
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "admin") {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  // 🔥 Next.js: params async
  const { id } = await context.params;

  // body
  const body = await req.json();

  // Eski ürünü çek (audit diff için)
  const before = await Product.findById(id).lean();
  if (!before) {
    return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 });
  }

  // Güncelle
  const updated = await Product.findByIdAndUpdate(
    id,
    {
      name: body.name,
      price: body.price,
      category: body.category,
      image: body.image,
      unit: body.unit,
      // varsa stock:
      // stock: body.stock,
    },
    { new: true, runValidators: true },
  ).lean();

  if (!updated) {
    return NextResponse.json({ error: "Ürün güncellenemedi" }, { status: 500 });
  }

  // 🧠 diff (sadece değişen alanlar)
  const changed: Record<string, { from: any; to: any }> = {};
  const fields = ["name", "price", "category", "image", "unit"]; // + "stock" varsa ekle

  for (const f of fields) {
    if ((before as any)[f] !== (updated as any)[f]) {
      changed[f] = { from: (before as any)[f], to: (updated as any)[f] };
    }
  }

  // 🛡 Audit Log
  await createAuditLog({
    user: session.user,
    action: "UPDATE",
    entity: "Product",
    entityId: id,
    metadata: {
      changed,
      // istersen tüm body yerine sadece changed loglamak daha güvenli
    },
    req,
  });

  return NextResponse.json(updated);
}
