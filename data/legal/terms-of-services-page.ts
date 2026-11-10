import { privacyPolicyPageContent } from "@/data/legal/privacy-policy-page"
import type { PrivacyPolicyPageContent } from "@/types/legal/privacy-policy-page"

export const termsOfServicesPageContent: PrivacyPolicyPageContent = {
  ...privacyPolicyPageContent,
  hero: {
    breadcrumb: {
      homeLabel: "Home",
      homeHref: "/",
      currentLabel: "Terms & Conditions",
    },
    title: "Understanding Our ",
    titleHighlight: "Terms of Service",
    description:
      "Explore the guidelines, policies, and conditions that help ensure a fair, secure, and reliable experience for every user.",
    lastUpdated: "Last Updated March 30, 2026",
    descriptionMaxWidth: 682,
  },
  tabs: {
    privacy: { label: "Privacy Policy", href: "/privacy-policy" },
    terms: { label: "Terms of Services", href: "/terms-of-services" },
  },
}
