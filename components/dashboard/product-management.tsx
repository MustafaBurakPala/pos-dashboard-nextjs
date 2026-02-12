"use client";

import React from "react";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { categories } from "@/lib/data"; // sadece statik
import { formatPrice } from "@/lib/utils/formatPrice";
import { Plus, Pencil, Trash2, X, Search, Package } from "lucide-react";
import { useEffect } from "react";
import { useRef } from "react";

interface ProductFormData {
  name: string;
  price: string;
  category: string;
  image: string; // DB'ye kaydedilecek path
  imageFile?: File; // geçici dosya
  unit: string;
}

const emptyForm: ProductFormData = {
  name: "",
  price: "",
  category: "meyve-sebze",
  image: "/products/domates.jpg",
  unit: "ad",
};

export function ProductManagement() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductFormData>(emptyForm);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("hepsi");
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (!showForm) setPreview(null);
  }, [showForm]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function loadProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProductList(data);
  }

  const filteredProducts = productList.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "hepsi" || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  function openAddForm() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  }

  function openEditForm(product: Product) {
    setForm({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      image: product.image ?? "/products/domates.jpg",
      unit: product.unit,
    });
    setEditingId(product._id);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      // 1) Resim URL'i belirle (hiç dosya seçilmezse mevcut image / default)
      let imageUrl = form.image || "/products/domates.jpg";

      // 2) Eğer kullanıcı yeni dosya seçtiyse önce upload et
      if (form.imageFile) {
        const data = new FormData();
        data.append("file", form.imageFile);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });

        if (!uploadRes.ok) {
          const err = await uploadRes.json().catch(() => ({}));
          alert(err.error || "Resim yuklenemedi");
          return;
        }

        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url; // 🔥 DB'ye gidecek gerçek resim yolu
      }

      // 3) Ürünü kaydet (POST / PUT)
      const res = await fetch(
        editingId ? `/api/products/${editingId}` : "/api/products",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            price: Number(form.price),
            category: form.category,
            image: imageUrl, // 🔥 form.image değil!
            unit: form.unit,
          }),
        },
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Islem basarisiz");
        return;
      }

      setShowForm(false);
      setEditingId(null);
      await loadProducts();
    } catch (error) {
      console.error("Submit error:", error);
      alert("Sunucuya baglanilamadi");
    }
  }

  async function deleteProduct(id: string) {
    const confirmed = confirm("Bu ürünü silmek istediğine emin misin?");

    if (!confirmed) return;

    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Silme işlemi başarısız");
      return;
    }

    loadProducts();
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Urun ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 rounded-xl border border-border bg-secondary pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-200"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="h-10 rounded-xl border border-border bg-secondary px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-200"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={openAddForm}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:scale-95"
        >
          <Plus className="h-4 w-4" />
          Yeni Urun Ekle
        </button>
      </div>

      {/* Product Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Urun
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Kategori
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Fiyat
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Birim
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Islemler
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => {
                const cat = categories.find((c) => c.id === product.category);
                return (
                  <tr
                    key={product._id}
                    className="border-b border-border/50 transition-colors duration-200 hover:bg-secondary/30 opacity-0 animate-fade-in"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-muted">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            loading="eager"
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-lg bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                        {cat?.name || product.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-primary">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {product.unit}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEditForm(product)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-all duration-200 hover:bg-primary/10 hover:text-primary"
                          aria-label={`${product.name} duzenle`}
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteProduct(product._id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-all duration-200 hover:bg-destructive/10 hover:text-destructive"
                          aria-label={`${product.name} sil`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Package className="h-8 w-8" />
                      <p className="text-sm">Urun bulunamadi</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in">
          <form
            onSubmit={handleSubmit}
            className="relative mx-4 w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl animate-scale-in"
          >
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <h3 className="mb-6 text-lg font-bold text-foreground">
              {editingId ? "Urun Duzenle" : "Yeni Urun Ekle"}
            </h3>

            <div className="flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Urun Adi
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-200"
                  placeholder="Urun adini girin"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Fiyat (TL)
                  </label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    min="0"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    className="w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-200"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Birim
                  </label>
                  <select
                    value={form.unit}
                    onChange={(e) => setForm({ ...form, unit: e.target.value })}
                    className="w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-200"
                  >
                    <option value="ad">Adet</option>
                    <option value="kg">Kilogram</option>
                    <option value="lt">Litre</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Kategori
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-200"
                >
                  {categories
                    .filter((c) => c.id !== "hepsi")
                    .map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                </select>
                <div className="mt-3">
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Ürün Resmi
                  </label>

                  <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-secondary px-4 py-4 text-sm text-muted-foreground transition-all duration-200 hover:border-primary hover:text-foreground">
                    <span>Resim seçmek için tıkla</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setForm({ ...form, imageFile: file });
                          setPreview(URL.createObjectURL(file));
                        }
                      }}
                      className="hidden"
                    />
                  </label>

                  {form.imageFile && (
                    <p className="mt-2 text-xs text-primary">
                      Seçilen dosya: {form.imageFile.name}
                    </p>
                  )}
                  {preview && (
                    <div className="mt-3 flex justify-center">
                      <div className="relative h-24 w-24">
                        {/* Görsel Kutusu */}
                        <div className="h-full w-full overflow-hidden rounded-xl border border-border">
                          <img
                            src={preview}
                            alt="Önizleme"
                            className="h-full w-full object-cover"
                          />
                        </div>

                        {/* Sil (X) Butonu */}
                        <button
                          type="button"
                          onClick={() => {
                            setPreview(null);
                            setForm({ ...form, imageFile: undefined });
                            if (fileInputRef.current)
                              fileInputRef.current.value = "";
                          }}
                          className="absolute -top-2 -right-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-background text-destructive border border-border shadow-sm hover:bg-destructive hover:text-white transition"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]"
              >
                {editingId ? "Guncelle" : "Urun Ekle"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
