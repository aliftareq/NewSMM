"use client"

import { useMemo, useState } from "react"

import { FaqPageItem } from "@/components/shared/faq/faq-page-item"
import { cn } from "@/lib/utils"
import type { FaqPageContent } from "@/types/faq/faq-page"

type FaqPagePanelProps = {
  content: Pick<FaqPageContent, "faq" | "searchPlaceholder" | "categories" | "assets">
}

function filterItems(
  items: FaqPageContent["faq"]["leftColumn"],
  query: string,
) {
  const q = query.trim().toLowerCase()
  if (!q) return items
  return items.filter(
    (item) =>
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q),
  )
}

export function FaqPagePanel({
  content,
}: FaqPagePanelProps) {
  const [query, setQuery] = useState("")
  const [activeCategoryId, setActiveCategoryId] = useState(
    content.categories[0]?.id ?? "all",
  )
  const [openId, setOpenId] = useState<string | null>(null)

  const { leftColumn, rightColumn } = useMemo(() => {
    return {
      leftColumn: filterItems(content.faq.leftColumn, query),
      rightColumn: filterItems(content.faq.rightColumn, query),
    }
  }, [content.faq.leftColumn, content.faq.rightColumn, query])

  const handleToggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id))
  }

  return (
    <div
      data-slot="faq-page-panel"
      className="flex w-full flex-col items-start rounded-[24px] bg-[#f5f6f7] p-6"
    >
      <div className="mx-auto flex w-full max-w-[688px] flex-col items-center gap-5">
        <div className="flex h-14 w-full items-center justify-between gap-2 rounded-xl border border-[#ebecef] bg-white py-2.5 pl-5 pr-1 shadow-[0px_4px_6px_rgba(255,255,255,0.08)]">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={content.searchPlaceholder}
            className="min-w-0 flex-1 bg-transparent text-base font-normal leading-[1.35] text-[#222e48] placeholder:text-[#222e48] focus:outline-none"
            aria-label={content.searchPlaceholder}
          />
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#21aeff] shadow-[0px_4px_8px_-4px_rgba(0,0,0,0.6)]">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-lg shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.12)]"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={content.assets.searchIconSrc}
              width={16}
              height={16}
              className="relative z-10 block"
            />
          </div>
        </div>

        <div className="flex w-full gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {content.categories.map((category) => {
            const active = category.id === activeCategoryId
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategoryId(category.id)}
                className={cn(
                  "shrink-0 rounded-xl border px-6 py-4 text-lg font-medium leading-[1.25] transition-colors",
                  active
                    ? "border-white bg-[#21aeff] text-white"
                    : "border-[#dfe0e4] bg-white text-[#5b6477] hover:border-[#c5e8fc]",
                )}
              >
                {category.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-[34px] flex w-full flex-col gap-4 lg:flex-row lg:items-start lg:gap-4">
        <div className="flex min-w-0 flex-1 flex-col gap-5">
          {leftColumn.map((item) => (
            <FaqPageItem
              key={item.id}
              item={item}
              chevronSrc={content.assets.chevronSrc}
              isOpen={openId === item.id}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-5">
          {rightColumn.map((item) => (
            <FaqPageItem
              key={item.id}
              item={item}
              chevronSrc={content.assets.chevronSrc}
              isOpen={openId === item.id}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
