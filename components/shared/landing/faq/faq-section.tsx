import { LandingSectionBadge } from "@/components/shared/landing/landing-section-badge"
import { LandingSectionHeadingReveal } from "@/components/shared/landing/landing-section-heading-reveal"
import { FaqAccordion } from "@/components/shared/landing/faq/faq-accordion"
import { landingFaqContent } from "@/data/landing/faq"
import { cn } from "@/lib/utils"
import type { LandingFaqContent } from "@/types/landing/faq"

type FaqSectionProps = {
  content?: LandingFaqContent
  className?: string
}

/** Figma 25704:30985 — FAQ section above pre-footer CTA */
export function FaqSection({
  content = landingFaqContent,
  className,
}: FaqSectionProps) {
  return (
    <section
      data-slot="landing-faq-section"
      className={cn("w-full bg-[#edf8fe] font-sans", className)}
      aria-labelledby="landing-faq-heading"
    >
      <div className="info-container flex flex-col items-center gap-12 px-4 py-16 sm:px-6 sm:py-16 md:py-20 xl:py-[80px]">
        <LandingSectionHeadingReveal className="flex w-full max-w-[723px] flex-col items-center gap-3 text-center">
          <LandingSectionBadge label={content.badgeLabel} />

          <h2
            id="landing-faq-heading"
            className="text-[28px] leading-tight font-semibold text-black sm:text-[32px] sm:leading-[39px]"
          >
            {content.headingPrimary}
            <span className="text-[#21aeff]">{content.headingAccent}</span>
          </h2>

          <p className="w-full text-base leading-normal font-normal text-pretty text-[#343e56]">
            {content.description}
          </p>
        </LandingSectionHeadingReveal>

        <FaqAccordion content={content} />
      </div>
    </section>
  )
}
