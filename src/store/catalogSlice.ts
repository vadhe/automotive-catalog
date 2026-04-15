import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { PRICE_RANGES, type PriceRange } from "@/constants/products";
import type { RootState } from "@/store";

export type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc";
export type ViewMode = "grid" | "list";

export const INITIAL_VISIBLE = 9;
export const LOAD_MORE_COUNT = 6;

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A – Z" },
];

interface CatalogState {
  selectedCategory: string;
  priceRangeLabel: string;
  sortBy: SortOption;
  viewMode: ViewMode;
  visibleCount: number;
}

const initialState: CatalogState = {
  selectedCategory: "All",
  priceRangeLabel: PRICE_RANGES[0].label,
  sortBy: "featured",
  viewMode: "grid",
  visibleCount: INITIAL_VISIBLE,
};

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
      state.visibleCount = INITIAL_VISIBLE;
    },
    setPriceRange(state, action: PayloadAction<string>) {
      state.priceRangeLabel = action.payload;
      state.visibleCount = INITIAL_VISIBLE;
    },
    setSortBy(state, action: PayloadAction<SortOption>) {
      state.sortBy = action.payload;
    },
    setViewMode(state, action: PayloadAction<ViewMode>) {
      state.viewMode = action.payload;
    },
    showMore(state) {
      state.visibleCount += LOAD_MORE_COUNT;
    },
    resetFilters(state) {
      state.selectedCategory = initialState.selectedCategory;
      state.priceRangeLabel = initialState.priceRangeLabel;
      state.sortBy = initialState.sortBy;
      state.visibleCount = INITIAL_VISIBLE;
    },
  },
});

export const {
  setCategory,
  setPriceRange,
  setSortBy,
  setViewMode,
  showMore,
  resetFilters,
} = catalogSlice.actions;

export default catalogSlice.reducer;

export const selectSelectedCategory = (state: RootState) =>
  state.catalog.selectedCategory;

export const selectSelectedPriceRange = (state: RootState): PriceRange =>
  PRICE_RANGES.find((r) => r.label === state.catalog.priceRangeLabel) ??
  PRICE_RANGES[0];

export const selectSortBy = (state: RootState) => state.catalog.sortBy;

export const selectViewMode = (state: RootState) => state.catalog.viewMode;

export const selectVisibleCount = (state: RootState) =>
  state.catalog.visibleCount;
