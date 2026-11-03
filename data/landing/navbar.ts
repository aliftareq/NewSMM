import type { LandingNavbarContent } from "@/types/landing/navbar"

const NAVBAR_IMG = "/images/landing/navbar"

export const landingNavbarContent: LandingNavbarContent = {
  assets: {
    logomark: `${NAVBAR_IMG}/logomark.svg`,
    servicesMenuIcon: `${NAVBAR_IMG}/services-menu.svg`,
    servicesChevron: `${NAVBAR_IMG}/chevron-down.svg`,
    cartIcon: `${NAVBAR_IMG}/cart.svg`,
    signUpArrow: `${NAVBAR_IMG}/sign-up-arrow.svg`,
  },
  logo: {
    href: "/",
    logomarkSrc: `${NAVBAR_IMG}/logomark.svg`,
    alt: "Social Panel home",
  },
  servicesMenu: {
    label: "Our services",
    href: "/services",
    menuIconSrc: `${NAVBAR_IMG}/services-menu.svg`,
    chevronSrc: `${NAVBAR_IMG}/chevron-down.svg`,
  },
  navLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Blog", href: "/blog" },
    { label: "Faq", href: "/faq" },
  ],
  cart: {
    href: "/cart",
    iconSrc: `${NAVBAR_IMG}/cart.svg`,
    label: "Cart",
  },
  auth: [
    { label: "Login", href: "/login", variant: "text" },
    { label: "Sign Up", href: "/register", variant: "primary" },
  ],
  signUpArrowSrc: `${NAVBAR_IMG}/sign-up-arrow.svg`,
}
