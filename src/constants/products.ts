export type PriceRange = {
  label: string;
  min: number;
  max: number;
};

export const PRICE_RANGES: PriceRange[] = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "Over $100", min: 100, max: Infinity },
];
