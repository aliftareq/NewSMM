import type { LandingFooterContent } from "@/types/landing/footer"

import { cn } from "@/lib/utils"

type FooterContactColumnProps = {
  contact: LandingFooterContent["contact"]
  className?: string
}

export function FooterContactColumn({
  contact,
  className,
}: FooterContactColumnProps) {
  return (
    <div className={cn("w-full min-w-0 xl:w-[186.55px] xl:shrink-0", className)}>
      <div className="flex flex-col gap-5">
        <p className="text-xl font-medium leading-6 text-white">
          {contact.title}
        </p>
        <ul className="flex flex-col gap-[15px]">
        {contact.items.map((item) => (
          <li
            key={item.id}
            className={`flex gap-2.5 ${item.multiline ? "items-start" : "items-center"}`}
          >
            <span className="flex size-[30.545px] shrink-0 items-center justify-center rounded-[5.818px] border-[0.727px] border-white/10 bg-[#282828] p-[6.545px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" src={item.iconSrc} width={16} height={16} className="block" />
            </span>
            <p
              className={`min-w-0 text-sm font-medium leading-[1.35] text-white/80 ${
                item.multiline
                  ? "max-w-[146px] sm:max-w-[220px] xl:max-w-[146px]"
                  : "break-all sm:break-normal sm:whitespace-nowrap"
              }`}
            >
              {item.text}
            </p>
          </li>
        ))}
        </ul>
      </div>
    </div>
  )
}
