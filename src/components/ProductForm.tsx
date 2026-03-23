"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ProductFormProps {
  product?: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    length: string;
    color: string;
    texture?: string;
    method?: string;
    inStock: boolean;
    featured: boolean;
  };
}

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price?.toString() || "",
    image: product?.image || "",
    category: product?.category || "Wig",
    length: product?.length || "",
    color: product?.color || "",
    texture: product?.texture || "",
    method: product?.method || "",
    inStock: product?.inStock ?? true,
    featured: product?.featured ?? false,
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Upload failed");
      }

      const data = await res.json();
      setForm((prev) => ({ ...prev, image: data.url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = product
        ? `/api/products/${product.id}`
        : "/api/products";
      const method = product ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save product");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          Product Name *
        </label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border border-stone-300 rounded-md px-3 py-2 text-stone-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          placeholder="e.g., Brazilian Body Wave Wig"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          Description *
        </label>
        <textarea
          required
          rows={4}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border border-stone-300 rounded-md px-3 py-2 text-stone-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          placeholder="Describe the wig, its texture, density, etc."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Price ($) *
          </label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full border border-stone-300 rounded-md px-3 py-2 text-stone-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder="199.99"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Category
          </label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full border border-stone-300 rounded-md px-3 py-2 text-stone-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="Wig">Wig</option>
            <option value="Lace Front">Lace Front</option>
            <option value="Full Lace">Full Lace</option>
            <option value="Closure">Closure</option>
            <option value="Frontal">Frontal</option>
            <option value="Bundle">Bundle</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Length
          </label>
          <input
            type="text"
            value={form.length}
            onChange={(e) => setForm({ ...form, length: e.target.value })}
            className="w-full border border-stone-300 rounded-md px-3 py-2 text-stone-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder='e.g., 18"'
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Color
          </label>
          <input
            type="text"
            value={form.color}
            onChange={(e) => setForm({ ...form, color: e.target.value })}
            className="w-full border border-stone-300 rounded-md px-3 py-2 text-stone-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder="e.g., Natural Black"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Texture
          </label>
          <select
            value={form.texture}
            onChange={(e) => setForm({ ...form, texture: e.target.value })}
            className="w-full border border-stone-300 rounded-md px-3 py-2 text-stone-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="">Select texture…</option>
            <option value="Straight">Straight</option>
            <option value="Body Wave">Body Wave</option>
            <option value="Deep Wave">Deep Wave</option>
            <option value="Loose Wave">Loose Wave</option>
            <option value="Kinky Curly">Kinky Curly</option>
            <option value="Water Wave">Water Wave</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Method
          </label>
          <select
            value={form.method}
            onChange={(e) => setForm({ ...form, method: e.target.value })}
            className="w-full border border-stone-300 rounded-md px-3 py-2 text-stone-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="">Select method…</option>
            <option value="Sew-In">Sew-In</option>
            <option value="Tape-In">Tape-In</option>
            <option value="Clip-In">Clip-In</option>
            <option value="Glueless Wig">Glueless Wig</option>
            <option value="Lace Front">Lace Front</option>
            <option value="Full Lace">Full Lace</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          Product Image
        </label>
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200"
            />
            {uploading && (
              <p className="text-sm text-amber-600 mt-1">Uploading...</p>
            )}
            {form.image && (
              <p className="text-sm text-green-600 mt-1">Image uploaded ✓</p>
            )}
          </div>
          {form.image && (
            <div className="w-20 h-20 relative rounded-md overflow-hidden border border-stone-200">
              <Image
                src={form.image}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.inStock}
            onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
            className="rounded border-stone-300 text-amber-600 focus:ring-amber-500"
          />
          <span className="text-sm text-stone-700">In Stock</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            className="rounded border-stone-300 text-amber-600 focus:ring-amber-500"
          />
          <span className="text-sm text-stone-700">Featured Product</span>
        </label>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-amber-600 text-white px-6 py-2 rounded-md hover:bg-amber-700 transition-colors disabled:bg-amber-300"
        >
          {loading
            ? "Saving..."
            : product
              ? "Update Product"
              : "Add Product"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="border border-stone-300 text-stone-700 px-6 py-2 rounded-md hover:bg-stone-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
