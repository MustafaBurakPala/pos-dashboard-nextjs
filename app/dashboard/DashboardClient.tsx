"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Package, BarChart3 } from "lucide-react";
import { ProductManagement } from "@/components/dashboard/product-management";
import { SalesStats } from "@/components/dashboard/sales-stats";
import { signOut } from "next-auth/react";

type Tab = "products" | "stats";

export default function DashboardClient() {
  const [activeTab, setActiveTab] = useState<Tab>("products");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border bg-card px-6 py-3">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground transition-all duration-200 hover:bg-muted hover:border-primary/30"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Kasaya Don</span>
          </Link>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="rounded-lg bg-destructive px-3 py-2 text-sm text-destructive-foreground"
          >
            Çıkış Yap
          </button>

          <h1 className="text-lg font-bold text-foreground">Yonetim Paneli</h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 rounded-xl bg-secondary p-1">
          <button
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
              activeTab === "products"
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Package className="h-4 w-4" />
            <span className="hidden sm:inline">Urunler</span>
          </button>

          <button
            onClick={() => setActiveTab("stats")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
              activeTab === "stats"
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Istatistikler</span>
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-4 md:p-6">
        <div key={activeTab} className="animate-fade-in">
          {activeTab === "products" ? <ProductManagement /> : <SalesStats />}
        </div>
      </main>
    </div>
  );
}
