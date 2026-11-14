export type DashboardAffiliateStep = {
  id: string
  label: string
}

export type DashboardAffiliateCommissionTier = {
  id: string
  goal: string
  rate: string
  emphasized?: boolean
}

export type DashboardAffiliateApplicantType = "company" | "individual"

export type DashboardAffiliateCountryOption = {
  id: string
  label: string
}

export type DashboardAffiliateContent = {
  steps: DashboardAffiliateStep[]
  application: {
    title: string
    description: string
  }
  trafficSources: {
    title: string
    description: string
    placeholder: string
  }
  targetRegion: {
    title: string
    description: string
    placeholder: string
  }
  services: {
    title: string
    description: string
    placeholder: string
  }
  continueLabel: string
  backLabel: string
  stepTwo: {
    youAreTitle: string
    entityOptions: { id: DashboardAffiliateApplicantType; label: string }[]
    baseInfoTitle: string
    companyNameLabel: string
    companyNamePlaceholder: string
    companyCodeLabel: string
    companyCodePlaceholder: string
    firstNameLabel: string
    firstNamePlaceholder: string
    lastNameLabel: string
    lastNamePlaceholder: string
    addressSectionTitle: string
    countryLabel: string
    countryPlaceholder: string
    cityLabel: string
    cityPlaceholder: string
    stateLabel: string
    statePlaceholder: string
    streetLabel: string
    streetPlaceholder: string
    zipLabel: string
    zipPlaceholder: string
    submitLabel: string
    countries: DashboardAffiliateCountryOption[]
    defaultCountryId: string
  }
  sidebar: {
    title: string
    description: string
    learnMoreLabel: string
    learnMoreHref: string
  }
  commission: {
    title: string
    description: string
    goalColumnLabel: string
    rateColumnLabel: string
    tiers: DashboardAffiliateCommissionTier[]
    footnote: string
  }
  assets: {
    divider: string
    entityCheckboxEmpty: string
    entityCheckboxChecked: string
    countryChevronIcon: string
    backArrow: string
    stepComplete: string
    stepCurrentRing: string
    stepInactive: string
  }
}