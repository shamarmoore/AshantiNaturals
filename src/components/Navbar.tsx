"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getCart } from "@/lib/cart";

export default function Navbar() {
  const { data: session } = useSession();
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateCount = () => {
      const cart = getCart();
      setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
    };
    updateCount();
    window.addEventListener("cart-updated", updateCount);
    window.addEventListener("storage", updateCount);
    return () => {
      window.removeEventListener("cart-updated", updateCount);
      window.removeEventListener("storage", updateCount);
    };
  }, []);

  return (
    <nav className="bg-white shadow-sm border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-serif font-bold text-stone-800">
              Ashanti Naturals
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-stone-600 hover:text-stone-900 transition-colors"
            >
              Shop
            </Link>
            {session?.user?.role === "admin" && (
              <Link
                href="/admin/products"
                className="text-stone-600 hover:text-stone-900 transition-colors"
              >
                Admin
              </Link>
            )}
            <Link
              href="/cart"
              className="relative text-stone-600 hover:text-stone-900 transition-colors"
            >
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            {session ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-stone-500">
                  {session.user?.name}
                </span>
                <button
                  onClick={() => signOut()}
                  className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn("google")}
                className="bg-stone-800 text-white px-4 py-2 rounded-md text-sm hover:bg-stone-700 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-stone-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white">
          <div className="px-4 py-3 space-y-3">
            <Link
              href="/"
              className="block text-stone-600 hover:text-stone-900"
              onClick={() => setMenuOpen(false)}
            >
              Shop
            </Link>
            {session?.user?.role === "admin" && (
              <Link
                href="/admin/products"
                className="block text-stone-600 hover:text-stone-900"
                onClick={() => setMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            <Link
              href="/cart"
              className="block text-stone-600 hover:text-stone-900"
              onClick={() => setMenuOpen(false)}
            >
              Cart {cartCount > 0 && `(${cartCount})`}
            </Link>
            {session ? (
              <button
                onClick={() => signOut()}
                className="block text-stone-600 hover:text-stone-900"
              >
                Sign Out ({session.user?.name})
              </button>
            ) : (
              <button
                onClick={() => signIn("google")}
                className="block text-stone-600 hover:text-stone-900"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
