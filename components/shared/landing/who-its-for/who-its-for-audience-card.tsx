import Image from "next/image"

import { WhoItsForServiceTagPill } from "@/components/shared/landing/who-its-for/who-its-for-service-tag"
import type { WhoItsForAudience } from "@/types/landing/who-its-for"

type WhoItsForAudienceCardProps = {
  audience: WhoItsForAudience
  dividerSrc: string
}

export function WhoItsForAudienceCard({
  audience,
  dividerSrc,
}: WhoItsForAudienceCardProps) {
  return (
    <article
      data-slot="who-its-for-audience-card"
      className="w-full rounded-[20px] border-[0.8px] border-[#86d3ff] bg-white p-6 sm:p-10"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div
            className="relative shrink-0 overflow-hidden"
            style={{
              width: audience.heroIconWidth,
              height: audience.heroIconHeight,
            }}
          >
            <Image
              src={audience.heroIconSrc}
              alt=""
              width={audience.heroIconWidth}
              height={audience.heroIconHeight}
              className={audience.heroImageClassName}
              unoptimized
            />
          </div>
          <h3
            className={`font-medium text-[#0f172a] ${
              audience.titleClassName ?? "text-xl leading-[1.3]"
            }`}
          >
            {audience.title}
          </h3>
        </div>

        <div className="flex flex-col gap-4">
          <p className="max-w-[502px] font-geist text-base leading-normal text-n500">
            {audience.description}
          </p>

          <div className="relative h-px w-full">
            <Image
              src={dividerSrc}
              alt=""
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium leading-[1.35] text-[#0f172a]">
              What they reach for
            </p>
            <div className="-mx-1 flex min-w-0 flex-nowrap items-center gap-3 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {audience.tags.map((tag) => (
                <WhoItsForServiceTagPill key={tag.id} tag={tag} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
