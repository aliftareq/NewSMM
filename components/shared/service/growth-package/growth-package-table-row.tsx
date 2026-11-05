import { Button } from "@/components/ui/button"
import type { GrowthPackageRow } from "@/types/service/growth-package"
import { cn } from "@/lib/utils"

type GrowthPackageTableRowProps = {
  row: GrowthPackageRow
  selectLabel: string
  instagramSprite: string
  instagramCropClassName: string
}

export function GrowthPackageTableRow({
  row,
  selectLabel,
  instagramSprite,
  instagramCropClassName,
}: GrowthPackageTableRowProps) {
  return (
    <div
      className={cn(
        "grid min-h-[86px] grid-cols-[minmax(0,1fr)_200px_minmax(280px,1fr)] items-center gap-0 rounded-2xl transition-colors duration-200",
        "hover:bg-[#fdf1f5]",
        row.rowVariant === "muted" && "bg-[#f5f6f7]",
        (row.rowVariant === "bordered" || row.rowVariant === "featured") &&
          "border border-[rgba(175,173,173,0.26)] bg-white",
      )}
    >
      <div className="flex min-w-0 items-center gap-3 px-4 py-4">
        <span className="relative block size-[30px] shrink-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={instagramSprite}
            className={instagramCropClassName}
          />
        </span>
        <div className="flex min-w-0 flex-col gap-2">
          <div className="relative flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "text-xl font-semibold leading-[1.35]",
                row.quantityGradient
                  ? "bg-gradient-to-r from-[#f27b34] via-[#d8366b] to-[#7e359c] bg-clip-text text-transparent"
                  : "text-button",
              )}
            >
              {row.quantity}
            </span>
            {row.popularBadge ? (
              <span className="rounded-md bg-[#e11d48] px-3.5 py-1 text-xs font-medium leading-[1.5] text-white">
                POPULAR
              </span>
            ) : null}
          </div>
          <span className="text-sm font-medium leading-[1.35] text-[#5b6477]">
            {row.tierLabel}
          </span>
        </div>
      </div>

      <div className="flex h-[86px] items-center px-4 py-3">
        <p className="text-base font-medium leading-[1.25] text-[#374151]">
          {row.unitValue}
        </p>
      </div>

      <div className="flex h-[86px] items-center gap-[18px] px-4 py-3">
        <p className="min-w-0 flex-1 text-lg font-semibold leading-[1.3] text-[#202020]">
          {row.price}
        </p>
        <Button
          type="button"
          className={cn(
            "h-[46px] max-w-[150px] min-w-[120px] shrink-0 rounded-xl px-6 text-base font-medium leading-[1.35]",
            row.selectVariant === "instagram-gradient" &&
              "border-0 bg-gradient-to-r from-[#f27b34] via-[#d8366b] to-[#7e359c] hover:opacity-95",
          )}
        >
          {selectLabel}
        </Button>
      </div>
    </div>
  )
}
