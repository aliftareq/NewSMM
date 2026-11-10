import type { HowItWorksData } from "@/types/service/how-it-works"

const IMG = "/images/service/how-it-works"

/** Figma 25734:3771 — service page How it works */
export const serviceHowItWorksData: HowItWorksData = {
  intro: {
    badgeLabel: "How it works",
    headingPrefix: "Grow Your Followers in Just a ",
    headingHighlight: "Few Steps",
    description:
      "Choose your package, enter your profile details, and place your order to grow your followers easily without sharing your login credentials.",
  },
  steps: [
    {
      id: "choose-package",
      stepLabel: "STEP 01",
      title: "Choose the follower package",
      description:
        "Pick High Quality or Real followers, then choose the count that fits your profile size and budget.",
      illustrationKind: "pick-service-carousel",
      illustrationSrc: `${IMG}/step-01-illustration.svg`,
      illustrationWidth: 217,
      illustrationHeight: 160,
    },
    {
      id: "enter-instagram-username",
      stepLabel: "STEP 02",
      title: "Enter your Instagram username",
      description:
        "Use your public @handle only. This is enough to place the order without sharing your Instagram password.",
      illustrationKind: "enter-username",
      illustrationSrc: `${IMG}/step-02-illustration.svg`,
      illustrationWidth: 218,
      illustrationHeight: 68,
    },
    {
      id: "confirm-profile",
      stepLabel: "STEP 03",
      title: "Confirm the public profile",
      description:
        "Check that the username points to the right public account so the followers can be added to the correct profile.",
      illustrationKind: "confirm-profile",
      illustrationSrc: `${IMG}/step-03-illustration.svg`,
      illustrationWidth: 200,
      illustrationHeight: 120,
    },
    {
      id: "complete-checkout",
      stepLabel: "STEP 04",
      title: "Complete checkout",
      description:
        "Pay with card, crypto, Apple Pay, or Google Pay. Delivery starts within hours after the order is placed.",
      illustrationKind: "complete-checkout",
      illustrationSrc: `${IMG}/step-04-illustration.svg`,
      illustrationWidth: 223,
      illustrationHeight: 148,
    },
  ],
}
