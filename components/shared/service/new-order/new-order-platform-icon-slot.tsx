import type { ServicesModalPlatformIcon } from "@/types/landing/services-modal"
import { cn } from "@/lib/utils"

type NewOrderPlatformIconSlotProps = {
  icon: ServicesModalPlatformIcon
  spriteSrc: string
  className?: string
}

export function NewOrderPlatformIconSlot({
  icon,
  spriteSrc,
  className,
}: NewOrderPlatformIconSlotProps) {
  const crop =
    icon.kind === "sprite"
      ? icon.cropClassName
      : (icon.cropClassName ??
        "absolute inset-0 size-full max-w-none object-cover")
  const src = icon.kind === "sprite" ? spriteSrc : icon.src

  return (
    <div
      className={cn(
        "relative h-[42px] w-[40.895px] shrink-0 overflow-hidden rounded-[8.842px] bg-[#ededed]",
        className,
      )}
    >
      <span className="absolute left-1/2 top-1/2 block size-6 -translate-x-1/2 -translate-y-1/2 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src={src} className={crop} />
      </span>
    </div>
  )
}
