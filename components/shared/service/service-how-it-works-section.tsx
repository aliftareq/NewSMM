import { HowItWorksSection } from "@/components/shared/landing/how-it-works/how-it-works-section"
import { serviceHowItWorksData } from "@/data/service/how-it-works"
import type { HowItWorksData } from "@/types/service/how-it-works"
import { cn } from "@/lib/utils"

type ServiceHowItWorksSectionProps = {
  content?: HowItWorksData
  className?: string
}

/** Figma 25734:3771 — reuses landing step cards + grid */
export function ServiceHowItWorksSection({
  content = serviceHowItWorksData,
  className,
}: ServiceHowItWorksSectionProps) {
  return (
    <HowItWorksSection
      content={content}
      className={cn(className)}
      stepsGridClassName="md:grid-cols-2 xl:grid-cols-4"
    />
  )
}
