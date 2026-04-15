import { useMemo } from "react";
import type { PriceRange } from "@/constants/products";
import { useProductCategories } from "@/hooks/queries/useProductCategories";
import { useProducts } from "@/hooks/queries/useProducts";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  INITIAL_VISIBLE,
  LOAD_MORE_COUNT,
  SORT_OPTIONS,
  type SortOption,
  selectSelectedCategory,
  selectSelectedPriceRange,
  selectSortBy,
  selectViewMode,
  selectVisibleCount,
  setCategory,
  setPriceRange,
  setSortBy,
  setViewMode,
  showMore,
  type ViewMode,
} from "@/store/catalogSlice";
import type { Product } from "@/types/product";

export type { SortOption, ViewMode };
export { SORT_OPTIONS, INITIAL_VISIBLE, LOAD_MORE_COUNT };

export interface UseCatalogReturn {
  categories: string[];
  visible: Product[];
  totalFiltered: number;

  sectionTitle: string;
  hasMore: boolean;
  errorMessage: string;

  isLoadingProducts: boolean;
  isLoadingCategories: boolean;
  isError: boolean;

  selectedCategory: string;
  selectedPriceRange: PriceRange;
  sortBy: SortOption;
  viewMode: ViewMode;

  onCategoryChange: (cat: string) => void;
  onPriceRangeChange: (range: PriceRange) => void;
  onSortChange: (sort: SortOption) => void;
  onViewModeChange: (mode: ViewMode) => void;
  onShowMore: () => void;
  onRetry: () => void;
}

function buildSectionTitle(category: string): string {
  if (category === "All") return "All Products";
  return `${category
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")} Products`;
}

function applyFiltersAndSort(
  products: Product[],
  selectedCategory: string,
  selectedPriceRange: PriceRange,
  sortBy: SortOption,
): Product[] {
  let list = [...products];

  if (selectedCategory !== "All") {
    list = list.filter((p) => p.category === selectedCategory);
  }

  if (selectedPriceRange.min !== 0 || selectedPriceRange.max !== Infinity) {
    list = list.filter(
      (p) =>
        p.price >= selectedPriceRange.min && p.price <= selectedPriceRange.max,
    );
  }

  switch (sortBy) {
    case "price-asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      list.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }

  return list;
}

export function useCatalog(): UseCatalogReturn {
  const dispatch = useAppDispatch();

  const {
    data: products,
    isLoading: isLoadingProducts,
    isError,
    error,
    refetch,
  } = useProducts();

  const { data: rawCategories, isLoading: isLoadingCategories } =
    useProductCategories();

  const selectedCategory = useAppSelector(selectSelectedCategory);
  const selectedPriceRange = useAppSelector(selectSelectedPriceRange);
  const sortBy = useAppSelector(selectSortBy);
  const viewMode = useAppSelector(selectViewMode);
  const visibleCount = useAppSelector(selectVisibleCount);

  const filtered = useMemo<Product[]>(
    () =>
      applyFiltersAndSort(
        products ?? [],
        selectedCategory,
        selectedPriceRange,
        sortBy,
      ),
    [products, selectedCategory, selectedPriceRange, sortBy],
  );

  return {
    categories: rawCategories ?? [],
    visible: filtered.slice(0, visibleCount),
    totalFiltered: filtered.length,

    sectionTitle: buildSectionTitle(selectedCategory),
    hasMore: visibleCount < filtered.length,
    errorMessage:
      error instanceof Error
        ? error.message
        : "An unexpected error occurred. Please try again.",

    isLoadingProducts,
    isLoadingCategories,
    isError,

    selectedCategory,
    selectedPriceRange,
    sortBy,
    viewMode,

    onCategoryChange(cat) {
      dispatch(setCategory(cat));
    },
    onPriceRangeChange(range) {
      dispatch(setPriceRange(range.label));
    },
    onSortChange(sort) {
      dispatch(setSortBy(sort));
    },
    onViewModeChange(mode) {
      dispatch(setViewMode(mode));
    },
    onShowMore() {
      dispatch(showMore());
    },
    onRetry() {
      refetch();
    },
  };
}
