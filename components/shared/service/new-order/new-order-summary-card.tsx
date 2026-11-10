import type {
  NewOrderAssets,
  NewOrderContent,
} from "@/types/service/new-order"
import type { ServicePaymentLogo } from "@/types/service/hero"
import { LinkTo } from "@/components/shared/link-to"
import { NewOrderPlatformIconSlot } from "@/components/shared/service/new-order/new-order-platform-icon-slot"
import { cn } from "@/lib/utils"

const PAYMENT_CHIP_CLASS =
  "relative box-border h-[38px] w-full min-w-0 overflow-hidden rounded-[6.706px] bg-white shadow-[0px_2.235px_6.706px_rgba(65,65,65,0.12)]"

const INSTAGRAM_GRADIENT =
  "bg-gradient-to-r from-[#f27b34] via-[#d8366b] to-[#7e359c] bg-clip-text text-transparent"

type NewOrderSummaryCardProps = {
  summary: NewOrderContent["summary"]
  assets: NewOrderAssets
  quantity: number
  unitLabel: string
  platformLabel: string
  price: string
  ctaHref?: string
  canContinue?: boolean
  profileGateMessage?: string
  onBlockedContinue?: () => void
  ctaLabel?: string
  fillHeight?: boolean
}

function PaymentBrandChip({
  src,
  imageClassName,
}: {
  src: string
  imageClassName: string
}) {
  return (
    <div className={PAYMENT_CHIP_CLASS}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" src={src} className={imageClassName} />
    </div>
  )
}

function PaymentWalletChip({
  iconSrc,
  label,
  iconClassName,
}: {
  iconSrc: string
  label: string
  iconClassName?: string
}) {
  return (
    <div className={PAYMENT_CHIP_CLASS}>
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-[4.47px]">
        {iconClassName ? (
          <span className="relative block h-[26.824px] w-[26.408px] shrink-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src={iconSrc} className={iconClassName} />
          </span>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            alt=""
            src={iconSrc}
            className="size-[26.824px] shrink-0 object-contain"
          />
        )}
        <span className="whitespace-nowrap text-[11px] font-medium leading-[1.25] text-[#202020] sm:text-[15.088px]">
          {label}
        </span>
      </div>
    </div>
  )
}

function PaymentLogo({ logo, index }: { logo: ServicePaymentLogo; index: number }) {
  if (logo.type === "wallet") {
    return (
      <PaymentWalletChip
        key={`wallet-${index}`}
        iconSrc={logo.iconSrc}
        label={logo.label}
        iconClassName={logo.iconClassName}
      />
    )
  }
  return (
    <PaymentBrandChip
      key={logo.src}
      src={logo.src}
      imageClassName={logo.className}
    />
  )
}

export function NewOrderSummaryCard({
  summary,
  assets,
  quantity,
  unitLabel,
  platformLabel,
  price,
  ctaHref,
  canContinue = true,
  profileGateMessage,
  onBlockedContinue,
  ctaLabel: ctaLabelOverride,
  fillHeight = false,
}: NewOrderSummaryCardProps) {
  const lineTitle = `${quantity} ${unitLabel}`
  const ctaLabel = ctaLabelOverride ?? summary.ctaLabel
  const ctaClassName =
    "flex h-14 w-full min-w-[120px] items-center justify-center rounded-xl bg-gradient-to-r from-[#f27b34] via-[#d8366b] to-[#7e359c] px-4 py-4 text-lg font-medium leading-[1.5] text-white disabled:cursor-not-allowed disabled:opacity-50"

  return (
    <div
      className={cn(
        "w-full rounded-[24px] border border-[#f5f6f7] bg-white p-4 shadow-[0px_2px_6px_rgba(37,37,37,0.16)] sm:p-6",
        fillHeight && "flex min-h-0 flex-col xl:h-full",
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-[530px] flex-col items-center gap-7",
          fillHeight && "min-h-0 flex-1 xl:h-full",
        )}
      >
        <div className="w-full rounded-xl bg-[#1c2533] p-4">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={assets.orderSummaryIcon}
              width={28}
              height={28}
              className="size-7 shrink-0"
            />
            <h2 className="text-lg font-semibold leading-[1.3] text-white">
              {summary.heading}
            </h2>
          </div>
        </div>

        <div className="flex w-full flex-col gap-5">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-3">
              <NewOrderPlatformIconSlot
                icon={{
                  kind: "sprite",
                  cropClassName:
                    "absolute h-[639.76%] left-[-343.53%] max-w-none top-[-48.82%] w-[787.4%]",
                }}
                spriteSrc={assets.socialIconsSprite}
              />
              <div className="flex flex-col gap-1.5">
                <p
                  className={cn(
                    "text-lg font-semibold leading-[1.3]",
                    INSTAGRAM_GRADIENT,
                  )}
                >
                  {lineTitle}
                </p>
                <p className="text-base font-medium leading-[1.35] text-[#4f586d]">
                  {platformLabel}
                </p>
              </div>
            </div>
            <p className="text-lg font-semibold leading-[1.3] text-[#343e56]">
              {price}
            </p>
          </div>

          <div className="h-px w-full border-t border-dashed border-[#c1c4cc]" />

          <div className="flex w-full items-center justify-between">
            <p className="text-2xl font-semibold leading-[1.5] text-[#222e48]">
              {summary.totalLabel}
            </p>
            <p className="text-2xl font-semibold leading-[1.5] text-[#222e48]">
              {price}
            </p>
          </div>
        </div>

        {profileGateMessage && !canContinue ? (
          <p
            role="alert"
            className="w-full text-center text-sm font-medium leading-[1.35] text-[#e11d48]"
          >
            {profileGateMessage}
          </p>
        ) : null}
        {canContinue && ctaHref ? (
          <LinkTo href={ctaHref} className={ctaClassName}>
            {ctaLabel}
          </LinkTo>
        ) : (
          <button
            type="button"
            onClick={() => {
              if (!canContinue) {
                onBlockedContinue?.()
              }
            }}
            className={cn(ctaClassName, !canContinue && "opacity-50")}
          >
            {ctaLabel}
          </button>
        )}

        <div className="flex w-full flex-col items-center gap-5">
          <div className="flex items-center gap-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={assets.secureCheckoutGreenIcon}
              width={20}
              height={20}
              className="size-5 shrink-0"
            />
            <p className="text-sm font-medium leading-[1.35] text-[#6a7283]">
              {summary.secureCheckoutLabel}
            </p>
          </div>

          <div className="h-px w-full border-t border-dashed border-[#c1c4cc]" />

          <div className="grid w-full grid-cols-6 gap-2 sm:gap-3">
            {summary.paymentLogos.map((logo, index) => (
              <PaymentLogo key={index} logo={logo} index={index} />
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-5">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <p className="text-base leading-[1.35]">
              <span className="font-medium text-[#222e48]">
                {summary.clientsCount}{" "}
              </span>
              <span className="font-normal text-[#222e48]">
                {summary.clientsLabel}
              </span>
            </p>
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-[3px]">
                {Array.from({ length: summary.starCount }).map((_, index) => (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    key={index}
                    alt=""
                    src={assets.starIcon}
                    width={18}
                    height={18}
                    className="size-[18px] shrink-0"
                  />
                ))}
              </div>
              <p className="text-base leading-[1.35]">
                <span className="font-medium text-[#222e48]">
                  {summary.ratingValue}{" "}
                </span>
                <span className="font-normal text-[#798090]">
                  {summary.reviewsLabel}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5">
            {summary.trustBadges.map((badge) => (
              <div key={badge.id} className="flex items-center gap-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={badge.iconSrc}
                  width={20}
                  height={20}
                  className={cn(
                    "shrink-0",
                    badge.id === "money-back" ? "size-[18px]" : "size-5",
                  )}
                />
                <span className="text-sm font-medium leading-[1.35] text-[#798090]">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
