"use client"

import {
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react"
import { createPortal } from "react-dom"

import {
  getGrowthLevelCelebrationDuration,
  playGrowthLevelCelebration,
} from "@/lib/growth-level-celebration"

type BoundaryBurstLayout = {
  scope: "boundary"
  originXPercent: number
}

type FixedBurstLayout = {
  scope: "fixed"
  left: number
  top: number
  width: number
  height: number
  originXPercent: number
}

type BurstLayout = BoundaryBurstLayout | FixedBurstLayout

type GrowthLevelCelebrationProps = {
  level: number
  burstId: number
  anchorRef: RefObject<HTMLElement | null>
  thumbRef: RefObject<HTMLElement | null>
  boundaryRef?: RefObject<HTMLElement | null>
}

function thumbCenterX(
  anchor: HTMLElement,
  thumb: HTMLElement | null,
): number {
  const anchorRect = anchor.getBoundingClientRect()
  const thumbRect = thumb?.getBoundingClientRect()
  return thumbRect
    ? thumbRect.left + thumbRect.width / 2
    : anchorRect.left + anchorRect.width / 2
}

function measureBoundaryBurstLayout(
  boundary: HTMLElement,
  anchor: HTMLElement,
  thumb: HTMLElement | null,
): BoundaryBurstLayout {
  const boundaryRect = boundary.getBoundingClientRect()
  const centerX = thumbCenterX(anchor, thumb) - boundaryRect.left
  const originXPercent = Math.min(
    100,
    Math.max(
      0,
      boundaryRect.width > 0 ? (centerX / boundaryRect.width) * 100 : 50,
    ),
  )
  return { scope: "boundary", originXPercent }
}

function measureFixedBurstLayout(
  anchor: HTMLElement,
  thumb: HTMLElement | null,
): FixedBurstLayout {
  const anchorRect = anchor.getBoundingClientRect()
  const thumbRect = thumb?.getBoundingClientRect()
  const centerX = thumbCenterX(anchor, thumb)
  const thumbCenterY = thumbRect
    ? thumbRect.top + thumbRect.height / 2
    : anchorRect.top + anchorRect.height * 0.55

  const padX = Math.max(28, anchorRect.width * 0.06)
  const padTop = 130
  const padBottom = 72

  const width = anchorRect.width + padX * 2
  const height = anchorRect.height + padTop + padBottom
  const left = anchorRect.left - padX
  const top = thumbCenterY - padTop - (thumbRect?.height ?? 26) / 2

  const originXPercent = Math.min(
    100,
    Math.max(0, ((centerX - left) / width) * 100),
  )

  return {
    scope: "fixed",
    left,
    top,
    width,
    height,
    originXPercent,
  }
}

export function GrowthLevelCelebration({
  level,
  burstId,
  anchorRef,
  thumbRef,
  boundaryRef,
}: GrowthLevelCelebrationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)
  const [layout, setLayout] = useState<BurstLayout | null>(null)
  const hideTimerRef = useRef<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (burstId <= 0) {
      return
    }
    const anchor = anchorRef.current
    if (!anchor) {
      return
    }

    const boundary = boundaryRef?.current
    const nextLayout =
      boundary !== undefined && boundary !== null
        ? measureBoundaryBurstLayout(boundary, anchor, thumbRef.current)
        : measureFixedBurstLayout(anchor, thumbRef.current)
    setLayout(nextLayout)

    if (hideTimerRef.current !== null) {
      window.clearTimeout(hideTimerRef.current)
    }
    hideTimerRef.current = window.setTimeout(() => {
      setLayout(null)
      hideTimerRef.current = null
    }, getGrowthLevelCelebrationDuration(level) + 120)
  }, [anchorRef, boundaryRef, burstId, level, thumbRef])

  useEffect(() => {
    return () => {
      if (hideTimerRef.current !== null) {
        window.clearTimeout(hideTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!layout || burstId <= 0) {
      return
    }

    let raf = 0
    let stopAnimation: (() => void) | undefined

    const start = () => {
      const canvas = canvasRef.current
      if (!canvas) {
        raf = requestAnimationFrame(start)
        return
      }

      if (layout.scope === "fixed") {
        canvas.style.width = `${layout.width}px`
        canvas.style.height = `${layout.height}px`
      } else {
        canvas.style.width = "100%"
        canvas.style.height = "100%"
      }

      stopAnimation = playGrowthLevelCelebration(
        canvas,
        level,
        layout.originXPercent,
      )
    }

    raf = requestAnimationFrame(start)

    return () => {
      cancelAnimationFrame(raf)
      stopAnimation?.()
    }
  }, [burstId, layout, level])

  if (!mounted || !layout) {
    return null
  }

  if (layout.scope === "boundary") {
    const boundary = boundaryRef?.current
    if (!boundary) {
      return null
    }
    return createPortal(
      <div
        className="pointer-events-none absolute inset-0 z-[30] overflow-visible"
        aria-hidden
      >
        <canvas ref={canvasRef} className="block size-full" />
      </div>,
      boundary,
    )
  }

  return createPortal(
    <div
      className="pointer-events-none fixed z-[200]"
      style={{
        left: layout.left,
        top: layout.top,
        width: layout.width,
        height: layout.height,
      }}
      aria-hidden
    >
      <canvas ref={canvasRef} className="block size-full" />
    </div>,
    document.body,
  )
}
