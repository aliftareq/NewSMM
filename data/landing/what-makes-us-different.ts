import type { WhatMakesUsDifferentContent } from "@/types/landing/what-makes-us-different";

const ASSET_BASE = "/images/landing/what-makes-us-different";

export const landingWhatMakesUsDifferentContent: WhatMakesUsDifferentContent = {
  badgeLabel: "Different",
  headingPrimary: "What Makes Us ",
  headingAccent: "Different?",
  description:
    "Discover what sets us apart with tailored strategies, creative solutions, and a commitment to delivering real results for your business.",
  positiveSideLabel: "What we Do",
  negativeSideLabel: "What they Don't",
  positiveBrandLinePrimary: "SOCIAL ",
  positiveBrandLineAccent: "PANEL",
  negativeHeaderTitle: "Typical other sites",
  features: [
    "Real, active engagement",
    "All 8 major platforms",
    "No password required",
    "Delivery starts in minutes",
    "30-day refill guarantee",
    "Money-back guarantee",
    "24/7 human support",
    "Free trials to test first",
  ],
  assets: {
    checkIconSrc: `${ASSET_BASE}/check-icon.svg`,
    crossIconSrc: `${ASSET_BASE}/cross-icon.svg`,
    logomarkSrc: "/images/landing/navbar/logomark.svg",
  },
};
