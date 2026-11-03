import type { FooterNavLink } from "@/types/landing/footer"

import { LinkTo } from "@/components/shared/link-to"

import { cn } from "@/lib/utils"

type FooterLinkColumnProps = {
  title: string
  links: FooterNavLink[]
  className?: string
}

export function FooterLinkColumn({
  title,
  links,
  className,
}: FooterLinkColumnProps) {
  return (
    <nav className={cn("min-w-0", className)} aria-label={title}>
      <div className="flex flex-col gap-5">
        <p className="text-xl font-medium leading-6 text-white">{title}</p>
        <ul className="flex flex-col gap-[15px]">
        {links.map((link) => (
          <li key={link.href}>
            <LinkTo
              href={link.href}
              className="text-sm font-medium leading-[1.35] text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </LinkTo>
          </li>
        ))}
        </ul>
      </div>
    </nav>
  )
}
