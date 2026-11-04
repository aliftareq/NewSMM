import Image from "next/image"

import type { WhoItsForServiceTag } from "@/types/landing/who-its-for"

type WhoItsForServiceTagProps = {
  tag: WhoItsForServiceTag
}

export function WhoItsForServiceTagPill({ tag }: WhoItsForServiceTagProps) {
  return (
    <div className="shrink-0 rounded-xl border border-[#d8f2ff] bg-[#e8f6fd] px-4 py-2.5">
      <div className="flex items-center gap-2 whitespace-nowrap">
        <div
          className="relative shrink-0 overflow-hidden"
          style={{ width: tag.iconWidth, height: tag.iconHeight }}
        >
          <Image
            src={tag.iconSrc}
            alt=""
            width={tag.iconWidth}
            height={tag.iconHeight}
            className={
              tag.imageClassName ??
              "size-full object-contain object-center"
            }
            unoptimized
          />
        </div>
        <span className="whitespace-nowrap text-sm leading-[1.3] text-instagram">
          {tag.label}
        </span>
      </div>
    </div>
  )
}
