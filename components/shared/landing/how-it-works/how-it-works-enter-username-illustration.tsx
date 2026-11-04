"use client"

import { HowItWorksInstagramIcon } from "@/components/shared/landing/how-it-works/how-it-works-instagram-icon"
import { HowItWorksSkeletonPath } from "@/components/shared/landing/how-it-works/how-it-works-skeleton-path"

/** Figma step 02 — username field with skeleton bars + Instagram + green check */
export function HowItWorksEnterUsernameIllustration() {
  return (
    <svg
      viewBox="0 0 219.315 69.4927"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto h-auto w-full max-h-[72px] max-w-[218px]"
      aria-hidden
    >
      <path
        opacity="0.65"
        d="M201.149 8.13289H24.0237C13.9906 8.13289 5.85707 16.2727 5.85707 26.3136V51.312C5.85707 61.3529 13.9906 69.4927 24.0237 69.4927H201.149C211.182 69.4927 219.315 61.3529 219.315 51.312V26.3136C219.315 16.2727 211.182 8.13289 201.149 8.13289Z"
        fill="#D3EBFB"
      />
      <path
        d="M196.607 1.31515H19.4818C9.44864 1.31515 1.31515 9.45492 1.31515 19.4958V44.4943C1.31515 54.5352 9.44864 62.6749 19.4818 62.6749H196.607C206.64 62.6749 214.773 54.5352 214.773 44.4943V19.4958C214.773 9.45492 206.64 1.31515 196.607 1.31515Z"
        fill="url(#hiw-step02-card)"
        stroke="#20A7EE"
        strokeWidth="2.63031"
      />
      <HowItWorksInstagramIcon />
      <HowItWorksSkeletonPath
        delay={0}
        fill="#304B65"
        d="M133.024 21.7684H67.1694C64.6611 21.7684 62.6278 23.8034 62.6278 26.3136C62.6278 28.8238 64.6611 30.8588 67.1694 30.8588H133.024C135.532 30.8588 137.565 28.8238 137.565 26.3136C137.565 23.8034 135.532 21.7684 133.024 21.7684Z"
      />
      <HowItWorksSkeletonPath
        delay={0.35}
        fill="#C5D2DD"
        d="M106.909 37.6765H66.034C64.1528 37.6765 62.6278 39.2027 62.6278 41.0854C62.6278 42.968 64.1528 44.4943 66.034 44.4943H106.909C108.79 44.4943 110.315 42.968 110.315 41.0854C110.315 39.2027 108.79 37.6765 106.909 37.6765Z"
      />
      <HowItWorksSkeletonPath
        delay={0.55}
        fill="#20A7EE"
        d="M143.924 18.7004C143.924 17.8846 143.263 17.2232 142.448 17.2232C141.632 17.2232 140.972 17.8846 140.972 18.7004V43.0171C140.972 43.8329 141.632 44.4943 142.448 44.4943C143.263 44.4943 143.924 43.8329 143.924 43.0171V18.7004Z"
      />
      <path
        d="M194.336 45.6306C201.861 45.6306 207.961 39.5257 207.961 31.9951C207.961 24.4644 201.861 18.3596 194.336 18.3596C186.811 18.3596 180.711 24.4644 180.711 31.9951C180.711 39.5257 186.811 45.6306 194.336 45.6306Z"
        fill="#E6F8EF"
      />
      <path
        d="M194.336 41.6535C199.666 41.6535 203.987 37.3293 203.987 31.995C203.987 26.6608 199.666 22.3366 194.336 22.3366C189.006 22.3366 184.685 26.6608 184.685 31.995C184.685 37.3293 189.006 41.6535 194.336 41.6535Z"
        fill="#22B573"
      />
      <path
        d="M190.249 31.995L193.201 34.9494L198.196 29.0407"
        stroke="white"
        strokeWidth="2.10424"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="hiw-step02-card"
          x1="1.31515"
          y1="1.31515"
          x2="1.31515"
          y2="62.6749"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#F4FBFF" />
        </linearGradient>
      </defs>
    </svg>
  )
}
