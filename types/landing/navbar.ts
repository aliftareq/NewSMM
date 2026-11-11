export type NavbarNavLink = {
  label: string
  href: string
}

export type NavbarAuthAction = {
  label: string
  href: string
  variant: "text" | "primary"
}

export type LandingNavbarContent = {
  logo: {
    href: string
    logomarkSrc: string
    alt: string
  }
  servicesMenu: {
    label: string
    href: string
    menuIconSrc: string
    chevronSrc: string
  }
  navLinks: NavbarNavLink[]
  cart: {
    href: string
    iconSrc: string
    label: string
  }
  auth: NavbarAuthAction[]
  signUpArrowSrc: string
  userMenu: {
    avatarIconSrc: string
    chevronIconSrc: string
    logOutLabel: string
  }
  assets: {
    logomark: string
    servicesMenuIcon: string
    servicesChevron: string
    cartIcon: string
    signUpArrow: string
    userMenuAvatar: string
    userMenuChevron: string
  }
}
