import { prisma } from "@/lib/prisma";
import ProductCarousel from "@/components/ProductCarousel";
import ShopByMethod from "@/components/ShopByMethod";
import TextureMatchTool from "@/components/TextureMatchTool";
import ReviewsSection from "@/components/ReviewsSection";
import InstagramGallery from "@/components/InstagramGallery";
import NewsletterSignup from "@/components/NewsletterSignup";

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
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-600/20 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36 text-center">
          <p className="text-amber-400 uppercase tracking-[0.25em] text-sm font-medium mb-4">
            Premium Human Hair
          </p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            Ashanti Naturals
          </h1>
          <p className="text-lg md:text-xl text-stone-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover luxurious, handcrafted wigs designed for the modern woman.
            Effortless beauty that moves with you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/shop?featured=true"
              className="inline-block bg-amber-600 text-white px-8 py-3.5 rounded-md text-lg font-medium hover:bg-amber-500 transition-colors shadow-lg shadow-amber-600/25"
            >
              Shop Bestsellers
            </a>
            <a
              href="#texture-match"
              className="inline-block border border-white/30 text-white px-8 py-3.5 rounded-md text-lg font-medium hover:bg-white/10 transition-colors"
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
        <section className="bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-2 text-center">
              Bestselling Styles
            </h2>
            <p className="text-stone-500 text-center mb-10 max-w-xl mx-auto">
              Our most-loved wigs, handpicked by customers just like you.
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
      <section className="bg-stone-50">
        <ReviewsSection />
      </section>

      {/* Instagram Gallery */}
      <section className="bg-amber-50/10">
        <InstagramGallery />
      </section>

      {/* Newsletter Signup */}
      <section className="bg-stone-50">
        <NewsletterSignup />
      </section>

      {/* Trust Section */}
      <section className="bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-amber-600 mb-3">
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
              <h3 className="font-medium text-stone-800 mb-1">
                100% Human Hair
              </h3>
              <p className="text-sm text-stone-500">
                Premium quality human hair for the most natural look and feel.
              </p>
            </div>
            <div>
              <div className="text-amber-600 mb-3">
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
              <h3 className="font-medium text-stone-800 mb-1">
                Fast Shipping
              </h3>
              <p className="text-sm text-stone-500">
                Quick and secure delivery right to your door.
              </p>
            </div>
            <div>
              <div className="text-amber-600 mb-3">
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
              <h3 className="font-medium text-stone-800 mb-1">
                Secure Payment
              </h3>
              <p className="text-sm text-stone-500">
                Safe and encrypted checkout powered by Stripe.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
