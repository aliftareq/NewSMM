import Image from "next/image"

import { cn } from "@/lib/utils"
import type { StatsHighlightAvatar } from "@/types/landing/stats-highlight"

type StatsHighlightAvatarMarqueeProps = {
  avatars: StatsHighlightAvatar[]
  className?: string
}

function AvatarChip({ avatar }: { avatar: StatsHighlightAvatar }) {
  return (
    <div className="relative size-12 shrink-0 overflow-hidden rounded-[30px] border border-[#e8e8e3] bg-white">
      <Image
        src={avatar.src}
        alt={avatar.alt ?? ""}
        width={48}
        height={48}
        className="size-full object-cover"
      />
    </div>
  )
}

export function StatsHighlightAvatarMarquee({
  avatars,
  className,
}: StatsHighlightAvatarMarqueeProps) {
  if (!avatars.length) return null

  const loop = [...avatars, ...avatars, ...avatars]

  return (
    <div className={cn("flex w-max gap-1", className)}>
      {loop.map((avatar, index) => (
        <AvatarChip key={`${avatar.src}-${index}`} avatar={avatar} />
      ))}
    </div>
  )
}
