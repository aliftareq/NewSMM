"use client"

import Image from "next/image"

import { cn } from "@/lib/utils"
import type { LandingFaqItem } from "@/types/landing/faq"

const CHEVRON_COLLAPSED = "/images/landing/faq/chevron-collapsed.svg"

type FaqItemProps = {
  item: LandingFaqItem
  isOpen: boolean
  onToggle: () => void
}

export function FaqItem({ item, isOpen, onToggle }: FaqItemProps) {
  return (
    <article
      data-slot="landing-faq-item"
      data-state={isOpen ? "open" : "closed"}
      className={cn(
        "w-full rounded-2xl px-6 py-6 shadow-[0px_2px_4px_rgba(0,0,0,0.08)] transition-[background-color,box-shadow] duration-300 ease-out sm:px-[30px] sm:py-[25px]",
        isOpen
          ? "bg-[#21aeff] shadow-[0px_4px_12px_rgba(33,174,255,0.35)]"
          : "bg-white"
      )}
    >
      <button
        type="button"
        className="flex w-full items-center gap-2.5 text-left"
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${item.id}`}
        id={`faq-trigger-${item.id}`}
        onClick={onToggle}
      >
        <span
          className={cn(
            "min-w-0 flex-1 text-lg leading-normal font-medium",
            isOpen ? "text-white" : "text-[#232323]"
          )}
        >
          {item.question}
        </span>
        <span className="relative inline-flex size-6 shrink-0 items-center justify-center">
          <Image
            src={CHEVRON_COLLAPSED}
            alt=""
            width={24}
            height={24}
            className={cn(
              "size-6 transition-transform duration-300 ease-out",
              isOpen && "rotate-180"
            )}
            unoptimized
          />
        </span>
      </button>
      <div
        id={`faq-panel-${item.id}`}
        role="region"
        aria-labelledby={`faq-trigger-${item.id}`}
        className={cn(
          "grid transition-[grid-template-rows,margin-top] duration-300 ease-in-out motion-reduce:transition-none",
          isOpen ? "mt-[15px] grid-rows-[1fr]" : "mt-0 grid-rows-[0fr]"
        )}
      >
        <div
          className={cn(
            "min-h-0 overflow-hidden transition-opacity duration-300 ease-in-out motion-reduce:transition-none",
            isOpen ? "opacity-100" : "opacity-0"
          )}
        >
          <p className="text-base leading-[1.35] text-[#fafafb]">{item.answer}</p>
        </div>
      </div>
    </article>
  )
}
