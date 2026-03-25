import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, faqPageSchema, breadcrumbSchema } from "@/lib/seo";
import { FAQ_DATA } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "FAQ — Human Hair Wigs & Extensions Care, Shipping & Returns",
  description:
    "Get answers to frequently asked questions about human hair wigs, extensions, and bundles. Learn about ordering, shipping, returns, and how to care for your 100% human hair products at Luméira Hair Co.",
  keywords: [
    "human hair wig FAQ",
    "human hair care tips",
    "how to wash human hair wig",
    "human hair extensions care",
    "wig shipping",
    "wig return policy",
    "heat styling human hair",
    "how long do human hair wigs last",
  ],
  alternates: {
    canonical: `${SITE_URL}/faq`,
  },
  openGraph: {
    type: "website",
    title: `FAQ — Human Hair Care & Shopping | ${SITE_NAME}`,
    description:
      "Answers to common questions about ordering, shipping, returns, and caring for premium human hair wigs and extensions.",
    url: `${SITE_URL}/faq`,
    siteName: SITE_NAME,
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const faqJsonLd = faqPageSchema(FAQ_DATA);
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "FAQ", url: `${SITE_URL}/faq` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
