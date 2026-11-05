"use client"

import {
  BrandLogomarkSplit,
  NAVBAR_BRAND_LOGOMARK,
} from "@/components/shared/landing/brand-logomark-split"

type NavbarLogomarkProps = {
  className?: string
  holdStacked?: boolean
  splitReveal?: boolean
}

export function NavbarLogomark({
  className,
  holdStacked = false,
  splitReveal = false,
}: NavbarLogomarkProps) {
  return (
    <BrandLogomarkSplit
      {...NAVBAR_BRAND_LOGOMARK}
      className={className}
      holdStacked={holdStacked}
      splitReveal={splitReveal}
    />
  )
}
