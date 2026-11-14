export type DashboardSupportRequestType = {
  id: string
  label: string
}

export type DashboardSupportContent = {
  header: {
    title: string
    description: string
    addSecondaryEmailLabel: string
  }
  fields: {
    requestTypeLabel: string
    subjectLabel: string
    subjectPlaceholder: string
    messageLabel: string
    messagePlaceholder: string
  }
  requestTypes: DashboardSupportRequestType[]
  defaultRequestTypeId: string
  submitLabel: string
  assets: {
    divider: string
  }
}