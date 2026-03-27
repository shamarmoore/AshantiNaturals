import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ImageGallery from "@/components/ImageGallery";
import ProductTabs from "@/components/ProductTabs";
import AddToCartButton from "./AddToCartButton";
import { SITE_URL, SITE_NAME, productSchema, breadcrumbSchema } from "@/lib/seo";

export const dynamic = "force-dynamic";

// Generate SEO-rich metadata for each product page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  const textureName = product.texture
    ? product.texture.replace(/-/g, " ")
    : "";
  const methodName = product.method
    ? product.method.replace(/-/g, " ")
    : "";
  const lengthInfo = product.length ? ` ${product.length}"` : "";

  // Keyword-rich title: "Body Wave Lace Front Wig 20" | Luméira Hair Co."
  const title = `${product.name} — ${[textureName, methodName].filter(Boolean).join(" ")} Human Hair${lengthInfo}`;

  // Keyword-rich description targeting long-tail searches
  const description = `Shop ${product.name} — premium 100% human hair ${product.category.toLowerCase()}${textureName ? ` in ${textureName} texture` : ""}${methodName ? `, ${methodName} application` : ""}${lengthInfo ? `, ${lengthInfo} length` : ""}. ${product.description.slice(0, 120)}${product.description.length > 120 ? "..." : ""} Free shipping over $100.`;

  const imageUrl = product.image.startsWith("http")
    ? product.image
    : `${SITE_URL}${product.image}`;

  return {
    title,
    description,
    keywords: [
      product.name,
      `${textureName} human hair`,
      `${methodName} wig`,
      `human hair ${product.category.toLowerCase()}`,
      `${textureName} ${product.category.toLowerCase()}`,
      "100% human hair",
      "premium human hair",
      "buy human hair online",
      SITE_NAME,
    ].filter((k) => k.trim()),
    alternates: {
      canonical: `${SITE_URL}/products/${product.id}`,
    },
    openGraph: {
      type: "website",
      title: product.name,
      description,
      url: `${SITE_URL}/products/${product.id}`,
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: `${product.name} — ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    notFound();
  }

  const galleryImages = [
    product.image,
    ...JSON.parse(product.images || "[]"),
  ].filter(Boolean) as string[];

  const lengths = product.length ? [product.length] : [];
  const colors = product.color ? [product.color] : [];

  // Related products: same texture or category, excluding current product
  const relatedProducts = await prisma.product.findMany({
    where: {
      id: { not: product.id },
      OR: [
        ...(product.texture ? [{ texture: product.texture }] : []),
        { category: product.category },
      ],
    },
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  // JSON-LD structured data
  const productJsonLd = productSchema({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.image,
    category: product.category,
    inStock: product.inStock,
    texture: product.texture || undefined,
    method: product.method || undefined,
  });

  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Shop", url: `${SITE_URL}/shop` },
    { name: product.category, url: `${SITE_URL}/shop?category=${product.category}` },
    { name: product.name, url: `${SITE_URL}/products/${product.id}` },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm text-taupe-500 mb-8">
        <ol className="flex items-center" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link href="/" className="hover:text-blush-700 transition-colors" itemProp="item">
              <span itemProp="name">Home</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          <span className="mx-2">/</span>
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link href="/shop" className="hover:text-blush-700 transition-colors" itemProp="item">
              <span itemProp="name">Shop</span>
            </Link>
            <meta itemProp="position" content="2" />
          </li>
          <span className="mx-2">/</span>
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <span className="text-taupe-800" itemProp="name">{product.name}</span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </nav>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <ImageGallery images={galleryImages} />

        {/* Product Info */}
        <div>
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-sm text-blush-700 bg-blush-50 px-3 py-1 rounded-full">
              {product.category}
            </span>
            {product.texture && (
              <span className="text-sm text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
                {product.texture}
              </span>
            )}
            {product.method && (
              <span className="text-sm text-sky-700 bg-sky-50 px-3 py-1 rounded-full">
                {product.method}
              </span>
            )}
            {product.length && (
              <span className="text-sm text-taupe-500 bg-taupe-100 px-3 py-1 rounded-full">
                {product.length}
              </span>
            )}
            {product.color && (
              <span className="text-sm text-taupe-500 bg-taupe-100 px-3 py-1 rounded-full">
                {product.color}
              </span>
            )}
          </div>

          <h1 className="text-3xl font-heading font-semibold text-taupe-900 mb-2">
            {product.name}
          </h1>

          <p className="text-3xl font-semibold text-taupe-900 mb-6">
            ${product.price.toFixed(2)}
          </p>

          {/* Short description */}
          <p className="text-taupe-600 leading-relaxed mb-6 line-clamp-3">
            {product.description}
          </p>

          {product.inStock ? (
            <div>
              <p className="text-green-600 text-sm mb-4 flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                In Stock
              </p>
              <AddToCartButton
                product={product}
                lengths={lengths}
                colors={colors}
              />
            </div>
          ) : (
            <p className={`text-sm font-medium ${["wig", "lace front", "full lace"].includes(product.category.toLowerCase()) ? "text-blush-700" : "text-red-600"}`}>
              {["wig", "lace front", "full lace"].includes(product.category.toLowerCase()) ? "Coming Soon" : "Currently Sold Out"}
            </p>
          )}
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-16">
        <ProductTabs description={product.description} />
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-heading font-semibold text-taupe-900 mb-6">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((related) => (
              <Link
                key={related.id}
                href={`/products/${related.id}`}
                className="group block"
              >
                <div className="bg-white rounded-lg shadow-sm border border-taupe-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-square relative bg-taupe-100">
                    {related.image ? (
                      <Image
                        src={related.image}
                        alt={related.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-taupe-400">
                        <svg
                          className="w-12 h-12"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-medium text-taupe-800 group-hover:text-blush-700 transition-colors truncate">
                      {related.name}
                    </h3>
                    <p className="text-sm font-semibold text-taupe-900 mt-1">
                      ${related.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
