"use client"

import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

/** Shared Figma torus export (viewBox 247×244) */
export const LANDING_TORUS_WIDTH = 247
export const LANDING_TORUS_HEIGHT = 244

/** ~√2 — room to rotate a rectangular asset without corner clipping */
const ROTATE_CANVAS_SCALE = 1.4142135623730951
const TORUS_VISUAL_SCALE = 1 / ROTATE_CANVAS_SCALE

type LandingTorusDecorationProps = {
  src: string
  width?: number
  height?: number
  className?: string
  duration?: number
  reverse?: boolean
}

/** Figma torus — full size at rest, smooth infinite rotate, paints outside section bounds. */
export function LandingTorusDecoration({
  src,
  width = LANDING_TORUS_WIDTH,
  height = LANDING_TORUS_HEIGHT,
  className,
  duration = 26,
  reverse = false,
}: LandingTorusDecorationProps) {
  const reduceMotion = useReducedMotion()

  return (
    <div
      className={cn("pointer-events-none overflow-visible", className)}
      aria-hidden
    >
      <div className="relative size-full overflow-visible">
        <motion.div
          className="absolute top-1/2 left-1/2 origin-center -translate-x-1/2 -translate-y-1/2"
          style={{
            width: `${ROTATE_CANVAS_SCALE * 100}%`,
            height: `${ROTATE_CANVAS_SCALE * 100}%`,
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  rotate: reverse ? [0, -360] : [0, 360],
                }
          }
          transition={{
            duration,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            width={width}
            height={height}
            className="absolute top-1/2 left-1/2 max-w-none object-contain -translate-x-1/2 -translate-y-1/2"
            style={{
              width: `${TORUS_VISUAL_SCALE * 100}%`,
              height: `${TORUS_VISUAL_SCALE * 100}%`,
            }}
            decoding="async"
          />
        </motion.div>
      </div>
    </div>
  )
}
