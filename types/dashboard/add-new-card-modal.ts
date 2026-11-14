export type DashboardAddNewCardModalContent = {
  title: string
  cardNameLabel: string
  cardNamePlaceholder: string
  cardNumberLabel: string
  cardNumberPlaceholder: string
  expirationLabel: string
  monthPlaceholder: string
  yearPlaceholder: string
  cvvLabel: string
  countryLabel: string
  authorizationNote: string
  cancelLabel: string
  saveCardLabel: string
  defaultCountryId: string
  countries: { id: string; label: string }[]
  assets: {
    closeIcon: string
    headerDivider: string
    cardNumberIcon: string
    cvvLockIcon: string
    countryChevronIcon: string
  }
}