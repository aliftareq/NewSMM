import type { DashboardSecondaryEmailModalContent } from "@/types/dashboard/secondary-email-modal"

const LOGIN_CLOSE = "/images/auth/login-modal/close.svg"

/** Figma 25750:4383 */
export const dashboardSecondaryEmailModalContent: DashboardSecondaryEmailModalContent =
  {
    fieldLabel: "Secondary email",
    placeholder: "Enter here...",
    submitLabel: "Save now",
    assets: {
      closeIcon: LOGIN_CLOSE,
    },
  }