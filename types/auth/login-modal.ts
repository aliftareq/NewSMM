export type AuthModalTab = "login" | "sign-up"

export type LoginModalAssets = {
  logomark: string
  mailIcon: string
  lockIcon: string
  eyeOffIcon: string
  eyeIcon: string
  googleIcon: string
  closeIcon: string
}

export type LoginModalContent = {
  assets: LoginModalAssets
  brandTitle: string
  loginTabLabel: string
  signUpTabLabel: string
  emailLabel: string
  emailPlaceholder: string
  passwordLabel: string
  passwordPlaceholder: string
  rememberMeLabel: string
  forgotPasswordLabel: string
  submitLoginLabel: string
  orLoginWithLabel: string
  googleCtaLabel: string
  noAccountPrompt: string
  signUpNowLabel: string
  signUpHref: string
  signUpSubmitLabel: string
  haveAccountPrompt: string
  loginNowLabel: string
}
