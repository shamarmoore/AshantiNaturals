"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  texture: string;
  length?: string;
  color?: string;
}

interface TextureOption {
  name: string;
  description: string;
  pattern: React.ReactNode;
}

const textures: TextureOption[] = [
  {
    name: "Straight",
    description: "Sleek & smooth",
    pattern: (
      <svg viewBox="0 0 80 60" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="10" y1="10" x2="10" y2="50" />
        <line x1="20" y1="8" x2="20" y2="52" />
        <line x1="30" y1="10" x2="30" y2="50" />
        <line x1="40" y1="8" x2="40" y2="52" />
        <line x1="50" y1="10" x2="50" y2="50" />
        <line x1="60" y1="8" x2="60" y2="52" />
        <line x1="70" y1="10" x2="70" y2="50" />
      </svg>
    ),
  },
  {
    name: "Body Wave",
    description: "Soft, flowing S-pattern",
    pattern: (
      <svg viewBox="0 0 80 60" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5">
        {[10, 22, 34, 46, 58, 70].map((x) => (
          <path key={x} d={`M${x} 8 C${x + 4} 20, ${x - 4} 30, ${x} 42 C${x + 4} 48, ${x - 2} 52, ${x} 56`} />
        ))}
      </svg>
    ),
  },
  {
    name: "Deep Wave",
    description: "Defined, tight waves",
    pattern: (
      <svg viewBox="0 0 80 60" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5">
        {[10, 22, 34, 46, 58, 70].map((x) => (
          <path key={x} d={`M${x} 6 C${x + 6} 12, ${x - 6} 18, ${x} 24 C${x + 6} 30, ${x - 6} 36, ${x} 42 C${x + 6} 48, ${x - 6} 54, ${x} 58`} />
        ))}
      </svg>
    ),
  },
  {
    name: "Loose Wave",
    description: "Relaxed, beachy waves",
    pattern: (
      <svg viewBox="0 0 80 60" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5">
        {[10, 22, 34, 46, 58, 70].map((x) => (
          <path key={x} d={`M${x} 6 C${x + 3} 18, ${x - 3} 28, ${x} 38 C${x + 3} 48, ${x - 2} 54, ${x} 58`} />
        ))}
      </svg>
    ),
  },
  {
    name: "Kinky Curly",
    description: "Natural, voluminous curls",
    pattern: (
      <svg viewBox="0 0 80 60" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5">
        {[12, 24, 36, 48, 60, 72].map((x) => (
          <path key={x} d={`M${x} 6 C${x + 4} 8, ${x + 4} 12, ${x} 14 C${x - 4} 16, ${x - 4} 20, ${x} 22 C${x + 4} 24, ${x + 4} 28, ${x} 30 C${x - 4} 32, ${x - 4} 36, ${x} 38 C${x + 4} 40, ${x + 4} 44, ${x} 46 C${x - 4} 48, ${x - 4} 52, ${x} 54`} />
        ))}
      </svg>
    ),
  },
  {
    name: "Water Wave",
    description: "Wet & wavy curl pattern",
    pattern: (
      <svg viewBox="0 0 80 60" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5">
        {[10, 22, 34, 46, 58, 70].map((x, i) => (
          <path key={x} d={`M${x} ${6 + (i % 2) * 3} C${x + 5} 14, ${x - 5} 20, ${x + 2} 28 C${x + 7} 34, ${x - 3} 40, ${x} 46 C${x + 5} 50, ${x - 3} 54, ${x + 1} 58`} />
        ))}
      </svg>
    ),
  },
];

export default function TextureMatchTool() {
  const [selectedTexture, setSelectedTexture] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async (texture: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/products?texture=${encodeURIComponent(texture)}`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      const productList = Array.isArray(data) ? data : data.products ?? [];
      setProducts(productList);
    } catch {
      setError("Unable to load products. Please try again.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedTexture) {
      fetchProducts(selectedTexture);
    }
  }, [selectedTexture, fetchProducts]);

  const handleReset = () => {
    setSelectedTexture(null);
    setProducts([]);
    setError(null);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-taupe-100 to-taupe-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-taupe-900 mb-3">
            Find Your Texture Match
          </h2>
          <p className="text-taupe-600 max-w-2xl mx-auto">
            Select a texture to discover products that complement your style
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 mb-8">
          {textures.map((texture) => {
            const isSelected = selectedTexture === texture.name;
            return (
              <button
                key={texture.name}
                onClick={() => setSelectedTexture(texture.name)}
                className={`group flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer
                  ${isSelected
                    ? "border-blush-600 bg-blush-50 shadow-md scale-105"
                    : "border-taupe-200 bg-white hover:border-blush-300 hover:shadow-md hover:scale-102"
                  }`}
              >
                <div
                  className={`w-full h-16 mb-3 transition-colors duration-300
                    ${isSelected ? "text-blush-700" : "text-taupe-400 group-hover:text-taupe-600"}`}
                >
                  {texture.pattern}
                </div>
                <h3
                  className={`font-heading font-semibold text-sm transition-colors duration-300
                    ${isSelected ? "text-blush-800" : "text-taupe-800"}`}
                >
                  {texture.name}
                </h3>
                <p className="text-xs text-taupe-500 mt-0.5">{texture.description}</p>
              </button>
            );
          })}
        </div>

        {selectedTexture && (
          <div className="text-center mb-6">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-sm text-taupe-500 hover:text-blush-700 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear selection
            </button>
          </div>
        )}

        {loading && (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-blush-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 mb-3">{error}</p>
            <button
              onClick={() => selectedTexture && fetchProducts(selectedTexture)}
              className="text-sm text-blush-700 underline hover:text-blush-800 cursor-pointer"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && selectedTexture && products.length > 0 && (
          <div>
            <h3 className="font-heading text-xl font-semibold text-taupe-900 mb-6 text-center">
              Recommended for {selectedTexture}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group bg-white rounded-xl border border-taupe-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-blush-300"
                >
                  <div className="aspect-square bg-taupe-100 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-taupe-300">
                      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1">
                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover relative z-10"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-blush-700 font-medium mb-1">{product.category}</p>
                    <h4 className="font-semibold text-taupe-900 text-sm group-hover:text-blush-800 transition-colors line-clamp-2">
                      {product.name}
                    </h4>
                    <p className="text-taupe-800 font-bold mt-2">${product.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {!loading && !error && selectedTexture && products.length === 0 && (
          <p className="text-center text-taupe-500 py-8">
            No products found for {selectedTexture}. Check back soon!
          </p>
        )}
      </div>
    </section>
  );
}
