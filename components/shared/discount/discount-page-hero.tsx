import { LinkTo } from "@/components/shared/link-to"
import type { DiscountPageContent } from "@/types/discount/discount-page"

type DiscountPageHeroProps = {
  hero: DiscountPageContent["hero"]
  breadcrumbChevronSrc: string
}

export function DiscountPageHero({
  hero,
  breadcrumbChevronSrc,
}: DiscountPageHeroProps) {
  return (
    <div className="flex w-full flex-col items-center gap-3 text-center">
      <nav
        aria-label="Breadcrumb"
        className="rounded-lg bg-white px-4 py-2.5"
      >
        <ol className="flex items-center gap-1">
          <li>
            <LinkTo
              href={hero.breadcrumb.homeHref}
              className="text-base font-medium leading-[1.18] text-[#6a7283]"
            >
              {hero.breadcrumb.homeLabel}
            </LinkTo>
          </li>
          <li
            aria-hidden
            className="relative flex size-4 shrink-0 items-center justify-center"
          >
            <span className="-rotate-90">
              <span className="relative block size-4 overflow-hidden">
                <span className="absolute inset-[33.3%_21.07%_33.35%_20.83%]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    src={breadcrumbChevronSrc}
                    width={9}
                    height={5}
                    className="absolute inset-0 block size-full max-w-none"
                  />
                </span>
              </span>
            </span>
          </li>
          <li>
            <span
              aria-current="page"
              className="text-base font-medium leading-[1.18] text-brand"
            >
              {hero.breadcrumb.currentLabel}
            </span>
          </li>
        </ol>
      </nav>

      <h1 className="w-full max-w-[757px] text-[36px] font-bold leading-[1.35] tracking-[0.36px] text-[#0e0e0e] whitespace-nowrap">
        {hero.title}
        <span className="text-brand">{hero.titleHighlight}</span>
      </h1>

      <p className="max-w-[669px] text-base font-normal leading-[1.5] text-n600">
        {hero.description}
      </p>
    </div>
  )
}
