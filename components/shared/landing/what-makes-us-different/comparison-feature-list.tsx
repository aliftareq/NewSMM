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
  variant,
  className,
}: ComparisonFeatureListProps) {
  const hoverBg =
    variant === "positive"
      ? "hover:bg-[#e1f4ff]"
      : "hover:bg-[#ffeded]"

  return (
    <ul
      className={cn(
        "flex w-full min-w-0 flex-col gap-6 px-6 sm:px-8",
        className,
      )}
    >
      {features.map((label, index) => (
        <li key={label} className="flex w-full min-w-0 flex-col gap-5">
          <div
            className={cn(
              "flex w-full min-w-0 cursor-default items-center justify-start gap-3 rounded-2xl py-4 transition-colors duration-200 motion-reduce:transition-none",
              hoverBg,
            )}
          >
            <Image
              src={iconSrc}
              alt=""
              width={20}
              height={20}
              className="size-5 shrink-0"
              aria-hidden
            />
            <span className="min-w-0 text-base leading-normal font-medium text-[#0c0a09] sm:text-lg">
              {label}
            </span>
          </div>
          {index < features.length - 1 ? (
            <div
              className="h-px w-full shrink-0 bg-[#d7d3d0]"
              aria-hidden
            />
          ) : null}
        </li>
      ))}
    </ul>
  )
}
