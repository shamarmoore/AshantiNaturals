import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";

export const dynamic = "force-dynamic";

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="aspect-square relative bg-stone-100 rounded-lg overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-stone-400">
              <svg
                className="w-24 h-24"
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

        {/* Details */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
              {product.category}
            </span>
            {product.length && (
              <span className="text-sm text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
                {product.length}
              </span>
            )}
            {product.color && (
              <span className="text-sm text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
                {product.color}
              </span>
            )}
          </div>

          <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">
            {product.name}
          </h1>

          <p className="text-3xl font-semibold text-stone-900 mb-6">
            ${product.price.toFixed(2)}
          </p>

          <div className="prose prose-stone mb-8">
            <p className="text-stone-600 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>

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
              <AddToCartButton product={product} />
            </div>
          ) : (
            <p className="text-red-600 text-sm font-medium">
              Currently Sold Out
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
