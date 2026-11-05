import { ServicesExplorerCard } from "@/components/shared/landing/services-explorer/services-explorer-card"
import {
  LandingSectionHeadingReveal,
} from "@/components/shared/landing/landing-section-heading-reveal"
import { landingExploreAllServicesData } from "@/data/landing/explore-all-services"
import { cn } from "@/lib/utils"
import type { ExploreAllServicesData } from "@/types/landing/explore-all-services"

type ExploreAllServicesSectionProps = {
  content?: ExploreAllServicesData
  className?: string
}

/** Figma 25704:29226 — Explore All Services */
export function ExploreAllServicesSection({
  content = landingExploreAllServicesData,
  className,
}: ExploreAllServicesSectionProps) {
  const { intro } = content

  return (
    <section
      data-slot="explore-all-services-section"
      className={cn("relative w-full bg-[rgba(27,171,243,0.08)]", className)}
    >
      <div className="info-container flex flex-col items-center gap-[60px] py-16 md:py-20 lg:py-20">
        <LandingSectionHeadingReveal className="flex max-w-[914px] flex-col items-center gap-3 text-center">
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

          <h2 className="text-[32px] font-semibold leading-normal text-black">
            {intro.headingPrefix}
            <span className="text-button">{intro.headingHighlight}</span>
          </h2>

          <p className="text-base leading-normal text-n600">{intro.description}</p>
        </LandingSectionHeadingReveal>

        <ServicesExplorerCard />
      </div>
    </section>
  )
}
