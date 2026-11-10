import { blogPageContent } from "@/data/blog/blog"
import { landingFaqContent } from "@/data/landing/faq"
import type { FaqPageContent } from "@/types/faq/faq-page"

const FAQ_IMG = "/images/faq"

export const faqPageContent: FaqPageContent = {
  hero: {
    badgeLabel: "FAQ",
    title: "Frequently asked ",
    titleHighlight: "question",
    description:
      "Have a question or need support? Reach out to our team for assistance and a smoother experience with our services.",
  },
  searchPlaceholder: "Search Questions here...",
  categories: [
    { id: "all", label: "Category" },
    { id: "orders", label: "Category" },
    { id: "delivery", label: "Category" },
    { id: "payment", label: "Category" },
    { id: "support", label: "Category" },
  ],
  faq: {
    leftColumn: landingFaqContent.leftColumn,
    rightColumn: landingFaqContent.rightColumn,
  },
  assets: {
    heroBackgroundSrc: blogPageContent.assets.heroBackgroundSrc,
    searchIconSrc: `${FAQ_IMG}/search-icon.svg`,
    chevronSrc: `${FAQ_IMG}/arrow-down-fill.svg`,
  },
}
