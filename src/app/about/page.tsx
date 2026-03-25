import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SITE_NAME, organizationSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Luméira Hair Co. — Premium Human Hair Brand",
  description:
    "Learn about Luméira Hair Co. — our story, mission, and commitment to providing premium 100% human hair wigs, extensions, and bundles. Luxury hair products delivered across Jamaica.",
  keywords: [
    "Luméira Hair Co",
    "premium human hair brand",
    "luxury hair company",
    "about Luméira",
    "human hair wigs brand",
    "ethical human hair sourcing",
  ],
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    type: "website",
    title: `About Us | ${SITE_NAME}`,
    description:
      "Our story, mission, and commitment to premium luxury beauty and 100% human hair products.",
    url: `${SITE_URL}/about`,
    siteName: SITE_NAME,
  },
};

export default function AboutPage() {
  const orgJsonLd = organizationSchema();
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "About Us", url: `${SITE_URL}/about` },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm text-taupe-500 mb-8">
        <Link href="/" className="hover:text-blush-700 transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-taupe-800">About Us</span>
      </nav>

      {/* Hero section */}
      <section className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-heading font-semibold text-taupe-900 mb-4">
          Our Story
        </h1>
        <div className="w-16 h-0.5 bg-blush-200 mx-auto mb-6" />
        <p className="text-lg text-taupe-600 leading-relaxed">
          Luméira Hair Co. was born from a deep passion for celebrating natural
          beauty and empowering women of all backgrounds to feel confident and
          radiant. We believe that premium hair shouldn&apos;t be a luxury — it
          should be accessible to everyone who seeks quality, authenticity, and
          style.
        </p>
      </section>

      {/* Mission section */}
      <section className="bg-blush-50 rounded-2xl p-8 md:p-12 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-taupe-900 mb-4">
            Our Mission
          </h2>
          <p className="text-taupe-700 leading-relaxed text-lg">
            To provide premium-quality human hair products that honour elegance,
            heritage, and modern style. We are dedicated to helping
            every customer find hair that looks natural, feels luxurious, and
            inspires confidence.
          </p>
        </div>
      </section>

      {/* Values section */}
      <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-taupe-900 text-center mb-4">
            What We Stand For
          </h2>
          <div className="w-16 h-0.5 bg-blush-200 mx-auto mb-10" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-xl border border-taupe-200 bg-white">
            <div className="w-14 h-14 bg-blush-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-7 h-7 text-blush-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-taupe-900 mb-2">
              Premium Quality
            </h3>
            <p className="text-taupe-600 text-sm leading-relaxed">
              Every product is handpicked and quality-tested to ensure it meets
              the highest standards. We use only 100% virgin human hair sourced
              ethically and crafted with care.
            </p>
          </div>

          <div className="text-center p-6 rounded-xl border border-taupe-200 bg-white">
            <div className="w-14 h-14 bg-blush-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-7 h-7 text-blush-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-taupe-900 mb-2">
              Inclusivity
            </h3>
            <p className="text-taupe-600 text-sm leading-relaxed">
              Beauty has no single definition. Our diverse range of textures,
              lengths, and styles is designed to celebrate every woman —
              regardless of her background, skin tone, or hair type.
            </p>
          </div>

          <div className="text-center p-6 rounded-xl border border-taupe-200 bg-white">
            <div className="w-14 h-14 bg-blush-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-7 h-7 text-blush-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-taupe-900 mb-2">
              Luxury & Heritage
            </h3>
            <p className="text-taupe-600 text-sm leading-relaxed">
              Our brand draws inspiration from the richness of Caribbean and
              Black beauty culture to create products that feel authentic,
              elegant, and empowering.
            </p>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="text-center bg-taupe-400 text-white rounded-2xl p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-4">
          Ready to Find Your Perfect Look?
        </h2>
        <p className="text-white/70 mb-6 max-w-xl mx-auto">
          Explore our curated collection of premium wigs, bundles, and
          extensions crafted for queens like you.
        </p>
        <Link
          href="/shop"
          className="inline-block bg-white text-taupe-800 px-8 py-3 rounded-sm font-medium hover:bg-blush-50 transition-colors"
        >
          Shop Now
        </Link>
      </section>
    </div>
  );
}
