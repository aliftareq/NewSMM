import { WhoItsForSectionBody } from "@/components/shared/landing/who-its-for/who-its-for-section-body"
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
      <WhoItsForSectionBody content={content} />
    </section>
  )
}
