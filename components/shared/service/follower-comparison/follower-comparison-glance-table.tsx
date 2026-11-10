import Image from "next/image"

import type {
  FollowerComparisonGlanceCell,
  FollowerComparisonGlanceRow,
} from "@/types/service/follower-comparison"
import { cn } from "@/lib/utils"

/**
 * Phone: fluid cols. Tablet (`md`–`lg`): minimum widths on follower cols so headers
 * do not crush. Desktop (`lg+`): wide label column per Figma.
 */
const GLANCE_TABLE_GRID = cn(
  "grid w-full max-w-full",
  "grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)_minmax(0,1fr)] gap-x-3",
  "md:grid-cols-[minmax(0,1.08fr)_minmax(172px,1fr)_minmax(172px,1fr)] md:gap-x-4",
  "lg:grid-cols-[minmax(200px,550px)_1fr_1fr] lg:gap-x-6",
)

const GLANCE_TABLE_ROW = cn(GLANCE_TABLE_GRID, "items-center")

const GLANCE_TABLE_HEADER_ROW = cn(GLANCE_TABLE_GRID, "items-center")

const GLANCE_HEADER_TEXT =
  "min-w-0 break-words text-pretty text-lg font-medium leading-[1.5] text-[#202020]"

/** Matches section gutters: phone → tablet → desktop. */
const GLANCE_TABLE_INSET = "px-4 sm:px-5 md:px-6 lg:px-8"

type FollowerComparisonGlanceTableProps = {
  title: string
  highQualityColumn: string
  realFollowersColumn: string
  rows: FollowerComparisonGlanceRow[]
  checkGreenIcon: string
  crossRedIcon: string
}

function GlanceCell({
  cell,
  checkGreenIcon,
  crossRedIcon,
}: {
  cell: FollowerComparisonGlanceCell
  checkGreenIcon: string
  crossRedIcon: string
}) {
  if (cell.kind === "check") {
    return (
      <Image
        src={checkGreenIcon}
        alt=""
        width={24}
        height={24}
        className="size-6 shrink-0"
        unoptimized
      />
    )
  }

  if (cell.kind === "cross") {
    return (
      <Image
        src={crossRedIcon}
        alt=""
        width={24}
        height={24}
        className="size-6 shrink-0"
        unoptimized
      />
    )
  }

  return (
    <span
      className={cn(
        "min-w-0 break-words text-base leading-[1.35]",
        cell.emphasis === "brand"
          ? "font-semibold leading-normal text-button"
          : "font-medium text-[#202020]",
      )}
    >
      {cell.value}
    </span>
  )
}

export function FollowerComparisonGlanceTable({
  title,
  highQualityColumn,
  realFollowersColumn,
  rows,
  checkGreenIcon,
  crossRedIcon,
}: FollowerComparisonGlanceTableProps) {
  return (
    <div
      className="service-follower-glance-scroll w-full min-w-0 max-w-full overflow-x-auto rounded-2xl border border-[#ebecef] bg-white shadow-[0px_2px_6px_rgba(99,99,99,0.15)] lg:overflow-x-visible"
    >
      <div className="w-full min-w-0">
        <div
          className={cn(
            "rounded-t-2xl bg-gradient-to-r from-[#0087d4]/20 via-[#32b4ff]/20 to-[#0795e7]/[0.174] py-3",
            GLANCE_TABLE_INSET,
          )}
        >
          <div className={GLANCE_TABLE_HEADER_ROW}>
            <p className={GLANCE_HEADER_TEXT}>{title}</p>
            <p className={GLANCE_HEADER_TEXT}>{highQualityColumn}</p>
            <p className={GLANCE_HEADER_TEXT}>{realFollowersColumn}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 pb-2 pt-2">
          {rows.map((row, index) => (
            <div key={row.id}>
              <div className={cn(GLANCE_TABLE_ROW, GLANCE_TABLE_INSET, "py-2.5")}>
                <p className="min-w-0 break-words text-base font-medium leading-[1.35] text-[#202020]">
                  {row.label}
                </p>
                <div className="flex min-w-0 items-center py-1">
                  <GlanceCell
                    cell={row.highQuality}
                    checkGreenIcon={checkGreenIcon}
                    crossRedIcon={crossRedIcon}
                  />
                </div>
                <div className="flex min-w-0 items-center py-1">
                  <GlanceCell
                    cell={row.realFollowers}
                    checkGreenIcon={checkGreenIcon}
                    crossRedIcon={crossRedIcon}
                  />
                </div>
              </div>
              {index < rows.length - 1 ? (
                <div
                  className="mx-4 border-t border-dashed border-[#c1c4cc] sm:mx-5 md:mx-6 lg:mx-8"
                  aria-hidden
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
