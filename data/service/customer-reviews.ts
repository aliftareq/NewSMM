import type { ServiceCustomerReviewsContent } from "@/types/service/customer-reviews"

const ASSET_BASE = "/images/landing/customer-reviews"

const baseReview = {
  quote:
    "The team was friendly, professional, and made every visit comfortable. My treatment was smooth, and I'm extremely happy with my healthier, brighter smile.",
  authorName: "Sunny Broze",
  avatarSrc: `${ASSET_BASE}/reviewer-avatar.png`,
  avatarAlt: "Sunny Broze",
  rating: 5,
} as const

/** Figma 25734:4357 — Instagram Followers Buyer Reviews */
export const serviceCustomerReviewsData: ServiceCustomerReviewsContent = {
  badgeLabel: "Customers reviews",
  headingPrimary: "Instagram Followers ",
  headingAccent: "Buyer Reviews",
  description:
    "Read what customers share about their experience buying Instagram followers and growing their social media presence with our service.",
  quoteIconSrc: `${ASSET_BASE}/quote-icon.svg`,
  starIconSrc: `${ASSET_BASE}/star.svg`,
  decorationSrc: `${ASSET_BASE}/torus-decoration.svg`,
  reviews: [
    { id: "service-review-1", ...baseReview, authorRole: "Profetional Model" },
    { id: "service-review-2", ...baseReview, authorRole: "Digital Markter" },
    { id: "service-review-3", ...baseReview, authorRole: "Digital Markter" },
    { id: "service-review-4", ...baseReview, authorRole: "Digital Markter" },
    { id: "service-review-5", ...baseReview, authorRole: "Profetional Model" },
  ],
}
