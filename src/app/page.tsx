import { prisma } from "@/lib/prisma";
import ProductCarousel from "@/components/ProductCarousel";
import ShopByMethod from "@/components/ShopByMethod";
import TextureMatchTool from "@/components/TextureMatchTool";
import ReviewsSection from "@/components/ReviewsSection";
import InstagramGallery from "@/components/InstagramGallery";
import NewsletterSignup from "@/components/NewsletterSignup";
import Link from "next/link";
import { organizationSchema, webSiteSchema } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featuredProducts = await prisma.product.findMany({
    where: { featured: true, inStock: true },
    take: 8,
    orderBy: { createdAt: "desc" },
  });

  const carouselProducts = featuredProducts.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    image: p.image,
    category: p.category,
    texture: p.texture,
  }));

  return (
    <div>
      {/* JSON-LD Structured Data: Organization + WebSite */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema()) }}
      />

      {/* Hero Banner */}
      <section className="relative bg-taupe-400 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blush-200/20 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36 text-center">
          <p className="text-white/70 uppercase tracking-[0.3em] text-xs font-medium mb-6">
            Premium 100% Human Hair
          </p>
          <h1 className="text-5xl md:text-7xl font-logo font-light mb-4 leading-tight tracking-[0.2em] uppercase">
            Luméira
          </h1>
          <p className="text-blush-200 uppercase tracking-[0.25em] text-sm mb-8">
            Hair Co.
          </p>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover luxurious, handcrafted human hair wigs and extensions designed for the modern woman.
            Premium lace front wigs, bundles, closures & frontals — effortless beauty that moves with you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/shop?featured=true"
              className="inline-block bg-blush-200 text-taupe-900 px-8 py-3.5 rounded-sm text-lg font-medium hover:bg-blush-300 transition-colors shadow-lg"
            >
              Shop Bestsellers
            </a>
            <a
              href="#texture-match"
              className="inline-block border border-white/40 text-white px-8 py-3.5 rounded-sm text-lg font-medium hover:bg-white/10 transition-colors"
            >
              Find Your Texture
            </a>
          </div>
        </div>
      </section>

      {/* Shop by Method */}
      <section className="bg-white">
        <ShopByMethod />
      </section>

      {/* Featured / Bestselling Products Carousel */}
      {carouselProducts.length > 0 && (
        <section className="bg-taupe-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h2 className="text-3xl md:text-4xl font-heading font-semibold text-taupe-800 mb-2 text-center">
              Bestselling Human Hair Styles
            </h2>
            <div className="w-16 h-0.5 bg-blush-200 mx-auto mt-2 mb-4" />
            <p className="text-taupe-500 text-center mb-10 max-w-xl mx-auto">
              Our most-loved human hair wigs and extensions, handpicked by customers just like you.
            </p>
            <ProductCarousel products={carouselProducts} />
          </div>
        </section>
      )}

      {/* Find Your Texture Match */}
      <section id="texture-match" className="bg-white">
        <TextureMatchTool />
      </section>

      {/* Customer Reviews */}
      <section className="bg-taupe-50">
        <ReviewsSection />
      </section>

      {/* SEO Content Section — keyword-rich informational content */}
      <section className="bg-white border-t border-taupe-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-heading font-semibold text-taupe-800 mb-2 text-center">
              Why Choose 100% Human Hair?
            </h2>
            <div className="w-16 h-0.5 bg-blush-200 mx-auto mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-taupe-600 leading-relaxed">
              <div>
                <h3 className="font-semibold text-taupe-800 mb-2">Natural Look & Feel</h3>
                <p className="text-sm">
                  Our premium human hair wigs and extensions are crafted from 100% virgin human hair,
                  giving you the most natural look and feel possible. Unlike synthetic alternatives,
                  human hair moves, bounces, and shines just like your own natural hair. Whether you
                  choose a lace front wig, full lace wig, or clip-in extensions, the quality speaks
                  for itself.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-taupe-800 mb-2">Versatile Styling Options</h3>
                <p className="text-sm">
                  Style your human hair pieces with heat tools, dye them, curl them, or straighten
                  them — just like natural hair. Our collection includes every texture from silky
                  straight and body wave to deep wave, loose wave, water wave, and kinky curly.
                  Find the perfect match for your natural hair texture or try something new.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-taupe-800 mb-2">Multiple Application Methods</h3>
                <p className="text-sm">
                  From sew-in bundles and tape-in extensions to clip-in pieces and glueless wigs,
                  we offer human hair products for every application method. Our lace front wigs and
                  full lace wigs provide the most natural-looking hairline, while closures and
                  frontals give you a seamless blend with your own hair.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-taupe-800 mb-2">Long-Lasting Investment</h3>
                <p className="text-sm">
                  With proper care, premium human hair products last 12–18 months or longer — making
                  them a smart investment in your beauty routine. Our hair is ethically sourced,
                  double-drawn, and cuticle-aligned for minimal tangling and maximum longevity.
                  Shop with confidence knowing you&apos;re getting the best human hair on the market.
                </p>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link
                href="/shop"
                className="inline-block bg-taupe-400 text-white px-8 py-3 rounded-sm font-medium hover:bg-taupe-500 transition-colors"
              >
                Shop All Human Hair Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Texture — internal linking for SEO */}
      <section className="bg-taupe-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-taupe-800 mb-2 text-center">
            Shop Human Hair by Texture
          </h2>
          <div className="w-16 h-0.5 bg-blush-200 mx-auto mt-2 mb-4" />
          <p className="text-taupe-500 text-center mb-10 max-w-xl mx-auto">
            Find the perfect texture to match your natural hair or create a whole new look.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "Straight", slug: "straight", desc: "Sleek & polished" },
              { name: "Body Wave", slug: "body-wave", desc: "Soft S-pattern" },
              { name: "Deep Wave", slug: "deep-wave", desc: "Defined curls" },
              { name: "Loose Wave", slug: "loose-wave", desc: "Beachy waves" },
              { name: "Water Wave", slug: "water-wave", desc: "Wet & wavy" },
              { name: "Kinky Curly", slug: "kinky-curly", desc: "Natural coils" },
            ].map((texture) => (
              <Link
                key={texture.slug}
                href={`/shop?texture=${texture.slug}`}
                className="group text-center p-4 bg-white rounded-xl border border-taupe-200 hover:border-blush-300 hover:shadow-md transition-all"
              >
                <h3 className="font-medium text-taupe-800 group-hover:text-blush-700 transition-colors">
                  {texture.name}
                </h3>
                <p className="text-xs text-taupe-500 mt-1">{texture.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category — more internal linking */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-taupe-800 mb-2 text-center">
            Shop by Category
          </h2>
          <div className="w-16 h-0.5 bg-blush-200 mx-auto mt-2 mb-4" />
          <p className="text-taupe-500 text-center mb-10 max-w-xl mx-auto">
            Everything you need for your perfect human hair installation.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: "Human Hair Wigs",
                slug: "Wig",
                desc: "Lace front, full lace & glueless wigs in every texture and length.",
              },
              {
                name: "Hair Bundles",
                slug: "Bundle",
                desc: "Premium virgin human hair bundles for sew-in, bonding & braiding.",
              },
              {
                name: "Closures",
                slug: "Closure",
                desc: "Lace closures for a natural-looking part and seamless blend.",
              },
              {
                name: "Frontals",
                slug: "Frontal",
                desc: "Ear-to-ear lace frontals for a flawless, natural hairline.",
              },
            ].map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop?category=${cat.slug}`}
                className="group p-6 bg-taupe-50 rounded-xl border border-taupe-200 hover:border-blush-300 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-taupe-800 group-hover:text-blush-700 transition-colors mb-2">
                  {cat.name}
                </h3>
                <p className="text-sm text-taupe-500">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Gallery */}
      <section className="bg-blush-50/30">
        <InstagramGallery />
      </section>

      {/* Newsletter Signup */}
      <section className="bg-taupe-50">
        <NewsletterSignup />
      </section>

      {/* Trust Section */}
      <section className="bg-white border-t border-taupe-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-blush-600 mb-3">
                <svg
                  className="w-10 h-10 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-taupe-800 mb-1">
                100% Human Hair
              </h3>
              <p className="text-sm text-taupe-500">
                Premium quality virgin human hair for the most natural look and feel.
              </p>
            </div>
            <div>
              <div className="text-blush-600 mb-3">
                <svg
                  className="w-10 h-10 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-taupe-800 mb-1">
                Free Shipping Over $100
              </h3>
              <p className="text-sm text-taupe-500">
                Quick and secure delivery on all human hair orders, free over $100.
              </p>
            </div>
            <div>
              <div className="text-blush-600 mb-3">
                <svg
                  className="w-10 h-10 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-taupe-800 mb-1">
                Secure Payment
              </h3>
              <p className="text-sm text-taupe-500">
                Safe and encrypted checkout powered by Stripe.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
