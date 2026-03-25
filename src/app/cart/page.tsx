"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
  getCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
  getCartTotal,
  CartItem,
} from "@/lib/cart";

export default function CartPage() {
  const { data: session } = useSession();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setCart(getCart());
    const handleUpdate = () => setCart(getCart());
    window.addEventListener("cart-updated", handleUpdate);
    return () => window.removeEventListener("cart-updated", handleUpdate);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      clearCart();
      setMessage("Payment successful! Thank you for your order.");
    }
    if (params.get("canceled") === "true") {
      setMessage("Payment was canceled. Your cart items are still here.");
    }
  }, []);

  const handleCheckout = async () => {
    if (!session) {
      setMessage("Please sign in to checkout.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Checkout failed");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  const total = getCartTotal(cart);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-heading font-semibold text-taupe-800 mb-8">
        Shopping Cart
      </h1>

      {message && (
        <div
          className={`p-4 rounded-md mb-6 ${
            message.includes("successful")
              ? "bg-green-50 text-green-700"
              : message.includes("canceled")
                ? "bg-blush-50 text-blush-700"
                : "bg-red-50 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      {cart.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-taupe-500 text-lg mb-4">Your cart is empty</p>
          <Link
            href="/"
            className="text-blush-600 hover:text-blush-700 font-medium"
          >
            Continue Shopping →
          </Link>
        </div>
      ) : (
        <div>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-white p-4 rounded-lg border border-taupe-200"
              >
                <div className="w-20 h-20 relative rounded-md overflow-hidden bg-taupe-100 flex-shrink-0">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-taupe-400 text-xs">
                      No image
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-taupe-800 truncate">
                    {item.name}
                  </h3>
                  <p className="text-taupe-600">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateCartQuantity(item.id, item.quantity - 1)
                    }
                    className="w-8 h-8 rounded-md border border-taupe-300 flex items-center justify-center hover:bg-taupe-50"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateCartQuantity(item.id, item.quantity + 1)
                    }
                    className="w-8 h-8 rounded-md border border-taupe-300 flex items-center justify-center hover:bg-taupe-50"
                  >
                    +
                  </button>
                </div>
                <p className="font-medium text-taupe-900 w-20 text-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-taupe-400 hover:text-red-500 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
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
            ))}
          </div>

          <div className="mt-8 border-t border-taupe-200 pt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-medium text-taupe-800">Total</span>
              <span className="text-2xl font-bold text-taupe-900">
                ${total.toFixed(2)}
              </span>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="flex-1 bg-taupe-400 text-white py-3 rounded-sm text-lg font-medium hover:bg-taupe-500 transition-colors disabled:bg-taupe-300"
              >
                {loading ? "Processing..." : "Checkout with Stripe"}
              </button>
              <button
                onClick={() => clearCart()}
                className="border border-taupe-300 text-taupe-600 px-6 py-3 rounded-sm hover:bg-taupe-50 transition-colors"
              >
                Clear Cart
              </button>
            </div>
            {!session && (
              <p className="text-sm text-taupe-500 mt-3 text-center">
                You&apos;ll need to sign in before checking out.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
