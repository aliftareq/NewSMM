export type ContactFormField = {
  id: string
  label: string
  placeholder: string
  type: "text" | "textarea"
}

export type ContactSupportChannel = {
  id: string
  title: string
  value: string
  href: string
  description: string
  iconSrc: string
}

export type ContactPageContent = {
  breadcrumb: {
    homeLabel: string
    currentLabel: string
  }
  hero: {
    badgeLabel: string
    title: string
    titleHighlight: string
    description: string
  }
  form: {
    submitLabel: string
    fields: ContactFormField[]
  }
  supportChannels: ContactSupportChannel[]
  assets: {
    breadcrumbChevronSrc: string
    heroBackgroundSrc: string
    supportPhotoSrc: string
    submitArrowSrc: string
  }
}
