"use client"

import { useId } from "react"

type HowItWorksSkeletonPathProps = {
  d: string
  fill: string
  /** Shimmer loop offset in seconds */
  delay?: number
}

const SHIMMER_DUR = "2.8s"
/** L→R sweep, instant reset, brief idle (~0.06s) before next pass */
const SHIMMER_KEY = "0;0.965;0.985;1"
const SHIMMER_SPLINE = "0.42 0 0.58 1; 0 0 0 0; 0 0 0 0"
const SHIMMER_TRANSLATE =
  "-1.15 0; 1.15 0; -1.15 0; -1.15 0"

/** SVG placeholder bar with a per-shape horizontal shimmer (left → right). */
export function HowItWorksSkeletonPath({
  d,
  fill,
  delay = 0,
}: HowItWorksSkeletonPathProps) {
  const rawId = useId()
  const gradId = `hiw-sk-${rawId.replace(/:/g, "")}`
  const begin = `${delay}s`

  return (
    <g className="how-it-works-skeleton-path">
      <defs>
        <linearGradient
          id={gradId}
          gradientUnits="objectBoundingBox"
          x1="0"
          y1="0.5"
          x2="1"
          y2="0.5"
        >
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="35%" stopColor="white" stopOpacity="0" />
          <stop offset="50%" stopColor="white" stopOpacity="0.85" />
          <stop offset="65%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
          <animateTransform
            attributeName="gradientTransform"
            type="translate"
            values={SHIMMER_TRANSLATE}
            keyTimes={SHIMMER_KEY}
            keySplines={SHIMMER_SPLINE}
            calcMode="spline"
            dur={SHIMMER_DUR}
            repeatCount="indefinite"
            begin={begin}
          />
        </linearGradient>
      </defs>
      <path d={d} fill={fill} />
      <path
        d={d}
        fill={`url(#${gradId})`}
        className="how-it-works-skeleton-shimmer"
      />
    </g>
  )
}
