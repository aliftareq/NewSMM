import { AnimatedContent } from "@/components/shared/animated-content"
import { LinkTo } from "@/components/shared/link-to"
import { LandingSectionBadge } from "@/components/shared/landing/landing-section-badge"
import { landingScrollRevealProps } from "@/components/shared/landing/landing-section-heading-reveal"
import { SocialMediaSolutionCardsPanel } from "@/components/shared/landing/social-media-solution/social-media-solution-cards-panel"
import { aboutSocialMediaSolutionContent } from "@/data/landing/social-media-solution"
import { cn } from "@/lib/utils"
import type { SocialMediaSolutionContent } from "@/types/landing/social-media-solution"

type SocialMediaSolutionSectionProps = {
  content?: SocialMediaSolutionContent
  className?: string
}

/** Figma 25687:7689 — About “Our Social Media Solutions” */
export function SocialMediaSolutionSection({
  content = aboutSocialMediaSolutionContent,
  className,
}: SocialMediaSolutionSectionProps) {
  const {
    badgeLabel,
    headingLineOne,
    headingLineTwoAccent,
    description,
    cta,
    cards,
    arrowUpSrc,
    arrowDownSrc,
  } = content

  return (
    <section
      id="socialmediaSolution"
      data-slot="social-media-solution-section"
      aria-labelledby="social-media-solution-heading"
      className={cn("relative w-full bg-white py-16 md:py-20 xl:py-[72.5px]", className)}
    >
      <div className="info-container flex justify-center">
        <div className="flex w-full max-w-[1320px] flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
          <div className="flex w-full max-w-[554px] flex-col justify-between gap-10 lg:h-[581px] lg:gap-0">
            <AnimatedContent
              className="flex flex-col gap-3"
              {...landingScrollRevealProps}
              stagger={0}
              threshold={0.12}
            >
              <LandingSectionBadge label={badgeLabel} className="w-fit self-start" />

              <h2
                id="social-media-solution-heading"
                className="flex flex-col gap-0.5 text-[32px] font-semibold leading-none text-black"
              >
                <span className="block whitespace-pre-wrap">{headingLineOne}</span>
                <span className="mt-0 block text-[#21aeff]">{headingLineTwoAccent}</span>
              </h2>
            </AnimatedContent>

            <AnimatedContent
              className="flex flex-col gap-6"
              {...landingScrollRevealProps}
              stagger={0}
              delay={0.08}
              threshold={0.12}
            >
              <p className="w-full max-w-[554px] text-base font-normal leading-[1.5] text-n600">
                {description}
              </p>
              <LinkTo
                href={cta.href}
                className="inline-flex h-12 w-fit min-w-[168px] items-center justify-center rounded-[12px] bg-[#269de7] px-[18px] py-[6px] text-sm font-semibold leading-[1.5] text-white shadow-[inset_0px_0px_8px_0px_rgba(255,255,255,0.04)]"
              >
                {cta.label}
              </LinkTo>
            </AnimatedContent>
          </div>

          <SocialMediaSolutionCardsPanel
            cards={cards}
            arrowUpSrc={arrowUpSrc}
            arrowDownSrc={arrowDownSrc}
          />
        </div>
      </div>
    </section>
  )
}
