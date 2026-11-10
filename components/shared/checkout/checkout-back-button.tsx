import { LinkTo } from "@/components/shared/link-to"

type CheckoutBackButtonProps = {
  href: string
  label: string
  arrowSrc: string
}

export function CheckoutBackButton({
  href,
  label,
  arrowSrc,
}: CheckoutBackButtonProps) {
  return (
    <LinkTo
      href={href}
      className="inline-flex h-11 w-fit max-w-full shrink-0 items-center justify-center gap-2.5 rounded-full border border-[#269de7] bg-white py-1.5 pl-1.5 pr-5 shadow-[0px_4px_3px_rgba(0,0,0,0.12)]"
    >
      <span className="flex size-8 shrink-0 items-center justify-center">
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
