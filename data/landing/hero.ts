import { serviceOrderProductsByPlatform } from "@/data/service/order-widget-services"
import type { HeroOrderServiceOption, LandingHeroContent } from "@/types/landing/hero"

const SPRITE = "/images/landing/social-icons-sprite.png"
const MODAL_PLATFORMS_IMG = "/images/landing/services-modal/platforms"

function toLandingServiceLabel(productLabel: string): string {
  const [first, ...rest] = productLabel.split(" ")
  if (rest.length === 0) return productLabel
  return `${first} ${rest.join(" ").toLowerCase()}`
}

function buildLandingHeroServicesByPlatform(): Record<
  string,
  HeroOrderServiceOption[]
> {
  return Object.fromEntries(
    Object.entries(serviceOrderProductsByPlatform).map(([platformId, products]) => [
      platformId,
      products.map(({ id, label }) => {
        const entry: HeroOrderServiceOption = {
          id,
          label: toLandingServiceLabel(label),
        }
        if (id === "instagram-followers") {
          entry.icon = {
            src: "/images/landing/instagram-followers-icon.png",
            width: 20.195,
            height: 18,
            className:
              "absolute h-[144.68%] left-[-45.65%] max-w-none top-[-22.34%] w-[193.48%]",
          }
        }
        return entry
      }),
    ]),
  )
}

export const landingHeroContent: LandingHeroContent = {
  assets: {
    backgroundHero: "/images/landing/hero-background.png",
    socialIconsSprite: SPRITE,
    chevronDown: "/images/landing/chevron-down.svg",
  },
  reviews: [
    {
      id: "google",
      href: "https://www.google.com/maps",
      iconSrc: "/images/landing/google.svg",
      starIcons: [
        "/images/landing/star-google.svg",
        "/images/landing/star-google.svg",
        "/images/landing/star-google.svg",
        "/images/landing/star-google.svg",
        "/images/landing/star-google-partial.svg",
      ],
      rating: {
        value: "4.9",
        valueClassName: "text-[#ffa828]",
        suffix: " Reviews",
      },
    },
    {
      id: "trustpilot",
      href: "https://www.trustpilot.com",
      iconSrc: "",
      starIcons: [
        "/images/landing/star-trustpilot.svg",
        "/images/landing/star-trustpilot.svg",
        "/images/landing/star-trustpilot.svg",
        "/images/landing/star-trustpilot.svg",
        "/images/landing/star-trustpilot-partial.svg",
      ],
      rating: {
        value: "4.8",
        valueClassName: "text-blue-brand",
        suffix: " Trustpilot reviews",
      },
    },
  ],
  headline: {
    lineOne: {
      segments: [
        { type: "text", content: "Your Smart " },
        {
          type: "image",
          src: "/images/landing/headline-pill.png",
          alt: "Team collaborating in a modern office",
          width: 146,
          height: 52,
          imageClassName:
            "absolute h-[159.62%] left-[0.04%] max-w-none top-[-22.12%] w-[99.93%]",
        },
        { type: "text", content: " Solution" },
      ],
    },
    lineTwo: {
      segments: [
        { type: "text", content: "for " },
        {
          type: "gradient-text",
          content: "Social Media",
          gradient:
            "linear-gradient(-62.31deg, rgb(15, 175, 255) 5.42%, rgb(0, 132, 208) 96.51%)",
        },
        { type: "text", content: " Growth" },
      ],
    },
  },
  description:
    "Take your social media presence to the next level with smart, powerful, and reliable solutions designed to help you grow faster, reach a wider audience, increase engagement, and achieve measurable results across all major social media platforms.",
  orderCard: {
    platformField: {
      id: "platform",
      label: "Select platform",
    },
    serviceField: {
      id: "service",
      label: "Select a service",
    },
    defaultPlatformId: "instagram",
    defaultServiceId: "instagram-followers",
    platforms: [
      {
        id: "instagram",
        label: "Instagram",
        spriteIcon: {
          left: "-343.53%",
          top: "-48.82%",
          width: "787.4%",
          height: "639.76%",
        },
      },
      {
        id: "tiktok",
        label: "TikTok",
        spriteIcon: {
          left: "-195.87%",
          top: "-196.09%",
          width: "787.4%",
          height: "639.76%",
        },
      },
      {
        id: "youtube",
        label: "YouTube",
        spriteIcon: {
          left: "-195.92%",
          top: "-48.82%",
          width: "787.4%",
          height: "639.76%",
        },
      },
      {
        id: "facebook",
        label: "Facebook",
        spriteIcon: {
          left: "-48.43%",
          top: "-48.82%",
          width: "787.4%",
          height: "639.76%",
        },
      },
      {
        id: "twitter",
        label: "Twitter",
        imageSrc: `${MODAL_PLATFORMS_IMG}/twitter.png`,
        imageClassName: "size-[18px] object-contain",
      },
      {
        id: "threads",
        label: "Threads",
        imageSrc: `${MODAL_PLATFORMS_IMG}/threads.png`,
        imageClassName: "size-[18px] object-contain",
      },
      {
        id: "spotify",
        label: "Spotify",
        imageSrc: `${MODAL_PLATFORMS_IMG}/spotify.png`,
        imageClassName: "size-[18px] object-contain",
      },
      {
        id: "soundcloud",
        label: "Soundcloud",
        imageSrc: `${MODAL_PLATFORMS_IMG}/soundcloud.png`,
        imageClassName: "size-[18px] object-contain",
      },
    ],
    servicesByPlatform: buildLandingHeroServicesByPlatform(),
    submitLabel: "Get started now",
  },
  visual: {
    professionalImage: {
      src: "/images/landing/hero-professional.png",
      alt: "Professional woman in business attire with arms crossed",
      className:
        "absolute h-[99.97%] left-[-16.92%] max-w-none top-[0.03%] w-[133.83%]",
    },
    verticalTitle: {
      social: "Social ",
      growth: "Growth",
    },
    socialBarIcons: [
      {
        id: "facebook",
        sprite: {
          left: "-48.43%",
          top: "-48.82%",
          width: "787.4%",
          height: "639.76%",
        },
      },
      {
        id: "instagram",
        sprite: {
          left: "-343.53%",
          top: "-48.82%",
          width: "787.4%",
          height: "639.76%",
        },
      },
      {
        id: "youtube",
        sprite: {
          left: "-195.92%",
          top: "-48.82%",
          width: "787.4%",
          height: "639.76%",
        },
      },
      {
        id: "tiktok",
        sprite: {
          left: "-195.87%",
          top: "-196.09%",
          width: "787.4%",
          height: "639.76%",
        },
      },
      {
        id: "linkedin",
        sprite: {
          left: "-491.7%",
          top: "-195.33%",
          width: "787.4%",
          height: "639.76%",
        },
      },
    ],
  },
}
