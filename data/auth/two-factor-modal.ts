import type { TwoFactorModalContent } from "@/types/auth/two-factor-modal"

const FORGOT_IMG = "/images/auth/forgot-password-modal"

export const twoFactorModalContent: TwoFactorModalContent = {
  assets: {
    backArrow: `${FORGOT_IMG}/back-arrow.svg`,
    dividerLine: `${FORGOT_IMG}/divider-line.svg`,
  },
  title: "Two Factor Authentication",
  backLabel: "Back to reset password",
  codeLabel: "Code",
  submitLabel: "Submit Now",
  codeLength: 6,
}
