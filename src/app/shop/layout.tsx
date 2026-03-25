import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Shop Human Hair Wigs, Extensions & Bundles",
  description:
    "Browse our full collection of premium 100% human hair wigs, lace front wigs, hair extensions, bundles, closures & frontals. Filter by texture, method, length & price. Straight, body wave, deep wave, kinky curly styles available. Free shipping over $100.",
  keywords: [
    "buy human hair wigs online",
    "shop human hair extensions",
    "human hair bundles for sale",
    "lace front wigs online",
    "full lace wigs",
    "body wave bundles",
    "deep wave hair extensions",
    "kinky curly wigs",
    "straight human hair",
    "clip in human hair extensions",
    "tape in hair extensions",
    "sew in hair bundles",
    "glueless wigs",
    "hair closures",
    "hair frontals",
    "affordable human hair wigs",
  ],
  alternates: {
    canonical: `${SITE_URL}/shop`,
  },
  openGraph: {
    type: "website",
    title: `Shop Premium Human Hair | ${SITE_NAME}`,
    description:
      "Browse our full collection of premium 100% human hair wigs, extensions, bundles, closures & frontals. Every texture, every method, every length.",
    url: `${SITE_URL}/shop`,
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/images/og-shop.jpg`,
        width: 1200,
        height: 630,
        alt: "Shop Human Hair Wigs & Extensions — Luméira Hair Co.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Shop Premium Human Hair | ${SITE_NAME}`,
    description:
      "Browse our full collection of premium 100% human hair wigs, extensions, bundles & more.",
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
