import type { LandingHeroContent } from "@/types/landing/hero"

const SPRITE = "/images/landing/social-icons-sprite.png"

export const landingHeroContent: LandingHeroContent = {
  assets: {
    backgroundHero: "/images/landing/hero-background.png",
    socialIconsSprite: SPRITE,
    chevronDown: "/images/landing/chevron-down.svg",
  },
  reviews: [
    {
      id: "google",
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
      value: "Instagram",
      spriteIcon: {
        left: "-343.53%",
        top: "-48.82%",
        width: "787.4%",
        height: "639.76%",
      },
    },
    serviceField: {
      id: "service",
      label: "Select a service",
      value: "Instagram followers",
      icon: {
        src: "/images/landing/instagram-followers-icon.png",
        width: 20.195,
        height: 18,
        className:
          "absolute h-[144.68%] left-[-45.65%] max-w-none top-[-22.34%] w-[193.48%]",
      },
    },
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
