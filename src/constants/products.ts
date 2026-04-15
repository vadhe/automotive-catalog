export type PriceRange = {
  label: string;
  min: number;
  max: number;
};

export const PRICE_RANGES: PriceRange[] = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under 1M", min: 0, max: 1_000_000 },
  { label: "1M - 5M", min: 1_000_000, max: 5_000_000 },
  { label: "Above 5M", min: 5_000_000, max: Infinity },
];
