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
    {
      id: "customer-support",
      title: "24/7 Customer Support",
      description:
        "Our support team is available around the clock to assist you with questions, order-related concerns, and service information, helping you get the guidance you need whenever you need it.",
    },
    {
      id: "easy-ordering",
      title: "Easy Ordering Process",
      description:
        "Getting started is simple and straightforward. Choose your preferred service, select the options that suit your needs, provide the required details, and place your order in just a few easy steps.",
    },
  ],
  arrowUpSrc: `${ASSET_BASE}/arrow-up.svg`,
  arrowDownSrc: `${ASSET_BASE}/arrow-down.svg`,
}
