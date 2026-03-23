"use client";

import Link from "next/link";

interface MethodCard {
  name: string;
  slug: string;
  description: string;
  icon: React.ReactNode;
}

const methods: MethodCard[] = [
  {
    name: "Sew-In",
    slug: "sew-in",
    description: "Long-lasting, natural look sewn onto braided hair",
    icon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 48c0-16 8-24 16-32s16-4 16 4-8 16-16 24-16 16-16 4z" />
        <line x1="10" y1="10" x2="54" y2="54" strokeDasharray="4 3" />
        <circle cx="32" cy="32" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Tape-In",
    slug: "tape-in",
    description: "Seamless, flat-laying extensions with adhesive strips",
    icon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="12" y="20" width="40" height="6" rx="1" />
        <rect x="12" y="38" width="40" height="6" rx="1" />
        <path d="M20 26v12M32 26v12M44 26v12" strokeDasharray="2 2" />
        <path d="M12 14c4 0 8 2 12 2s8-2 12-2 8 2 12 2M12 50c4 0 8-2 12-2s8 2 12 2 8-2 12-2" />
      </svg>
    ),
  },
  {
    name: "Clip-In",
    slug: "clip-in",
    description: "Quick, damage-free extensions you can add and remove",
    icon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 16c0 0 4 4 4 12s-4 12-4 12" />
        <path d="M28 12c0 0 4 6 4 16s-4 16-4 16" />
        <path d="M38 10c0 0 4 8 4 18s-4 18-4 18" />
        <rect x="14" y="28" width="32" height="8" rx="4" fill="currentColor" opacity="0.2" />
        <path d="M22 28v8M30 28v8M38 28v8" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: "Glueless Wig",
    slug: "glueless-wig",
    description: "Secure, comfortable wigs — no adhesive needed",
    icon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="32" cy="28" rx="18" ry="16" />
        <path d="M14 28c0 12 8 24 18 28M50 28c0 12-8 24-18 28" />
        <path d="M20 20c2-4 6-6 12-6s10 2 12 6" strokeDasharray="3 2" />
        <path d="M22 36h20" strokeWidth="1" opacity="0.5" />
        <path d="M24 40h16" strokeWidth="1" opacity="0.5" />
      </svg>
    ),
  },
  {
    name: "Lace Front",
    slug: "lace-front",
    description: "Natural hairline with versatile parting options",
    icon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 30c0-12 8-20 18-20s18 8 18 20" />
        <path d="M14 30c-2 10 2 18 4 24M50 30c2 10-2 18-4 24" />
        <path d="M18 14c4-2 8-2 14-2s10 0 14 2" strokeDasharray="2 2" opacity="0.6" />
        <line x1="32" y1="10" x2="32" y2="22" strokeDasharray="2 1" opacity="0.4" />
        <path d="M24 30c2-6 4-10 8-10s6 4 8 10" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: "Full Lace",
    slug: "full-lace",
    description: "360° styling freedom with all-over lace construction",
    icon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="32" cy="26" rx="20" ry="16" />
        <path d="M12 26c0 14 8 26 20 30M52 26c0 14-8 26-20 30" />
        <circle cx="32" cy="26" r="12" strokeDasharray="3 2" opacity="0.4" />
        <path d="M24 18l4 4M36 18l-4 4M28 32l4-4M36 32l-4-4" strokeWidth="1" opacity="0.3" />
        <circle cx="32" cy="26" r="3" fill="currentColor" opacity="0.15" />
      </svg>
    ),
  },
];

export default function ShopByMethod() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-3">
            Shop by Method
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Find the perfect installation method for your lifestyle and skill level
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {methods.map((method) => (
            <Link
              key={method.slug}
              href={`/shop?method=${method.slug}`}
              className="group flex flex-col items-center text-center p-6 bg-white rounded-xl border border-stone-200 
                         transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-amber-300 hover:bg-amber-50/50"
            >
              <div className="text-stone-600 group-hover:text-amber-700 transition-colors duration-300 mb-4">
                {method.icon}
              </div>
              <h3 className="font-serif font-semibold text-stone-900 group-hover:text-amber-800 transition-colors duration-300 mb-1">
                {method.name}
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                {method.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
