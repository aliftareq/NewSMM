"use client"

import { useEffect, useRef, useState } from "react"

import { HowItWorksSkeletonPath } from "@/components/shared/landing/how-it-works/how-it-works-skeleton-path"
import { cn } from "@/lib/utils"

const CARD_BORDER_D =
  "M104.935 13.8583H21.7179C10.5761 13.8583 1.54392 22.8831 1.54392 34.0158V139.843C1.54392 150.975 10.5761 160 21.7179 160H104.935C116.077 160 125.109 150.975 125.109 139.843V34.0158C125.109 22.8831 116.077 13.8583 104.935 13.8583Z"

const CHECK_STROKE_D = "M104.935 16.3779L108.718 20.1575L115.022 12.5984"

/** Figma step 03 — growth card with skeleton lines + chart + heart + blue check */
export function HowItWorksWatchGrowIllustration() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [playOnce, setPlayOnce] = useState(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    if (reduceMotion) {
      setPlayOnce(true)
      return undefined
    }

    const node = svgRef.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setPlayOnce(true)
        observer.disconnect()
      },
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 126.653 161.544"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "mx-auto h-auto w-full max-h-[160px] max-w-[125px]",
        playOnce && "how-it-works-step03-in-view",
      )}
      aria-hidden
    >
      <path
        opacity="0.65"
        d="M106.196 11.3386H40.6308C30.1854 11.3386 21.7178 19.7993 21.7178 30.2362V136.063C21.7178 146.5 30.1854 154.961 40.6308 154.961H106.196C116.642 154.961 125.109 146.5 125.109 136.063V30.2362C125.109 19.7993 116.642 11.3386 106.196 11.3386Z"
        fill="#D3EBFB"
      />
      <path
        d={CARD_BORDER_D}
        fill="url(#hiw-step03-card)"
        pathLength={1}
        stroke="#20A7EE"
        strokeWidth={3.08785}
        strokeLinejoin="round"
        className="how-it-works-step03-card-border"
      />
      <path
        d="M28.0221 50.3937C33.593 50.3937 38.1091 45.8813 38.1091 40.3149C38.1091 34.7486 33.593 30.2362 28.0221 30.2362C22.4512 30.2362 17.9352 34.7486 17.9352 40.3149C17.9352 45.8813 22.4512 50.3937 28.0221 50.3937Z"
        fill="#BFE4FA"
      />
      <HowItWorksSkeletonPath
        delay={0.2}
        fill="#CFE8FA"
        d="M97.3703 34.0157H49.4571C47.3681 34.0157 45.6745 35.7079 45.6745 37.7952C45.6745 39.8826 47.3681 41.5748 49.4571 41.5748H97.3703C99.4593 41.5748 101.153 39.8826 101.153 37.7952C101.153 35.7079 99.4593 34.0157 97.3703 34.0157Z"
      />
      <HowItWorksSkeletonPath
        delay={0.4}
        fill="#E7EDF2"
        d="M78.142 46.6141H48.5115C46.9447 46.6141 45.6745 47.8833 45.6745 49.4488C45.6745 51.0143 46.9447 52.2834 48.5115 52.2834H78.142C79.7088 52.2834 80.9789 51.0143 80.9789 49.4488C80.9789 47.8833 79.7088 46.6141 78.142 46.6141Z"
      />
      <path
        d="M98.631 59.2126H28.0222C21.755 59.2126 16.6744 64.289 16.6744 70.5512V95.748C16.6744 102.01 21.755 107.087 28.0222 107.087H98.631C104.898 107.087 109.979 102.01 109.979 95.748V70.5512C109.979 64.289 104.898 59.2126 98.631 59.2126Z"
        fill="url(#hiw-step03-chart-bg)"
      />
      <path
        opacity="0.85"
        d="M89.8049 78.7402C93.6349 78.7402 96.7397 75.6379 96.7397 71.811C96.7397 67.9842 93.6349 64.8819 89.8049 64.8819C85.9749 64.8819 82.8701 67.9842 82.8701 71.811C82.8701 75.6379 85.9749 78.7402 89.8049 78.7402Z"
        fill="white"
      />
      <path
        className="how-it-works-skeleton-chart-line"
        d="M19.1962 104.567L40.631 84.4095L57.0224 100.787L68.3702 90.7087L74.6746 97.0079"
        stroke="white"
        strokeWidth="3.70542"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
      <path
        className="how-it-works-step03-heart"
        d="M37.605 154.394C23.9245 144.63 20.0158 136.819 20.0158 129.984C20.0158 124.126 24.9017 121.197 28.8104 121.197C32.1328 121.197 34.6735 122.954 37.605 126.274C40.5365 122.954 43.0772 121.197 46.3996 121.197C50.3083 121.197 55.1941 124.126 55.1941 129.984C55.1941 136.819 51.2854 144.63 37.605 154.394Z"
        fill="#FF4D6D"
      />
      <HowItWorksSkeletonPath
        delay={0.15}
        fill="#304B65"
        d="M105.566 122.205H74.044C71.6068 122.205 69.631 124.179 69.631 126.614C69.631 129.049 71.6068 131.024 74.044 131.024H105.566C108.003 131.024 109.979 129.049 109.979 126.614C109.979 124.179 108.003 122.205 105.566 122.205Z"
      />
      <HowItWorksSkeletonPath
        delay={0.45}
        fill="#C5D2DD"
        d="M94.218 137.323H72.7832C71.0423 137.323 69.631 138.733 69.631 140.472C69.631 142.212 71.0423 143.622 72.7832 143.622H94.218C95.9589 143.622 97.3702 142.212 97.3702 140.472C97.3702 138.733 95.9589 137.323 94.218 137.323Z"
      />
      <g className="how-it-works-step03-check-badge">
        <path
          d="M109.979 32.7559C119.031 32.7559 126.37 25.4232 126.37 16.3779C126.37 7.33266 119.031 0 109.979 0C100.926 0 93.5874 7.33266 93.5874 16.3779C93.5874 25.4232 100.926 32.7559 109.979 32.7559Z"
          fill="white"
        />
        <path
          d="M109.979 28.3465C116.594 28.3465 121.957 22.988 121.957 16.378C121.957 9.76794 116.594 4.40946 109.979 4.40946C103.363 4.40946 98.0006 9.76794 98.0006 16.378C98.0006 22.988 103.363 28.3465 109.979 28.3465Z"
          fill="#20A7EE"
        />
        <path
          d={CHECK_STROKE_D}
          pathLength={1}
          stroke="white"
          strokeWidth={2.47028}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="how-it-works-step03-check-mark"
        />
      </g>
      <defs>
        <linearGradient
          id="hiw-step03-card"
          x1="1.54392"
          y1="13.8583"
          x2="1.54392"
          y2="160"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#F4FBFF" />
        </linearGradient>
        <linearGradient
          id="hiw-step03-chart-bg"
          x1="16.6744"
          y1="59.2126"
          x2="55.5639"
          y2="135.007"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#CFEAFD" />
          <stop offset="1" stopColor="#8FD2F6" />
        </linearGradient>
      </defs>
    </svg>
  )
}
