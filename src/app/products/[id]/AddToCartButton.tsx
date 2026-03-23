"use client";

import { addToCart } from "@/lib/cart";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function AddToCartButton({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full md:w-auto bg-stone-800 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-stone-700 transition-colors"
    >
      {added ? "✓ Added to Cart" : "Add to Cart"}
    </button>
  );
}
