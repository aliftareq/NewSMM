import type { LandingHeroContent } from "@/types/landing/hero"

import { landingHeroContent } from "@/data/landing/hero"

const ABOUT_HERO_GRADIENT =
  "linear-gradient(-62.31deg, rgb(15, 175, 255) 5.42%, rgb(0, 132, 208) 96.51%)"

const ABOUT_IMG = "/images/landing/about"

/** Figma 25687:7522 — About page hero text */
export const aboutHeroContent: LandingHeroContent = {
  ...landingHeroContent,
  layout: "about",
  headline: {
    lineOne: {
      segments: [
        { type: "text", content: "Get to Know " },
        {
          type: "image",
          src: "/images/landing/headline-pill.png",
          alt: "Team collaborating in a modern office",
          width: 146,
          height: 52,
          imageClassName:
            "absolute h-[159.62%] left-[0.04%] max-w-none top-[-22.12%] w-[99.93%]",
        },
        { type: "text", content: " Us and" },
      ],
    },
    lineTwo: {
      segments: [
        { type: "text", content: "the " },
        {
          type: "gradient-text",
          content: "Vision Behind",
          gradient: ABOUT_HERO_GRADIENT,
        },
        { type: "text", content: " What We Do" },
      ],
    },
  },
  description:
    "We are dedicated to delivering innovative, reliable, and results-driven digital solutions that help businesses strengthen their online presence, connect with their audience, and achieve lasting growth.",
  trustStrip: {
    avatarSrcs: [
      `${ABOUT_IMG}/trust-avatar-1.png`,
      `${ABOUT_IMG}/trust-avatar-2.png`,
      `${ABOUT_IMG}/trust-avatar-3.png`,
      `${ABOUT_IMG}/trust-avatar-4.png`,
    ],
    label: "Trusted by 45,000+ Customers",
    labelGradient: ABOUT_HERO_GRADIENT,
  },
  featureBadges: [
    "Secure Ordering Without Passwords",
    "Transparent Service Details & Pricing",
    "Flexible Refill Support on Eligible Services",
    "Easy Real-Time Order Tracking",
  ],
  primaryCta: {
    label: "Start your order",
    href: "/register",
  },
  secondaryCta: {
    label: "Browse all Services",
    href: "/services",
  },
}
