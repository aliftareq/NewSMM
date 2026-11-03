import type { LandingFooterContent } from "@/types/landing/footer"

import { LinkTo } from "@/components/shared/link-to"

type FooterBottomBarProps = {
  legal: LandingFooterContent["legal"]
}

export function FooterBottomBar({ legal }: FooterBottomBarProps) {
  return (
    <div className="flex w-full flex-col items-start justify-between gap-4 text-sm leading-[1.3] text-dark-white md:flex-row md:items-center">
      <p>
        <span>{legal.copyrightPrefix}</span>
        <span className="font-semibold leading-normal">{legal.copyrightBrand}</span>
        <span>{legal.copyrightSuffix}</span>
      </p>

      <div className="flex flex-wrap items-center gap-[63px]">
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
