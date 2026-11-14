import type { DashboardAffiliateContent } from "@/types/dashboard/affiliate"

const IMG = "/images/dashboard/home"
const PAY_NOW_IMG = "/images/dashboard/pay-now-modal"
const NEW_ORDER_IMG = "/images/service/new-order"
const AFFILIATE_IMG = "/images/dashboard/affiliate"

/** Figma 25704:15222 — dashboard affiliate application (step 1). */
export const dashboardAffiliateContent: DashboardAffiliateContent = {
  steps: [
    { id: "step-01", label: "STEP 01" },
    { id: "step-02", label: "STEP 02" },
  ],
  application: {
    title: "Application information",
    description:
      "Tell us a little bit about your traffic sources and how you plan to promote our services. Keep in mind that we will only approve applications with sufficient and relevant information about their traffic sources and promotion methods!",
  },
  trafficSources: {
    title: "Traffic sources",
    description:
      "Where and how will you promote our services? Please be specific and enter links to your traffic channels such as website, social media and similar.",
    placeholder: "Enter your traffic sources",
  },
  targetRegion: {
    title: "Target audience region",
    description:
      "Your primary target audience (countries or region) of your traffic.",
    placeholder: "Enter region",
  },
  services: {
    title: "Which of our services will you promote?",
    description:
      "Are there any of our services in particular that you will be promoting?",
    placeholder: "Enter services",
  },
  continueLabel: "Continue",
  backLabel: "Back",
  stepTwo: {
    youAreTitle: "You are...",
    entityOptions: [
      { id: "company", label: "A Company" },
      { id: "individual", label: "An individual" },
    ],
    baseInfoTitle: "Base info",
    companyNameLabel: "Company name",
    companyNamePlaceholder: "Enter name",
    companyCodeLabel: "Company code",
    companyCodePlaceholder: "Enter code",
    firstNameLabel: "First name",
    firstNamePlaceholder: "Enter name",
    lastNameLabel: "Last name",
    lastNamePlaceholder: "Enter name",
    addressSectionTitle: "Company address",
    countryLabel: "Country",
    countryPlaceholder: "Country",
    cityLabel: "City",
    cityPlaceholder: "Enter city",
    stateLabel: "State",
    statePlaceholder: "Enter State",
    streetLabel: "Street address",
    streetPlaceholder: "Enter name",
    zipLabel: "Zip code",
    zipPlaceholder: "Enter code",
    submitLabel: "Submit application",
    defaultCountryId: "bangladesh",
    countries: [
      { id: "bangladesh", label: "Bangladesh" },
      { id: "united-states", label: "United States" },
      { id: "united-kingdom", label: "United Kingdom" },
      { id: "canada", label: "Canada" },
    ],
  },
  sidebar: {
    title: "Join our affiliate program",
    description:
      "Submit the application if you wish to join our industry leading affiliate program, or click below to learn more about our affiliate program.",
    learnMoreLabel: "Learn more",
    learnMoreHref: "/about",
  },
  commission: {
    title: "Comission rates",
    description:
      "These are our comission rates. Increase your commission rate by reaching the following 30-day rolling earnings.",
    goalColumnLabel: "Goal",
    rateColumnLabel: "Commission Rate%",
    tiers: [
      { id: "base", goal: "-", rate: "30%" },
      {
        id: "tier-1k",
        goal: "$1 000.00 / 30 days",
        rate: "40%",
        emphasized: true,
      },
      {
        id: "tier-5k",
        goal: "$5 000.00 / 30 days",
        rate: "50%",
        emphasized: true,
      },
    ],
    footnote: "*Before taxes and fees",
  },
  assets: {
    divider: `${IMG}/card-divider.svg`,
    entityCheckboxEmpty: `${AFFILIATE_IMG}/entity-checkbox-empty.svg`,
    entityCheckboxChecked: `${AFFILIATE_IMG}/entity-checkbox-checked.svg`,
    countryChevronIcon: `${PAY_NOW_IMG}/country-chevron.svg`,
    backArrow: `${NEW_ORDER_IMG}/back-arrow.svg`,
    stepComplete: `${AFFILIATE_IMG}/step-complete.svg`,
    stepCurrentRing: `${AFFILIATE_IMG}/step-current-ring.svg`,
    stepInactive: `${AFFILIATE_IMG}/step-inactive.svg`,
  },
}