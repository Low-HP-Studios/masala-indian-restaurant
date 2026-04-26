import type { SpiceLevel } from "@/data/menu";

export const CHILI_SPECTRUM = [
  { c: "#3f8a3a" },
  { c: "#d6a91a" },
  { c: "#e8830a" },
  { c: "#b8261a" },
] as const;

export const SPICE_LEVEL_COLOR: Record<Exclude<SpiceLevel, 0>, string> = {
  1: CHILI_SPECTRUM[0].c,
  2: CHILI_SPECTRUM[1].c,
  3: CHILI_SPECTRUM[2].c,
  4: CHILI_SPECTRUM[3].c,
};
