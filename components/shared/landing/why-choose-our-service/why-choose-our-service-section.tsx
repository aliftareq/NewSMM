import { AnimatedContent } from "@/components/shared/animated-content"
import { LandingSectionBadge } from "@/components/shared/landing/landing-section-badge"
import { LandingSectionHeadingReveal, landingScrollRevealProps } from "@/components/shared/landing/landing-section-heading-reveal"
import { WhyChooseOurServiceCard } from "@/components/shared/landing/why-choose-our-service/why-choose-our-service-card"
import { aboutWhyChooseOurServiceContent } from "@/data/landing/why-choose-our-service"
import { cn } from "@/lib/utils"
import type { WhyChooseOurServiceContent } from "@/types/landing/why-choose-our-service"

type WhyChooseOurServiceSectionProps = {
  content?: WhyChooseOurServiceContent
  className?: string
}

/** Figma 25687:7642 — About page “Why Choose Our Services” grid */
export function WhyChooseOurServiceSection({
  content = aboutWhyChooseOurServiceContent,
  className,
}: WhyChooseOurServiceSectionProps) {
  const { badgeLabel, headingBefore, headingAccent, description, topRow, bottomRow } =
    content

  return (
    <section
      id="whyChooseOurService"
      data-slot="why-choose-our-service-section"
      aria-labelledby="why-choose-our-service-heading"
      className={cn("relative w-full bg-white py-16 md:py-20 xl:py-20", className)}
    >
      <div className="info-container flex flex-col items-center gap-[60px]">
        <LandingSectionHeadingReveal
          className="flex w-full max-w-[783px] flex-col items-center gap-3 text-center"
          stagger={0}
          threshold={0.12}
        >
          <LandingSectionBadge label={badgeLabel} />

          <h2
            id="why-choose-our-service-heading"
            className="text-[32px] font-semibold leading-normal text-black"
          >
            {headingBefore}
            <span className="text-button">{headingAccent}</span>
          </h2>

          <p className="text-base font-normal leading-normal text-n600">{description}</p>
        </LandingSectionHeadingReveal>

        <div className="flex w-full max-w-[1320px] flex-col gap-4">
          <AnimatedContent
            className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
            {...landingScrollRevealProps}
            threshold={0.12}
          >
            {topRow.map((card) => (
              <WhyChooseOurServiceCard key={card.id} card={card} />
            ))}
          </AnimatedContent>

          <AnimatedContent
            className="grid w-full grid-cols-1 gap-4 md:grid-cols-2"
            {...landingScrollRevealProps}
            delay={0.1}
            threshold={0.12}
          >
            {bottomRow.map((card) => (
              <WhyChooseOurServiceCard key={card.id} card={card} />
            ))}
          </AnimatedContent>
        </div>
      </div>
    </section>
  )
}
