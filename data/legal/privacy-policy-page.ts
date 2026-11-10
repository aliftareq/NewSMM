import { blogPageContent } from "@/data/blog/blog"
import type { PrivacyPolicyPageContent } from "@/types/legal/privacy-policy-page"

const LEGAL_IMG = "/images/legal/privacy-policy"

const sectionBody = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.`

export const privacyPolicyPageContent: PrivacyPolicyPageContent = {
  hero: {
    breadcrumb: {
      homeLabel: "Home",
      homeHref: "/",
      currentLabel: "Privacy policy",
    },
    title: "Your Privacy Is ",
    titleHighlight: "Our Priority",
    description:
      "Learn how we collect, use, and protect your personal information to ensure a safe, secure, and transparent experience on our platform.",
    lastUpdated: "Last Updated March 30, 2026",
  },
  searchPlaceholder: "Search info...",
  tabs: {
    privacy: { label: "Privacy Policy", href: "/privacy-policy" },
    terms: { label: "Terms of Services", href: "/terms-of-services" },
  },
  sections: Array.from({ length: 8 }, (_, index) => ({
    id: `section-${index + 1}`,
    title: "Title",
    body: sectionBody,
  })),
  assets: {
    heroBackgroundSrc: blogPageContent.assets.heroBackgroundSrc,
    breadcrumbChevronSrc: `${LEGAL_IMG}/breadcrumb-chevron.svg`,
    searchIcon24Src: `${LEGAL_IMG}/search-icon-24.svg`,
    searchButtonHighlightSrc: `${LEGAL_IMG}/search-button-highlight.png`,
  },
}
