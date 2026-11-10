"use client"

import { cn } from "@/lib/utils"
import type { LandingFaqItem } from "@/types/landing/faq"

type FaqPageItemProps = {
  item: LandingFaqItem
  chevronSrc: string
  isOpen: boolean
  onToggle: () => void
}

export function FaqPageItem({
  item,
  chevronSrc,
  isOpen,
  onToggle,
}: FaqPageItemProps) {
  return (
    <article
      data-slot="faq-page-item"
      data-state={isOpen ? "open" : "closed"}
      className={cn(
        "w-full rounded-2xl bg-white px-[30px] py-[25px] shadow-[0px_2px_2px_rgba(0,0,0,0.08)] transition-[background-color,box-shadow] duration-300 ease-out",
        isOpen && "bg-[#21aeff] shadow-[0px_4px_12px_rgba(33,174,255,0.35)]",
      )}
    >
      <button
        type="button"
        className="flex w-full items-center gap-2.5 text-left"
        aria-expanded={isOpen}
        aria-controls={`faq-page-panel-${item.id}`}
        id={`faq-page-trigger-${item.id}`}
        onClick={onToggle}
      >
        <span
          className={cn(
            "min-w-0 flex-1 text-lg font-medium leading-normal",
            isOpen ? "text-white" : "text-[#232323]",
          )}
        >
          {item.question}
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={chevronSrc}
          width={24}
          height={24}
          className={cn(
            "size-6 shrink-0 transition-transform duration-300 ease-out",
            isOpen && "rotate-180 brightness-0 invert",
          )}
        />
      </button>
      <div
        id={`faq-page-panel-${item.id}`}
        role="region"
        aria-labelledby={`faq-page-trigger-${item.id}`}
        className={cn(
          "grid transition-[grid-template-rows,margin-top] duration-300 ease-in-out motion-reduce:transition-none",
          isOpen ? "mt-[15px] grid-rows-[1fr]" : "mt-0 grid-rows-[0fr]",
        )}
      >
        <div
          className={cn(
            "min-h-0 overflow-hidden transition-opacity duration-300 ease-in-out motion-reduce:transition-none",
            isOpen ? "opacity-100" : "opacity-0",
          )}
        >
          <p className="text-base leading-[1.35] text-[#fafafb]">{item.answer}</p>
        </div>
      </div>
    </article>
  )
}
