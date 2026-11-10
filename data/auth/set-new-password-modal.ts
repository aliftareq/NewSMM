import type { SetNewPasswordModalContent } from "@/types/auth/set-new-password-modal"

const FORGOT_IMG = "/images/auth/forgot-password-modal"
const LOGIN_IMG = "/images/auth/login-modal"

export const setNewPasswordModalContent: SetNewPasswordModalContent = {
  assets: {
    backArrow: `${FORGOT_IMG}/back-arrow.svg`,
    lockIcon: `${LOGIN_IMG}/lock.svg`,
    eyeOffIcon: `${LOGIN_IMG}/eye-off.svg`,
    eyeIcon: `${LOGIN_IMG}/eye.svg`,
  },
  title: "Set New Password",
  backLabel: "Back to two factor authentication",
  passwordLabel: "Password",
  passwordPlaceholder: "password",
  confirmPasswordLabel: "Confirm Password",
  confirmPasswordPlaceholder: "password",
  submitLabel: "Submit Now",
}
