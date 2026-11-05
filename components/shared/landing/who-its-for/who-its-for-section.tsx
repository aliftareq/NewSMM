import { WhoItsForCardsStage } from "@/components/shared/landing/who-its-for/who-its-for-cards-stage"
import { LandingSectionHeadingReveal } from "@/components/shared/landing/landing-section-heading-reveal"
import { landingWhoItsForContent } from "@/data/landing/who-its-for"
import { cn } from "@/lib/utils"
import type { WhoItsForSectionContent } from "@/types/landing/who-its-for"

type WhoItsForSectionProps = {
  content?: WhoItsForSectionContent
  className?: string
}

/** Figma 25704:30434 — Who it’s for / audience cards */
export function WhoItsForSection({
  content = landingWhoItsForContent,
  className,
}: WhoItsForSectionProps) {
  const {
    badgeLabel,
    headlineBefore,
    headlineHighlight,
    description,
    audiencesLeft,
    audiencesRight,
    assets,
  } = content

  return (
    <section
      id="whoitsfor"
      aria-labelledby="whoitsfor-heading"
      data-slot="who-its-for-section"
      className={cn(
        "relative overflow-x-clip bg-[#edf8fe] py-16 md:py-20 xl:py-20",
        className,
      )}
    >
      <div className="info-container flex flex-col items-center gap-[60px]">
        <LandingSectionHeadingReveal className="flex w-full max-w-[903px] flex-col items-center gap-3 text-center">
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
                  {badgeLabel}
                </p>
              </div>
            </div>
          </div>

          <h2
            id="whoitsfor-heading"
            className="text-[32px] font-semibold leading-normal text-black"
          >
            {headlineBefore}
            <span className="text-button">{headlineHighlight}</span>
          </h2>

          <p className="text-base font-normal leading-normal text-n600">
            {description}
          </p>
        </LandingSectionHeadingReveal>

        <WhoItsForCardsStage
          audiencesLeft={audiencesLeft}
          audiencesRight={audiencesRight}
          dividerSrc={assets.cardDividerSrc}
          stepperSrc={assets.centerStepperSrc}
          logomarkSrc={assets.centerLogomarkSrc}
        />
      </div>
    </section>
  )
}
