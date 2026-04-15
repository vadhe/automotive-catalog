export const COLORS = {
  brand: "#1a2b4a",
  brandHover: "#243860",
  accent: "#2563eb",
  accentHover: "#1d4ed8",
  overlay: "rgba(42, 63, 111, 0.75)",
  badgeNew: "#16a34a",
  badgeEco: "#059669",
  badgePremium: "#7c3aed",
} as const;

export type ColorKey = keyof typeof COLORS;
