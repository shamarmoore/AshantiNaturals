"use client";

import { useState } from "react";

interface ProductTabsProps {
  description: string;
}

const TABS = ["Description", "Care Instructions", "Shipping Info"] as const;
type Tab = (typeof TABS)[number];

export default function ProductTabs({ description }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Description");

  return (
    <div className="w-full">
      {/* Tab headers */}
      <div className="flex border-b border-taupe-200">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-4 py-3 text-sm font-medium transition-colors sm:px-6 ${
              activeTab === tab
                ? "text-blush-700"
                : "text-taupe-500 hover:text-taupe-700"
            }`}
            role="tab"
            aria-selected={activeTab === tab}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-taupe-400" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="py-6">
        <div className="transition-opacity duration-200">
          {activeTab === "Description" && (
            <DescriptionTab description={description} />
          )}
          {activeTab === "Care Instructions" && <CareInstructionsTab />}
          {activeTab === "Shipping Info" && <ShippingInfoTab />}
        </div>
      </div>
    </div>
  );
}

function DescriptionTab({ description }: { description: string }) {
  return (
    <div className="prose prose-stone max-w-none">
      <p className="text-taupe-700 leading-relaxed whitespace-pre-line">
        {description || "No description available."}
      </p>
    </div>
  );
}

function CareInstructionsTab() {
  const sections = [
    {
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: "Washing",
      items: [
        "Gently detangle hair with a wide-tooth comb before washing.",
        "Use a sulfate-free shampoo and lukewarm water.",
        "Wash in a downward motion — avoid rubbing or twisting.",
        "Apply a deep conditioner and leave for 10–15 minutes.",
        "Rinse thoroughly with cool water to seal the cuticles.",
      ],
    },
    {
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: "Drying",
      items: [
        "Gently pat hair dry with a microfiber towel — never wring.",
        "Air drying is recommended to maintain the natural texture.",
        "If using a blow dryer, use a low-heat setting with a diffuser.",
        "Avoid direct sunlight for extended periods when drying.",
      ],
    },
    {
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: "Styling Tips",
      items: [
        "Always use a heat protectant spray before heat styling.",
        "Keep heat tools below 350°F (180°C) for longevity.",
        "Store hair on a wig stand or in a silk/satin bag when not in use.",
        "Apply a lightweight argan or coconut oil serum for added shine.",
        "Avoid heavy products that can cause buildup and weigh hair down.",
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <div key={section.title}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-blush-700">{section.icon}</span>
            <h4 className="text-sm font-semibold text-taupe-800">
              {section.title}
            </h4>
          </div>
          <ul className="ml-7 space-y-1.5">
            {section.items.map((item, i) => (
              <li
                key={i}
                className="text-sm text-taupe-600 leading-relaxed list-disc"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function ShippingInfoTab() {
  const sections = [
    {
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Processing Time",
      content:
        "Orders are processed within 1–2 business days. During peak seasons or sales, processing may take up to 3 business days. You will receive a confirmation email with tracking once your order ships.",
    },
    {
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      title: "Shipping Methods",
      items: [
        { label: "Standard Shipping", detail: "5–7 business days — Free on orders over $100" },
        { label: "Express Shipping", detail: "2–3 business days — $12.99" },
        { label: "Overnight Shipping", detail: "1 business day — $24.99" },
      ],
    },
    {
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
        </svg>
      ),
      title: "Returns & Exchanges",
      content:
        "We accept returns within 14 days of delivery for unused and unaltered items in original packaging. Custom-colored items are final sale. To initiate a return, please contact our customer support team with your order number.",
    },
  ];

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <div key={section.title}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-blush-700">{section.icon}</span>
            <h4 className="text-sm font-semibold text-taupe-800">
              {section.title}
            </h4>
          </div>
          <div className="ml-7">
            {section.content && (
              <p className="text-sm text-taupe-600 leading-relaxed">
                {section.content}
              </p>
            )}
            {section.items && (
              <div className="space-y-2">
                {section.items.map((item) => (
                  <div key={item.label} className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                    <span className="text-sm font-medium text-taupe-700">
                      {item.label}:
                    </span>
                    <span className="text-sm text-taupe-500">
                      {item.detail}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
