"use client"

import { useMemo, useState } from "react"

import { PrivacyPolicySectionCard } from "@/components/shared/legal/privacy-policy-section-card"
import {
  PrivacyPolicyToolbar,
  type LegalDocumentActiveTab,
} from "@/components/shared/legal/privacy-policy-toolbar"
import type { PrivacyPolicyPageContent } from "@/types/legal/privacy-policy-page"

type PrivacyPolicyContentPanelProps = Pick<
  PrivacyPolicyPageContent,
  "sections" | "searchPlaceholder" | "tabs" | "assets"
> & {
  activeTab: LegalDocumentActiveTab
}

export function PrivacyPolicyContentPanel({
  sections,
  searchPlaceholder,
  tabs,
  assets,
  activeTab,
}: PrivacyPolicyContentPanelProps) {
  const [query, setQuery] = useState("")

  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return sections
    return sections.filter(
      (section) =>
        section.title.toLowerCase().includes(q) ||
        section.body.toLowerCase().includes(q),
    )
  }, [query, sections])

  return (
    <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-8">
      <PrivacyPolicyToolbar
        tabs={tabs}
        activeTab={activeTab}
        searchPlaceholder={searchPlaceholder}
        searchIcon24Src={assets.searchIcon24Src}
        query={query}
        onQueryChange={setQuery}
      />

      <div className="flex w-full flex-col gap-[18px]">
        {filteredSections.map((section) => (
          <PrivacyPolicySectionCard key={section.id} section={section} />
        ))}
        {filteredSections.length === 0 ? (
          <p className="py-8 text-center text-base text-n600">
            No sections match your search.
          </p>
        ) : null}
      </div>
    </div>
  )
}
