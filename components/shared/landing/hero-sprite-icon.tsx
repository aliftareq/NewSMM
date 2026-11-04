import type { HeroSpriteCrop } from "@/types/landing/hero"

type HeroSpriteIconProps = {
  spriteSrc: string
  crop: HeroSpriteCrop
  containerClassName?: string
}

export function HeroSpriteIcon({
  spriteSrc,
  crop,
  containerClassName = "size-[18px]",
}: HeroSpriteIconProps) {
  return (
    <span
      className={`relative inline-block shrink-0 overflow-hidden ${containerClassName}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        src={spriteSrc}
        className="absolute max-w-none"
        style={{
          width: crop.width,
          height: crop.height,
          left: crop.left,
          top: crop.top,
        }}
      />
    </span>
  )
}
