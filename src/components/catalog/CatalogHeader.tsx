"use client";

import { ChevronDown, Grid2x2, Grid3x3, List } from "lucide-react";
import { useState } from "react";
import {
  SORT_OPTIONS,
  type SortOption,
  type ViewMode,
} from "@/hooks/useCatalog";

interface CatalogHeaderProps {
  title: string;
  resultCount: number;
  isLoading: boolean;
  disabled?: boolean;
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export default function CatalogHeader({
  title,
  resultCount,
  isLoading,
  disabled = false,
  currentSort,
  onSortChange,
  viewMode,
  onViewModeChange,
}: CatalogHeaderProps) {
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-sm font-semibold text-text-heading">
        {isLoading ? (
          <span className="inline-block h-4 w-32 bg-gray-200 rounded animate-pulse" />
        ) : (
          <>
            {title}
            <span className="ml-2 text-xs font-normal text-text-muted">
              ({resultCount})
            </span>
          </>
        )}
      </h2>

      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            type="button"
            onClick={() => setSortOpen((o) => !o)}
            disabled={disabled}
            className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text-heading disabled:opacity-40 transition-colors border border-gray-200 rounded-md px-3 py-1.5 bg-white"
          >
            <span>Sort by</span>
            <ChevronDown size={12} />
          </button>

          {sortOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setSortOpen(false)}
                aria-hidden="true"
              />
              <div className="absolute right-0 top-full mt-1 w-48 rounded-md bg-white shadow-lg border border-gray-100 py-1 z-20">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onSortChange(opt.value);
                      setSortOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs transition-colors hover:bg-gray-50 ${
                      currentSort === opt.value
                        ? "text-brand-deep font-semibold"
                        : "text-text-muted"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
          <button
            type="button"
            aria-label="Grid view"
            aria-pressed={viewMode === "grid"}
            onClick={() => onViewModeChange("grid")}
            className={`p-1.5 transition-colors ${
              viewMode === "grid"
                ? "bg-slate-100 text-brand-deep"
                : "text-text-muted hover:text-text-heading bg-white"
            }`}
          >
            <Grid3x3 size={14} />
          </button>
          <button
            type="button"
            aria-label="Grid view"
            aria-pressed={viewMode === "grid"}
            onClick={() => onViewModeChange("grid")}
            className={`p-1.5 transition-colors ${
              viewMode === "grid"
                ? "bg-slate-100 text-brand-deep"
                : "text-text-muted hover:text-text-heading bg-white"
            }`}
          >
            <Grid2x2 size={14} />
          </button>
          <button
            type="button"
            aria-label="List view"
            aria-pressed={viewMode === "list"}
            onClick={() => onViewModeChange("list")}
            className={`p-1.5 transition-colors border-l border-gray-200 ${
              viewMode === "list"
                ? "bg-slate-100 text-brand-deep"
                : "text-text-muted hover:text-text-heading bg-white"
            }`}
          >
            <List size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
