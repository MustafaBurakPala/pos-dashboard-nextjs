"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "./product-card";
import { PackageOpen } from "lucide-react";

interface ProductGridProps {
  activeCategory: string;
  search: string;
  onAddToCart: (product: Product) => void;
}

export function ProductGrid({
  activeCategory,
  search,
  onAddToCart,
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);

      const params = new URLSearchParams();

      if (activeCategory !== "hepsi") {
        params.append("category", activeCategory);
      }

      if (search.trim()) {
        params.append("search", search);
      }

      const url = `/api/products?${params.toString()}`;

      const res = await fetch(url);

      const data = await res.json();
      setProducts(data);

      setLoading(false);
    }

    loadProducts();
  }, [activeCategory, search]);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center text-muted-foreground">
        Yükleniyor...
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 text-muted-foreground animate-fade-in">
        <PackageOpen className="h-12 w-12" />
        <p className="text-sm">Bu kategoride ürün bulunamadı</p>
      </div>
    );
  }

  return (
    <div
      key={activeCategory}
      className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      {products.map((product, index) => (
        <ProductCard
          key={product._id}
          product={product}
          onAdd={onAddToCart}
          index={index}
        />
      ))}
    </div>
  );
}
