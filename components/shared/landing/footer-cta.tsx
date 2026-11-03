import type { LandingFooterContent } from "@/types/landing/footer"

import { buttonVariants } from "@/components/ui/button"
import { LinkTo } from "@/components/shared/link-to"
import { cn } from "@/lib/utils"

const PRIMARY_BUTTON_ARROW = "/images/ui/arrow-up-right.svg"

type FooterCtaProps = {
  cta: LandingFooterContent["cta"]
}

export function FooterCta({ cta }: FooterCtaProps) {
  return (
    <div className="flex w-full flex-col items-start justify-between gap-8 lg:flex-row lg:gap-0">
      <h2 className="max-w-[398px] text-[32px] font-semibold leading-normal text-white">
        {cta.headingLines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h2>

      <div className="flex max-w-[599px] flex-col gap-7">
        <p className="text-base font-medium leading-[1.35] text-n30">
          {cta.description}
        </p>
        <LinkTo
          href={cta.button.href}
          className={cn(
            buttonVariants({ variant: "default", size: "default" }),
            "h-[54px] min-h-[54px] px-[21.943px] text-lg leading-normal shadow-[inset_0px_0px_7.314px_0px_rgba(255,255,255,0.5)]"
          )}
        >
          {cta.button.label}
          <span
            className="flex size-[21.943px] shrink-0 items-center justify-center rounded-full bg-white p-[3.657px]"
            aria-hidden
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={PRIMARY_BUTTON_ARROW}
              width={10.9714}
              height={10.9714}
              className="block shrink-0"
            />
          </span>
        </LinkTo>
      </div>
    </div>
  )
}
