"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  texture: string;
}

interface ProductCarouselProps {
  products: Product[];
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("[data-card]")?.clientWidth ?? 300;
    const gap = 24;
    const distance = cardWidth + gap;
    el.scrollBy({ left: direction === "left" ? -distance : distance, behavior: "smooth" });
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (products.length <= 1) return;

    const startAutoScroll = () => {
      autoScrollRef.current = setInterval(() => {
        const el = scrollRef.current;
        if (!el) return;
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 1) {
          el.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scroll("right");
        }
      }, 4000);
    };

    if (!isPaused) {
      startAutoScroll();
    }

    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [isPaused, products.length, scroll]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  if (!products.length) return null;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-2">
              Featured Products
            </h2>
            <p className="text-stone-600">Hand-picked favorites our customers love</p>
          </div>
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className="p-2.5 rounded-full border border-stone-300 text-stone-600 transition-all duration-200
                         hover:bg-amber-50 hover:border-amber-400 hover:text-amber-700
                         disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className="p-2.5 rounded-full border border-stone-300 text-stone-600 transition-all duration-200
                         hover:bg-amber-50 hover:border-amber-400 hover:text-amber-700
                         disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              data-card
              className="group flex-shrink-0 snap-start
                         w-[calc(100%-16px)] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]
                         bg-white rounded-xl border border-stone-200 overflow-hidden
                         transition-all duration-300 hover:shadow-lg hover:border-amber-300"
            >
              <div className="aspect-square bg-stone-100 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-stone-300">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1">
                    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover relative z-10 group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                    {product.category}
                  </span>
                  <span className="text-xs text-stone-400">{product.texture}</span>
                </div>
                <h3 className="font-semibold text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-2 text-sm mb-2">
                  {product.name}
                </h3>
                <p className="text-lg font-bold text-stone-900">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile nav arrows */}
        <div className="flex sm:hidden justify-center gap-3 mt-4">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className="p-2 rounded-full border border-stone-300 text-stone-600
                       disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className="p-2 rounded-full border border-stone-300 text-stone-600
                       disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
