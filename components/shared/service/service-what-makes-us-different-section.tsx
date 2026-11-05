import { WhatMakesUsDifferentSection } from "@/components/shared/landing/what-makes-us-different/what-makes-us-different-section"
import { serviceWhatMakesUsDifferentData } from "@/data/service/what-makes-us-different"
import type { WhatMakesUsDifferentContent } from "@/types/service/what-makes-us-different"
import { cn } from "@/lib/utils"

type ServiceWhatMakesUsDifferentSectionProps = {
  content?: WhatMakesUsDifferentContent
  className?: string
}

/** Figma 25734:4211 — reuses landing comparison layout with service copy */
export function ServiceWhatMakesUsDifferentSection({
  content = serviceWhatMakesUsDifferentData,
  className,
}: ServiceWhatMakesUsDifferentSectionProps) {
  return (
    <WhatMakesUsDifferentSection
      content={content}
      className={cn(className)}
    />
  )
}
