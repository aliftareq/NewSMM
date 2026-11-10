"use client"

import { LegalSearchButton } from "@/components/shared/legal/legal-search-button"
import { LinkTo } from "@/components/shared/link-to"
import type { PrivacyPolicyPageContent } from "@/types/legal/privacy-policy-page"

export type LegalDocumentActiveTab = "privacy" | "terms"

type PrivacyPolicyToolbarProps = {
  tabs: PrivacyPolicyPageContent["tabs"]
  activeTab: LegalDocumentActiveTab
  searchPlaceholder: string
  searchIcon24Src: string
  searchButtonHighlightSrc: string
  query: string
  onQueryChange: (value: string) => void
}

const inactiveTabClassName =
  "inline-flex items-center justify-center rounded-xl border border-n40 bg-white px-6 py-4 text-lg font-medium leading-[1.25] text-[#5b6477] transition-colors hover:text-n700"

const activeTabClassName =
  "inline-flex items-center justify-center rounded-xl border border-white bg-brand px-6 py-4 text-lg font-medium leading-[1.25] text-white"

export function PrivacyPolicyToolbar({
  tabs,
  activeTab,
  searchPlaceholder,
  searchIcon24Src,
  searchButtonHighlightSrc,
  query,
  onQueryChange,
}: PrivacyPolicyToolbarProps) {
  return (
    <div className="flex w-full flex-col items-stretch justify-between gap-4 lg:flex-row lg:items-center">
      <div className="flex shrink-0 items-center gap-3 rounded-xl">
        {activeTab === "privacy" ? (
          <span className={activeTabClassName}>{tabs.privacy.label}</span>
        ) : (
          <LinkTo href={tabs.privacy.href} className={inactiveTabClassName}>
            {tabs.privacy.label}
          </LinkTo>
        )}
        {activeTab === "terms" ? (
          <span className={activeTabClassName}>{tabs.terms.label}</span>
        ) : (
          <LinkTo href={tabs.terms.href} className={inactiveTabClassName}>
            {tabs.terms.label}
          </LinkTo>
        )}
      </div>

      <div className="flex h-14 w-full shrink-0 items-center justify-between rounded-xl border border-n40 bg-white py-2.5 pl-5 pr-1 lg:w-[420px]">
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={searchPlaceholder}
          className="min-w-0 flex-1 bg-transparent text-base font-medium leading-[1.25] text-n700 placeholder:text-[#798090] focus:outline-none"
          aria-label={searchPlaceholder}
        />
        <LegalSearchButton
          iconSrc={searchIcon24Src}
          highlightSrc={searchButtonHighlightSrc}
        />
      </div>
    </div>
  )
}
