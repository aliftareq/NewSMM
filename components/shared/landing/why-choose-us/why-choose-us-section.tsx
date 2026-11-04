import { WhyChooseUsSectionBody } from "@/components/shared/landing/why-choose-us/why-choose-us-section-body"
import { WhyChooseUsSectionDecorations } from "@/components/shared/landing/why-choose-us/why-choose-us-section-decorations"
import { landingWhyChooseUsContent } from "@/data/landing/why-choose-us"
import { cn } from "@/lib/utils";
import type { WhyChooseUsContent } from "@/types/landing/why-choose-us";

type WhyChooseUsSectionProps = {
  content?: WhyChooseUsContent;
  className?: string;
};

/** Figma 25704:30794 — our-platforms / Why Choose Us */
export function WhyChooseUsSection({
  content = landingWhyChooseUsContent,
  className,
}: WhyChooseUsSectionProps) {
  return (
    <section
      data-slot="landing-why-choose-us-section"
      className={cn("relative bg-white font-sans", className)}
      aria-labelledby="landing-why-choose-us-heading"
    >
      <WhyChooseUsSectionDecorations />
      <WhyChooseUsSectionBody content={content} />
    </section>
  );
}
