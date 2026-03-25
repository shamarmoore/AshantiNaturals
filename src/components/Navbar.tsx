"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { getCart } from "@/lib/cart";
import SearchBar from "@/components/SearchBar";

/* ------------------------------------------------------------------ */
/*  Mega-menu data                                                     */
/* ------------------------------------------------------------------ */

const megaMenuSections = [
  {
    title: "By Method",
    links: [
      { label: "Sew-In", href: "/shop?method=sew-in" },
      { label: "Tape-In", href: "/shop?method=tape-in" },
      { label: "Clip-In", href: "/shop?method=clip-in" },
      { label: "Glueless Wig", href: "/shop?method=glueless-wig" },
      { label: "Lace Front", href: "/shop?method=lace-front" },
      { label: "Full Lace", href: "/shop?method=full-lace" },
    ],
  },
  {
    title: "By Texture",
    links: [
      { label: "Straight", href: "/shop?texture=straight" },
      { label: "Body Wave", href: "/shop?texture=body-wave" },
      { label: "Deep Wave", href: "/shop?texture=deep-wave" },
      { label: "Kinky Curly", href: "/shop?texture=kinky-curly" },
      { label: "Loose Wave", href: "/shop?texture=loose-wave" },
      { label: "Water Wave", href: "/shop?texture=water-wave" },
    ],
  },
  {
    title: "By Category",
    links: [
      { label: "Wigs", href: "/shop?category=wig" },
      { label: "Bundles", href: "/shop?category=bundle" },
      { label: "Closures", href: "/shop?category=closure" },
      { label: "Frontals", href: "/shop?category=frontal" },
    ],
  },
] as const;

const topNavLinks = [
  { label: "Bestsellers", href: "/shop?featured=true" },
  { label: "Sale", href: "/shop?sale=true" },
  { label: "About Us", href: "/about" },
  { label: "Help/FAQ", href: "/faq" },
] as const;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface NavbarProps {
  onCartOpen?: () => void;
}

export default function Navbar({ onCartOpen }: NavbarProps) {
  const { data: session } = useSession();
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);

  const shopRef = useRef<HTMLDivElement>(null);
  const shopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ---- cart count listener ---- */
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

  /* ---- close mega menu on outside click ---- */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (shopRef.current && !shopRef.current.contains(e.target as Node)) {
        setShopOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  /* ---- close mobile menu on route change (resize) ---- */
  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  /* ---- hover helpers for desktop mega menu ---- */
  const openShop = useCallback(() => {
    if (shopTimeoutRef.current) clearTimeout(shopTimeoutRef.current);
    setShopOpen(true);
  }, []);

  const closeShop = useCallback(() => {
    shopTimeoutRef.current = setTimeout(() => setShopOpen(false), 200);
  }, []);

  const handleCartClick = () => {
    if (onCartOpen) {
      onCartOpen();
    } else {
      window.dispatchEvent(new Event("open-cart"));
    }
  };

  const closeMobile = () => setMenuOpen(false);

  /* ---- keyboard support for mega menu ---- */
  const handleShopKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setShopOpen((prev) => !prev);
    } else if (e.key === "Escape") {
      setShopOpen(false);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b-2 border-blush-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* ---- Logo ---- */}
          <Link href="/" className="flex-shrink-0">
            <span className="text-2xl font-logo font-semibold text-taupe-800 tracking-[0.15em] uppercase">
              Luméira
            </span>
          </Link>

          {/* ---- Desktop search ---- */}
          <div className="hidden lg:block flex-1 max-w-md">
            <SearchBar />
          </div>

          {/* ---- Desktop right actions ---- */}
          <div className="hidden md:flex items-center space-x-5">
            {session?.user?.role === "admin" && (
              <Link
                href="/admin/products"
                className="text-sm text-taupe-600 hover:text-taupe-900 transition-colors"
              >
                Admin
              </Link>
            )}

            {/* Account */}
            {session ? (
              <div className="flex items-center space-x-3">
                <Link
                  href="/account"
                  className="text-taupe-600 hover:text-taupe-900 transition-colors"
                  aria-label="Account"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-sm text-taupe-600 hover:text-taupe-900 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn("google")}
                className="bg-taupe-400 text-white px-4 py-2 rounded-sm text-sm hover:bg-taupe-500 transition-colors"
              >
                Sign In
              </button>
            )}
            <button
              onClick={handleCartClick}
              className="relative text-taupe-600 hover:text-taupe-900 transition-colors"
              aria-label="Open cart"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blush-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* ---- Mobile: cart + hamburger ---- */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={handleCartClick}
              className="relative text-taupe-600 hover:text-taupe-900 transition-colors"
              aria-label="Open cart"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blush-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="text-taupe-600 hover:text-taupe-900"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ---- Desktop secondary nav with mega menu ---- */}
      <div className="hidden md:block border-t border-taupe-100 bg-taupe-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-8 h-10 text-sm">
            {/* Shop with mega menu */}
            <div
              ref={shopRef}
              className="relative h-full flex items-center"
              onMouseEnter={openShop}
              onMouseLeave={closeShop}
            >
              <button
                className="flex items-center space-x-1 text-taupe-600 hover:text-taupe-900 font-medium transition-colors"
                onClick={() => setShopOpen((prev) => !prev)}
                onKeyDown={handleShopKeyDown}
                aria-expanded={shopOpen}
                aria-haspopup="true"
              >
                <span>Shop</span>
                <svg
                  className={`h-4 w-4 transition-transform ${shopOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Mega menu panel */}
              {shopOpen && (
                <div
                  className="absolute left-0 top-full mt-0 w-[42rem] rounded-b-lg border border-taupe-200 bg-white shadow-xl p-6 grid grid-cols-3 gap-6 z-50"
                  role="menu"
                  onMouseEnter={openShop}
                  onMouseLeave={closeShop}
                >
                  {megaMenuSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-taupe-400 mb-3">
                        {section.title}
                      </h3>
                      <ul className="space-y-2" role="none">
                        {section.links.map((link) => (
                          <li key={link.href} role="none">
                            <Link
                              href={link.href}
                              className="block text-sm text-taupe-700 hover:text-blush-700 hover:pl-1 transition-all"
                              role="menuitem"
                              onClick={() => setShopOpen(false)}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {topNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-taupe-600 hover:text-taupe-900 transition-colors ${
                  link.label === "Sale" ? "text-red-600 font-semibold hover:text-red-700" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Mobile menu ---- */}
      {menuOpen && (
        <div className="md:hidden border-t border-taupe-200 bg-white max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-3">
            {/* Mobile search */}
            <div className="mb-4 lg:hidden">
              <SearchBar />
            </div>

            {/* Shop collapsible section */}
            <div className="border-b border-taupe-100 pb-3 mb-3">
              <button
                className="flex items-center justify-between w-full text-taupe-800 font-medium py-2"
                onClick={() => setMobileShopOpen(!mobileShopOpen)}
                aria-expanded={mobileShopOpen}
              >
                <span>Shop</span>
                <svg
                  className={`h-4 w-4 transition-transform ${mobileShopOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {mobileShopOpen && (
                <div className="pl-3 space-y-4 mt-2">
                  {megaMenuSections.map((section) => (
                    <div key={section.title}>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-taupe-400 mb-2">
                        {section.title}
                      </h4>
                      <ul className="space-y-1.5">
                        {section.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className="block text-sm text-taupe-600 hover:text-taupe-900 py-0.5"
                              onClick={closeMobile}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Other nav links */}
            <div className="space-y-1 border-b border-taupe-100 pb-3 mb-3">
              {topNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block py-2 text-sm ${
                    link.label === "Sale"
                      ? "text-red-600 font-semibold"
                      : "text-taupe-600 hover:text-taupe-900"
                  }`}
                  onClick={closeMobile}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Admin link */}
            {session?.user?.role === "admin" && (
              <Link
                href="/admin/products"
                className="block py-2 text-sm text-taupe-600 hover:text-taupe-900"
                onClick={closeMobile}
              >
                Admin
              </Link>
            )}

            {/* Auth */}
            <div className="pt-2">
              {session ? (
                <div className="space-y-2">
                    <span className="block text-sm text-taupe-500">
                    Signed in as {session.user?.name}
                  </span>
                  <button
                    onClick={() => signOut()}
                    className="block text-sm text-taupe-600 hover:text-taupe-900"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => signIn("google")}
                  className="w-full bg-taupe-400 text-white px-4 py-2 rounded-sm text-sm hover:bg-taupe-500 transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
