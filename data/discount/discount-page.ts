import { blogPageContent } from "@/data/blog/blog"
import type { DiscountPageContent } from "@/types/discount/discount-page"

const DISCOUNT_IMG = "/images/discount"
const COUPON_IMG = `${DISCOUNT_IMG}/coupon-section`
const DISCOUNT_SECTION_IMG = `${DISCOUNT_IMG}/discount-section`
const GET_STARTED_IMG = `${DISCOUNT_IMG}/get-started-section`

const couponOffer = {
  offerTitle: "Flat $3.00 off",
  offerSubtitle: "On order of $29+",
  code: "SAVE3OFF",
}

const coupons = Array.from({ length: 8 }, (_, index) => ({
  id: `coupon-${index + 1}`,
  ...couponOffer,
  backgroundVariant: (index === 4 ? "alt" : "default") as "default" | "alt",
}))

export const discountPageContent: DiscountPageContent = {
  hero: {
    breadcrumb: {
      homeLabel: "Home",
      homeHref: "/",
      currentLabel: "Discount",
    },
    title: "Unlock Exclusive Discounts on ",
    titleHighlight: "Every Order",
    description:
      "Enjoy more savings on every purchase with our exclusive discount codes. Get the best deals and make every order more rewarding.",
  },
  couponSection: {
    spineLabel: "COUPON",
    revealLabel: "REVEAL CODE",
    coupons,
    signupCta: {
      label: "Sign up free to unlock every code",
      href: "/register",
    },
  },
  discountSection: {
    badgeLabel: "Discount",
    title: "Submit a Video & Get ",
    titleHighlight: "$25–$100 Off!",
    description:
      "Discover reliable, affordable, and convenient social media marketing solutions designed to support your growth, simplify your experience, and help you achieve your online goals.",
    steps: [
      {
        id: "create-video",
        title: "Create Your Video",
        iconSrc: `${DISCOUNT_SECTION_IMG}/step-create-video.png`,
        items: [
          { text: "Record a 30–60 second vertical video." },
          { text: "Share an authentic review or tutorial." },
          { text: "Highlight your personal experience." },
          { text: "Ensure clear visuals and quality content." },
        ],
      },
      {
        id: "earn-rewards",
        title: "Earn $25–$100 in Rewards",
        iconSrc: `${DISCOUNT_SECTION_IMG}/step-earn-rewards.png`,
        items: [
          { text: "Get rewarded with $25–$100 in credit." },
          { text: "Higher video quality earns better rewards." },
          { text: "Mention your social media username." },
          { text: "Strong audience reach increases reward potential." },
        ],
      },
      {
        id: "submit-video",
        title: "Submit Your Video",
        iconSrc: `${DISCOUNT_SECTION_IMG}/step-submit-video.png`,
        items: [
          { text: "Share your published video link." },
          {
            text: "Email us at ",
            emailLabel: "example@gmail.com",
            emailHref: "mailto:example@gmail.com",
          },
          { text: "Include proof of original ownership." },
          { text: "Receive your eligible credit after approval." },
        ],
      },
    ],
    giftCta: {
      title: "Open your coupons gift box!",
      description:
        "Login to claim your weekly gift box and get a surprise discount for your next order!",
      buttonLabel: "Open Gift Box",
      href: "/register",
      giftBoxSrc: `${DISCOUNT_SECTION_IMG}/gift-box.png`,
    },
  },
  getStartedSection: {
    title: "Ready to ",
    titleHighlight: "Get Started?",
    platforms: [
      {
        id: "instagram",
        label: "Instagram",
        iconSrc: `${GET_STARTED_IMG}/instagram.png`,
        href: "/order",
        themeColor: "#e1306c",
      },
      {
        id: "facebook",
        label: "Facebook",
        iconSrc: `${GET_STARTED_IMG}/facebook.png`,
        href: "/order",
        themeColor: "#1877f2",
      },
      {
        id: "twitter",
        label: "Twitter",
        iconSrc: `${GET_STARTED_IMG}/twitter.png`,
        href: "/order",
        themeColor: "#1da1f2",
      },
      {
        id: "youtube",
        label: "Youtube",
        iconSrc: `${GET_STARTED_IMG}/youtube.png`,
        href: "/order",
        themeColor: "#ff0000",
      },
      {
        id: "tiktok",
        label: "TikTik",
        iconSrc: `${GET_STARTED_IMG}/tiktok.png`,
        href: "/order",
        themeColor: "#000000",
      },
      {
        id: "threads",
        label: "Threads",
        iconSrc: `${GET_STARTED_IMG}/threads.png`,
        href: "/order",
        themeColor: "#000000",
      },
      {
        id: "soundcloud",
        label: "Soundcloude",
        iconSrc: `${GET_STARTED_IMG}/soundcloud.png`,
        href: "/order",
        themeColor: "#ff5500",
      },
      {
        id: "spotify",
        label: "Sportfy",
        iconSrc: `${GET_STARTED_IMG}/spotify.png`,
        href: "/order",
        themeColor: "#1db954",
      },
    ],
  },
  assets: {
    heroBackgroundSrc: blogPageContent.assets.heroBackgroundSrc,
    breadcrumbChevronSrc: `${DISCOUNT_IMG}/breadcrumb-chevron.svg`,
    couponBgSrc: `${COUPON_IMG}/coupon-bg.svg`,
    couponBgAltSrc: `${COUPON_IMG}/coupon-bg-alt.svg`,
    couponPercentIconSrc: `${COUPON_IMG}/coupon-percent-icon.svg`,
    signupCtaArrowSrc: `${COUPON_IMG}/signup-cta-arrow.svg`,
  },
}
