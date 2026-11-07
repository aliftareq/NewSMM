import type { WhyChooseOurServiceContent } from "@/types/landing/why-choose-our-service"

const ICON_BASE = "/images/landing/why-choose-our-service"

/** Figma 25687:7642 — About “Why Choose Our Services” */
export const aboutWhyChooseOurServiceContent: WhyChooseOurServiceContent = {
  badgeLabel: "Why Choose Us",
  headingBefore: "Why Choose ",
  headingAccent: "Our Services?",
  description:
    "Discover reliable, affordable, and convenient social media marketing solutions designed to support your growth, simplify your experience, and help you achieve your online goals.",
  topRow: [
    {
      id: "safe-secure",
      title: "Safe & Secure",
      description:
        "Your privacy and security are important to us. We prioritize secure transactions and handle your information carefully to provide a safer and more reliable service experience.",
      iconSrc: `${ICON_BASE}/icon-safe-secure.png`,
      iconClassName: "size-[33px] object-cover",
    },
    {
      id: "affordable-pricing",
      title: "Affordable Pricing",
      description:
        "Grow your social media presence without exceeding your budget. Our services offer competitive pricing, helping you choose options that match your needs and marketing goals.",
      iconSrc: `${ICON_BASE}/icon-affordable-pricing.png`,
      iconClassName: "h-[31px] w-[25px] max-w-none object-cover",
    },
    {
      id: "fast-delivery",
      title: "Fast Delivery",
      description:
        "We aim to process your orders promptly so you can get started without unnecessary delays. Our streamlined ordering process helps make your experience smooth and convenient.",
      iconSrc: `${ICON_BASE}/icon-fast-delivery.png`,
      iconClassName: "h-[28px] w-[29px] max-w-none object-cover",
    },
  ],
  bottomRow: [
    {
      id: "customer-support",
      title: "24/7 Customer Support",
      description:
        "Our support team is available around the clock to assist you with questions, order-related concerns, and service information, helping you get the guidance you need whenever you need it.",
      iconSrc: `${ICON_BASE}/icon-customer-support.png`,
      iconClassName: "h-8 w-[33px] max-w-none object-cover",
    },
    {
      id: "easy-ordering",
      title: "Easy Ordering Process",
      description:
        "Getting started is simple and straightforward. Choose your preferred service, select the options that suit your needs, provide the required details, and place your order in just a few easy steps.",
      iconSrc: `${ICON_BASE}/icon-easy-ordering.png`,
      iconClassName: "h-[25px] w-[38px] max-w-none object-cover",
    },
  ],
}
