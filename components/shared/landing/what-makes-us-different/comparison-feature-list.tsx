import Image from "next/image"

import { cn } from "@/lib/utils"

type ComparisonFeatureListProps = {
  features: readonly string[]
  iconSrc: string
  className?: string
}

export function ComparisonFeatureList({
  features,
  iconSrc,
  className,
}: ComparisonFeatureListProps) {
  return (
    <ul className={cn("flex w-full flex-col gap-6", className)}>
      {features.map((label, index) => (
        <li key={label} className="flex w-full flex-col gap-5">
          <div className="flex items-center gap-3 px-6 sm:px-8">
            <Image
              src={iconSrc}
              alt=""
              width={20}
              height={20}
              className="size-5 shrink-0"
              aria-hidden
            />
            <span className="text-lg leading-normal font-medium text-[#0c0a09]">
              {label}
            </span>
          </div>
          {index < features.length - 1 ? (
            <div
              className="mx-6 h-px shrink-0 bg-[#d7d3d0] sm:mx-8"
              aria-hidden
            />
          ) : null}
        </li>
      ))}
    </ul>
  )
}
