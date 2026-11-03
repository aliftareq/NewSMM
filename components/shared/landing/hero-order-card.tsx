import type { ReactNode } from "react"
import type { LandingHeroContent } from "@/types/landing/hero"

import { HeroSpriteIcon } from "@/components/shared/landing/hero-sprite-icon"

type HeroOrderCardProps = {
  orderCard: LandingHeroContent["orderCard"]
  chevronSrc: string
  spriteSrc: string
}

function HeroSelectRow({
  label,
  value,
  chevronSrc,
  leading,
}: {
  label: string
  value: string
  chevronSrc: string
  leading: ReactNode
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <p className="text-base font-medium leading-[1.35] text-n500">{label}</p>
      <div className="flex min-h-[63px] w-full items-center justify-between rounded-xl border border-n20 bg-n20 px-5 py-[18px]">
        <div className="flex items-center gap-1.5">
          {leading}
          <span className="whitespace-nowrap text-lg font-medium leading-normal text-n600">
            {value}
          </span>
        </div>
        <span className="relative size-6 shrink-0 rotate-180 -scale-y-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={chevronSrc} className="block size-full max-w-none" />
        </span>
      </div>
    </div>
  )
}

export function HeroOrderCard({
  orderCard,
  chevronSrc,
  spriteSrc,
}: HeroOrderCardProps) {
  const { platformField, serviceField, submitLabel } = orderCard

  return (
    <div className="h-[325.6px] w-full shrink-0 overflow-hidden rounded-2xl border-[1.3px] border-[#8ad8ff] bg-white">
      <div className="flex flex-col gap-5 p-5">
        <div className="flex flex-col gap-4">
          <HeroSelectRow
            label={platformField.label}
            value={platformField.value}
            chevronSrc={chevronSrc}
            leading={
              platformField.spriteIcon ? (
                <HeroSpriteIcon
                  spriteSrc={spriteSrc}
                  crop={platformField.spriteIcon}
                />
              ) : null
            }
          />
          <HeroSelectRow
            label={serviceField.label}
            value={serviceField.value}
            chevronSrc={chevronSrc}
            leading={
              serviceField.icon ? (
                <span className="relative h-[18px] w-[20.195px] shrink-0 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    src={serviceField.icon.src}
                    width={serviceField.icon.width}
                    height={serviceField.icon.height}
                    className={serviceField.icon.className}
                  />
                </span>
              ) : null
            }
          />
        </div>

        <button
          type="button"
          className="relative flex w-full items-center justify-center rounded-xl bg-button px-6 py-4 text-lg font-semibold leading-[1.3] text-white shadow-[inset_0px_0px_8px_0px_rgba(255,255,255,0.04)]"
        >
          {submitLabel}
        </button>
      </div>
    </div>
  )
}
