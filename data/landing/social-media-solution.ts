import type { SocialMediaSolutionContent } from "@/types/landing/social-media-solution"

const ASSET_BASE = "/images/landing/social-media-solution"

/** Figma 25687:7689 — About “Our Social Media Solutions” */
export const aboutSocialMediaSolutionContent: SocialMediaSolutionContent = {
  badgeLabel: "All Services",
  headingLineOne: "Our Social Media ",
  headingLineTwoAccent: "Solutions",
  description:
    "Explore our range of social media marketing solutions designed to help you boost engagement, expand your reach, and build a stronger online presence across popular platforms.",
  cta: {
    label: "Browse all Services",
    href: "/services",
  },
  cards: [
    {
      id: "growth",
      title: "Social Media Growth",
      description:
        "We provide social media marketing services designed to help individuals, creators, and businesses expand their online presence.",
    },
    {
      id: "engagement",
      title: "Engagement Boosting",
      description:
        "We offer services to help improve social media engagement, including likes, views, comments, and other interactions that support your content visibility.",
    },
    {
      id: "multi-platform",
      title: "Multi-Platform Marketing",
      description:
        "We provide services across multiple social media platforms, making it easier to manage your marketing needs and choose services that match your preferred channels.",
    },
  ],
  arrowUpSrc: `${ASSET_BASE}/arrow-up.svg`,
  arrowDownSrc: `${ASSET_BASE}/arrow-down.svg`,
}
