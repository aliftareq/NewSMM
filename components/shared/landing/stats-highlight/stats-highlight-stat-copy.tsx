import { StatsHighlightCountUp } from "@/components/shared/landing/stats-highlight/stats-highlight-count-up"
import { cn } from "@/lib/utils"
import type { StatsHighlightStat } from "@/types/landing/stats-highlight"

type StatsHighlightStatCopyProps = {
  stat: StatsHighlightStat
  labelClassName?: string
  valueClassName?: string
}

export function StatsHighlightStatCopy({
  stat,
  labelClassName,
  valueClassName,
}: StatsHighlightStatCopyProps) {
  return (
    <div className="flex flex-col gap-2">
      <p
        className={cn(
          "text-base leading-normal font-medium text-[rgba(0,0,0,0.5)]",
          labelClassName,
        )}
      >
        {stat.label}
      </p>
      <StatsHighlightCountUp
        value={stat.value}
        className={cn(
          "font-heading text-[30px] leading-[1.4] font-semibold tracking-[-0.56px] text-[#202020] capitalize md:text-[28px]",
          valueClassName,
        )}
      />
    </div>
  )
}
