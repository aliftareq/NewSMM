"use client"

import { useId } from "react"

const ICON_BG =
  "M38.4435 14.9507H25.4997C19.6679 14.9507 14.9404 19.6819 14.9404 25.5182V38.4719C14.9404 44.3082 19.6679 49.0395 25.4997 49.0395H38.4435C44.2752 49.0395 49.0028 44.3082 49.0028 38.4719V25.5182C49.0028 19.6819 44.2752 14.9507 38.4435 14.9507Z"

/** Step 02 Instagram badge with a sweeping shine on the gradient tile. */
export function HowItWorksInstagramIcon() {
  const rawId = useId().replace(/:/g, "")
  const shineId = `hiw-ig-shine-${rawId}`
  const gradId = `hiw-step02-instagram-${rawId}`

  return (
    <g className="how-it-works-instagram-icon">
      <path d={ICON_BG} fill={`url(#${gradId})`} />
      <path
        d={ICON_BG}
        fill={`url(#${shineId})`}
        className="how-it-works-icon-shimmer"
        style={{ mixBlendMode: "overlay" }}
      />
      <path
        d="M28.9062 24.3251H35.0374C37.5771 24.3251 39.6358 26.3854 39.6358 28.927V35.063C39.6358 37.6046 37.5771 39.665 35.0374 39.665H28.9062C26.3665 39.665 24.3077 37.6046 24.3077 35.063V28.927C24.3077 26.3854 26.3665 24.3251 28.9062 24.3251Z"
        stroke="white"
        strokeWidth="1.57818"
      />
      <path
        d="M35.5483 31.995C35.5483 33.9718 33.947 35.5744 31.9717 35.5744C29.9964 35.5744 28.3952 33.9718 28.3952 31.995C28.3952 30.0182 29.9964 28.4157 31.9717 28.4157C33.947 28.4157 35.5483 30.0182 35.5483 31.995Z"
        stroke="white"
        strokeWidth="1.57818"
      />
      <path
        d="M36.485 28.6288C37.1199 28.6288 37.6346 28.1137 37.6346 27.4783C37.6346 26.8429 37.1199 26.3278 36.485 26.3278C35.8501 26.3278 35.3354 26.8429 35.3354 27.4783C35.3354 28.1137 35.8501 28.6288 36.485 28.6288Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id={gradId}
          x1="14.9404"
          y1="49.0395"
          x2="49.0291"
          y2="14.977"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FEDA75" />
          <stop offset="0.45" stopColor="#D62976" />
          <stop offset="1" stopColor="#4F5BD5" />
        </linearGradient>
        <linearGradient
          id={shineId}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="58"
          x2="14"
          y2="44"
        >
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="42%" stopColor="white" stopOpacity="0" />
          <stop offset="50%" stopColor="white" stopOpacity="0.95" />
          <stop offset="58%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
          <animate
            attributeName="x1"
            values="0;44;44;0"
            keyTimes="0;0.38;0.72;1"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y1"
            values="58;14;14;58"
            keyTimes="0;0.38;0.72;1"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="x2"
            values="14;58;58;14"
            keyTimes="0;0.38;0.72;1"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y2"
            values="44;0;0;44"
            keyTimes="0;0.38;0.72;1"
            dur="3s"
            repeatCount="indefinite"
          />
        </linearGradient>
      </defs>
    </g>
  )
}
