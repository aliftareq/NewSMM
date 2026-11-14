"use client"

import { useRef, type ReactNode } from "react"

import { useDashboardModalViewportScale } from "@/hooks/use-dashboard-modal-viewport-scale"
import { cn } from "@/lib/utils"

type DashboardModalScaledBodyProps = {
  open: boolean
  children: ReactNode
  className?: string
}

/** Scales modal body down when taller than the viewport — no inner scrollbar. */
export function DashboardModalScaledBody({
  open,
  children,
  className,
}: DashboardModalScaledBodyProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const scale = useDashboardModalViewportScale(contentRef, open)
  const shouldScale = scale < 0.999

  return (
    <div className="w-full overflow-hidden">
      <div
        className="w-full origin-top"
        style={
          shouldScale
            ? {
                transform: `scale(${scale})`,
                transformOrigin: "top center",
              }
            : undefined
        }
      >
        <div
          ref={contentRef}
          className={cn("flex w-full flex-col gap-6", className)}
        >
          {children}
        </div>
      </div>
    </div>
  )
}