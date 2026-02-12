"use client";

import { Minus, Plus, Trash2, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/lib/cart-store";
import type { Product } from "@/lib/types";
import { categories } from "@/lib/data";
import { formatPrice } from "@/lib/utils/formatPrice";

export function CartSidebar() {
  const { items, total, itemCount, update, remove, clear } = useCart();

  return (
    <aside className="flex h-full flex-col border-l border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-primary" />
          <h2 className="text-base font-bold text-foreground">Sepetim</h2>
          {itemCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
              {itemCount}
            </span>
          )}
        </div>
        {items.length > 0 && (
          <button
            onClick={clear}
            className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-muted-foreground transition-colors duration-200 hover:bg-destructive/10 hover:text-destructive"
            aria-label="Sepeti temizle"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Temizle</span>
          </button>
        )}
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto px-3 py-2">
        {items.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground animate-fade-in">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
              <ShoppingBag className="h-7 w-7" />
            </div>
            <p className="text-sm">Sepetiniz bos</p>
            <p className="text-xs">Urun eklemek icin + butonuna basin</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {items.map((item, index) => (
              <div
                key={item.product._id}
                className="group flex items-center gap-3 rounded-xl border border-border bg-secondary/50 p-2.5 transition-all duration-300 hover:border-primary/20 opacity-0 animate-fade-in-right"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Product Image */}
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={item.product.image || "/placeholder.svg"}
                    alt={item.product.name}
                    fill
                    loading="eager"
                    className="object-cover"
                    sizes="44px"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col gap-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <span className="text-sm font-medium text-foreground truncate">
                      {item.product.name}
                    </span>
                    <button
                      onClick={() => remove(item.product._id)}
                      className="shrink-0 rounded-md p-0.5 text-muted-foreground opacity-0 transition-all duration-200 hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                      aria-label={`${item.product.name} sil`}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-primary">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          update(item.product._id, item.quantity - 1)
                        }
                        className="flex h-6 w-6 items-center justify-center rounded-md bg-muted text-foreground transition-all duration-200 hover:bg-primary/20 hover:text-primary active:scale-90"
                        aria-label="Adet azalt"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="flex h-6 w-7 items-center justify-center text-xs font-bold text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          update(item.product._id, item.quantity + 1)
                        }
                        className="flex h-6 w-6 items-center justify-center rounded-md bg-muted text-foreground transition-all duration-200 hover:bg-primary/20 hover:text-primary active:scale-90"
                        aria-label="Adet arttir"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Total */}
      {items.length > 0 && (
        <div className="border-t border-border p-4 animate-slide-up">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Toplam</span>
            <span className="text-xl font-bold text-foreground">
              {formatPrice(total)}
            </span>
          </div>
          <button className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]">
            Odeme Yap
          </button>
        </div>
      )}
    </aside>
  );
}
