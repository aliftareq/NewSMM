import { LinkTo } from "@/components/shared/link-to"
import type { PrivacyPolicyPageContent } from "@/types/legal/privacy-policy-page"

type PrivacyPolicyHeroProps = {
  hero: PrivacyPolicyPageContent["hero"]
  breadcrumbChevronSrc: string
}

export function PrivacyPolicyHero({
  hero,
  breadcrumbChevronSrc,
}: PrivacyPolicyHeroProps) {
  return (
    <div className="flex w-full flex-col items-center gap-5 text-center">
      <nav
        aria-label="Breadcrumb"
        className="rounded-lg bg-white px-4 py-2.5"
      >
        <ol className="flex items-center gap-1">
          <li>
            <LinkTo
              href={hero.breadcrumb.homeHref}
              className="text-base font-medium leading-[1.18] text-[#888e9c]"
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

      <div className="flex w-full flex-col items-center gap-11">
        <div
          className="flex w-full flex-col items-center gap-4 max-w-[604px]"
          style={
            hero.descriptionMaxWidth
              ? { maxWidth: hero.descriptionMaxWidth }
              : undefined
          }
        >
          <h1 className="text-[36px] font-bold leading-[1.35] tracking-[0.36px] text-[#0e0e0e]">
            {hero.title}
            <span className="text-brand">{hero.titleHighlight}</span>
          </h1>
          <p className="text-base font-normal leading-[1.2] text-n600">
            {hero.description}
          </p>
        </div>
        <p className="text-xl font-semibold leading-[1.3] text-[#0e0e0e]">
          {hero.lastUpdated}
        </p>
      </div>
    </div>
  )
}
