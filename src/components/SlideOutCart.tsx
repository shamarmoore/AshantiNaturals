"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import {
  getCart,
  removeFromCart,
  updateCartQuantity,
  getCartTotal,
  type CartItem,
} from "@/lib/cart";

interface SlideOutCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SlideOutCart({ isOpen, onClose }: SlideOutCartProps) {
  const [items, setItems] = useState<CartItem[]>(() => getCart());

  const syncCart = useCallback(() => {
    setItems(getCart());
  }, []);

  useEffect(() => {
    window.addEventListener("cart-updated", syncCart);
    window.addEventListener("storage", syncCart);
    return () => {
      window.removeEventListener("cart-updated", syncCart);
      window.removeEventListener("storage", syncCart);
    };
  }, [syncCart]);

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const subtotal = getCartTotal(items);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-taupe-200 px-4 py-4">
            <h2 className="text-lg font-semibold text-taupe-800">
              Your Cart ({items.reduce((s, i) => s + i.quantity, 0)})
            </h2>
            <button
              onClick={onClose}
              className="rounded-md p-1 text-taupe-400 hover:text-taupe-600 transition-colors"
              aria-label="Close cart"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Cart items */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <svg
                  className="h-16 w-16 text-taupe-300 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <p className="text-taupe-500 text-sm">Your cart is empty</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-3 rounded-lg border border-taupe-100 bg-taupe-50 p-3"
                  >
                    {/* Product image */}
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-taupe-200">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                          <div className="flex h-full w-full items-center justify-center text-taupe-400">
                          <svg
                            className="h-8 w-8"
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
                    </div>

                    {/* Product details */}
                    <div className="flex flex-1 flex-col justify-between min-w-0">
                      <div className="flex justify-between gap-2">
                        <h3 className="text-sm font-medium text-taupe-800 truncate">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="flex-shrink-0 text-taupe-400 hover:text-red-500 transition-colors"
                          aria-label={`Remove ${item.name}`}
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        {/* Quantity controls */}
                        <div className="flex items-center rounded-md border border-taupe-300">
                          <button
                            onClick={() =>
                              updateCartQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="px-2 py-0.5 text-taupe-600 hover:bg-taupe-100 transition-colors disabled:text-taupe-300 disabled:cursor-not-allowed"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="px-2 py-0.5 text-sm font-medium text-taupe-800 border-x border-taupe-300 min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartQuantity(item.id, item.quantity + 1)
                            }
                            className="px-2 py-0.5 text-taupe-600 hover:bg-taupe-100 transition-colors"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-sm font-semibold text-taupe-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-taupe-200 px-4 py-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-taupe-500">Subtotal</span>
                <span className="text-lg font-semibold text-taupe-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <Link
                href="/cart"
                onClick={onClose}
                className="block w-full rounded-sm bg-taupe-400 px-4 py-3 text-center text-sm font-medium text-white hover:bg-taupe-500 transition-colors"
              >
                Checkout
              </Link>
              <button
                onClick={onClose}
                className="w-full rounded-sm border border-taupe-300 px-4 py-2.5 text-center text-sm font-medium text-taupe-700 hover:bg-taupe-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
