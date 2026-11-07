import type { HeroTrustStrip } from "@/types/landing/hero"
import { cn } from "@/lib/utils"

type HeroTrustStripProps = HeroTrustStrip

export function HeroTrustStrip({ avatarSrcs, label, labelGradient }: HeroTrustStripProps) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <div className="flex items-center pl-0">
        {avatarSrcs.map((src, index) => (
          <span
            key={src}
            className={cn(
              "relative size-6 shrink-0 overflow-hidden rounded-[15px] border-[0.5px] border-[#e8e8e3] bg-white",
              index > 0 && "-ml-2.5",
            )}
            style={{ zIndex: avatarSrcs.length - index }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={src}
              className="size-full object-cover"
              width={24}
              height={24}
            />
          </span>
        ))}
      </div>
      <p
        className="bg-clip-text text-base font-semibold leading-[1.4] text-transparent"
        style={{ backgroundImage: labelGradient }}
      >
        {label}
      </p>
    </div>
  )
}
