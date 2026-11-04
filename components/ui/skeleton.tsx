import type { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-muted",
        "before:pointer-events-none before:absolute before:inset-0 before:-translate-x-full before:animate-skeleton-shimmer before:bg-linear-to-r before:from-transparent before:via-white/40 before:to-transparent",
        className,
      )}
      {...props}
    />
  )
}

export { Skeleton }
