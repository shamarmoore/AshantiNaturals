"use client";

import { useState, useEffect, useMemo, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import FilterSidebar, { type FilterState } from "@/components/FilterSidebar";
import { addToCart } from "@/lib/cart";

interface Product {
  id: string;
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
  createdAt: string;
}

type SortOption =
  | "best-selling"
  | "price-asc"
  | "price-desc"
  | "newest"
  | "name";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "best-selling", label: "Best Selling" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
  { value: "name", label: "Name A-Z" },
];

const PRODUCTS_PER_PAGE = 12;

function ShopPageContent() {
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Initialize filters from URL search params
  const [filters, setFilters] = useState<FilterState>(() => ({
    textures: searchParams.get("texture")
      ? [searchParams.get("texture")!]
      : [],
    methods: searchParams.get("method") ? [searchParams.get("method")!] : [],
    categories: searchParams.get("category")
      ? [searchParams.get("category")!]
      : [],
    lengths: [],
    colors: [],
    priceRange: null,
  }));

  const [sort, setSort] = useState<SortOption>(
    () => (searchParams.get("sort") as SortOption) || "best-selling"
  );

  const searchQuery = searchParams.get("q") || "";
  const featuredOnly = searchParams.get("featured") === "true";

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load products"
        );
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Reset to page 1 when filters/sort/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sort, searchQuery, featuredOnly]);

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  // Apply filters, search, and sort
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Featured filter
    if (featuredOnly) {
      result = result.filter((p) => p.featured);
    }

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }

    // Sidebar filters
    if (filters.textures.length > 0) {
      result = result.filter((p) => filters.textures.includes(p.texture));
    }
    if (filters.methods.length > 0) {
      result = result.filter((p) => filters.methods.includes(p.method));
    }
    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }
    if (filters.lengths.length > 0) {
      result = result.filter((p) => filters.lengths.includes(p.length));
    }
    if (filters.colors.length > 0) {
      result = result.filter((p) => filters.colors.includes(p.color));
    }
    if (filters.priceRange) {
      result = result.filter(
        (p) =>
          p.price >= filters.priceRange!.min &&
          p.price <= filters.priceRange!.max
      );
    }

    // Sort
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [products, filters, sort, searchQuery, featuredOnly]);

  // Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  );
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const showingFrom =
    filteredProducts.length === 0
      ? 0
      : (currentPage - 1) * PRODUCTS_PER_PAGE + 1;
  const showingTo = Math.min(
    currentPage * PRODUCTS_PER_PAGE,
    filteredProducts.length
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="h-8 w-48 animate-pulse rounded bg-stone-200" />
            <div className="mt-2 h-4 w-64 animate-pulse rounded bg-stone-200" />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square rounded-lg bg-stone-200" />
                <div className="mt-3 h-4 w-3/4 rounded bg-stone-200" />
                <div className="mt-2 h-4 w-1/2 rounded bg-stone-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
            <p className="text-red-700">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-amber-700 px-6 py-2 text-sm font-medium text-white hover:bg-amber-800 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl">
            Shop All Products
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            Discover our premium hair extensions and wigs
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-8">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors lg:hidden"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filters
          </button>

          {/* Filter Sidebar */}
          <aside
            className={`${mobileFiltersOpen ? "block" : "hidden"} mb-6 lg:mb-0 lg:block`}
          >
            <FilterSidebar
              products={products}
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </aside>

          {/* Main Content */}
          <div>
            {/* Toolbar: sort + product count */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-stone-600">
                Showing{" "}
                <span className="font-medium text-stone-800">
                  {showingFrom}–{showingTo}
                </span>{" "}
                of{" "}
                <span className="font-medium text-stone-800">
                  {filteredProducts.length}
                </span>{" "}
                products
              </p>

              <div className="flex items-center gap-2">
                <label
                  htmlFor="sort-select"
                  className="text-sm text-stone-600"
                >
                  Sort by:
                </label>
                <select
                  id="sort-select"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm text-stone-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-stone-200 bg-white px-6 py-16 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-stone-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <h3 className="mt-4 text-base font-medium text-stone-800">
                  No products found
                </h3>
                <p className="mt-1 text-sm text-stone-500">
                  Try adjusting your filters or search terms.
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <nav
                className="mt-8 flex items-center justify-center gap-2"
                aria-label="Pagination"
              >
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.max(1, p - 1))
                  }
                  disabled={currentPage === 1}
                  className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>

                <span className="px-3 py-2 text-sm text-stone-600">
                  Page{" "}
                  <span className="font-medium text-stone-800">
                    {currentPage}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-stone-800">
                    {totalPages}
                  </span>
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-stone-200 bg-white transition-shadow hover:shadow-md"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-stone-100">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-stone-300">
            <svg
              className="h-12 w-12"
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

        {/* Sold Out overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-stone-900/60">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-stone-800">
              Sold Out
            </span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {product.category && (
            <span className="rounded-full bg-amber-600 px-2 py-0.5 text-[10px] font-medium text-white">
              {product.category}
            </span>
          )}
          {product.texture && (
            <span className="rounded-full bg-stone-700 px-2 py-0.5 text-[10px] font-medium text-white">
              {product.texture}
            </span>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-3">
        <h3 className="text-sm font-medium text-stone-800 line-clamp-2 group-hover:text-amber-700 transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 text-base font-semibold text-stone-900">
          ${product.price.toFixed(2)}
        </p>

        <div className="mt-auto pt-3">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full rounded-lg bg-amber-700 px-3 py-2 text-xs font-medium text-white hover:bg-amber-800 transition-colors disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500"
          >
            {product.inStock ? "Add to Cart" : "Sold Out"}
          </button>
        </div>
      </div>
    </Link>
  );
}

// Wrap with Suspense for useSearchParams
export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-stone-50">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-8">
              <div className="h-8 w-48 animate-pulse rounded bg-stone-200" />
              <div className="mt-2 h-4 w-64 animate-pulse rounded bg-stone-200" />
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square rounded-lg bg-stone-200" />
                  <div className="mt-3 h-4 w-3/4 rounded bg-stone-200" />
                  <div className="mt-2 h-4 w-1/2 rounded bg-stone-200" />
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <ShopPageContent />
    </Suspense>
  );
}
