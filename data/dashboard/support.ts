import type { DashboardSupportContent } from "@/types/dashboard/support"

const IMG = "/images/dashboard/home"

export const dashboardSupportContent: DashboardSupportContent = {
  header: {
    title: "Please fill the form",
    description:
      "Send your message and we will get back to you within 24 hours!",
    addSecondaryEmailLabel: "Add secondary email",
  },
  fields: {
    requestTypeLabel: "Request type",
    subjectLabel: "Subject",
    subjectPlaceholder: "Enter subject",
    messageLabel: "Message",
    messagePlaceholder: "Please enter your message...",
  },
  requestTypes: [
    { id: "order-issue", label: "Order issue" },
    { id: "payment-issue", label: "Payment issue" },
    { id: "account-issue", label: "Account issue" },
    { id: "other", label: "Other" },
  ],
  defaultRequestTypeId: "order-issue",
  submitLabel: "Send message",
  assets: {
    divider: `${IMG}/card-divider.svg`,
  },
}