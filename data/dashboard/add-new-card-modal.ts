import type { DashboardAddNewCardModalContent } from "@/types/dashboard/add-new-card-modal"

const IMG = "/images/dashboard/add-new-card-modal"
const SETTINGS_IMG = "/images/dashboard/settings"

/** Figma 25704:15640 */
export const dashboardAddNewCardModalContent: DashboardAddNewCardModalContent = {
  title: "Add New Card",
  cardNameLabel: "Name of the card*",
  cardNamePlaceholder: "Enter name",
  cardNumberLabel: "Crad number*",
  cardNumberPlaceholder: "Enter card number",
  expirationLabel: "Expiration date*",
  monthPlaceholder: "Month",
  yearPlaceholder: "Year",
  cvvLabel: "CVV*",
  countryLabel: "Country*",
  authorizationNote:
    "Your card will be charged $0.50 for authorization, funds will be added to your account’s balance.",
  cancelLabel: "Cancel",
  saveCardLabel: "Save card",
  defaultCountryId: "bangladesh",
  countries: [
    { id: "bangladesh", label: "Bangladesh" },
    { id: "united-states", label: "United States" },
    { id: "united-kingdom", label: "United Kingdom" },
    { id: "canada", label: "Canada" },
  ],
  assets: {
    closeIcon: `${IMG}/close-icon.svg`,
    headerDivider: `${IMG}/header-divider.svg`,
    cardNumberIcon: `${IMG}/card-number-icon.svg`,
    cvvLockIcon: `${IMG}/cvv-lock-icon.svg`,
    countryChevronIcon: `${SETTINGS_IMG}/country-select-chevron.svg`,
  },
}