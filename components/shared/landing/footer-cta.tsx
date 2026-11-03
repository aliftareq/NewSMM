import type { LandingFooterContent } from "@/types/landing/footer"

import { buttonVariants } from "@/components/ui/button"
import { LinkTo } from "@/components/shared/link-to"
import { cn } from "@/lib/utils"

const PRIMARY_BUTTON_ARROW = "/images/ui/arrow-up-right.svg"

type FooterCtaProps = {
  cta: LandingFooterContent["cta"]
  glareStarLeft: string
  glareStarRight: string
}

export function FooterCta({ cta, glareStarLeft, glareStarRight }: FooterCtaProps) {
  return (
    <div className="relative flex w-full min-w-0 flex-col items-start justify-between gap-6 pb-8 sm:gap-8 sm:pb-10 xl:flex-row xl:gap-0 xl:pb-0">
      {/* Mobile / tablet: stars aligned to CTA block (Figma absolute stars from xl+) */}
      <div
        className="pointer-events-none absolute top-0 right-0 z-0 xl:hidden"
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={glareStarRight}
          width={136}
          height={144}
          className="block h-[44px] w-[42px] object-contain sm:h-[52px] sm:w-[49px]"
        />
      </div>
      <div
        className="pointer-events-none absolute bottom-0 left-0 z-0 -translate-x-1 translate-y-2 xl:hidden"
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={glareStarLeft}
          width={136}
          height={144}
          className="block h-[44px] w-[42px] object-contain sm:h-[52px] sm:w-[49px]"
        />
      </div>

      <div className="relative z-[1] w-full min-w-0 max-w-[398px] shrink-0 pr-12 sm:pr-14 xl:w-[398px] xl:max-w-[398px] xl:pr-0">
        <h2 className="text-[26px] font-semibold leading-[1.22] text-white sm:text-[30px] sm:leading-[36px] xl:text-[32px] xl:leading-[39px]">
          {cta.headingLines.map((line) => (
            <span key={line} className="block xl:whitespace-nowrap">
              {line}
            </span>
          ))}
        </h2>
      </div>

      <div className="relative z-[1] flex w-full min-w-0 max-w-[599px] shrink-0 flex-col gap-5 sm:gap-7 xl:w-[599px]">
        <p className="text-sm font-medium leading-[1.35] text-n30 sm:text-base">
          {cta.description}
        </p>
        <LinkTo
          href={cta.button.href}
          className={cn(
            buttonVariants({ variant: "default", size: "default" }),
            "w-fit max-w-full self-start",
            "h-[50px] min-h-[50px] gap-[10.971px] px-[21.943px] text-base font-medium leading-[1.5] sm:h-[54px] sm:min-h-[54px] sm:text-[18px]",
            "shadow-[inset_0px_0px_7.314px_0.914px_rgba(255,255,255,0.5)]"
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
