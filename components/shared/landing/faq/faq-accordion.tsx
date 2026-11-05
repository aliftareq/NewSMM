"use client"

import { useState } from "react"

import { AnimatedContent } from "@/components/shared/animated-content"
import { FaqItem } from "@/components/shared/landing/faq/faq-item"
import { landingScrollRevealProps } from "@/components/shared/landing/landing-section-heading-reveal"
import type { LandingFaqContent } from "@/types/landing/faq"

type FaqAccordionProps = {
  content: Pick<LandingFaqContent, "leftColumn" | "rightColumn">
  defaultOpenId?: string | null
}

export function FaqAccordion({
  content,
  defaultOpenId = null,
}: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId)

  const handleToggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id))
  }

  return (
    <div
      data-slot="landing-faq-accordion"
      className="flex w-full flex-col gap-4 lg:flex-row lg:items-start lg:gap-4"
    >
      <AnimatedContent
        className="flex min-w-0 flex-1 flex-col gap-5"
        {...landingScrollRevealProps}
      >
        {content.leftColumn.map((item) => (
          <FaqItem
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={() => handleToggle(item.id)}
          />
        ))}
      </AnimatedContent>
      <AnimatedContent
        className="flex min-w-0 flex-1 flex-col gap-5"
        {...landingScrollRevealProps}
      >
        {content.rightColumn.map((item) => (
          <FaqItem
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={() => handleToggle(item.id)}
          />
        ))}
      </AnimatedContent>
    </div>
  )
}
