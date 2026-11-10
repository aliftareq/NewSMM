import { newOrderContent } from "@/data/service/new-order"
import type { OrderExtrasContent } from "@/types/service/order-extras"

const IMG = "/images/service/order-extras"

export const orderExtrasContent: OrderExtrasContent = {
  assets: {
    profileThumb: `${IMG}/profile-thumb.png`,
    growthRunner: `${IMG}/growth-runner.svg`,
    sliderHintArrow: `${IMG}/slider-hint-arrow.svg`,
  },
  profile: {
    sectionTitle: "Your Profile",
    profileTypeLabel: "Instagram profile",
    packageLabelTemplate: "{quantity} Followers",
  },
  growth: {
    sectionTitle: "The Growth Slider",
    sectionSubtitle:
      "Drag to increase your overall viral potential. We automatically calculate the perfect ratio.",
    growthLevelLabel: "Growth level",
    totalExtrasLabel: "Total Extras",
    sliderHint: "Slide to scale all extras",
    storyViewsLabel: "Story Views",
    defaultLevel: 1,
    levels: [
      {
        level: 1,
        shortLabel: "LV 1",
        title: "Starter Spark",
        extraPrice: 0,
        storyViewsLabel: "500",
      },
      {
        level: 2,
        shortLabel: "LV 2",
        title: "Subtle Boost",
        extraPrice: 2.99,
        storyViewsLabel: "1k",
      },
      {
        level: 3,
        shortLabel: "LV 3",
        title: "Momentum",
        extraPrice: 4.99,
        storyViewsLabel: "2.5k",
      },
      {
        level: 4,
        shortLabel: "LV 4",
        title: "Viral Push",
        extraPrice: 7.99,
        storyViewsLabel: "5k",
      },
      {
        level: 5,
        shortLabel: "LV 5",
        title: "Max Reach",
        extraPrice: 11.99,
        storyViewsLabel: "10k",
      },
    ],
  },
  summary: {
    heading: newOrderContent.summary.heading,
    unitLabel: newOrderContent.summary.unitLabel,
    platformLabel: newOrderContent.summary.platformLabel,
    totalLabel: newOrderContent.summary.totalLabel,
    ctaLabel: "Check for free",
    secureCheckoutLabel: newOrderContent.summary.secureCheckoutLabel,
    clientsCount: newOrderContent.summary.clientsCount,
    clientsLabel: newOrderContent.summary.clientsLabel,
    ratingValue: newOrderContent.summary.ratingValue,
    reviewsLabel: newOrderContent.summary.reviewsLabel,
    starCount: newOrderContent.summary.starCount,
    paymentLogos: newOrderContent.summary.paymentLogos,
    trustBadges: newOrderContent.summary.trustBadges,
  },
}
