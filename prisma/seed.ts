/**
 * Database seed script for Luméira Hair Co.
 * Run with: npx tsx prisma/seed.ts
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const MOCK_PRODUCTS = [
  // --- FEATURED PRODUCTS (6) ---
  {
    name: "Brazilian Body Wave Lace Front Wig",
    description:
      "Our bestselling lace front wig features premium Brazilian body wave hair with a natural-looking hairline. Pre-plucked with baby hairs for an undetectable finish. The Swiss lace front allows for versatile parting and styling. Heat-safe up to 350Â°F.",
    price: 289.99,
    image: "https://placehold.co/600x600/f5f5f4/a8a29e?text=Hair+Product",
    images: "[]",
    category: "Wig",
    texture: "Body Wave",
    method: "Lace Front",
    length: '20"',
    color: "Natural Black",
    inStock: true,
    featured: true,
  },
  {
    name: "Deep Wave Glueless Wig",
    description:
      "Step into effortless beauty with our glueless deep wave wig. Features adjustable straps and combs for a secure fit without adhesive. Made with 100% virgin human hair that can be colored and styled.",
    price: 259.99,
    image: "https://placehold.co/600x600/f5f5f4/a8a29e?text=Hair+Product",
    images: "[]",
    category: "Wig",
    texture: "Deep Wave",
    method: "Glueless Wig",
    length: '22"',
    color: "Natural Black",
    inStock: true,
    featured: true,
  },
  {
    name: "Straight Sew-In Bundle Deal (3 Bundles)",
    description:
      "Get the perfect sew-in with our straight bundle deal. Includes 3 bundles of silky straight Brazilian hair. Minimal shedding, tangle-free, and lasts up to 12 months with proper care.",
    price: 199.99,
    image: "https://placehold.co/600x600/f5f5f4/a8a29e?text=Hair+Product",
    images: "[]",
    category: "Bundle",
    texture: "Straight",
    method: "Sew-In",
    length: '18"',
    color: "Natural Black",
    inStock: true,
    featured: true,
  },
  {
    name: "Kinky Curly Clip-In Extensions",
    description:
      "Blend seamlessly with your natural curls using our kinky curly clip-in extensions. Set includes 7 pieces with secure clips. Made from 100% Remy human hair.",
    price: 149.99,
    image: "https://placehold.co/600x600/f5f5f4/a8a29e?text=Hair+Product",
    images: "[]",
    category: "Bundle",
    texture: "Kinky Curly",
    method: "Clip-In",
    length: '16"',
    color: "Natural Black",
    inStock: true,
    featured: true,
  },
  {
    name: "Loose Wave Full Lace Wig",
    description:
      "Experience ultimate versatility with our full lace loose wave wig. Can be styled in any direction â€” high ponytails, updos, or worn down. Features a 360Â° natural hairline.",
    price: 349.99,
    image: "https://placehold.co/600x600/f5f5f4/a8a29e?text=Hair+Product",
    images: "[]",
    category: "Wig",
    texture: "Loose Wave",
    method: "Full Lace",
    length: '24"',
    color: "Dark Brown",
    inStock: true,
    featured: true,
  },
  {
    name: "Water Wave Lace Front Wig",
    description:
      "Stunning water wave lace front wig. Features a natural S-curl pattern that mimics wet and wavy styling. Pre-styled and ready to wear. 150% density.",
    price: 279.99,
    image: "https://placehold.co/600x600/f5f5f4/a8a29e?text=Hair+Product",
    images: "[]",
    category: "Wig",
    texture: "Water Wave",
    method: "Lace Front",
    length: '26"',
    color: "Natural Black",
    inStock: true,
    featured: true,
  },
  // --- BUNDLES (6) ---
  {
    name: "Body Wave Tape-In Extensions (20 Pieces)",
    description:
      "Tape-in extensions with a flat, seamless application. Each pack includes 20 pieces of premium body wave hair. Medical-grade adhesive.",
    price: 179.99,
    image: "https://placehold.co/600x600/f5f5f4/a8a29e?text=Hair+Product",
    images: "[]",
    category: "Bundle",
    texture: "Body Wave",
    method: "Tape-In",
    length: '18"',
    color: "Medium Brown",
    inStock: true,
    featured: false,
  },
  // --- CLOSURES (3) ---
  {
    name: "HD Lace Closure - Straight (5x5)",
    description:
      "Achieve a flawless finish with our HD lace closure. The thin, transparent lace melts into any skin tone. Perfect to pair with straight bundles.",
    price: 89.99,
    image: "https://placehold.co/600x600/f5f5f4/a8a29e?text=Hair+Product",
    images: "[]",
    category: "Closure",
    texture: "Straight",
    method: "Sew-In",
    length: '14"',
    color: "Natural Black",
    inStock: true,
    featured: false,
  },
  {
    name: "Body Wave HD Lace Closure (4x4)",
    description:
      "4x4 HD lace closure with body wave texture. Invisible knots and pre-plucked hairline for a natural melt.",
    price: 79.99,
    image: "https://placehold.co/600x600/f5f5f4/a8a29e?text=Hair+Product",
    images: "[]",
    category: "Closure",
    texture: "Body Wave",
    method: "Sew-In",
    length: '16"',
    color: "Natural Black",
    inStock: true,
    featured: false,
  },
  {
    name: "Deep Wave Closure (5x5)",
    description:
      "Premium deep wave 5x5 closure with HD invisible lace. Free parting for versatile styling.",
    price: 94.99,
    image: "https://placehold.co/600x600/f5f5f4/a8a29e?text=Hair+Product",
    images: "[]",
    category: "Closure",
    texture: "Deep Wave",
    method: "Sew-In",
    length: '18"',
    color: "Natural Black",
    inStock: true,
    featured: false,
  },
  // --- FRONTALS (3) ---
  {
    name: "Deep Wave Frontal (13x4)",
    description:
      "13x4 deep wave frontal with ear-to-ear coverage and a natural-looking hairline. Swiss lace with pre-plucked baby hairs.",
    price: 119.99,
    image: "https://placehold.co/600x600/f5f5f4/a8a29e?text=Hair+Product",
    images: "[]",
    category: "Frontal",
    texture: "Deep Wave",
    method: "Sew-In",
    length: '16"',
    color: "Natural Black",
    inStock: true,
    featured: false,
  },
  {
    name: "HD Lace Frontal - Body Wave (13x6)",
    description:
      "Premium 13x6 HD lace frontal with extra parting space. Thin, undetectable lace. Pairs with body wave bundles.",
    price: 139.99,
    image: "https://placehold.co/600x600/f5f5f4/a8a29e?text=Hair+Product",
    images: "[]",
    category: "Frontal",
    texture: "Body Wave",
    method: "Sew-In",
    length: '18"',
    color: "Natural Black",
    inStock: true,
    featured: false,
  },
  {
    name: "Straight Frontal (13x4)",
    description:
      "Silky straight 13x4 frontal with Swiss lace. Bleached knots for an undetectable finish. Pairs with straight bundles.",
    price: 109.99,
    image: "https://placehold.co/600x600/f5f5f4/a8a29e?text=Hair+Product",
    images: "[]",
    category: "Frontal",
    texture: "Straight",
    method: "Sew-In",
    length: '16"',
    color: "Natural Black",
    inStock: true,
    featured: false,
  },
  // --- MORE WIGS (6) ---
  {
    name: "Straight Glueless Bob Wig",
    description:
      "Chic straight bob wig perfect for an everyday look. Glueless design with adjustable straps. Pre-cut and pre-styled.",
    price: 189.99,
    image: "https://placehold.co/600x600/f5f5f4/a8a29e?text=Hair+Product",
    images: "[]",
    category: "Wig",
    texture: "Straight",
    method: "Glueless Wig",
    length: '12"',
    color: "Natural Black",
    inStock: true,
    featured: false,
  },
  {
    name: "Kinky Curly Full Lace Wig",
    description:
      "Embrace your natural beauty with our kinky curly full lace wig. Mimics 4A/4B curl patterns. Full lace construction for any styling.",
    price: 329.99,
    image: "https://placehold.co/600x600/f5f5f4/a8a29e?text=Hair+Product",
    images: "[]",
    category: "Wig",
    texture: "Kinky Curly",
    method: "Full Lace",
    length: '18"',
    color: "Natural Black",
    inStock: true,
    featured: false,
  },
  {
    name: "Burgundy Deep Wave Lace Front Wig",
    description:
      "Bold burgundy deep wave wig with natural-looking lace front. Pre-plucked hairline with baby hairs. 180% density.",
    price: 299.99,
    image: "https://placehold.co/600x600/f5f5f4/a8a29e?text=Hair+Product",
    images: "[]",
    category: "Wig",
    texture: "Deep Wave",
    method: "Lace Front",
    length: '22"',
    color: "Burgundy",
    inStock: true,
    featured: false,
  },
  {
    name: "Body Wave Closure Wig (4x4)",
    description:
      "Closure wig with body wave texture. Beginner-friendly with adjustable straps and combs. No adhesive needed.",
    price: 219.99,
    image: "https://placehold.co/600x600/f5f5f4/a8a29e?text=Hair+Product",
    images: "[]",
    category: "Wig",
    texture: "Body Wave",
    method: "Glueless Wig",
    length: '16"',
    color: "Natural Black",
    inStock: true,
    featured: false,
  },
  {
    name: "Ombre Loose Wave Lace Front Wig",
    description:
      "Stunning ombre effect from dark roots to honey tips. Swiss lace front with pre-plucked natural hairline.",
    price: 309.99,
    image: "https://placehold.co/600x600/f5f5f4/a8a29e?text=Hair+Product",
    images: "[]",
    category: "Wig",
    texture: "Loose Wave",
    method: "Lace Front",
    length: '28"',
    color: "Ombre",
    inStock: true,
    featured: false,
  },
  {
    name: "#613 Blonde Straight Lace Front Wig",
    description:
      "#613 blonde straight wig. Premium virgin hair that can be toned to any shade. Pre-plucked hairline.",
    price: 319.99,
    image: "https://placehold.co/600x600/f5f5f4/a8a29e?text=Hair+Product",
    images: "[]",
    category: "Wig",
    texture: "Straight",
    method: "Lace Front",
    length: '24"',
    color: "#613 Blonde",
    inStock: false,
    featured: false,
  },
  // --- MORE BUNDLES (6) ---
  {
    name: "Honey Blonde Body Wave Bundle Deal",
    description:
      "#27 honey blonde body wave bundles. Pre-colored with a rich, warm tone. Includes 3 bundles of premium Brazilian hair.",
    price: 229.99,
    image: "https://placehold.co/600x600/f5f5f4/a8a29e?text=Hair+Product",
    images: "[]",
    category: "Bundle",
    texture: "Body Wave",
    method: "Sew-In",
    length: '20"',
    color: "Honey Blonde",
    inStock: true,
    featured: false,
  },
  {
    name: "Loose Wave Clip-In Extensions",
    description:
      "Add volume and length instantly with our loose wave clip-in set. Includes 7 weft pieces that clip in securely.",
    price: 139.99,
    image: "https://placehold.co/600x600/f5f5f4/a8a29e?text=Hair+Product",
    images: "[]",
    category: "Bundle",
    texture: "Loose Wave",
    method: "Clip-In",
    length: '20"',
    color: "Dark Brown",
    inStock: true,
    featured: false,
  },
  {
    name: "Straight Tape-In Extensions (40 Pieces)",
    description:
      "Premium straight tape-in extensions. Double pack of 40 pieces for maximum coverage. Reusable up to 3 times.",
    price: 249.99,
    image: "https://placehold.co/600x600/f5f5f4/a8a29e?text=Hair+Product",
    images: "[]",
    category: "Bundle",
    texture: "Straight",
    method: "Tape-In",
    length: '22"',
    color: "Natural Black",
    inStock: true,
    featured: false,
  },
  {
    name: "Water Wave Sew-In Bundle Deal",
    description:
      "3 bundles of water wave hair for a stunning sew-in. Tangle-free hair that holds beautifully in any weather.",
    price: 209.99,
    image: "https://placehold.co/600x600/f5f5f4/a8a29e?text=Hair+Product",
    images: "[]",
    category: "Bundle",
    texture: "Water Wave",
    method: "Sew-In",
    length: '24"',
    color: "Natural Black",
    inStock: true,
    featured: false,
  },
  {
    name: "Deep Wave Clip-In Extensions Set",
    description:
      "7-piece clip-in set with deep wave texture. Blends naturally with type 2Câ€“3B hair. Double-weft for extra volume.",
    price: 159.99,
    image: "https://placehold.co/600x600/f5f5f4/a8a29e?text=Hair+Product",
    images: "[]",
    category: "Bundle",
    texture: "Deep Wave",
    method: "Clip-In",
    length: '18"',
    color: "Natural Black",
    inStock: true,
    featured: false,
  },
  {
    name: "Kinky Curly Tape-In Extensions (20 Pieces)",
    description:
      "Tape-in extensions with kinky curly texture for a natural look. 20 pieces per pack with medical-grade adhesive.",
    price: 189.99,
    image: "https://placehold.co/600x600/f5f5f4/a8a29e?text=Hair+Product",
    images: "[]",
    category: "Bundle",
    texture: "Kinky Curly",
    method: "Tape-In",
    length: '16"',
    color: "Natural Black",
    inStock: true,
    featured: false,
  },
  // --- REMAINING (additional variety products to hit 30) ---
  {
    name: "Water Wave Full Lace Wig",
    description:
      "Full lace wig with gorgeous water wave pattern. 360Â° parting freedom. 150% density with baby hairs all around.",
    price: 369.99,
    image: "https://placehold.co/600x600/f5f5f4/a8a29e?text=Hair+Product",
    images: "[]",
    category: "Wig",
    texture: "Water Wave",
    method: "Full Lace",
    length: '22"',
    color: "Natural Black",
    inStock: true,
    featured: false,
  },
  {
    name: "Kinky Curly Glueless Wig",
    description:
      "Wear-and-go kinky curly wig with no glue needed. Pre-cut lace, adjustable cap, and 200% density for maximum volume.",
    price: 275.99,
    image: "https://placehold.co/600x600/f5f5f4/a8a29e?text=Hair+Product",
    images: "[]",
    category: "Wig",
    texture: "Kinky Curly",
    method: "Glueless Wig",
    length: '20"',
    color: "Natural Black",
    inStock: true,
    featured: false,
  },
  {
    name: "Water Wave Tape-In Extensions (20 Pieces)",
    description:
      "Seamless tape-in extensions with water wave texture. Lies flat and blends naturally. 20 individual pieces.",
    price: 169.99,
    image: "https://placehold.co/600x600/f5f5f4/a8a29e?text=Hair+Product",
    images: "[]",
    category: "Bundle",
    texture: "Water Wave",
    method: "Tape-In",
    length: '20"',
    color: "Dark Brown",
    inStock: true,
    featured: false,
  },
  {
    name: "Loose Wave Glueless Wig",
    description:
      "Effortless loose wave glueless wig. Pre-cut lace with elastic band for a snug, secure fit. Beginner-friendly.",
    price: 245.99,
    image: "https://placehold.co/600x600/f5f5f4/a8a29e?text=Hair+Product",
    images: "[]",
    category: "Wig",
    texture: "Loose Wave",
    method: "Glueless Wig",
    length: '18"',
    color: "Natural Black",
    inStock: true,
    featured: false,
  },
  {
    name: "Water Wave Closure (4x4)",
    description:
      "4x4 water wave closure with HD invisible lace. Seamless blend with bundles for a natural finish.",
    price: 84.99,
    image: "https://placehold.co/600x600/f5f5f4/a8a29e?text=Hair+Product",
    images: "[]",
    category: "Closure",
    texture: "Water Wave",
    method: "Sew-In",
    length: '14"',
    color: "Natural Black",
    inStock: true,
    featured: false,
  },
];

async function main() {
  console.log("ðŸŒ± Seeding Luméira Hair Co. database...");

  // Clear existing products
  await prisma.product.deleteMany();

  // Seed products
  for (const product of MOCK_PRODUCTS) {
    await prisma.product.create({ data: product });
  }

  console.log(`âœ… Seeded ${MOCK_PRODUCTS.length} products`);
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

