import Image from "next/image"

import type { GrowthPackageTrustItem } from "@/types/service/growth-package"

type GrowthPackageTrustRowProps = {
  items: GrowthPackageTrustItem[]
  checkIconSrc: string
}

export function GrowthPackageTrustRow({
  items,
  checkIconSrc,
}: GrowthPackageTrustRowProps) {
  return (
    <ul className="flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row sm:gap-8">
      {items.map((item) => (
        <li key={item.id} className="flex items-center gap-2">
          <Image
            src={checkIconSrc}
            alt=""
            width={20}
            height={20}
            className="size-5 shrink-0"
            unoptimized
          />
          <span className="text-base font-medium leading-[1.35] text-[#0c0a09]">
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  )
}
