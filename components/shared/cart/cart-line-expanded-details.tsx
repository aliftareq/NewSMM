import type { CartLineItemDetails } from "@/types/cart/cart"
import { cn } from "@/lib/utils"

const INSTAGRAM_GRADIENT =
  "bg-gradient-to-r from-[#f27b34] via-[#d8366b] to-[#7e359c] bg-clip-text text-transparent"

type CartLineExpandedDetailsProps = {
  details: CartLineItemDetails
  placeholderAvatarSrc: string
}

export function CartLineExpandedDetails({
  details,
  placeholderAvatarSrc,
}: CartLineExpandedDetailsProps) {
  const avatarSrc = details.avatarSrc || placeholderAvatarSrc

  return (
    <div className="flex w-full items-center justify-between gap-3 rounded-xl border border-[#ebecef] bg-[#fafafb] p-3">
      <div className="flex min-w-0 items-start gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={avatarSrc}
          width={48}
          height={48}
          className="size-12 shrink-0 rounded-full object-cover"
        />
        <div className="flex min-w-0 flex-col gap-1.5">
          <p
            className={cn(
              "truncate text-lg font-semibold leading-[1.3]",
              INSTAGRAM_GRADIENT,
            )}
          >
            {details.handle}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm leading-[1.3] text-[#4f586d]">
            <p>
              <span className="font-medium leading-[1.35] text-[#202020]">
                {details.followersStat}
              </span>
              <span> Followers</span>
            </p>
            <p>
              <span className="font-medium leading-[1.35] text-[#202020]">
                {details.followingStat}
              </span>
              <span> Followers</span>
            </p>
          </div>
        </div>
      </div>
      <p className="max-w-[220px] shrink-0 text-left text-base font-medium leading-[1.35] text-[#4f586d] sm:text-right">
        {details.serviceSummary}
      </p>
    </div>
  )
}
