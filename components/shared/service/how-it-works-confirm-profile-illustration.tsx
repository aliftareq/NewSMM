"use client"

import { useRef } from "react"

import { HowItWorksSkeletonPath } from "@/components/shared/landing/how-it-works/how-it-works-skeleton-path"
import { useHowItWorksIllustrationInView } from "@/components/shared/landing/how-it-works/use-how-it-works-illustration-in-view"
import { cn } from "@/lib/utils"

const CARD_BORDER_D =
  "M175.476 15.6521H24.0803C11.1058 15.6521 0.587891 26.1637 0.587891 39.1304V96.5217C0.587891 109.488 11.1058 120 24.0803 120H175.476C188.45 120 198.968 109.488 198.968 96.5217V39.1304C198.968 26.1637 188.45 15.6521 175.476 15.6521Z"

const CHECK_STROKE_D = "M178.086 26.0869L182.001 29.9999L188.527 22.1738"

/** Figma service step 03 — profile card with avatar + skeleton lines + blue check */
export function HowItWorksConfirmProfileIllustration() {
  const svgRef = useRef<SVGSVGElement>(null)
  const inView = useHowItWorksIllustrationInView(svgRef)

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 201 121"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "mx-auto h-auto w-full max-h-[160px] max-w-[200px]",
        inView && "how-it-works-illustration-in-view",
      )}
      aria-hidden
    >
      <path
        opacity="0.65"
        d="M167.645 0H42.3528C30.8199 0 21.4707 9.34362 21.4707 20.8696V65.2174C21.4707 76.7433 30.8199 86.087 42.3528 86.087H167.645C179.178 86.087 188.528 76.7433 188.528 65.2174V20.8696C188.528 9.34362 179.178 0 167.645 0Z"
        fill="#D3EBFB"
      />
      <path
        d={CARD_BORDER_D}
        fill="url(#hiw-service-confirm-card)"
        pathLength={1}
        stroke="#20A7EE"
        strokeWidth={1.17579}
        strokeLinejoin="round"
        className="how-it-works-illustration-card-border"
      />
      <path
        d="M50.1836 96.5218C66.0413 96.5218 78.8965 83.6743 78.8965 67.8262C78.8965 51.978 66.0413 39.1305 50.1836 39.1305C34.3259 39.1305 21.4707 51.978 21.4707 67.8262C21.4707 83.6743 34.3259 96.5218 50.1836 96.5218Z"
        fill="url(#hiw-service-confirm-avatar)"
      />
      <path
        d="M50.1832 69.1304C55.9497 69.1304 60.6243 64.4586 60.6243 58.6956C60.6243 52.9327 55.9497 48.2609 50.1832 48.2609C44.4168 48.2609 39.7422 52.9327 39.7422 58.6956C39.7422 64.4586 44.4168 69.1304 50.1832 69.1304Z"
        fill="white"
      />
      <path
        d="M29.3008 88.6956C29.3008 76.9564 38.4367 70.4347 50.1829 70.4347C61.9291 70.4347 71.065 76.9564 71.065 88.6956H29.3008Z"
        fill="white"
      />
      <HowItWorksSkeletonPath
        delay={0.2}
        fill="#304B65"
        d="M161.771 49.5652H100.43C97.1861 49.5652 94.5566 52.1931 94.5566 55.4348C94.5566 58.6764 97.1861 61.3043 100.43 61.3043H161.771C165.015 61.3043 167.644 58.6764 167.644 55.4348C167.644 52.1931 165.015 49.5652 161.771 49.5652Z"
      />
      <HowItWorksSkeletonPath
        delay={0.4}
        fill="#C5D2DD"
        d="M142.194 73.0435H99.1246C96.6018 73.0435 94.5566 75.0874 94.5566 77.6087C94.5566 80.13 96.6018 82.1739 99.1246 82.1739H142.194C144.717 82.1739 146.762 80.13 146.762 77.6087C146.762 75.0874 144.717 73.0435 142.194 73.0435Z"
      />
      <g className="how-it-works-service-confirm-check-badge">
        <path
          d="M183.307 43.0434C192.677 43.0434 200.273 35.4517 200.273 26.0869C200.273 16.7221 192.677 9.13037 183.307 9.13037C173.936 9.13037 166.34 16.7221 166.34 26.0869C166.34 35.4517 173.936 43.0434 183.307 43.0434Z"
          fill="white"
        />
        <path
          d="M183.307 38.4782C190.155 38.4782 195.706 32.9304 195.706 26.0869C195.706 19.2433 190.155 13.6956 183.307 13.6956C176.459 13.6956 170.908 19.2433 170.908 26.0869C170.908 32.9304 176.459 38.4782 183.307 38.4782Z"
          fill="#20A7EE"
        />
        <path
          d={CHECK_STROKE_D}
          pathLength={1}
          fill="none"
          stroke="white"
          strokeWidth={0.940636}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="how-it-works-illustration-check-mark"
        />
      </g>
      <defs>
        <linearGradient
          id="hiw-service-confirm-card"
          x1="0.587891"
          y1="15.6521"
          x2="0.587891"
          y2="120"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#F4FBFF" />
        </linearGradient>
        <linearGradient
          id="hiw-service-confirm-avatar"
          x1="21.4707"
          y1="39.1305"
          x2="78.862"
          y2="96.5563"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#43C0F7" />
          <stop offset="1" stopColor="#1A86D0" />
        </linearGradient>
      </defs>
    </svg>
  )
}
