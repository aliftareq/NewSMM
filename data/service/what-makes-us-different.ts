import type { WhatMakesUsDifferentContent } from "@/types/service/what-makes-us-different"

const ASSET_BASE = "/images/landing/what-makes-us-different"

/** Figma 25734:4211 — Why Choose Us for Instagram Growth? / our-platforms comparison */
export const serviceWhatMakesUsDifferentData: WhatMakesUsDifferentContent = {
  badgeLabel: "Different",
  headingPrimary: "Why Choose Us for ",
  headingAccent: "Instagram Growth?",
  description:
    "Get Instagram followers with a simple ordering process, flexible packages, and reliable service designed to support your social media growth.",
  positiveSideLabel: "What we Do",
  negativeSideLabel: "What they Don't",
  positiveBrandLinePrimary: "SOCIAL ",
  positiveBrandLineAccent: "PANEL",
  negativeHeaderTitle: "Typical other sites",
  features: [
    "Follower options by goal",
    "No Instagram password needed",
    "Delivery starts within hours",
    "Drop support included",
    "Order support if something stalls",
    "Help when an order needs review",
    "Secure checkout options",
  ],
  assets: {
    checkIconSrc: `${ASSET_BASE}/check-icon.svg`,
    crossIconSrc: `${ASSET_BASE}/cross-icon.svg`,
    logomarkSrc: "/images/landing/navbar/logomark.svg",
  },
}
