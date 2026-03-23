"use client";

import { useState, useMemo } from "react";

export interface FilterState {
  textures: string[];
  methods: string[];
  categories: string[];
  lengths: string[];
  colors: string[];
  priceRange: { min: number; max: number } | null;
}

export interface FilterSidebarProps {
  products: Array<{
    texture: string;
    method: string;
    category: string;
    length: string;
    color: string;
    price: number;
  }>;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

interface FilterSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function FilterSection({
  title,
  isOpen,
  onToggle,
  children,
}: FilterSectionProps) {
  return (
    <div className="border-b border-stone-200 py-3">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium text-stone-800">{title}</span>
        <svg
          className={`h-4 w-4 text-stone-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "mt-2 max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function CheckboxGroup({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
}) {
  const toggle = (value: string) => {
    onChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
    );
  };

  return (
    <div className="space-y-1.5 max-h-48 overflow-y-auto">
      {options.map((option) => (
        <label
          key={option}
          className="flex cursor-pointer items-center gap-2 text-sm text-stone-600 hover:text-stone-800 transition-colors"
        >
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => toggle(option)}
            className="h-4 w-4 rounded border-stone-300 text-amber-600 focus:ring-amber-500"
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}

export default function FilterSidebar({
  products,
  filters,
  onFilterChange,
}: FilterSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    textures: true,
    methods: true,
    categories: true,
    lengths: false,
    colors: false,
    price: false,
  });

  // Extract unique options from products
  const options = useMemo(() => {
    const unique = (arr: string[]) =>
      [...new Set(arr)].filter(Boolean).sort();
    return {
      textures: unique(products.map((p) => p.texture)),
      methods: unique(products.map((p) => p.method)),
      categories: unique(products.map((p) => p.category)),
      lengths: unique(products.map((p) => p.length)),
      colors: unique(products.map((p) => p.color)),
      priceMin: products.length
        ? Math.floor(Math.min(...products.map((p) => p.price)))
        : 0,
      priceMax: products.length
        ? Math.ceil(Math.max(...products.map((p) => p.price)))
        : 1000,
    };
  }, [products]);

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const updateFilter = (key: keyof FilterState, value: FilterState[keyof FilterState]) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const hasActiveFilters =
    filters.textures.length > 0 ||
    filters.methods.length > 0 ||
    filters.categories.length > 0 ||
    filters.lengths.length > 0 ||
    filters.colors.length > 0 ||
    filters.priceRange !== null;

  const clearAll = () => {
    onFilterChange({
      textures: [],
      methods: [],
      categories: [],
      lengths: [],
      colors: [],
      priceRange: null,
    });
  };

  const filterContent = (
    <div className="space-y-0">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-200">
        <h3 className="text-base font-semibold text-stone-800">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-amber-700 hover:text-amber-800 font-medium transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Texture */}
      {options.textures.length > 0 && (
        <FilterSection
          title="Texture"
          isOpen={openSections.textures}
          onToggle={() => toggleSection("textures")}
        >
          <CheckboxGroup
            options={options.textures}
            selected={filters.textures}
            onChange={(v) => updateFilter("textures", v)}
          />
        </FilterSection>
      )}

      {/* Method */}
      {options.methods.length > 0 && (
        <FilterSection
          title="Method"
          isOpen={openSections.methods}
          onToggle={() => toggleSection("methods")}
        >
          <CheckboxGroup
            options={options.methods}
            selected={filters.methods}
            onChange={(v) => updateFilter("methods", v)}
          />
        </FilterSection>
      )}

      {/* Category */}
      {options.categories.length > 0 && (
        <FilterSection
          title="Category"
          isOpen={openSections.categories}
          onToggle={() => toggleSection("categories")}
        >
          <CheckboxGroup
            options={options.categories}
            selected={filters.categories}
            onChange={(v) => updateFilter("categories", v)}
          />
        </FilterSection>
      )}

      {/* Length */}
      {options.lengths.length > 0 && (
        <FilterSection
          title="Length"
          isOpen={openSections.lengths}
          onToggle={() => toggleSection("lengths")}
        >
          <CheckboxGroup
            options={options.lengths}
            selected={filters.lengths}
            onChange={(v) => updateFilter("lengths", v)}
          />
        </FilterSection>
      )}

      {/* Color */}
      {options.colors.length > 0 && (
        <FilterSection
          title="Color"
          isOpen={openSections.colors}
          onToggle={() => toggleSection("colors")}
        >
          <CheckboxGroup
            options={options.colors}
            selected={filters.colors}
            onChange={(v) => updateFilter("colors", v)}
          />
        </FilterSection>
      )}

      {/* Price Range */}
      <FilterSection
        title="Price Range"
        isOpen={openSections.price}
        onToggle={() => toggleSection("price")}
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label className="text-xs text-stone-500">Min</label>
              <input
                type="number"
                min={options.priceMin}
                max={options.priceMax}
                placeholder={`$${options.priceMin}`}
                value={filters.priceRange?.min ?? ""}
                onChange={(e) => {
                  const min = e.target.value ? Number(e.target.value) : options.priceMin;
                  updateFilter("priceRange", {
                    min,
                    max: filters.priceRange?.max ?? options.priceMax,
                  });
                }}
                className="w-full rounded-md border border-stone-300 px-2 py-1.5 text-sm text-stone-800 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
            <span className="mt-4 text-stone-400">—</span>
            <div className="flex-1">
              <label className="text-xs text-stone-500">Max</label>
              <input
                type="number"
                min={options.priceMin}
                max={options.priceMax}
                placeholder={`$${options.priceMax}`}
                value={filters.priceRange?.max ?? ""}
                onChange={(e) => {
                  const max = e.target.value ? Number(e.target.value) : options.priceMax;
                  updateFilter("priceRange", {
                    min: filters.priceRange?.min ?? options.priceMin,
                    max,
                  });
                }}
                className="w-full rounded-md border border-stone-300 px-2 py-1.5 text-sm text-stone-800 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>
          {filters.priceRange && (
            <button
              onClick={() => updateFilter("priceRange", null)}
              className="text-xs text-amber-700 hover:text-amber-800 transition-colors"
            >
              Clear price range
            </button>
          )}
        </div>
      </FilterSection>
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="flex items-center gap-2 rounded-md border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors lg:hidden"
        aria-label="Open filters"
      >
        <svg
          className="h-4 w-4"
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
        {hasActiveFilters && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-xs text-white">
            {filters.textures.length +
              filters.methods.length +
              filters.categories.length +
              filters.lengths.length +
              filters.colors.length +
              (filters.priceRange ? 1 : 0)}
          </span>
        )}
      </button>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile slide-in panel */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-stone-200 px-4 py-3">
            <span className="text-base font-semibold text-stone-800">
              Filters
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className="rounded-md p-1 text-stone-400 hover:text-stone-600 transition-colors"
              aria-label="Close filters"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-3">{filterContent}</div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block sticky top-20 w-64 flex-shrink-0">
        <div className="rounded-lg border border-stone-200 bg-white p-4">
          {filterContent}
        </div>
      </aside>
    </>
  );
}
