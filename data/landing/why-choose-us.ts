import type { WhyChooseUsContent } from "@/types/landing/why-choose-us";

const ASSET_BASE = "/images/landing/why-choose-us";

export const landingWhyChooseUsContent: WhyChooseUsContent = {
  badgeLabel: "Why choose us",
  headingLineOnePrimary: "Why Choose Us for ",
  headingLineOneAccent: "Social",
  headingLineTwoAccent: "Media Growth?",
  description:
    "Discover convenient social media services, transparent pricing, and a simple ordering experience designed to meet your needs.",
  decorationSrc: `${ASSET_BASE}/torus-decoration.svg`,
  serviceIconSrc: `${ASSET_BASE}/service-icon.svg`,
  textArrowSrc: `${ASSET_BASE}/text-arrow.svg`,
  chevronNextSrc: `${ASSET_BASE}/chevron-next.svg`,
  chevronPrevSrc: `${ASSET_BASE}/chevron-prev.svg`,
  cards: [
    {
      id: "platforms",
      step: "01",
      title: "Multiple Social Media Platforms",
      description:
        "Discover followers, likes, views, and other social media promotion services across popular platforms, all in one convenient place.",
      variant: "default",
      showTextArrow: true,
    },
    {
      id: "pricing",
      step: "02",
      title: "Affordable Service Pricing",
      description:
        "Compare available social media packages and starting prices to find services that match your budget and promotional needs.",
      variant: "default",
    },
    {
      id: "ordering",
      step: "03",
      title: "Simple Ordering Process",
      description:
        "Choose your preferred platform, select a service, provide the required details, and complete your order in a few simple steps.",
      variant: "default",
      showTextArrow: true,
    },
    {
      id: "payments",
      step: "04",
      title: "Secure Payment Options",
      description:
        "Enjoy a convenient checkout experience with available payment methods and clear instructions to complete your purchase.",
      variant: "default",
    },
    {
      id: "trial",
      step: "05",
      title: "Free Trial Services",
      description:
        "Explore eligible free-trial services across supported platforms and review trial requirements before choosing a service.",
      variant: "muted",
    },
    {
      id: "support",
      step: "06",
      title: "Dedicated Customer Support",
      description:
        "Get assistance with orders, payment questions, and service-related inquiries to help you navigate your social media promotion experience.",
      variant: "muted",
    },
  ],
};
