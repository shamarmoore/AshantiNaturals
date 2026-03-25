/**
 * Mock product data for Luméira Hair Co.
 * Used for database seeding and as a reference dataset.
 */

export interface MockProduct {
  name: string;
  description: string;
  price: number;
  image: string;
  images: string;
  category: string;
  texture: string;
  method: string;
  length: string;
  color: string;
  inStock: boolean;
  featured: boolean;
}

export const TEXTURES = [
  "Straight",
  "Body Wave",
  "Deep Wave",
  "Loose Wave",
  "Kinky Curly",
  "Water Wave",
] as const;

export const METHODS = [
  "Sew-In",
  "Tape-In",
  "Clip-In",
  "Glueless Wig",
  "Lace Front",
  "Full Lace",
] as const;

export const CATEGORIES = [
  "Wig",
  "Bundle",
  "Closure",
  "Frontal",
  "Lace Front",
  "Full Lace",
] as const;

export const LENGTHS = [
  '10"',
  '12"',
  '14"',
  '16"',
  '18"',
  '20"',
  '22"',
  '24"',
  '26"',
  '28"',
  '30"',
] as const;

export const COLORS = [
  "Natural Black",
  "Dark Brown",
  "Medium Brown",
  "Honey Blonde",
  "Burgundy",
  "Ombre",
  "#613 Blonde",
] as const;

/** Testimonials for the reviews section */
export const TESTIMONIALS = [
  {
    name: "Aisha Johnson",
    location: "Atlanta, GA",
    rating: 5,
    text: "Absolutely love my body wave bundles! The hair is so soft and blends perfectly with my natural hair. I've gotten so many compliments.",
    product: "Brazilian Body Wave Bundle",
  },
  {
    name: "Keisha Williams",
    location: "Houston, TX",
    rating: 5,
    text: "The glueless wig is a game-changer. It's my first time wearing a wig and I can't believe how natural it looks. Installation took minutes!",
    product: "Glueless Deep Wave Wig",
  },
  {
    name: "Tamara Reed",
    location: "Brooklyn, NY",
    rating: 5,
    text: "Best closure I've ever purchased. The lace melts beautifully and the knots are perfectly bleached. Will be ordering again!",
    product: "HD Lace Closure - Straight",
  },
  {
    name: "Destiny Moore",
    location: "Chicago, IL",
    rating: 4,
    text: "Great quality hair at an amazing price. The clip-ins are so easy to install and remove. Perfect for when I want a quick style change.",
    product: "Clip-In Extensions Set",
  },
  {
    name: "Crystal Thomas",
    location: "Los Angeles, CA",
    rating: 5,
    text: "I've been buying hair for years and Luméira Hair Co. is hands down the best. The kinky curly bundles match my natural texture perfectly.",
    product: "Kinky Curly Bundle Deal",
  },
  {
    name: "Jasmine Carter",
    location: "Miami, FL",
    rating: 5,
    text: "The lace front wig looks absolutely flawless. The hairline is undetectable and I can part it anywhere. Worth every penny!",
    product: "Lace Front Body Wave Wig",
  },
];

/** Mock product dataset - 20 products across categories, textures, and methods */
export const MOCK_PRODUCTS: MockProduct[] = [
  {
    name: "Brazilian Body Wave Lace Front Wig",
    description:
      "Our bestselling lace front wig features premium Brazilian body wave hair with a natural-looking hairline. Pre-plucked with baby hairs for an undetectable finish. The Swiss lace front allows for versatile parting and styling. Heat-safe up to 350°F.",
    price: 289.99,
    image: "/images/placeholder-wig-1.svg",
    images: '[]',
    category: "Lace Front",
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
      "Step into effortless beauty with our glueless deep wave wig. Features adjustable straps and combs for a secure fit without adhesive. Made with 100% virgin human hair that can be colored and styled. Perfect for beginners and wig veterans alike.",
    price: 259.99,
    image: "/images/placeholder-wig-2.svg",
    images: '[]',
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
      "Get the perfect sew-in with our straight bundle deal. Includes 3 bundles of silky straight Brazilian hair. Minimal shedding, tangle-free, and lasts up to 12 months with proper care. Can be flat-ironed, curled, and colored.",
    price: 199.99,
    image: "/images/placeholder-bundle-1.svg",
    images: '[]',
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
      "Blend seamlessly with your natural curls using our kinky curly clip-in extensions. Set includes 7 pieces with secure clips that won't damage your hair. Made from 100% Remy human hair for a natural look and feel.",
    price: 149.99,
    image: "/images/placeholder-clip-1.svg",
    images: '[]',
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
      "Experience ultimate versatility with our full lace loose wave wig. Can be styled in any direction — high ponytails, updos, or worn down. Features a 360° natural hairline with pre-plucked baby hairs.",
    price: 349.99,
    image: "/images/placeholder-wig-3.svg",
    images: '[]',
    category: "Full Lace",
    texture: "Loose Wave",
    method: "Full Lace",
    length: '24"',
    color: "Dark Brown",
    inStock: true,
    featured: false,
  },
  {
    name: "Body Wave Tape-In Extensions (20 Pieces)",
    description:
      "Our tape-in extensions offer a flat, seamless application that lies close to the scalp. Each pack includes 20 pieces of premium body wave hair. Medical-grade adhesive that's gentle on your natural hair.",
    price: 179.99,
    image: "/images/placeholder-tape-1.svg",
    images: '[]',
    category: "Bundle",
    texture: "Body Wave",
    method: "Tape-In",
    length: '18"',
    color: "Medium Brown",
    inStock: true,
    featured: false,
  },
  {
    name: "HD Lace Closure - Straight (5x5)",
    description:
      "Achieve a flawless finish with our HD lace closure. The thin, transparent lace melts into any skin tone for an invisible part. Perfect to pair with our straight bundles for a complete sew-in look.",
    price: 89.99,
    image: "/images/placeholder-closure-1.svg",
    images: '[]',
    category: "Closure",
    texture: "Straight",
    method: "Sew-In",
    length: '14"',
    color: "Natural Black",
    inStock: true,
    featured: false,
  },
  {
    name: "Deep Wave Frontal (13x4)",
    description:
      "Our 13x4 deep wave frontal gives you ear-to-ear coverage with a natural-looking hairline. Swiss lace with pre-plucked baby hairs. Pairs perfectly with deep wave bundles for a complete installation.",
    price: 119.99,
    image: "/images/placeholder-frontal-1.svg",
    images: '[]',
    category: "Frontal",
    texture: "Deep Wave",
    method: "Sew-In",
    length: '16"',
    color: "Natural Black",
    inStock: true,
    featured: false,
  },
  {
    name: "Water Wave Lace Front Wig",
    description:
      "Make waves with our stunning water wave lace front wig. Features a natural S-curl pattern that mimics wet and wavy styling. Pre-styled and ready to wear right out the box.",
    price: 279.99,
    image: "/images/placeholder-wig-4.svg",
    images: '[]',
    category: "Lace Front",
    texture: "Water Wave",
    method: "Lace Front",
    length: '26"',
    color: "Natural Black",
    inStock: true,
    featured: false,
  },
  {
    name: "Straight Glueless Bob Wig",
    description:
      "Chic and sophisticated, our straight bob wig is perfect for a sleek everyday look. Glueless design with adjustable straps. Pre-cut and pre-styled — just put on and go!",
    price: 189.99,
    image: "/images/placeholder-wig-5.svg",
    images: '[]',
    category: "Wig",
    texture: "Straight",
    method: "Glueless Wig",
    length: '12"',
    color: "Natural Black",
    inStock: true,
    featured: false,
  },
  {
    name: "Honey Blonde Body Wave Bundle Deal",
    description:
      "Stand out with our gorgeous #27 honey blonde body wave bundles. Pre-colored with a rich, warm tone. Includes 3 bundles of premium Brazilian hair. Low maintenance and tangle-free.",
    price: 229.99,
    image: "/images/placeholder-bundle-2.svg",
    images: '[]',
    category: "Bundle",
    texture: "Body Wave",
    method: "Sew-In",
    length: '20"',
    color: "Honey Blonde",
    inStock: true,
    featured: false,
  },
  {
    name: "Kinky Curly Full Lace Wig",
    description:
      "Embrace your natural beauty with our kinky curly full lace wig. Mimics the look and feel of natural 4A/4B curl patterns. Full lace construction allows for any styling, including updos.",
    price: 329.99,
    image: "/images/placeholder-wig-6.svg",
    images: '[]',
    category: "Full Lace",
    texture: "Kinky Curly",
    method: "Full Lace",
    length: '18"',
    color: "Natural Black",
    inStock: true,
    featured: false,
  },
  {
    name: "Loose Wave Clip-In Extensions",
    description:
      "Add volume and length instantly with our loose wave clip-in set. Includes 7 weft pieces that clip in securely. Perfect for special occasions or everyday glamour.",
    price: 139.99,
    image: "/images/placeholder-clip-2.svg",
    images: '[]',
    category: "Bundle",
    texture: "Loose Wave",
    method: "Clip-In",
    length: '20"',
    color: "Dark Brown",
    inStock: true,
    featured: false,
  },
  {
    name: "Burgundy Deep Wave Lace Front Wig",
    description:
      "Turn heads with our bold burgundy deep wave wig. Rich, vibrant color with natural-looking lace front. Pre-plucked hairline with baby hairs. A statement piece for the confident woman.",
    price: 299.99,
    image: "/images/placeholder-wig-7.svg",
    images: '[]',
    category: "Lace Front",
    texture: "Deep Wave",
    method: "Lace Front",
    length: '22"',
    color: "Burgundy",
    inStock: true,
    featured: false,
  },
  {
    name: "Straight Tape-In Extensions (40 Pieces)",
    description:
      "Our premium straight tape-in extensions for a full, voluminous look. Double pack of 40 pieces for maximum coverage. Reusable up to 3 times with proper care and reinstallation.",
    price: 249.99,
    image: "/images/placeholder-tape-2.svg",
    images: '[]',
    category: "Bundle",
    texture: "Straight",
    method: "Tape-In",
    length: '22"',
    color: "Natural Black",
    inStock: true,
    featured: false,
  },
  {
    name: "Body Wave Closure Wig (4x4)",
    description:
      "Our closure wig offers a natural-looking part with body wave texture. Beginner-friendly with adjustable straps and combs. No adhesive needed for a secure, comfortable fit all day.",
    price: 219.99,
    image: "/images/placeholder-wig-8.svg",
    images: '[]',
    category: "Wig",
    texture: "Body Wave",
    method: "Glueless Wig",
    length: '16"',
    color: "Natural Black",
    inStock: true,
    featured: false,
  },
  {
    name: "Water Wave Sew-In Bundle Deal",
    description:
      "Create a stunning sew-in with our water wave bundle deal. 3 bundles of premium, tangle-free hair. The unique wave pattern holds beautifully even in humid weather.",
    price: 209.99,
    image: "/images/placeholder-bundle-3.svg",
    images: '[]',
    category: "Bundle",
    texture: "Water Wave",
    method: "Sew-In",
    length: '24"',
    color: "Natural Black",
    inStock: true,
    featured: false,
  },
  {
    name: "Ombre Loose Wave Lace Front Wig",
    description:
      "A stunning ombre effect from dark roots to honey tips on gorgeous loose waves. This lace front wig features Swiss lace and a pre-plucked natural hairline.",
    price: 309.99,
    image: "/images/placeholder-wig-9.svg",
    images: '[]',
    category: "Lace Front",
    texture: "Loose Wave",
    method: "Lace Front",
    length: '28"',
    color: "Ombre",
    inStock: true,
    featured: false,
  },
  {
    name: "HD Lace Frontal - Body Wave (13x6)",
    description:
      "Our premium 13x6 HD lace frontal provides extra parting space for the most natural-looking installations. Thin, undetectable lace melts on all skin tones. Pairs beautifully with body wave bundles.",
    price: 139.99,
    image: "/images/placeholder-frontal-2.svg",
    images: '[]',
    category: "Frontal",
    texture: "Body Wave",
    method: "Sew-In",
    length: '18"',
    color: "Natural Black",
    inStock: true,
    featured: false,
  },
  {
    name: "#613 Blonde Straight Lace Front Wig",
    description:
      "Go platinum with our stunning #613 blonde straight wig. Premium virgin hair that can be toned to your desired shade. Lace front with pre-plucked hairline for a seamless look.",
    price: 319.99,
    image: "/images/placeholder-wig-10.svg",
    images: '[]',
    category: "Lace Front",
    texture: "Straight",
    method: "Lace Front",
    length: '24"',
    color: "#613 Blonde",
    inStock: false,
    featured: false,
  },
];
