"use client"

import { useMemo, useState } from "react"

import type { BlogCategory, BlogPageContent } from "@/types/blog/blog"
import { cn } from "@/lib/utils"

type BlogHeroControlsProps = {
  categories: BlogCategory[]
  content: Pick<BlogPageContent, "hero" | "assets">
}

export function BlogHeroControls({
  categories,
  content,
}: BlogHeroControlsProps) {
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0]?.id ?? "all")
  const [query, setQuery] = useState("")

  const categoryButtons = useMemo(
    () =>
      categories.map((category) => {
        const isActive = category.id === activeCategoryId

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => setActiveCategoryId(category.id)}
            className={cn(
              "shrink-0 whitespace-nowrap rounded-xl border border-solid px-6 py-4 text-lg font-medium leading-[1.25] transition-colors",
              isActive
                ? "border-white bg-brand text-white"
                : "border-n40 bg-white text-[#5b6477]",
            )}
          >
            {category.label}
          </button>
        )
      }),
    [activeCategoryId, categories],
  )

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="flex w-full max-w-[540px] flex-col gap-11">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-[36px] font-bold leading-[1.35] tracking-[0.36px] text-[#0e0e0e]">
            {content.hero.title}{" "}
            <span className="text-brand">{content.hero.titleHighlight}</span>
          </h1>
          <p className="max-w-[688px] text-base font-normal leading-[1.2] text-n600">
            {content.hero.description}
          </p>
        </div>

        <form
          className="flex h-14 w-full items-center justify-between gap-3 rounded-xl border border-n30 bg-white py-2.5 pl-5 pr-1 shadow-[0px_4px_6px_rgba(255,255,255,0.08)]"
          onSubmit={(event) => event.preventDefault()}
          role="search"
        >
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={content.hero.searchPlaceholder}
            className="min-w-0 flex-1 bg-transparent text-base font-normal leading-[1.35] text-n700 outline-none placeholder:text-n700"
            aria-label="Search blog posts"
          />
          <button
            type="submit"
            className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-brand shadow-[0px_4px_8px_-4px_rgba(0,0,0,0.6),inset_0px_1px_0px_0px_rgba(255,255,255,0.12)]"
            aria-label="Search"
          >
            <span className="relative flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white bg-white">
              <span className="relative size-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={content.assets.searchIconSrc}
                  width={16}
                  height={16}
                  className="absolute inset-0 block size-full max-w-none"
                />
              </span>
            </span>
          </button>
        </form>
      </div>

      <div className="flex w-full max-w-[688px] flex-nowrap items-center justify-center gap-3 overflow-x-auto [scrollbar-width:none] sm:overflow-x-visible [&::-webkit-scrollbar]:hidden">
        {categoryButtons}
      </div>
    </div>
  )
}
