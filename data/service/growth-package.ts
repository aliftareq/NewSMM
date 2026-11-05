import type { GrowthPackageData } from "@/types/service/growth-package"

const IMG = "/images/service/growth-package"
const ORDER_SPRITE = "/images/service/order/social-icons-sprite.png"

/** Figma 25734:3903 — Select Your Instagram Growth Package */
export const serviceGrowthPackageData: GrowthPackageData = {
  intro: {
    badgeLabel: "Pick your amount",
    headingPrefix: "Select Your Instagram ",
    headingHighlight: "Growth Package",
    description:
      "Choose the right Instagram followers package for your goals and grow your audience with a simple, hassle-free ordering process.",
  },
  qualityTabs: [
    { id: "high-quality", label: "High quality" },
    {
      id: "real-followers",
      label: "Real followers",
      recommendedBadge: true,
    },
  ],
  tableHeaders: {
    package: "Package",
    value: "Value",
    price: "Price",
  },
  selectButtonLabel: "Select",
  rows: [
    {
      id: "pkg-100",
      quantity: "100",
      tierLabel: "High quality",
      unitValue: "$2.99/100",
      price: "$2.99",
      rowVariant: "bordered",
    },
    {
      id: "pkg-250",
      quantity: "250",
      tierLabel: "High quality",
      unitValue: "$2.99/100",
      price: "$2.99",
      rowVariant: "muted",
    },
    {
      id: "pkg-500",
      quantity: "500",
      tierLabel: "High quality",
      unitValue: "$2.99/100",
      price: "$2.99",
      rowVariant: "bordered",
    },
    {
      id: "pkg-1000",
      quantity: "1,000",
      tierLabel: "High quality",
      unitValue: "$2.99/100",
      price: "$2.99",
      rowVariant: "muted",
    },
    {
      id: "pkg-2500",
      quantity: "2,500",
      tierLabel: "High quality",
      unitValue: "$2.99/100",
      price: "$2.99",
      rowVariant: "bordered",
    },
    {
      id: "pkg-5000",
      quantity: "5,000",
      quantityGradient: true,
      tierLabel: "High quality",
      unitValue: "$2.99/100",
      price: "$2.99",
      rowVariant: "bordered",
      popularBadge: true,
      selectVariant: "instagram-gradient",
    },
    {
      id: "pkg-10000",
      quantity: "10,000",
      tierLabel: "High quality",
      unitValue: "$2.89/100",
      price: "$289.00",
      rowVariant: "muted",
    },
    {
      id: "pkg-15000",
      quantity: "15,000",
      tierLabel: "High quality",
      unitValue: "$2.79/100",
      price: "$418.50",
      rowVariant: "bordered",
    },
    {
      id: "pkg-20000",
      quantity: "20,000",
      tierLabel: "High quality",
      unitValue: "$2.69/100",
      price: "$538.00",
      rowVariant: "muted",
    },
    {
      id: "pkg-25000",
      quantity: "25,000",
      tierLabel: "High quality",
      unitValue: "$2.59/100",
      price: "$647.50",
      rowVariant: "bordered",
    },
  ],
  trustItems: [
    { id: "no-password", label: "No password needed" },
    { id: "refill", label: "Refill guarantee" },
    { id: "delivery", label: "Safe & fast delivery" },
  ],
  assets: {
    instagramIconSprite: ORDER_SPRITE,
    instagramIconCropClassName:
      "absolute h-[639.76%] left-[-343.53%] max-w-none top-[-48.82%] w-[787.4%]",
    trustCheckIcon: `${IMG}/trust-check.svg`,
  },
}
