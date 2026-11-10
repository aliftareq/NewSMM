import { GrowthPackagePricingCard } from "@/components/shared/service/growth-package/growth-package-pricing-card"
import { GrowthPackageTrustRow } from "@/components/shared/service/growth-package/growth-package-trust-row"
import { LandingSectionHeadingReveal } from "@/components/shared/landing/landing-section-heading-reveal"
import { serviceGrowthPackageData } from "@/data/service/growth-package"
import type { GrowthPackageData } from "@/types/service/growth-package"
import { cn } from "@/lib/utils"

type ServiceGrowthPackageSectionProps = {
  content?: GrowthPackageData
  className?: string
}

/** Figma 25734:3903 — Instagram growth package table */
export function ServiceGrowthPackageSection({
  content = serviceGrowthPackageData,
  className,
}: ServiceGrowthPackageSectionProps) {
  const { intro, trustItems, assets } = content

  return (
    <section
      id="growth-package"
      data-slot="service-growth-package-section"
      className={cn("relative w-full bg-[#edf8fe]", className)}
    >
      <div className="info-container flex flex-col items-center gap-12 py-16 md:gap-12 md:py-20">
        <LandingSectionHeadingReveal className="flex max-w-[723px] flex-col items-center gap-3 text-center">
          <div className="stats-highlight-subheading shrink-0 overflow-visible rounded-[33px] border-[0.5px] border-[#e8e8e3] bg-white/50 px-2 py-1">
            <div className="overflow-visible rounded-full border border-white bg-[#fafafa] px-3 py-1.5 shadow-[0px_2px_1.5px_0px_rgba(183,183,183,0.25)]">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="relative flex size-2.5 shrink-0 items-center justify-center overflow-visible"
                >
                  <span className="section-heading-dot-ripple" />
                  <span className="section-heading-dot-ripple section-heading-dot-ripple--delayed" />
                  <span className="relative z-1 block size-1 rounded-full bg-button shadow-[0_0_4px_2px_rgba(38,157,231,0.45)]" />
                </span>
                <p className="section-subtitle-label text-button font-medium">
                  {intro.badgeLabel}
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-balance text-[26px] font-semibold leading-tight text-black sm:text-[32px] sm:leading-normal">
            {intro.headingPrefix}
            <span className="text-button">{intro.headingHighlight}</span>
          </h2>

          <p className="text-base leading-normal text-n600">{intro.description}</p>
        </LandingSectionHeadingReveal>

        <div className="flex w-full max-w-[1320px] flex-col items-center gap-6">
          <GrowthPackagePricingCard content={content} />
          <GrowthPackageTrustRow
            items={trustItems}
            checkIconSrc={assets.trustCheckIcon}
          />
        </div>
      </div>
    </section>
  )
}
