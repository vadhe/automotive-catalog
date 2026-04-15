"use client";

import { SlidersHorizontal } from "lucide-react";
import { PRICE_RANGES, type PriceRange } from "@/constants/products";

interface FiltersSidebarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedPriceRange: PriceRange;
  onPriceRangeChange: (range: PriceRange) => void;
  isLoadingCategories?: boolean;
}

function CategorySkeleton() {
  return (
    <ul className="space-y-2">
      {Array.from({ length: 5 }, (_, i) => `skeleton-filter-${i}`).map((id) => (
        <li key={id}>
          <div className="h-3.5 bg-gray-200 rounded animate-pulse w-3/4" />
        </li>
      ))}
    </ul>
  );
}

export default function FiltersSidebar({
  categories,
  selectedCategory,
  onCategoryChange,
  selectedPriceRange,
  onPriceRangeChange,
  isLoadingCategories = false,
}: FiltersSidebarProps) {
  const allCategories = ["All", ...categories];

  return (
    <aside className="w-44 shrink-0 pt-0.5">
      <div className="flex items-center gap-2 mb-5">
        <SlidersHorizontal
          size={14}
          strokeWidth={2}
          className="text-text-heading"
        />
        <span className="text-sm font-semibold text-text-heading">Filters</span>
      </div>

      <section className="mb-7">
        <p className="text-[10px] font-bold tracking-widest text-text-muted uppercase mb-3">
          Category
        </p>

        {isLoadingCategories ? (
          <CategorySkeleton />
        ) : (
          <ul className="space-y-2">
            {allCategories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => onCategoryChange(cat)}
                    className={`text-sm w-full text-left capitalize transition-colors duration-150 ${
                      isActive
                        ? "text-brand-deep font-semibold"
                        : "text-text-muted hover:text-brand-deep font-normal"
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section>
        <p className="text-[10px] font-bold tracking-widest text-text-muted uppercase mb-3">
          Price Range
        </p>
        <ul className="space-y-2.5">
          {PRICE_RANGES.map((range) => {
            const isSelected = selectedPriceRange.label === range.label;
            const inputId = `price-range-${range.label
              .replace(/\s+/g, "-")
              .toLowerCase()}`;

            return (
              <li key={range.label} className="flex items-center gap-2.5">
                <div className="relative w-3.5 h-3.5 shrink-0">
                  <input
                    type="checkbox"
                    id={inputId}
                    checked={isSelected}
                    onChange={() => onPriceRangeChange(range)}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  />
                  <div
                    aria-hidden="true"
                    className={`w-3.5 h-3.5 flex items-center justify-center rounded-sm border pointer-events-none transition-colors duration-150 ${
                      isSelected
                        ? "bg-brand-accent border-brand-accent"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {isSelected && (
                      <svg
                        viewBox="0 0 10 8"
                        fill="none"
                        className="w-2.5 h-2"
                        aria-hidden="true"
                      >
                        <path
                          d="M1 4L3.5 6.5L9 1"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </div>

                <label
                  htmlFor={inputId}
                  className={`text-xs cursor-pointer transition-colors duration-150 ${
                    isSelected
                      ? "text-text-heading font-medium"
                      : "text-text-muted hover:text-text-heading"
                  }`}
                >
                  {range.label}
                </label>
              </li>
            );
          })}
        </ul>
      </section>
    </aside>
  );
}
