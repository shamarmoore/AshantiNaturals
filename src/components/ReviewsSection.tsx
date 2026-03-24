"use client";

import { useState, useEffect, useCallback } from "react";
import { TESTIMONIALS } from "@/lib/mockData";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? "text-amber-500" : "text-stone-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  // Show 1 on mobile, 2 on tablet, 3 on desktop via CSS
  const getVisibleTestimonials = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      items.push(TESTIMONIALS[(currentIndex + i) % TESTIMONIALS.length]);
    }
    return items;
  };

  const visible = getVisibleTestimonials();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-3">
            What Our Customers Say
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Real reviews from women who love their Ashanti Naturals hair
          </p>
        </div>

        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((testimonial, idx) => (
              <div
                key={`${testimonial.name}-${currentIndex}-${idx}`}
                className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-amber-200/60 shadow-sm
                  transition-all duration-500
                  ${idx === 1 ? "hidden md:block" : ""}
                  ${idx === 2 ? "hidden lg:block" : ""}`}
              >
                <StarRating rating={testimonial.rating} />

                <blockquote className="mt-4 mb-6">
                  <p className="text-stone-700 leading-relaxed italic">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                </blockquote>

                <div className="flex items-center justify-between border-t border-stone-100 pt-4">
                  <div>
                    <p className="font-semibold text-stone-900 text-sm">{testimonial.name}</p>
                    <p className="text-xs text-stone-500">{testimonial.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-amber-700">{testimonial.product}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              aria-label="Previous review"
              className="p-2 rounded-full border border-amber-300 text-amber-700
                         hover:bg-amber-100 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to review ${idx + 1}`}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer
                    ${idx === currentIndex ? "bg-amber-600 w-6" : "bg-amber-300 hover:bg-amber-400"}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next review"
              className="p-2 rounded-full border border-amber-300 text-amber-700
                         hover:bg-amber-100 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
