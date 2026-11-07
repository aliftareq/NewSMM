"use client"

import { useMemo, useState } from "react"
import { GrowthPackageQualityToggle } from "@/components/shared/service/growth-package/growth-package-quality-toggle"
import { GrowthPackageScrollPane } from "@/components/shared/service/growth-package/growth-package-scroll-pane"
import { GrowthPackageTableRow } from "@/components/shared/service/growth-package/growth-package-table-row"
import { mapGrowthRowsForQuality } from "@/lib/service-quality-pricing"
import { cn } from "@/lib/utils"
import type {
  GrowthPackageData,
  GrowthPackageQualityId,
  GrowthPackageRow,
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
  tableHeaders,
  selectButtonLabel,
  rows,
  assets,
}: {
  tableHeaders: GrowthPackagePricingCardProps["content"]["tableHeaders"]
  selectButtonLabel: string
  rows: GrowthPackageRow[]
  assets: GrowthPackagePricingCardProps["content"]["assets"]
}) {
  return (
    <>
      <div className="grid grid-cols-[minmax(0,1fr)_200px_minmax(280px,1fr)] rounded-xl bg-[#f2f2f2] py-3">
        <p className="px-4 text-lg font-semibold leading-[1.3] text-[#374151]">
          {tableHeaders.package}
        </p>
        <p className="px-4 text-lg font-semibold leading-[1.3] text-[#374151]">
          {tableHeaders.value}
        </p>
        <p className="px-4 text-lg font-semibold leading-[1.3] text-[#374151]">
          {tableHeaders.price}
        </p>
      </div>

      {rows.map((row) => (
        <GrowthPackageTableRow
          key={row.id}
          row={row}
          selectLabel={selectButtonLabel}
          instagramSprite={assets.instagramIconSprite}
          instagramCropClassName={assets.instagramIconCropClassName}
        />
      ))}
    </>
  )
}

export function GrowthPackagePricingCard({ content }: GrowthPackagePricingCardProps) {
  const [quality, setQuality] = useState<GrowthPackageQualityId>("high-quality")

  const rowsForQuality = useMemo(
    () => mapGrowthRowsForQuality(content.rows, quality),
    [content.rows, quality],
  )

  const tableBlock = (
    <div
      className={cn(
        "flex flex-col gap-3 pb-4 transition-[opacity,border-color] duration-300",
        quality === "real-followers" && "rounded-xl",
      )}
    >
      <GrowthPackageTableBlock
        tableHeaders={content.tableHeaders}
        selectButtonLabel={content.selectButtonLabel}
        rows={rowsForQuality}
        assets={content.assets}
      />
    </div>
  )

  return (
    <div
      className={cn(
        "w-full min-w-0 rounded-[20px] border bg-white p-4 transition-colors duration-300 sm:p-5",
        quality === "real-followers" ? "border-[#c5e8fc]" : "border-[#ebecef]",
      )}
    >
      <div className="flex min-w-0 flex-col gap-4 sm:hidden">
        <div className="sticky top-0 z-10 shrink-0 bg-white pt-0.5">
          <GrowthPackageQualityToggle
            tabs={content.qualityTabs}
            value={quality}
            onChange={setQuality}
          />
        </div>
        <GrowthPackageScrollPane variant="mobile">
          <div className="flex min-w-[720px] flex-col">{tableBlock}</div>
        </GrowthPackageScrollPane>
      </div>

      <div className="hidden min-w-0 flex-col gap-6 sm:flex">
        <GrowthPackageQualityToggle
          tabs={content.qualityTabs}
          value={quality}
          onChange={setQuality}
        />
        <GrowthPackageScrollPane variant="desktop">{tableBlock}</GrowthPackageScrollPane>
      </div>
    </div>
  )
}
