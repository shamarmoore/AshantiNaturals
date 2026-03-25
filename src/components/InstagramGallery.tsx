"use client";

const galleryItems = [
  {
    id: 1,
    span: "row-span-2",
    pattern: (
      <svg viewBox="0 0 200 300" className="w-full h-full">
        <rect width="200" height="300" fill="#d6cfc7" />
        <circle cx="100" cy="100" r="50" fill="#a8967a" opacity="0.5" />
        <path d="M100 50 C60 80, 60 140, 100 160 C140 140, 140 80, 100 50" fill="#8b7355" opacity="0.6" />
        <path d="M70 160c5 20 10 60 10 80M90 150c3 25 5 70 5 90M110 150c-3 25-5 70-5 90M130 160c-5 20-10 60-10 80" stroke="#6b5c45" strokeWidth="2" fill="none" />
        <text x="100" y="275" textAnchor="middle" fill="#78716c" fontSize="10" fontFamily="serif">Body Wave Bliss</text>
      </svg>
    ),
  },
  {
    id: 2,
    span: "",
    pattern: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <rect width="200" height="200" fill="#e7ddd4" />
        <circle cx="100" cy="80" r="40" fill="#b5a48c" opacity="0.4" />
        {[60, 75, 90, 105, 120, 135].map((x) => (
          <path key={x} d={`M${x} 80 C${x + 8} 100, ${x - 8} 130, ${x} 180`} stroke="#8b7355" strokeWidth="1.5" fill="none" />
        ))}
        <text x="100" y="190" textAnchor="middle" fill="#78716c" fontSize="10" fontFamily="serif">Sleek & Straight</text>
      </svg>
    ),
  },
  {
    id: 3,
    span: "",
    pattern: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <rect width="200" height="200" fill="#ddd5cb" />
        <ellipse cx="100" cy="70" rx="50" ry="40" fill="#a8967a" opacity="0.3" />
        {[65, 80, 95, 110, 125].map((x) => (
          <path key={x} d={`M${x} 70 C${x + 10} 90, ${x - 10} 110, ${x + 5} 130 C${x + 12} 150, ${x - 8} 170, ${x} 185`} stroke="#7c6a52" strokeWidth="2" fill="none" />
        ))}
        <text x="100" y="195" textAnchor="middle" fill="#78716c" fontSize="10" fontFamily="serif">Deep Wave Magic</text>
      </svg>
    ),
  },
  {
    id: 4,
    span: "row-span-2",
    pattern: (
      <svg viewBox="0 0 200 300" className="w-full h-full">
        <rect width="200" height="300" fill="#e0d6cc" />
        <circle cx="100" cy="90" r="55" fill="#b5a48c" opacity="0.3" />
        {[60, 72, 84, 96, 108, 120, 132].map((x) => (
          <path key={x} d={`M${x} 80 C${x + 5} 90, ${x - 5} 100, ${x} 110 C${x + 5} 120, ${x - 5} 130, ${x} 140 C${x + 5} 150, ${x - 5} 160, ${x} 170 C${x + 5} 180, ${x - 5} 190, ${x} 200 C${x + 5} 210, ${x - 5} 220, ${x} 240`} stroke="#6b5c45" strokeWidth="1.5" fill="none" />
        ))}
        <text x="100" y="275" textAnchor="middle" fill="#78716c" fontSize="10" fontFamily="serif">Curly Queen</text>
      </svg>
    ),
  },
  {
    id: 5,
    span: "",
    pattern: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <rect width="200" height="200" fill="#d9d0c5" />
        <rect x="40" y="30" width="120" height="140" rx="60" fill="#c4b5a0" opacity="0.3" />
        <path d="M60 60 C65 50, 80 45, 100 45 C120 45, 135 50, 140 60" stroke="#8b7355" strokeWidth="2" fill="none" />
        {[70, 85, 100, 115, 130].map((x) => (
          <path key={x} d={`M${x} 60c-3 15 3 30-3 45c3 15-3 30 3 45c-3 15 3 30-3 45`} stroke="#7c6a52" strokeWidth="1.5" fill="none" />
        ))}
        <text x="100" y="190" textAnchor="middle" fill="#78716c" fontSize="10" fontFamily="serif">Wig Life</text>
      </svg>
    ),
  },
  {
    id: 6,
    span: "",
    pattern: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <rect width="200" height="200" fill="#e4dbd1" />
        <path d="M40 100c30-30 60-30 120 0" stroke="#b5a48c" strokeWidth="20" fill="none" opacity="0.3" strokeLinecap="round" />
        {[55, 70, 85, 100, 115, 130, 145].map((x, i) => (
          <path key={x} d={`M${x} ${65 + (i % 2) * 10}c${i % 2 ? 6 : -6} 20, ${i % 2 ? -6 : 6} 40, 0 60c${i % 2 ? 6 : -6} 20, ${i % 2 ? -6 : 6} 40, 0 60`} stroke="#8b7355" strokeWidth="1.5" fill="none" />
        ))}
        <text x="100" y="190" textAnchor="middle" fill="#78716c" fontSize="10" fontFamily="serif">Water Wave Vibes</text>
      </svg>
    ),
  },
  {
    id: 7,
    span: "",
    pattern: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <rect width="200" height="200" fill="#dcd3c8" />
        <circle cx="70" cy="90" r="30" fill="#c4b5a0" opacity="0.3" />
        <circle cx="130" cy="90" r="30" fill="#c4b5a0" opacity="0.3" />
        <path d="M50 120c10 30 30 50 50 60M150 120c-10 30-30 50-50 60" stroke="#7c6a52" strokeWidth="2" fill="none" />
        {[60, 75, 90, 105, 120, 135].map((x) => (
          <line key={x} x1={x} y1="60" x2={x} y2="180" stroke="#a8967a" strokeWidth="1" opacity="0.4" />
        ))}
        <text x="100" y="195" textAnchor="middle" fill="#78716c" fontSize="10" fontFamily="serif">Bundle Deals</text>
      </svg>
    ),
  },
  {
    id: 8,
    span: "",
    pattern: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <rect width="200" height="200" fill="#e1d9cf" />
        <path d="M60 40h80v120a40 40 0 01-80 0z" fill="#c4b5a0" opacity="0.2" />
        <path d="M70 40c0-10 15-20 30-20s30 10 30 20" stroke="#8b7355" strokeWidth="2" fill="none" />
        {[75, 87, 100, 113, 125].map((x) => (
          <path key={x} d={`M${x} 40 C${x + 3} 70, ${x - 3} 100, ${x + 3} 130 C${x} 150, ${x - 2} 160, ${x} 170`} stroke="#7c6a52" strokeWidth="1.5" fill="none" />
        ))}
        <text x="100" y="195" textAnchor="middle" fill="#78716c" fontSize="10" fontFamily="serif">Style Inspo</text>
      </svg>
    ),
  },
];

export default function InstagramGallery() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-taupe-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-taupe-900 mb-3">
            #LuméiraHairCo
          </h2>
          <p className="text-taupe-600 max-w-2xl mx-auto">
            See how our community styles their Luméira hair
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] sm:auto-rows-[200px] gap-3 sm:gap-4">
          {galleryItems.map((item) => (
            <a
              key={item.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative rounded-xl overflow-hidden ${item.span}`}
            >
              <div className="w-full h-full">
                {item.pattern}
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-taupe-900/0 group-hover:bg-taupe-900/60 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white">
                  {/* Instagram icon */}
                  <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  <p className="text-sm font-medium">Follow @lumeirahairco</p>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-taupe-400 text-white font-semibold rounded-full
                       hover:bg-taupe-500 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            Follow Us on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
