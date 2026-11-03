import type { LandingFooterContent } from "@/types/landing/footer"

import { LinkTo } from "@/components/shared/link-to"

type FooterBottomBarProps = {
  legal: LandingFooterContent["legal"]
}

export function FooterBottomBar({ legal }: FooterBottomBarProps) {
  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 text-center text-sm leading-[1.3] text-dark-white sm:gap-6 md:flex-row md:items-center md:text-left">
      <p className="max-w-full min-w-0">
        <span className="leading-[1.3]">{legal.copyrightPrefix}</span>
        <span className="font-semibold leading-[1.5]">{legal.copyrightBrand}</span>
        <span className="leading-[1.3]"> </span>
        <span className="leading-[1.3]">{legal.copyrightSuffix}</span>
      </p>

      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:justify-end md:gap-[63px]">
        {legal.links.map((link) => (
          <LinkTo
            key={link.href}
            href={link.href}
            className="transition-opacity hover:opacity-80"
          >
            {link.label}
          </LinkTo>
        ))}
      </div>
    </div>
  )
}
