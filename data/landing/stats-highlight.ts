import type { StatsHighlightData } from "@/types/landing/stats-highlight"

const ASSET_BASE = "/images/landing/stats-highlight"

const authOne = { src: `${ASSET_BASE}/about-auth-1.png`, alt: "Customer avatar 1" }
const authTwo = { src: `${ASSET_BASE}/about-auth-2.png`, alt: "Customer avatar 2" }
const authThree = { src: `${ASSET_BASE}/about-auth-3.png`, alt: "Customer avatar 3" }
const authFour = { src: `${ASSET_BASE}/about-auth-4.png`, alt: "Customer avatar 4" }

export const landingStatsHighlightData: StatsHighlightData = {
  intro: {
    subheading: {
      label: "Who we are",
    },
    headingPrimary: "Built to Make Social Media Marketing Easier for Everyone",
    headingSecondary:
      "NewSMM is a simple social media marketing platform built for creators, businesses, agencies, and resellers. We bring useful SMM services together in one easy-to-use dashboard, making it easier to compare options, place orders, and manage social media campaigns without unnecessary complexity.",
  },
  avatarCard: {
    stat: {
      label: "Trusted by Businesses",
      value: "10K+",
    },
    rowOneAvatars: [
      authOne,
      authTwo,
      authThree,
      authFour,
      authOne,
      authTwo,
      authThree,
    ],
    rowTwoAvatars: [
      authOne,
      authTwo,
      authThree,
      authFour,
      authOne,
      authOne,
      authThree,
      authThree,
      authThree,
    ],
  },
  servicesCard: {
    stat: {
      label: "Trusted Services",
      value: "2,250+",
    },
    description:
      "Choose from a wide range of social media services for different platforms, goals, and order sizes.",
    decorationSrc: `${ASSET_BASE}/trusted-services-logo.svg`,
  },
  ordersCard: {
    stat: {
      label: "Orders Delivered",
      value: "150K+",
    },
    description:
      "Social media service orders managed through our simple and convenient SMM panel dashboard.",
    imageSrc: `${ASSET_BASE}/order-delivered-card-img.png`,
    imageAlt: "Team reviewing delivered orders",
  },
  worldwideCard: {
    stat: {
      label: "Growing Worldwide",
      value: "40+ Markets",
    },
    description:
      "Helping customers manage social media growth across different markets around the world.",
    backgroundSrc: `${ASSET_BASE}/project-deliverd-img.png`,
    backgroundAlt: "City skyline",
  },
}
