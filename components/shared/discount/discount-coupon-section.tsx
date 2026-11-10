import { DiscountCouponCard } from "@/components/shared/discount/discount-coupon-card"
import { LinkTo } from "@/components/shared/link-to"
import type { DiscountPageContent } from "@/types/discount/discount-page"

type DiscountCouponSectionProps = {
  couponSection: DiscountPageContent["couponSection"]
  assets: Pick<
    DiscountPageContent["assets"],
    "couponPercentIconSrc" | "signupCtaArrowSrc"
  >
}

function CouponRow({
  coupons,
  couponSection,
  assets,
}: {
  coupons: DiscountPageContent["couponSection"]["coupons"]
  couponSection: DiscountPageContent["couponSection"]
  assets: DiscountCouponSectionProps["assets"]
}) {
  return (
    <div className="grid w-full grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 sm:justify-items-stretch xl:grid-cols-4">
      {coupons.map((coupon) => (
        <DiscountCouponCard
          key={coupon.id}
          coupon={coupon}
          spineLabel={couponSection.spineLabel}
          revealLabel={couponSection.revealLabel}
          couponPercentIconSrc={assets.couponPercentIconSrc}
        />
      ))}
    </div>
  )
}

export function DiscountCouponSection({
  couponSection,
  assets,
}: DiscountCouponSectionProps) {
  const rowOne = couponSection.coupons.slice(0, 4)
  const rowTwo = couponSection.coupons.slice(4, 8)

  return (
    <section
      className="relative z-10 bg-white pb-14 pt-4 sm:pb-16 sm:pt-6 lg:pb-20 lg:pt-20"
      aria-label="Discount coupons"
    >
      <div className="info-container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col items-center gap-12">
          <div className="flex w-full flex-col gap-5">
            <CouponRow
              coupons={rowOne}
              couponSection={couponSection}
              assets={assets}
            />
            <CouponRow
              coupons={rowTwo}
              couponSection={couponSection}
              assets={assets}
            />
          </div>

          <LinkTo
            href={couponSection.signupCta.href}
            className="flex w-full max-w-[450px] cursor-pointer items-center justify-between rounded-xl border border-n40 bg-white py-3 pl-4 pr-1.5 shadow-[0px_4px_3px_rgba(63,63,63,0.12)]"
          >
            <span className="text-base font-medium leading-[1.35] text-[#269de7]">
              {couponSection.signupCta.label}
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              aria-hidden
              src={assets.signupCtaArrowSrc}
              width={32}
              height={32}
              className="block size-8 shrink-0"
            />
          </LinkTo>
        </div>
      </div>
    </section>
  )
}
