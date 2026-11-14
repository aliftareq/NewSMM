"use client"

import { useRef, type ReactNode } from "react"

import { useDashboardModalViewportScale } from "@/hooks/use-dashboard-modal-viewport-scale"
import { cn } from "@/lib/utils"

type DashboardModalScaledBodyProps = {
  open: boolean
  children: ReactNode
  className?: string
  /** Extra inset when fitting tall modals (e.g. Pay now) */
  extraViewportInsetPx?: number
}

/** Scales modal body down when taller than the viewport — no inner scrollbar. */
export function DashboardModalScaledBody({
  open,
  children,
  className,
  extraViewportInsetPx = 0,
}: DashboardModalScaledBodyProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const { scale, scaledHeight } = useDashboardModalViewportScale(
    contentRef,
    open,
    extraViewportInsetPx,
  )
  const shouldScale = scale < 0.999

  return (
    <div
      className="w-full overflow-hidden"
      style={
        scaledHeight > 0
          ? { height: scaledHeight }
          : undefined
      }
    >
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