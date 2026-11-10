import type { ForgotPasswordModalContent } from "@/types/auth/forgot-password-modal"

const IMG = "/images/auth/forgot-password-modal"
const LOGIN_IMG = "/images/auth/login-modal"

export const forgotPasswordModalContent: ForgotPasswordModalContent = {
  assets: {
    backArrow: `${IMG}/back-arrow.svg`,
    dividerLine: `${IMG}/divider-line.svg`,
    mailIcon: `${LOGIN_IMG}/mail.svg`,
    closeIcon: `${LOGIN_IMG}/close.svg`,
  },
  title: "Reset Password",
  backLabel: "Back to login",
  emailLabel: "Enter your email address",
  emailPlaceholder: "email",
  continueLabel: "Continue",
}
