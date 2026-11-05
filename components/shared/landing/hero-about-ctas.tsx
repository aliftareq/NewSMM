import { LinkTo } from "@/components/shared/link-to"
import {
  buttonVariants,
  PrimaryButtonArrow,
} from "@/components/ui/button"
import type { HeroCtaLink } from "@/types/landing/hero"
import { cn } from "@/lib/utils"

type HeroAboutCtasProps = {
  primary: HeroCtaLink
  secondary: HeroCtaLink
}

export function HeroAboutCtas({ primary, secondary }: HeroAboutCtasProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-[14.629px]">
      <LinkTo
        href={primary.href}
        className={cn(buttonVariants({ variant: "default", size: "default" }))}
      >
        {primary.label}
        <PrimaryButtonArrow />
      </LinkTo>
      <LinkTo
        href={secondary.href}
        className={cn(buttonVariants({ variant: "outline", size: "default" }))}
      >
        {secondary.label}
      </LinkTo>
    </div>
  )
}
