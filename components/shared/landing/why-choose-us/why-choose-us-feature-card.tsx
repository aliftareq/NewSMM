import Image from "next/image"

import { WHY_CHOOSE_US_NUMBER_GRADIENT } from "@/types/landing/why-choose-us"
import type { WhyChooseUsCard } from "@/types/landing/why-choose-us"
import { cn } from "@/lib/utils"

type WhyChooseUsFeatureCardProps = {
  card: WhyChooseUsCard
  serviceIconSrc: string
  textArrowSrc: string
}

export function WhyChooseUsFeatureCard({
  card,
  serviceIconSrc,
  textArrowSrc,
}: WhyChooseUsFeatureCardProps) {
  return (
    <article
      data-slot="why-choose-us-card"
      className={cn(
        "relative flex h-[340px] w-full max-w-[413px] shrink-0 flex-col overflow-hidden rounded-[20px] border border-[#ededed] p-8",
        card.variant === "muted"
          ? "bg-[#eeeeee]"
          : "bg-[#f1f2f1]",
      )}
    >
      <div className="flex h-full min-h-0 flex-col justify-between gap-8">
        <div className="relative flex min-h-0 flex-col gap-3">
          <h3 className="text-xl leading-[1.3] font-medium text-[#020618]">
            {card.title}
          </h3>
          <p className="text-base leading-normal font-normal text-pretty text-[#343e56]">
            {card.description}
          </p>
          {card.showTextArrow ? (
            <Image
              src={textArrowSrc}
              alt=""
              width={10}
              height={10}
              className="pointer-events-none absolute top-[102px] left-36 size-2.5"
              unoptimized
            />
          ) : null}
        </div>

        <div className="mt-auto flex shrink-0 items-center justify-between">
          <div className="flex size-[72px] items-center justify-center rounded-2xl border border-[#ebebeb] bg-white p-5">
            <Image
              src={serviceIconSrc}
              alt=""
              width={32}
              height={32}
              className="size-8"
              unoptimized
            />
          </div>
          <span
            className="text-2xl leading-[1.45] font-semibold"
            style={{
              backgroundImage: WHY_CHOOSE_US_NUMBER_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {card.step}
          </span>
        </div>
      </div>
    </article>
  )
}
