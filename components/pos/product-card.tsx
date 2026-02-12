"use client";

import { Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils/formatPrice";

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
  index: number;
}

export function ProductCard({ product, onAdd, index }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);

  function handleAdd() {
    setIsAdding(true);
    onAdd(product);
    setTimeout(() => setIsAdding(false), 400);
  }

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 opacity-0 animate-fade-in"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          loading="eager"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col justify-between p-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground leading-tight">
            {product.name}
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            /{product.unit}
          </p>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-base font-bold text-primary">
            {formatPrice(product.price)}
          </span>

          <button
            onClick={handleAdd}
            className={`flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:shadow-md hover:shadow-primary/25 active:scale-95 ${
              isAdding ? "animate-cart-bounce" : ""
            }`}
            aria-label={`${product.name} ekle`}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
