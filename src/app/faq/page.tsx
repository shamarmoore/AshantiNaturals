"use client";

import { useState } from "react";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    category: "Ordering",
    question: "How do I place an order?",
    answer:
      "Simply browse our collection, select your desired product, choose your preferred length and options, then click 'Add to Cart.' When you're ready, proceed to checkout and follow the prompts to complete your purchase. You'll receive an order confirmation email once the order is placed.",
  },
  {
    category: "Ordering",
    question: "Can I modify or cancel my order after placing it?",
    answer:
      "We process orders quickly to ensure fast delivery. If you need to modify or cancel, please contact us within 2 hours of placing your order. After that, changes may not be possible once the order has entered our fulfillment process.",
  },
  {
    category: "Ordering",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. All transactions are secured with industry-standard encryption.",
  },
  {
    category: "Shipping",
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 5–7 business days and is free on orders over $100. Express shipping (2–3 business days) is available for $12.99, and overnight shipping (1 business day) is $24.99. Processing time is 1–2 business days before shipment.",
  },
  {
    category: "Shipping",
    question: "Do you ship internationally?",
    answer:
      "Currently, we ship within the United States. We're working on expanding to international markets soon. Sign up for our newsletter to be the first to know when international shipping becomes available.",
  },
  {
    category: "Returns",
    question: "What is your return policy?",
    answer:
      "We accept returns within 14 days of delivery for unused and unaltered items in their original packaging. Custom-colored items are final sale. To initiate a return, contact our support team with your order number and reason for return.",
  },
  {
    category: "Returns",
    question: "How do I exchange a product?",
    answer:
      "To exchange a product, please contact our customer service team. We'll guide you through the process: ship back the original item and we'll send the replacement once we receive and inspect it. Exchanges are subject to availability.",
  },
  {
    category: "Hair Care",
    question: "How should I wash my wig or extensions?",
    answer:
      "Gently detangle with a wide-tooth comb before washing. Use sulfate-free shampoo with lukewarm water, washing in a downward motion. Apply a deep conditioner for 10–15 minutes, then rinse with cool water to seal the cuticles. Air dry on a wig stand when possible.",
  },
  {
    category: "Hair Care",
    question: "Can I use heat styling tools on the hair?",
    answer:
      "Yes! Our 100% human hair products can be styled with heat tools. However, we recommend using a heat protectant spray and keeping the temperature below 350°F (180°C) to maintain the hair's longevity and natural luster.",
  },
  {
    category: "Hair Care",
    question: "How long will my wig or extensions last?",
    answer:
      "With proper care, our premium human hair products can last 12–18 months or longer. The key is regular conditioning, gentle handling, proper storage on a wig stand or in a satin bag, and minimizing excessive heat styling.",
  },
];

const CATEGORIES = ["All", "Ordering", "Shipping", "Returns", "Hair Care"];

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
    <div className="border border-stone-200 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-stone-50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-stone-800 pr-4">{item.question}</span>
        <svg
          className={`w-5 h-5 text-stone-500 flex-shrink-0 transition-transform duration-200 ${
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
        <p className="px-5 pb-4 text-stone-600 text-sm leading-relaxed">
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
      <nav className="text-sm text-stone-500 mb-8">
        <Link href="/" className="hover:text-amber-700 transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-stone-800">FAQ</span>
      </nav>

      <h1 className="text-4xl font-serif font-bold text-stone-900 text-center mb-4">
        Frequently Asked Questions
      </h1>
      <p className="text-stone-600 text-center mb-10 max-w-2xl mx-auto">
        Find answers to common questions about ordering, shipping, returns, and
        hair care. Can&apos;t find what you need?{" "}
        <Link href="/contact" className="text-amber-700 hover:underline">
          Contact us
        </Link>
        .
      </p>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setOpenIndex(null);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-amber-600 text-white"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
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
      <div className="mt-12 text-center bg-stone-50 rounded-xl p-8">
        <h2 className="text-xl font-serif font-bold text-stone-900 mb-2">
          Still Have Questions?
        </h2>
        <p className="text-stone-600 mb-4">
          Our team is here to help. Reach out and we&apos;ll get back to you
          as soon as possible.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-stone-800 text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-stone-700 transition-colors"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}
