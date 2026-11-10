import { serviceHeroContent } from "@/data/service/hero"
import type { NewOrderContent } from "@/types/service/new-order"

const IMG = "/images/service/new-order"
const INTRO = "/images/service/intro"

export const newOrderContent: NewOrderContent = {
  assets: {
    backArrow: `${IMG}/back-arrow.svg`,
    minusIcon: `${IMG}/minus.svg`,
    plusVerticalIcon: `${IMG}/plus-vertical.svg`,
    plusHorizontalIcon: `${IMG}/plus-horizontal.svg`,
    trendingIcon: `${IMG}/trending-icon.svg`,
    profileAvatar: `${IMG}/profile-avatar.png`,
    orderSummaryIcon: `${IMG}/order-summary-icon.svg`,
    secureCheckoutGreenIcon: `${IMG}/secure-checkout-green.svg`,
    starIcon: `${IMG}/star.svg`,
    secureBlueIcon: `${IMG}/secure-blue.svg`,
    refundIcon: `${IMG}/refund.svg`,
    supportIcon: `${IMG}/support.svg`,
    socialIconsSprite: serviceHeroContent.assets.socialIconsSprite,
    orderDividerLine: serviceHeroContent.assets.orderDividerLine,
  },
  backLabel: "Back",
  backHref: "/services",
  service: {
    title: "Followers",
    platformLabel: "Instagram",
    platformIcon: {
      kind: "sprite",
      cropClassName:
        "absolute h-[639.76%] left-[-343.53%] max-w-none top-[-48.82%] w-[787.4%]",
    },
    defaultQuantity: 100,
    defaultPrice: "$2.99",
    defaultCompareAtPrice: "$3.44",
    discountLabel: "$0.45 off",
    customersNoteRed: "96%",
    customersNoteRest: "of customers order 250+ followers",
  },
  extraOffer: {
    title: "+150 Extra Followers",
    subtitle: "33% cheaper per follower",
    priceDelta: "+$2.00",
    progressFilled: 1,
    progressTotal: 7,
  },
  profile: {
    sectionTitle: "Your Instagram Profile",
    sectionSubtitle: "Followers will be delivered to this profile",
    changeAccountLabel: "Change account",
    cancelLabel: "Cancel",
    saveLabel: "Save",
    usernamePlaceholder: "@username",
    defaultPreview: {
      displayName: "Seam RaHman",
      followersCount: 1000,
      followingCount: 82,
      avatarSrc: `${IMG}/profile-avatar.png`,
    },
  },
  summary: {
    heading: "Order Summary",
    unitLabel: "Followers",
    platformLabel: "Instagram",
    totalLabel: "Total",
    ctaLabel: "Continue to Extras",
    profileRequiredMessage:
      "Save your Instagram username before continuing to extras.",
    secureCheckoutLabel: "Safe & Secure Checkout · No password required",
    clientsCount: "560,444 +",
    clientsLabel: "clients",
    ratingValue: "4.8",
    reviewsLabel: "(4,505) reviews",
    starCount: 5,
    paymentLogos: serviceHeroContent.intro.trustCard.paymentLogos,
    trustBadges: [
      { id: "secure", label: "Secure", iconSrc: `${IMG}/secure-blue.svg` },
      { id: "money-back", label: "Money back", iconSrc: `${IMG}/refund.svg` },
      { id: "support", label: "24/7 Support", iconSrc: `${IMG}/support.svg` },
    ],
  },
}
