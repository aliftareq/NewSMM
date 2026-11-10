import type { LoginModalContent } from "@/types/auth/login-modal"

const IMG = "/images/auth/login-modal"
const NAVBAR_LOGO = "/images/landing/navbar/logomark.svg"

export const loginModalContent: LoginModalContent = {
  assets: {
    logomark: NAVBAR_LOGO,
    mailIcon: `${IMG}/mail.svg`,
    lockIcon: `${IMG}/lock.svg`,
    eyeOffIcon: `${IMG}/eye-off.svg`,
    eyeIcon: `${IMG}/eye.svg`,
    googleIcon: `${IMG}/google.svg`,
    closeIcon: `${IMG}/close.svg`,
  },
  brandTitle: "SOCIAL PANEL",
  loginTabLabel: "Login",
  signUpTabLabel: "Sign Up",
  emailLabel: "Enter your email address",
  emailPlaceholder: "email",
  passwordLabel: "Enter your password",
  passwordPlaceholder: "password",
  rememberMeLabel: "Remember Me",
  forgotPasswordLabel: "Forgot Password?",
  submitLoginLabel: "Login",
  orLoginWithLabel: "Or login with",
  googleCtaLabel: "Continue with google",
  noAccountPrompt: "Don't have an account?",
  signUpNowLabel: "Sign Up Now",
  signUpHref: "/register",
  signUpSubmitLabel: "Sign Up",
  haveAccountPrompt: "Already have an account?",
  loginNowLabel: "Login Now",
}
