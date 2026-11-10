"use client"

import type { ReactNode } from "react"

type AuthFlowModalFrameProps = {
  title: string
  backLabel: string
  backArrowSrc: string
  onBack: () => void
  children: ReactNode
}

export function AuthFlowModalFrame({
  title,
  backLabel,
  backArrowSrc,
  onBack,
  children,
}: AuthFlowModalFrameProps) {
  return (
    <div className="flex w-full min-w-0 max-w-full flex-col items-stretch gap-6">
      <div className="relative grid w-full min-w-0 grid-cols-[24px_1fr_24px] items-center">
        <button
          type="button"
          onClick={onBack}
          className="flex size-6 shrink-0 items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#21aeff]/45 focus-visible:ring-offset-2"
          aria-label={backLabel}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={backArrowSrc}
            width={24}
            height={24}
            className="-rotate-90 -scale-y-100 block"
          />
        </button>
        <p
          aria-hidden
          className="min-w-0 px-1 text-center text-xl font-medium leading-[1.2] text-[#202020] sm:text-2xl sm:leading-none"
        >
          {title}
        </p>
        <span className="size-6 shrink-0" aria-hidden />
      </div>

      <div
        className="h-px w-full shrink-0 border-t border-dashed border-[#c1c4cc]"
        aria-hidden
      />

      <div className="w-full min-w-0">{children}</div>
    </div>
  )
}
