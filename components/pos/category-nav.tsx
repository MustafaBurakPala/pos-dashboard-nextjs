"use client";

import React, { useEffect, useState } from "react";

import {
  LayoutGrid,
  Apple,
  Milk,
  Beef,
  CupSoda,
  Cookie,
  Wheat,
  Sparkles,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  grid: LayoutGrid,
  apple: Apple,
  milk: Milk,
  beef: Beef,
  "cup-soda": CupSoda,
  cookie: Cookie,
  wheat: Wheat,
  sparkles: Sparkles,
};

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategoryNavProps {
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
}

export function CategoryNav({
  activeCategory,
  onCategoryChange,
  search,
  onSearchChange,
}: CategoryNavProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function loadCategories() {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    }

    loadCategories();
  }, []);

  return (
    <nav className="border-b border-border bg-card/60 backdrop-blur-sm">
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Categories */}
        <div className="flex flex-1 items-center gap-1 overflow-x-auto scrollbar-hide">
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || LayoutGrid;
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-secondary text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Ürün ara..."
          className="w-[220px] rounded-xl border border-border bg-background px-4 py-2 text-sm outline-none transition focus:ring-2 focus:ring-primary"
        />
      </div>
    </nav>
  );
}
