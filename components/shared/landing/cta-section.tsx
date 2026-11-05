import { PreFooterCtaCard } from "@/components/shared/landing/pre-footer-cta-card"
import { AnimatedContent } from "@/components/shared/animated-content"
import { landingScrollRevealProps } from "@/components/shared/landing/landing-section-heading-reveal"
import type { PreFooterCtaContent } from "@/types/landing/pre-footer-cta"

type CtaSectionProps = {
  content?: PreFooterCtaContent
}

/** Aligns with hero/footer via `.info-container` (max 1320px), not Figma 300px side padding. */
export function CtaSection({ content }: CtaSectionProps) {
  return (
    <section
      className="py-12 font-sans sm:py-16 md:py-20 xl:py-[80px]"
      aria-labelledby="pre-footer-cta-heading"
    >
      <div className="info-container flex w-full flex-col items-center px-4 sm:px-6 lg:px-8">
        <AnimatedContent className="w-full" {...landingScrollRevealProps}>
          <PreFooterCtaCard content={content} headingId="pre-footer-cta-heading" />
        </AnimatedContent>
      </div>
    </section>
  )
}
