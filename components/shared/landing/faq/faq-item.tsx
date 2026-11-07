"use client"

import Image from "next/image"

import { cn } from "@/lib/utils"
import type { LandingFaqItem } from "@/types/landing/faq"

const CHEVRON_COLLAPSED = "/images/landing/faq/chevron-collapsed.svg"
const CHEVRON_EXPANDED = "/images/landing/faq/chevron-expanded.svg"

type FaqItemProps = {
  item: LandingFaqItem
  isOpen: boolean
  onToggle: () => void
}

export function FaqItem({ item, isOpen, onToggle }: FaqItemProps) {
  return (
    <article data-slot="landing-faq-item" data-state={isOpen ? "open" : "closed"}>
      <button
        type="button"
        id={`faq-trigger-${item.id}`}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${item.id}`}
        onClick={onToggle}
        className={cn(
          "w-full rounded-2xl px-6 py-6 text-left shadow-[0px_2px_4px_rgba(0,0,0,0.08)] transition-[background-color,box-shadow] duration-300 ease-out sm:px-[30px] sm:py-[25px]",
          isOpen
            ? "bg-[#21aeff] shadow-[0px_4px_12px_rgba(33,174,255,0.35)]"
            : "bg-white",
        )}
      >
        <span className="flex w-full items-center gap-2.5">
          <span
            className={cn(
              "min-w-0 flex-1 text-lg leading-normal font-medium",
              isOpen ? "text-white" : "text-[#232323]",
            )}
          >
            {item.question}
          </span>
          <span className="relative inline-flex size-6 shrink-0 items-center justify-center">
            <Image
              src={isOpen ? CHEVRON_EXPANDED : CHEVRON_COLLAPSED}
              alt=""
              width={24}
              height={24}
              className={cn(
                "size-6 transition-transform duration-300 ease-out",
                isOpen && "rotate-180",
              )}
              unoptimized
            />
          </span>
        </span>
        <span
          id={`faq-panel-${item.id}`}
          className={cn(
            "grid w-full transition-[grid-template-rows,margin-top] duration-300 ease-in-out motion-reduce:transition-none",
            isOpen ? "mt-[15px] grid-rows-[1fr]" : "mt-0 grid-rows-[0fr]",
          )}
        >
          <span
            className={cn(
              "block min-h-0 overflow-hidden transition-opacity duration-300 ease-in-out motion-reduce:transition-none",
              isOpen ? "opacity-100" : "opacity-0",
            )}
          >
            <span className="block text-base leading-[1.35] text-[#fafafb]">
              {item.answer}
            </span>
          </span>
        </span>
      </button>
    </article>
  )
}
