import Image from "next/image"

import type {
  FollowerComparisonGlanceCell,
  FollowerComparisonGlanceRow,
} from "@/types/service/follower-comparison"
import { cn } from "@/lib/utils"

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
        "text-base leading-[1.35]",
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
    <div className="w-full min-w-0 overflow-x-auto rounded-2xl border border-[#ebecef] bg-white shadow-[0px_2px_6px_rgba(99,99,99,0.15)]">
      <div className="min-w-[720px]">
        <div className="grid grid-cols-[minmax(200px,550px)_1fr_1fr] items-center gap-6 rounded-t-2xl bg-gradient-to-r from-[#0087d4]/20 via-[#32b4ff]/20 to-[#0795e7]/[0.174] px-8 py-3">
          <p className="text-lg font-medium leading-[1.5] text-[#202020]">
            {title}
          </p>
          <p className="text-lg font-medium leading-[1.5] text-[#202020]">
            {highQualityColumn}
          </p>
          <p className="text-lg font-medium leading-[1.5] text-[#202020]">
            {realFollowersColumn}
          </p>
        </div>

        <div className="flex flex-col gap-2 px-0 pb-2 pt-2">
          {rows.map((row, index) => (
            <div key={row.id}>
              <div className="grid grid-cols-[minmax(200px,550px)_1fr_1fr] items-center gap-6 px-8 py-2.5">
                <p className="text-base font-medium leading-[1.35] text-[#202020]">
                  {row.label}
                </p>
                <div className="flex items-center py-1">
                  <GlanceCell
                    cell={row.highQuality}
                    checkGreenIcon={checkGreenIcon}
                    crossRedIcon={crossRedIcon}
                  />
                </div>
                <div className="flex items-center py-1">
                  <GlanceCell
                    cell={row.realFollowers}
                    checkGreenIcon={checkGreenIcon}
                    crossRedIcon={crossRedIcon}
                  />
                </div>
              </div>
              {index < rows.length - 1 ? (
                <div
                  className="mx-8 border-t border-dashed border-[#c1c4cc]"
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
