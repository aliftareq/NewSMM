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
  /** Remove side gutters when viewport scale is below 1 (Pay now) */
  fillWidthWhenScaled?: boolean
}

/** Scales modal body down when taller than the viewport — no inner scrollbar. */
export function DashboardModalScaledBody({
  open,
  children,
  className,
  extraViewportInsetPx = 0,
  fillWidthWhenScaled = false,
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
      style={scaledHeight > 0 ? { height: scaledHeight } : undefined}
    >
      <div
        className="origin-top"
        style={
          shouldScale
            ? {
                transform: `scale(${scale})`,
                transformOrigin: fillWidthWhenScaled ? "top left" : "top center",
                width: fillWidthWhenScaled ? `${100 / scale}%` : "100%",
              }
            : { width: "100%" }
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