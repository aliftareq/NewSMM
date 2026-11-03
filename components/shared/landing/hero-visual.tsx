import type { LandingHeroContent } from "@/types/landing/hero"

import { HeroSpriteIcon } from "@/components/shared/landing/hero-sprite-icon"

type HeroVisualProps = {
  visual: LandingHeroContent["visual"]
  spriteSrc: string
}

export function HeroVisual({ visual, spriteSrc }: HeroVisualProps) {
  return (
    <div className="relative mx-auto h-[560px] w-full max-w-[480px] overflow-hidden rounded-[24px] bg-white">
      <div
        className="absolute top-0 right-0 h-[560px] w-[238px] bg-blue-brand"
        aria-hidden
      />

      <div className="absolute top-[10px] right-0 flex h-[529px] w-20 items-center justify-center">
        <p className="-rotate-90 text-[80px] font-bold leading-none whitespace-nowrap text-white">
          <span>{visual.verticalTitle.social}</span>
          <span className="text-[#202020]">{visual.verticalTitle.growth}</span>
        </p>
      </div>

      <div className="absolute top-[15px] left-[23px] h-[548px] w-[404px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={visual.professionalImage.alt}
          src={visual.professionalImage.src}
          className={visual.professionalImage.className}
        />
      </div>

      <div className="absolute top-[535px] left-[47px] rounded-[20.321px] border border-[#0087d4] bg-white/[0.08] px-[23.708px] py-[16.934px] backdrop-blur-[2px]">
        <div className="flex items-center gap-[20.66px]">
          {visual.socialBarIcons.map((icon) => (
            <span
              key={icon.id}
              className="flex size-[51.65px] items-center justify-center"
            >
              <HeroSpriteIcon
                spriteSrc={spriteSrc}
                crop={icon.sprite}
                containerClassName="size-[49.584px]"
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
