"use client"

import { ShoppingCart, LayoutDashboard } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/lib/cart-store"

export function PosHeader() {
  const { itemCount } = useCart()

  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-6 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <ShoppingCart className="h-5 w-5 text-primary-foreground" />
        </div>
        <h1 className="text-lg font-bold tracking-tight text-foreground">MarketPOS</h1>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-all duration-200 hover:bg-muted hover:border-primary/30"
        >
          <LayoutDashboard className="h-4 w-4" />
          <span className="hidden sm:inline">Yonetim Paneli</span>
        </Link>

        <div className="relative flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground lg:hidden">
          <ShoppingCart className="h-4 w-4" />
          {itemCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-cart-bounce">
              {itemCount}
            </span>
          )}
        </div>
      </div>
    </header>
  )
}
