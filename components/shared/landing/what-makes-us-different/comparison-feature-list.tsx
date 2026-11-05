import Image from "next/image"

import { cn } from "@/lib/utils"

type ComparisonFeatureListProps = {
  features: readonly string[]
  iconSrc: string
  variant: "positive" | "negative"
  className?: string
}

export function ComparisonFeatureList({
  features,
  iconSrc,
  variant: _variant,
  className,
}: ComparisonFeatureListProps) {
  return (
    <ul className={cn("flex w-full min-w-0 flex-col gap-6", className)}>
      {features.map((label, index) => (
        <li
          key={label}
          className="flex w-full min-w-0 flex-col gap-5 px-6 sm:px-8"
        >
          <div className="flex w-full min-w-0 items-center gap-3">
            <Image
              src={iconSrc}
              alt=""
              width={20}
              height={20}
              className="size-5 shrink-0"
              aria-hidden
            />
            <span className="min-w-0 text-lg font-medium leading-[1.5] text-[#0c0a09]">
              {label}
            </span>
          </div>
          {index < features.length - 1 ? (
            <div
              className="h-[0.5px] w-full shrink-0 rounded-[9px] bg-[#d7d3d0]"
              aria-hidden
            />
          ) : null}
        </li>
      ))}
    </ul>
  )
}
