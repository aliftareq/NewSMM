import type { LandingCustomerReviewsContent } from "@/types/landing/customer-reviews"

const ASSET_BASE = "/images/landing/customer-reviews"

const sharedReview = {
  quote:
    "The team was friendly, professional, and made every visit comfortable. My treatment was smooth, and I'm extremely happy with my healthier, brighter smile.",
  authorName: "Sunny Broze",
  authorRole: "Digital Markter",
  avatarSrc: `${ASSET_BASE}/reviewer-avatar.png`,
  avatarAlt: "Sunny Broze",
  rating: 5,
} as const

export const landingCustomerReviewsContent: LandingCustomerReviewsContent = {
  badgeLabel: "Customers reviews",
  headingPrimary: "What Our ",
  headingAccent: "Customers Say",
  description:
    "Discover customer experiences and feedback on our social media services, order process, and overall service quality.",
  quoteIconSrc: `${ASSET_BASE}/quote-icon.svg`,
  starIconSrc: `${ASSET_BASE}/star.svg`,
  decorationSrc: `${ASSET_BASE}/torus-decoration.svg`,
  reviews: [
    { id: "review-1", ...sharedReview },
    { id: "review-2", ...sharedReview },
    { id: "review-3", ...sharedReview },
    { id: "review-4", ...sharedReview },
    { id: "review-5", ...sharedReview },
  ],
}
