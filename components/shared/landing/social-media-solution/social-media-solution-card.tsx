import { forwardRef } from "react"

import type { SocialMediaSolutionCard as SocialMediaSolutionCardType } from "@/types/landing/social-media-solution"
import { cn } from "@/lib/utils"

type SocialMediaSolutionCardProps = {
  card: SocialMediaSolutionCardType
  className?: string
}

export const SocialMediaSolutionCard = forwardRef<
  HTMLElement,
  SocialMediaSolutionCardProps
>(function SocialMediaSolutionCard({ card, className }, ref) {
  return (
    <article
      ref={ref}
      data-slot="social-media-solution-card"
      className={cn(
        "w-full rounded-[20px] border border-[#dfe0e4] bg-white p-[28px]",
        className,
      )}
    >
      <div className="flex flex-col gap-[18px]">
        <h3 className="text-[20px] font-medium leading-none text-[#1f2327]">
          {card.title}
        </h3>
        <p className="text-[18px] font-normal leading-[1.5] text-[#4f586d]">
          {card.description}
        </p>
      </div>
    </article>
  )
})
