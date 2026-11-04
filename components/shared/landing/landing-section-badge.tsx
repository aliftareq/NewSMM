import { cn } from "@/lib/utils"

type LandingSectionBadgeProps = {
  label: string
  className?: string
}

/** Section pill badge with dual ripple dot (matches Payment Methods / stats highlight). */
export function LandingSectionBadge({
  label,
  className,
}: LandingSectionBadgeProps) {
  return (
    <div
      className={cn(
        "stats-highlight-subheading shrink-0 overflow-visible rounded-[33px] border-[0.5px] border-[#e8e8e3] bg-white/50 px-2 py-1",
        className,
      )}
    >
      <div className="overflow-visible rounded-full border border-white bg-[#fafafa] px-3 py-1.5 shadow-[0px_2px_1.5px_0px_rgba(183,183,183,0.25)]">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="relative flex size-2.5 shrink-0 items-center justify-center overflow-visible"
          >
            <span className="section-heading-dot-ripple" />
            <span className="section-heading-dot-ripple section-heading-dot-ripple--delayed" />
            <span className="relative z-1 block size-1 rounded-full bg-button shadow-[0_0_4px_2px_rgba(38,157,231,0.45)]" />
          </span>
          <p className="section-subtitle-label text-button font-medium">{label}</p>
        </div>
      </div>
    </div>
  )
}
