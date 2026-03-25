// Central SEO configuration — update SITE_URL when deploying to production
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lumeirahairco.com";
export const SITE_NAME = "Luméira Hair Co.";

export const SEO_DEFAULTS = {
  title: "Luméira Hair Co. | Premium 100% Human Hair Wigs, Extensions & Bundles",
  description:
    "Shop premium 100% human hair wigs, lace front wigs, hair extensions, bundles, closures & frontals at Luméira Hair Co. Natural-looking styles in every texture — straight, body wave, deep wave, kinky curly & more. Island-wide delivery across Jamaica.",
  keywords: [
    "human hair wigs",
    "human hair extensions",
    "human hair bundles",
    "lace front wigs",
    "full lace wigs",
    "100% human hair",
    "natural hair wigs",
    "body wave hair",
    "deep wave hair",
    "kinky curly hair",
    "straight hair bundles",
    "hair closures",
    "hair frontals",
    "clip in extensions",
    "tape in extensions",
    "sew in hair",
    "glueless wigs",
    "premium human hair",
    "Afrocentric hair",
    "buy human hair online",
    "human hair wigs for black women",
    "virgin human hair",
  ],
};

/**
 * Renders a JSON-LD script tag for structured data.
 * Use in server components to inject schema markup.
 */
export function jsonLdScript(data: Record<string, unknown>): string {
  return JSON.stringify(data);
}

/** Organization schema for the brand — reuse on homepage and about page */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    description: SEO_DEFAULTS.description,
    sameAs: [
      // Add social media URLs here when available
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: "English",
    },
  };
}

/** WebSite schema with SearchAction for sitelinks search box */
export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/shop?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** BreadcrumbList schema */
export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Product schema for individual product pages */
export function productSchema(product: {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  id: string;
  texture?: string;
  method?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image.startsWith("http")
      ? product.image
      : `${SITE_URL}${product.image}`,
    url: `${SITE_URL}/products/${product.id}`,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    category: product.category,
    material: "100% Human Hair",
    ...(product.texture && { additionalProperty: [
      { "@type": "PropertyValue", name: "Texture", value: product.texture },
      ...(product.method ? [{ "@type": "PropertyValue", name: "Method", value: product.method }] : []),
    ]}),
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/products/${product.id}`,
      priceCurrency: "USD",
      price: product.price.toFixed(2),
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
      },
    },
  };
}

/** FAQPage schema */
export function faqPageSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/** ItemList schema for shop/collection pages */
export function itemListSchema(
  products: { name: string; url: string; image: string; price: number }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: product.url,
    })),
  };
}
