export type LandingCustomerReview = {
  id: string
  quote: string
  authorName: string
  authorRole: string
  avatarSrc: string
  avatarAlt: string
  rating: number
}

export type LandingCustomerReviewsContent = {
  badgeLabel: string
  headingPrimary: string
  headingAccent: string
  description: string
  quoteIconSrc: string
  starIconSrc: string
  decorationSrc: string
  reviews: LandingCustomerReview[]
}
