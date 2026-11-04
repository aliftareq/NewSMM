"use client"

import { useState } from "react"

import { FaqItem } from "@/components/shared/landing/faq/faq-item"
import type { LandingFaqContent } from "@/types/landing/faq"

type FaqAccordionProps = {
  content: Pick<LandingFaqContent, "leftColumn" | "rightColumn">
  defaultOpenId?: string
}

export function FaqAccordion({
  content,
  defaultOpenId = "legal-bangladesh",
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
      <div className="flex min-w-0 flex-1 flex-col gap-5">
        {content.leftColumn.map((item) => (
          <FaqItem
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={() => handleToggle(item.id)}
          />
        ))}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-5">
        {content.rightColumn.map((item) => (
          <FaqItem
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={() => handleToggle(item.id)}
          />
        ))}
      </div>
    </div>
  )
}
