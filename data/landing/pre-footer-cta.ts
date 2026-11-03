import type { PreFooterCtaContent } from "@/types/landing/pre-footer-cta"

const CTA_IMG = "/images/landing/pre-footer-cta"

export const preFooterCtaContent: PreFooterCtaContent = {
  headingLines: ["Ready to Grow Your Social", "Media Presence?"],
  headingLineTwoPrefix: " ",
  descriptionLines: [
    "Explore social media services for followers, likes, views, and more. Choose your preferred platform ",
    "and find the right services to support your online goals.",
  ],
  primaryButton: { label: "Start your order", href: "/order" },
  secondaryButton: { label: "Browse all Services", href: "/services" },
  assets: {
    glowWide: `${CTA_IMG}/7ab2b.svg`,
    glowCenter: `${CTA_IMG}/f95a3.svg`,
    curveDark: `${CTA_IMG}/d6e67.svg`,
    curveBlend1: `${CTA_IMG}/46f42.svg`,
    curveBlend2: `${CTA_IMG}/cb958.svg`,
    curveBlend3: `${CTA_IMG}/c3a61.svg`,
    curveBlend4: `${CTA_IMG}/205c9.svg`,
    curveBlend5: `${CTA_IMG}/35beb.svg`,
  },
}
