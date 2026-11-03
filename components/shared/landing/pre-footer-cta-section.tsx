import { PreFooterCtaCard } from "@/components/shared/landing/pre-footer-cta-card"
import type { PreFooterCtaContent } from "@/types/landing/pre-footer-cta"

type PreFooterCtaSectionProps = {
  content?: PreFooterCtaContent
}

/** Aligns with hero/footer via `.info-container` (max 1320px), not Figma 300px side padding. */
export function PreFooterCtaSection({ content }: PreFooterCtaSectionProps) {
  return (
    <section
      className="py-12 font-sans sm:py-16 md:py-20 xl:py-[80px]"
      aria-labelledby="pre-footer-cta-heading"
    >
      <div className="info-container flex w-full flex-col items-center px-4 sm:px-6 lg:px-8">
        <PreFooterCtaCard content={content} headingId="pre-footer-cta-heading" />
      </div>
    </section>
  )
}
