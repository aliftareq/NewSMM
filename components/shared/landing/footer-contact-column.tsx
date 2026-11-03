import type { LandingFooterContent } from "@/types/landing/footer"

type FooterContactColumnProps = {
  contact: LandingFooterContent["contact"]
}

export function FooterContactColumn({ contact }: FooterContactColumnProps) {
  return (
    <div className="max-w-[187px]">
      <p className="mb-5 text-xl font-medium leading-normal text-white">
        {contact.title}
      </p>
      <ul className="flex flex-col gap-[15px]">
        {contact.items.map((item) => (
          <li key={item.id} className="flex gap-2.5">
            <span className="flex size-[30.545px] shrink-0 items-center justify-center rounded-[5.818px] border border-white/10 bg-[#282828] p-[7.272px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" src={item.iconSrc} width={16} height={16} className="block" />
            </span>
            <p
              className={`text-sm font-medium leading-[1.35] text-white/80 ${
                item.multiline ? "max-w-[146px]" : "whitespace-nowrap"
              }`}
            >
              {item.text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
