import type { HowItWorksData } from "@/types/landing/how-it-works"

const IMG = "/images/landing/how-it-works"

/** Figma 25704:29483 — How it works */
export const landingHowItWorksData: HowItWorksData = {
  intro: {
    badgeLabel: "How it works",
    headingPrefix: "Grow Your Socials in ",
    headingHighlight: "3 Simple Steps",
    description:
      "Getting started with social media services is simple. Follow these four easy steps to choose your service and place your order.",
  },
  steps: [
    {
      id: "pick-service",
      stepLabel: "STEP 01",
      title: "Pick your service",
      description:
        "Choose a platform and the package that fits your goal — no account or sign-up needed.",
      illustrationKind: "pick-service-carousel",
      illustrationSrc: `${IMG}/step-01-illustration.svg`,
      illustrationWidth: 217,
      illustrationHeight: 160,
    },
    {
      id: "enter-username",
      stepLabel: "STEP 02",
      title: "Enter your username",
      description:
        "Add your public username or link. We never ask for your password or any account access.",
      illustrationSrc: `${IMG}/step-02-illustration.svg`,
      illustrationWidth: 218,
      illustrationHeight: 68,
    },
    {
      id: "watch-grow",
      stepLabel: "STEP 03",
      title: "Watch it grow",
      description:
        "Pay securely and real engagement starts landing within minutes — steady and natural.",
      illustrationSrc: `${IMG}/step-03-illustration.svg`,
      illustrationWidth: 125,
      illustrationHeight: 160,
    },
  ],
}
