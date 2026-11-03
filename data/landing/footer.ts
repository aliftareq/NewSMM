import type { LandingFooterContent } from "@/types/landing/footer"

const FOOTER_IMG = "/images/landing/footer"

export const landingFooterContent: LandingFooterContent = {
  assets: {
    glowEllipse: `${FOOTER_IMG}/glow-ellipse.svg`,
    decorativeDots: `${FOOTER_IMG}/decorative-dots.svg`,
    glareStarLeft: `${FOOTER_IMG}/glare-star-left.png`,
    glareStarRight: `${FOOTER_IMG}/glare-star-right.png`,
  },
  cta: {
    headingLines: ["Your Social Media Growth", "Starts Here"],
    description:
      "Discover social media promotion services across popular platforms, compare available options, and find convenient solutions for your content, brand, and marketing needs.",
    button: { label: "Start your order", href: "/order" },
  },
  brand: {
    logomarkSrc: `${FOOTER_IMG}/logomark.svg`,
    name: "SOCIAL PANEL",
    nameGradient:
      "linear-gradient(-74.44deg, rgb(15, 175, 255) 5.42%, rgb(0, 132, 208) 96.51%)",
    description:
      "Lorem ipsum dolor sit amet consectetur. Iaculis amet dignissim nec duis in pretium libero. Consectetur urna aliquet malesuada non. Et pharetra",
    socialLinks: [
      {
        id: "facebook",
        href: "https://facebook.com",
        iconSrc: `${FOOTER_IMG}/facebook.svg`,
        iconSize: 17.57,
        buttonSize: 42.17,
      },
      {
        id: "instagram",
        href: "https://instagram.com",
        iconSrc: `${FOOTER_IMG}/instagram.svg`,
        iconSize: 17.44,
        buttonSize: 41.86,
      },
      {
        id: "twitter",
        href: "https://x.com",
        iconSrc: `${FOOTER_IMG}/twitter-x.svg`,
        iconSize: 17.44,
        buttonSize: 41.86,
      },
      {
        id: "linkedin",
        href: "https://linkedin.com",
        iconSrc: `${FOOTER_IMG}/linkedin.svg`,
        iconSize: 17.44,
        buttonSize: 41.86,
      },
    ],
  },
  quickLinks: {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "About us", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact us", href: "/contact" },
      { label: "Discount", href: "/discount" },
    ],
  },
  services: {
    title: "Our services",
    links: [
      { label: "Buy Instagram Services", href: "/services/instagram" },
      { label: "Buy Threads Services", href: "/services/threads" },
      { label: "Buy Facebook Services", href: "/services/facebook" },
      { label: "Buy TikTok Services", href: "/services/tiktok" },
      { label: "Buy Twitter Services", href: "/services/twitter" },
      { label: "Buy SoundCloud Services", href: "/services/soundcloud" },
      { label: "Buy Spotify Services", href: "/services/spotify" },
    ],
  },
  contact: {
    title: "Contact Info",
    items: [
      {
        id: "email",
        iconSrc: `${FOOTER_IMG}/email.svg`,
        text: "info@smmpanel.com",
      },
      {
        id: "phone",
        iconSrc: `${FOOTER_IMG}/phone.svg`,
        text: "+88018...........................",
      },
      {
        id: "location",
        iconSrc: `${FOOTER_IMG}/location.svg`,
        text: "4093 Overlook Drive, Richmond, IN 47374",
        multiline: true,
      },
    ],
  },
  trustBadges: [
    {
      id: "google",
      type: "google",
      logo: {
        src: `${FOOTER_IMG}/google-reviews.svg`,
        width: 90,
        height: 29,
      },
      reviewsLabel: "1.5k Reviews",
      rating: "4.9",
      ratingStarSrc: `${FOOTER_IMG}/rating-star.svg`,
    },
    {
      id: "trustpilot",
      type: "trustpilot",
      logo: {
        src: `${FOOTER_IMG}/trustpilot-logo.svg`,
        width: 28,
        height: 28,
      },
      title: "Trustpilot",
      reviewsLabel: "2.2k Reviews",
      rating: "4.9",
      ratingStarSrc: `${FOOTER_IMG}/trustpilot-star.svg`,
    },
    {
      id: "clutch",
      type: "clutch",
      logo: {
        src: `${FOOTER_IMG}/clutch-logo.png`,
        width: 98,
        height: 28,
        className: "object-cover",
      },
      reviewsLabel: "1.5k Reviews",
      rating: "4.9",
      ratingStarSrc: `${FOOTER_IMG}/rating-star.svg`,
    },
  ],
  legal: {
    copyrightPrefix: "© Copyright 2026 ",
    copyrightBrand: "SOCIAL PANEL",
    copyrightSuffix: " all rights reserved",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
    ],
  },
}
