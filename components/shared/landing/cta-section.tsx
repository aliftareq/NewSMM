import { CtaCard } from "@/components/shared/landing/cta-card";
import type { CtaContent } from "@/types/landing/cta";

type CtaSectionProps = {
  content?: CtaContent;
};

/** Aligns with hero/footer via `.info-container` (max 1320px), not Figma 300px side padding. */
export function CtaSection({ content }: CtaSectionProps) {
  return (
    <section
      className="py-12 font-sans sm:py-16 md:py-20 xl:py-[80px]"
      aria-labelledby="landing-cta-heading"
    >
      <div className="info-container flex w-full flex-col items-center px-4 sm:px-6 lg:px-8">
        <CtaCard content={content} headingId="landing-cta-heading" />
      </div>
    </section>
  );
}
