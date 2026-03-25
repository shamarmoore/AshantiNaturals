"use client";

import Image from "next/image";
import Link from "next/link";
import { addToCart } from "@/lib/cart";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  length: string;
  inStock: boolean;
  texture?: string;
  method?: string;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  category,
  length,
  inStock,
  texture,
}: ProductCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!inStock) return;
    addToCart({ id, name, price, image });
  };

  return (
    <Link href={`/products/${id}`} className="group block">
        <div className="bg-white rounded-lg shadow-sm border border-taupe-200 overflow-hidden hover:shadow-md hover:border-blush-200 transition-all">
        <div className="aspect-square relative bg-taupe-100">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-taupe-400">
              <svg
                className="w-16 h-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
          {!inStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-white text-taupe-800 px-3 py-1 rounded-full text-sm font-medium">
                Sold Out
              </span>
            </div>
          )}
          {/* Quick View overlay */}
          {inStock && (
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <span className="bg-white text-taupe-800 px-4 py-2 rounded-full text-sm font-medium shadow-md translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                Quick View
              </span>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex flex-wrap items-center gap-1.5 mb-1">
            <span className="text-xs text-blush-700 bg-blush-50 px-2 py-0.5 rounded-full">
              {category}
            </span>
            {texture && (
              <span className="text-xs text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                {texture}
              </span>
            )}
            {length && (
              <span className="text-xs text-taupe-500">{length}</span>
            )}
          </div>
          <h3 className="text-taupe-800 font-medium mt-1 group-hover:text-blush-700 transition-colors">
            {name}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <p className="text-lg font-semibold text-taupe-900">
              ${price.toFixed(2)}
            </p>
            <button
              onClick={handleAddToCart}
              disabled={!inStock}
              className="text-sm bg-taupe-800 text-white px-3 py-1.5 rounded-sm hover:bg-taupe-700 transition-colors disabled:bg-taupe-300 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
