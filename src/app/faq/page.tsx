"use client";

import { useState } from "react";
import Link from "next/link";
import { FAQ_DATA, FAQ_CATEGORIES, type FAQItem } from "@/lib/faq-data";

function FAQAccordion({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-taupe-200 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-taupe-50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-taupe-800 pr-4">{item.question}</span>
        <svg
          className={`w-5 h-5 text-taupe-500 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <p className="px-5 pb-4 text-taupe-600 text-sm leading-relaxed">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFAQs =
    activeCategory === "All"
      ? FAQ_DATA
      : FAQ_DATA.filter((item) => item.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-taupe-500 mb-8">
        <Link href="/" className="hover:text-blush-700 transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-taupe-800">FAQ</span>
      </nav>

      <h1 className="text-4xl font-heading font-semibold text-taupe-900 text-center mb-2">
        Frequently Asked Questions
      </h1>
      <div className="w-16 h-0.5 bg-blush-200 mx-auto mb-4" />
      <p className="text-taupe-600 text-center mb-10 max-w-2xl mx-auto">
        Find answers to common questions about ordering, shipping, returns, and
        hair care. Can&apos;t find what you need?{" "}
        <Link href="/contact" className="text-blush-700 hover:underline">
          Contact us
        </Link>
        .
      </p>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {FAQ_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setOpenIndex(null);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-blush-200 text-taupe-900"
                : "bg-taupe-100 text-taupe-600 hover:bg-taupe-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ list */}
      <div className="space-y-3">
        {filteredFAQs.map((item, index) => (
          <FAQAccordion
            key={`${item.category}-${index}`}
            item={item}
            isOpen={openIndex === index}
            onToggle={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
          />
        ))}
      </div>

      {/* Help CTA */}
      <div className="mt-12 text-center bg-taupe-50 rounded-xl p-8">
        <h2 className="text-xl font-heading font-semibold text-taupe-900 mb-2">
          Still Have Questions?
        </h2>
        <p className="text-taupe-600 mb-4">
          Our team is here to help. Reach out and we&apos;ll get back to you
          as soon as possible.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-taupe-400 text-white px-6 py-2.5 rounded-sm text-sm font-medium hover:bg-taupe-500 transition-colors"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}
