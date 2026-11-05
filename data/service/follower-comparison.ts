import type { FollowerComparisonData } from "@/types/service/follower-comparison"

const IMG = "/images/service/follower-comparison"
const ORDER_SPRITE = "/images/service/order/social-icons-sprite.png"

/** Figma 25734:4053 — Choose the Instagram Followers That Fit Your Goals */
export const serviceFollowerComparisonData: FollowerComparisonData = {
  intro: {
    badgeLabel: "Double way to grow",
    headingPrefix: "Choose the ",
    headingHighlight: "Instagram Followers",
    headingSuffix: " That Fit Your Goals",
    description:
      "Compare follower options and choose the right package to grow your Instagram presence and reach your social media goals.",
  },
  tierCards: [
    {
      id: "high-quality",
      title: "High Quality Instagram Followers",
      description:
        "A practical option for public profiles that need a stronger count without choosing the higher-priced Real tier.",
      features: [
        "Well-built Instagram profiles",
        "Have profile pictures & posts",
        "Fastest, most affordable delivery",
        "Ideal for a quick credibility boost",
      ],
      ctaLabel: "Choose High Quality",
      ctaVariant: "outline",
      href: "/service#growth-package",
    },
    {
      id: "real-followers",
      title: "Real Instagram Followers",
      description:
        "A practical option for public profiles that need a stronger count without choosing the higher-priced Real tier.",
      features: [
        "Reach real, active Instagram users",
        "Followers who own profiles and post regularly",
        "Build the most authentic, lasting audience",
        "Ideal for genuine engagement and feedback",
      ],
      ctaLabel: "Choose Real Instagram Followers",
      ctaVariant: "gradient",
      recommendedBadge: true,
      href: "/service#growth-package",
    },
  ],
  glance: {
    title: "At a glance",
    highQualityColumn: "High Quality Instagram Followers",
    realFollowersColumn: "Real Instagram Followers",
    rows: [
      {
        id: "profile-posts",
        label: "Profile pictures & posts",
        highQuality: { kind: "check" },
        realFollowers: { kind: "check" },
      },
      {
        id: "active-accounts",
        label: "Active, real accounts",
        highQuality: { kind: "cross" },
        realFollowers: { kind: "check" },
      },
      {
        id: "post-engage",
        label: "Post & engage regularly",
        highQuality: { kind: "cross" },
        realFollowers: { kind: "check" },
      },
      {
        id: "delivery",
        label: "Delivery speed",
        highQuality: { kind: "text", value: "Fastest" },
        realFollowers: { kind: "text", value: "Fast", emphasis: "brand" },
      },
      {
        id: "best-for",
        label: "Best for",
        highQuality: { kind: "text", value: "Quick boost" },
        realFollowers: {
          kind: "text",
          value: "Lasting growth",
          emphasis: "brand",
        },
      },
      {
        id: "price",
        label: "Price",
        highQuality: { kind: "text", value: "Lowest" },
        realFollowers: { kind: "text", value: "Premium", emphasis: "brand" },
      },
    ],
  },
  assets: {
    instagramIconSprite: ORDER_SPRITE,
    instagramIconCropClassName:
      "absolute h-[639.76%] left-[-343.53%] max-w-none top-[-48.82%] w-[787.4%]",
    checkBlueIcon: `${IMG}/check-blue-16.svg`,
    checkGreenIcon: `${IMG}/check-green-24.svg`,
    crossRedIcon: `${IMG}/cross-red-24.svg`,
  },
}
