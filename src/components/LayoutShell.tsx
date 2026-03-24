"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SlideOutCart from "@/components/SlideOutCart";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  // Allow any component to trigger the cart via a custom window event
  useEffect(() => {
    window.addEventListener("open-cart", openCart);
    return () => window.removeEventListener("open-cart", openCart);
  }, [openCart]);

  return (
    <>
      <Navbar onCartOpen={openCart} />
      <main className="flex-1">{children}</main>
      <Footer />
      <SlideOutCart isOpen={cartOpen} onClose={closeCart} />
    </>
  );
}
