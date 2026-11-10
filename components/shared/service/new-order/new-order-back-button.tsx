import { LinkTo } from "@/components/shared/link-to"

type NewOrderBackButtonProps = {
  href: string
  label: string
  arrowSrc: string
}

export function NewOrderBackButton({
  href,
  label,
  arrowSrc,
}: NewOrderBackButtonProps) {
  return (
    <LinkTo
      href={href}
      style={{ width: "fit-content", maxWidth: "100%" }}
      className="box-border inline-flex h-11 w-fit max-w-full shrink-0 items-center justify-center gap-2.5 rounded-full border border-[#269de7] bg-white py-1.5 pl-1.5 pr-5 shadow-[0px_4px_6px_rgba(0,0,0,0.12)]"
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-[24px] bg-[#269de7]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={arrowSrc}
          width={32}
          height={32}
          className="block size-8 -scale-y-100 rotate-180"
        />
      </span>
      <span className="text-base font-medium leading-[1.5] whitespace-nowrap text-[#269de7]">
        {label}
      </span>
    </LinkTo>
  )
}
