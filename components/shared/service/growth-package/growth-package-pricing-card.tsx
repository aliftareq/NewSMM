"use client"

import { useState } from "react"

import { GrowthPackageQualityToggle } from "@/components/shared/service/growth-package/growth-package-quality-toggle"
import { GrowthPackageScrollPane } from "@/components/shared/service/growth-package/growth-package-scroll-pane"
import { GrowthPackageTableRow } from "@/components/shared/service/growth-package/growth-package-table-row"
import type {
  GrowthPackageData,
  GrowthPackageQualityId,
} from "@/types/service/growth-package"

type GrowthPackagePricingCardProps = {
  content: Pick<
    GrowthPackageData,
    | "qualityTabs"
    | "tableHeaders"
    | "selectButtonLabel"
    | "rows"
    | "assets"
  >
}

function GrowthPackageTableBlock({
  content,
}: Pick<GrowthPackagePricingCardProps, "content">) {
  return (
    <>
      <div className="grid grid-cols-[minmax(0,1fr)_200px_minmax(280px,1fr)] rounded-xl bg-[#f2f2f2] py-3">
        <p className="px-4 text-lg font-semibold leading-[1.3] text-[#374151]">
          {content.tableHeaders.package}
        </p>
        <p className="px-4 text-lg font-semibold leading-[1.3] text-[#374151]">
          {content.tableHeaders.value}
        </p>
        <p className="px-4 text-lg font-semibold leading-[1.3] text-[#374151]">
          {content.tableHeaders.price}
        </p>
      </div>

      {content.rows.map((row) => (
        <GrowthPackageTableRow
          key={row.id}
          row={row}
          selectLabel={content.selectButtonLabel}
          instagramSprite={content.assets.instagramIconSprite}
          instagramCropClassName={content.assets.instagramIconCropClassName}
        />
      ))}
    </>
  )
}

export function GrowthPackagePricingCard({ content }: GrowthPackagePricingCardProps) {
  const [quality, setQuality] = useState<GrowthPackageQualityId>("high-quality")

  return (
    <div className="w-full min-w-0 rounded-[20px] border border-[#ebecef] bg-white p-4 sm:p-5">
      {/* Mobile: toggle pinned above scroll pane; only the table slides/scrolls inside */}
      <div className="flex min-w-0 flex-col gap-4 sm:hidden">
        <div className="sticky top-0 z-10 shrink-0 bg-white pt-0.5">
          <GrowthPackageQualityToggle
            tabs={content.qualityTabs}
            value={quality}
            onChange={setQuality}
          />
        </div>
        <GrowthPackageScrollPane variant="mobile">
          <div className="flex min-w-[720px] flex-col gap-3 pb-4">
            <GrowthPackageTableBlock content={content} />
          </div>
        </GrowthPackageScrollPane>
      </div>

      {/* Desktop: toggle above table; table scrolls inside pane */}
      <div className="hidden min-w-0 flex-col gap-6 sm:flex">
        <GrowthPackageQualityToggle
          tabs={content.qualityTabs}
          value={quality}
          onChange={setQuality}
        />
        <GrowthPackageScrollPane variant="desktop">
          <div className="flex flex-col gap-3 pb-4">
            <GrowthPackageTableBlock content={content} />
          </div>
        </GrowthPackageScrollPane>
      </div>
    </div>
  )
}
