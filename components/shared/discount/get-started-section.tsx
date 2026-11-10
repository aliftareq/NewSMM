"use client"

import { useState } from "react"

import { LinkTo } from "@/components/shared/link-to"
import { cn } from "@/lib/utils"
import type { DiscountPageContent } from "@/types/discount/discount-page"

type GetStartedSectionProps = {
  content: DiscountPageContent["getStartedSection"]
}

export function GetStartedSection({ content }: GetStartedSectionProps) {
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <section
      className="relative z-10 bg-white py-14 sm:py-16 lg:py-20"
      aria-label="Get started"
      data-slot="get-started-section"
    >
      <div className="info-container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col items-center gap-[60px]">
          <h2 className="text-center text-[32px] font-semibold leading-none text-black">
            {content.title}
            <span className="text-brand">{content.titleHighlight}</span>
          </h2>

          <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
            {content.platforms.map((platform) => {
              const active = platform.id === activeId
              return (
                <LinkTo
                  key={platform.id}
                  href={platform.href}
                  onMouseEnter={() => setActiveId(platform.id)}
                  onMouseLeave={() => setActiveId(null)}
                  className={cn(
                    "flex min-h-[150px] flex-1 cursor-pointer items-center justify-center rounded-xl border px-3 py-7 transition-colors",
                    active
                      ? "border-brand bg-[rgba(33,174,255,0.1)]"
                      : "border-n40 bg-transparent hover:border-brand/60",
                  )}
                >
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="relative h-[54px] w-[52.579px] shrink-0">
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-[11.368px] border-[0.514px] border-[#e7e7e7] bg-white shadow-[0px_2.571px_5.143px_0px_rgba(114,114,114,0.12)]"
                      />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt=""
                        src={platform.iconSrc}
                        width={32}
                        height={32}
                        className="absolute left-1/2 top-1/2 size-8 max-w-none -translate-x-1/2 -translate-y-1/2 object-contain"
                      />
                    </div>
                    <p
                      className={cn(
                        "text-center text-xl font-medium leading-[1.3] transition-colors",
                        !active && "text-n600",
                      )}
                      style={active ? { color: platform.themeColor } : undefined}
                    >
                      {platform.label}
                    </p>
                  </div>
                </LinkTo>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
