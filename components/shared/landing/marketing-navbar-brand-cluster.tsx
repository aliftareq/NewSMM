"use client"

import type { ReactNode } from "react"

import { LinkTo } from "@/components/shared/link-to"
import { NavbarLogomark } from "@/components/shared/landing/navbar-logomark"
import { cn } from "@/lib/utils"

type MarketingNavbarBrandClusterProps = {
  logoHref: string
  logoAlt: string
  logomarkHoldStacked?: boolean
  logomarkSplitReveal?: boolean
  servicesButton: ReactNode
  className?: string
}

export function MarketingNavbarBrandCluster({
  logoHref,
  logoAlt,
  logomarkHoldStacked = false,
  logomarkSplitReveal = false,
  servicesButton,
  className,
}: MarketingNavbarBrandClusterProps) {
  return (
    <div className={cn("flex shrink-0 items-center gap-3", className)}>
      <div className="relative shrink-0">
        <LinkTo
          href={logoHref}
          className="relative block h-[39px] w-[50px] shrink-0 overflow-visible"
        >
          <NavbarLogomark
            holdStacked={logomarkHoldStacked}
            splitReveal={logomarkSplitReveal}
            className="absolute inset-[5.13%_2%_7.69%_2%] block size-auto max-w-none"
          />
          <span className="sr-only">{logoAlt}</span>
        </LinkTo>
      </div>

      <div className="hidden shrink-0 lg:block">{servicesButton}</div>
    </div>
  )
}
