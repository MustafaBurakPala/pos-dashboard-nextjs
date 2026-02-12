import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // Giriş yoksa → Login
  if (!session) {
    redirect("/login");
  }

  // Admin değilse → POS ekranı
  if ((session.user as any).role !== "admin") {
    redirect("/");
  }

  return <DashboardClient />;
}
