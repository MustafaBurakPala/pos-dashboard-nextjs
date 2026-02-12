import { dbConnect } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  return NextResponse.json({
    message: "MongoDB bağlantısı başarılı 🚀",
  });
}
