"use client";

import { useState } from "react";
import { PosHeader } from "@/components/pos/pos-header";
import { CategoryNav } from "@/components/pos/category-nav";
import { ProductGrid } from "@/components/pos/product-grid";
import { CartSidebar } from "@/components/pos/cart-sidebar";
import { useCart } from "@/lib/cart-store";
import type { Product } from "@/lib/types";

export default function PosPage() {
  const [activeCategory, setActiveCategory] = useState("hepsi");
  const { add } = useCart();
  const [search, setSearch] = useState("");

  function handleAddToCart(product: Product) {
    add(product);
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <PosHeader />
      <CategoryNav
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        search={search}
        onSearchChange={setSearch}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Product Area */}
        <main className="flex-1 overflow-y-auto">
          <ProductGrid
            activeCategory={activeCategory}
            search={search}
            onAddToCart={handleAddToCart}
          />
        </main>

        {/* Cart Sidebar - Desktop */}
        <div className="hidden w-[340px] shrink-0 lg:block">
          <CartSidebar />
        </div>
      </div>
    </div>
  );
}
