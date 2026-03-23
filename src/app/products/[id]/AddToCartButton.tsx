"use client";

import { addToCart, getCart, updateCartQuantity } from "@/lib/cart";
import { useState } from "react";

interface Props {
  product: { id: string; name: string; price: number; image: string };
  lengths?: string[];
  colors?: string[];
}

export default function AddToCartButton({ product, lengths, colors }: Props) {
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedLength, setSelectedLength] = useState(lengths?.[0] ?? "");

  const handleClick = () => {
    const currentQty = getCart().find((i) => i.id === product.id)?.quantity ?? 0;

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });

    // Set total quantity: existing + new
    updateCartQuantity(product.id, currentQty + quantity);

    setAdded(true);
    window.dispatchEvent(new Event("open-cart"));
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Length selector */}
      {lengths && lengths.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">
            Length
          </label>
          <select
            value={selectedLength}
            onChange={(e) => setSelectedLength(e.target.value)}
            className="w-full border border-stone-300 rounded-md px-3 py-2 text-stone-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            {lengths.map((len) => (
              <option key={len} value={len}>
                {len}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Color display */}
      {colors && colors.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">
            Color
          </label>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <span
                key={color}
                className="inline-flex items-center gap-1.5 text-sm text-stone-700 bg-stone-100 px-3 py-1.5 rounded-full"
              >
                <span
                  className="w-3 h-3 rounded-full border border-stone-300"
                  style={{ backgroundColor: color.toLowerCase().replace(/\s+/g, "") }}
                />
                {color}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Quantity selector */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1.5">
          Quantity
        </label>
        <div className="inline-flex items-center border border-stone-300 rounded-md">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-2 text-stone-600 hover:bg-stone-100 transition-colors"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="px-4 py-2 text-stone-900 font-medium min-w-[3rem] text-center border-x border-stone-300">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-2 text-stone-600 hover:bg-stone-100 transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to cart button */}
      <button
        onClick={handleClick}
        disabled={added}
        className="w-full bg-stone-800 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-stone-700 transition-colors disabled:bg-green-700"
      >
        {added ? "Added ✓" : `Add to Cart — $${(product.price * quantity).toFixed(2)}`}
      </button>
    </div>
  );
}
