import { StatsHighlightAvatarMarquee } from "@/components/shared/landing/stats-highlight/stats-highlight-avatar-marquee"
import { StatsHighlightCountUp } from "@/components/shared/landing/stats-highlight/stats-highlight-count-up"
import { cn } from "@/lib/utils"
import type { StatsHighlightStat } from "@/types/landing/stats-highlight"

type StatsHighlightAvatarCardProps = {
  stat: StatsHighlightStat
  rowOneAvatars: { src: string; alt?: string }[]
  rowTwoAvatars: { src: string; alt?: string }[]
  className?: string
}

const AVATAR_CARD_EDGE_FADE_GRADIENT =
  "linear-gradient(-89.92934243207606deg, rgb(255, 255, 255) 0.27685%, rgba(255, 255, 255, 0) 99.721%)"

function CardEdgeFade({ side }: { side: "left" | "right" }) {
  const fadeLayer = (
    <div
      className="relative h-[299px] w-[66px] overflow-clip rounded-br-[16px] rounded-tr-[20px] backdrop-blur-[5px]"
      style={{ backgroundImage: AVATAR_CARD_EDGE_FADE_GRADIENT }}
    />
  )

  if (side === "right") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-px right-0 z-20"
      >
        {fadeLayer}
      </div>
    )
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-[-4px] z-20 flex h-[299px] w-[66px] items-center justify-center"
    >
      <div className="-scale-y-100 flex-none rotate-180">{fadeLayer}</div>
    </div>
  )
}

export function StatsHighlightAvatarCard({
  stat,
  rowOneAvatars,
  rowTwoAvatars,
  className,
}: StatsHighlightAvatarCardProps) {
  return (
    <article
      data-slot="stats-highlight-avatar-card"
      className={cn("relative h-[300px] overflow-hidden rounded-2xl", className)}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl border-b border-[rgba(0,0,0,0.09)] bg-white"
      />

      <div className="absolute inset-x-0 top-0 z-10 h-[130px] overflow-hidden">
        <div className="stats-avatar-marquee-ltr absolute top-[18px] left-[-14px] w-max will-change-transform">
          <StatsHighlightAvatarMarquee avatars={rowOneAvatars} />
        </div>

        <div className="stats-avatar-marquee-rtl absolute top-[76px] left-[14px] w-max will-change-transform">
          <StatsHighlightAvatarMarquee avatars={rowTwoAvatars} />
        </div>
      </div>

      <CardEdgeFade side="left" />
      <CardEdgeFade side="right" />

      <div className="absolute top-[214px] left-[25px] z-30 flex w-[169px] flex-col gap-2">
        <p className="text-base leading-normal font-medium text-[rgba(0,0,0,0.5)]">
          {stat.label}
        </p>
        <StatsHighlightCountUp
          value={stat.value}
          className="font-heading text-[30px] leading-[1.4] font-semibold tracking-[-0.56px] text-[#202020] capitalize md:text-[28px]"
        />
      </div>
    </article>
  )
}
