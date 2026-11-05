import Image from "next/image"

import { LinkTo } from "@/components/shared/link-to"
import type { FollowerComparisonTierCard } from "@/types/service/follower-comparison"
import { cn } from "@/lib/utils"

const BUTTON_INSET =
  "shadow-[inset_0px_-1.21154px_0px_rgba(255,255,255,0.06)]"

type FollowerComparisonTierCardProps = {
  card: FollowerComparisonTierCard
  checkBlueIcon: string
  instagramSprite: string
  instagramCropClassName: string
}

export function FollowerComparisonTierCardView({
  card,
  checkBlueIcon,
  instagramSprite,
  instagramCropClassName,
}: FollowerComparisonTierCardProps) {
  return (
    <article
      className={cn(
        "relative flex w-full min-w-0 flex-col items-center rounded-[20px] border border-[#ebecef] bg-white p-8",
        "shadow-[0px_0px_12px_rgba(63,63,63,0.12)]",
      )}
    >
      {card.recommendedBadge ? (
        <span className="mb-4 ml-auto w-fit shrink-0 rounded-lg bg-[#269de7] px-3.5 py-2 text-sm leading-[1.3] text-white sm:absolute sm:right-8 sm:top-8 sm:mb-0">
          RECOMMENDED
        </span>
      ) : null}

      <div className="flex w-full min-w-0 flex-col gap-6">
        <div className="flex min-w-0 items-start gap-3 sm:items-center">
          <span className="relative block size-[35px] shrink-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={instagramSprite}
              className={instagramCropClassName}
            />
          </span>
          <div
            className={cn(
              "flex min-w-0 flex-1 flex-col gap-1",
              card.recommendedBadge && "sm:pr-[148px]",
            )}
          >
            <h3 className="text-lg font-medium leading-[1.5] text-[#181818]">
              {card.title}
            </h3>
            <p className="text-sm font-normal leading-[1.3] text-[#4f586d]">
              {card.description}
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-[#edf8fe] p-4">
          <ul className="flex flex-col gap-3">
            {card.features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <Image
                  src={checkBlueIcon}
                  alt=""
                  width={16}
                  height={16}
                  className="size-4 shrink-0"
                  unoptimized
                />
                <span className="text-base leading-[1.35] text-[#222e48]">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <LinkTo
          href={card.href}
          className={cn(
            "flex min-h-[51px] w-full items-center justify-center rounded-xl px-6 py-3 text-lg font-semibold leading-[1.5] transition-colors",
            "[text-shadow:0px_0.4px_0.3px_rgba(0,0,0,0.08)]",
            card.ctaVariant === "outline"
              ? cn(
                  "border border-button bg-white text-button",
                  "hover:bg-button hover:text-white",
                  "active:bg-button active:text-white",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-button focus-visible:ring-offset-2",
                )
              : cn(
                  "border-0 bg-gradient-to-r from-[#0087d4] via-[#32b4ff] to-[#0795e7]/87 text-white",
                  BUTTON_INSET,
                  "transition-[transform,filter,box-shadow] duration-200 ease-out",
                  "hover:brightness-110 hover:shadow-[0_4px_16px_rgba(33,174,255,0.4)]",
                  "active:scale-[0.99] active:brightness-95",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-button focus-visible:ring-offset-2",
                ),
          )}
        >
          {card.ctaLabel}
        </LinkTo>
      </div>
    </article>
  )
}
