"use client"

import { useMemo, useState } from "react"

import { checkoutPageContent } from "@/data/checkout/checkout"
import { useCart } from "@/hooks/use-cart"
import { formatUsd } from "@/lib/build-order-href"
import { CheckoutBackButton } from "@/components/shared/checkout/checkout-back-button"
import { LinkTo } from "@/components/shared/link-to"
import { cn } from "@/lib/utils"

const { assets, ...copy } = checkoutPageContent

const fieldShell =
  "flex h-[52px] w-full items-center rounded-xl border border-[#ebecef] bg-[#f5f6f7] px-[18px] py-4 text-sm font-medium leading-[1.35] text-[#798090] outline-none placeholder:text-[#798090]"

const emailFieldShell =
  "flex h-[58px] w-full items-center rounded-xl border border-[#c1e7ff] bg-[rgba(33,174,255,0.06)] px-5 py-4 text-sm leading-[1.3] text-[#5b6477] outline-none placeholder:text-[#5b6477]"

function WalletPayButton({
  iconSrc,
  iconClassName,
}: {
  iconSrc: string
  iconClassName?: string
}) {
  return (
    <button
      type="button"
      className="flex min-h-[52px] flex-1 flex-col items-center justify-center rounded-xl border border-[#dfe0e4] px-3 py-2.5"
    >
      <span className="flex items-center gap-2">
        <span className="relative size-8 shrink-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={iconSrc}
            width={32}
            height={32}
            className={cn("block size-8 object-contain", iconClassName)}
          />
        </span>
        <span className="text-lg font-medium leading-[1.25] text-[#202020]">
          {copy.walletPayLabel}
        </span>
      </span>
    </button>
  )
}

function SaveCardToggle({ label }: { label: string }) {
  const [checked, setChecked] = useState(false)

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => setChecked((value) => !value)}
      className={cn(
        "flex h-[54px] shrink-0 cursor-pointer items-center justify-center gap-3 rounded-xl border border-[#21aeff] px-5 transition-colors",
        checked && "bg-[rgba(33,174,255,0.08)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#21aeff]/45 focus-visible:ring-offset-2",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded border-2 border-[#21aeff] bg-white transition-colors",
          checked && "border-[#21aeff] bg-[#21aeff]",
        )}
      >
        {checked ? (
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="block"
            aria-hidden
          >
            <path
              d="M2 6.2L4.8 9L10 3"
              stroke="white"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </span>
      <span className="text-base font-medium leading-[1.35] text-[#21aeff]">
        {label}
      </span>
    </button>
  )
}

export function CheckoutPageContent() {
  const { subtotal } = useCart()

  const bundleSaving = copy.bundleSavingFallback
  const total = Math.max(0, subtotal - bundleSaving)

  const payWithCardLabel = copy.payWithCardTemplate.replace(
    "{amount}",
    formatUsd(total),
  )
  const confirmPayLabel = copy.confirmPayTemplate.replace(
    "{amount}",
    formatUsd(total),
  )

  const cardBrands = useMemo(
    () => [
      { src: assets.cardBrandVisa, className: "h-[41px] w-[104px] object-contain" },
      { src: assets.cardBrandMastercard, className: "h-[41px] w-[69px] object-contain" },
      { src: assets.cardBrandAmex, className: "h-[41px] w-[84px] object-contain" },
      { src: assets.cardBrandMaestro, className: "h-[41px] w-16 object-contain" },
    ],
    [],
  )

  return (
    <div className="info-container flex w-full flex-col items-start gap-6">
      <CheckoutBackButton
        href={copy.backHref}
        label={copy.backLabel}
        arrowSrc={assets.backArrow}
      />

      <div className="flex w-full flex-col gap-6">
        <h1 className="text-2xl font-semibold leading-[1.5] text-[#222e48]">
          {copy.title}
        </h1>

        <div className="grid w-full grid-cols-1 gap-4 xl:grid-cols-[minmax(0,726px)_minmax(0,1fr)] xl:items-start xl:justify-between xl:gap-x-8">
          <div className="w-full max-w-[726px] rounded-[24px] border border-[#ebecef] bg-white p-6 shadow-[0px_2px_3px_rgba(37,37,37,0.16)]">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold leading-[1.35] text-[#222e48]">
                  {copy.contactTitle}
                </h2>
                <p className="text-sm font-medium leading-[1.35] text-[#798090]">
                  {copy.contactSubtitle}
                </p>
              </div>

              <div className="h-px w-full border-t border-dashed border-[#c1c4cc]" />

              <div className="flex w-full flex-col gap-6">
                <div className="flex w-full flex-col gap-3">
                  <label className="flex w-full flex-col gap-2">
                    <span className="text-base font-medium leading-[1.35] text-[#343e56]">
                      {copy.emailLabel}
                    </span>
                    <input
                      type="email"
                      placeholder={copy.emailPlaceholder}
                      autoComplete="email"
                      className={emailFieldShell}
                    />
                  </label>
                  <p className="text-right text-sm leading-[1.35] text-[#4f586d]">
                    {copy.loginPromptPrefix}{" "}
                    <LinkTo
                      href={copy.loginHref}
                      className="font-semibold text-[#21aeff] underline underline-offset-2"
                    >
                      {copy.loginLabel}
                    </LinkTo>
                  </p>
                </div>

                <div className="flex w-full flex-col gap-3">
                  <p className="text-base font-medium leading-[1.35] text-[#202020]">
                    {copy.paymentMethodLabel}
                  </p>
                  <div className="flex w-full gap-3">
                    <WalletPayButton iconSrc={assets.applePayMark} />
                    <WalletPayButton
                      iconSrc={assets.googlePayMark}
                      iconClassName="scale-110"
                    />
                  </div>
                </div>

                <p className="text-center text-sm font-medium leading-[1.35] text-[#5b6477]">
                  {copy.orPayAnotherWayLabel}
                </p>

                <button
                  type="button"
                  className="mx-auto flex w-full max-w-[440px] flex-col items-center gap-4 rounded-xl bg-[#21aeff] px-4 py-5"
                >
                  <div className="flex flex-wrap items-center justify-center gap-2.5">
                    {cardBrands.map((brand) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={brand.src}
                        alt=""
                        src={brand.src}
                        width={104}
                        height={41}
                        className={brand.className}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-medium leading-[1.5] text-white">
                    {payWithCardLabel}
                  </span>
                </button>

                <div className="flex w-full flex-col gap-6">
                  <div className="h-px w-full border-t border-dashed border-[#c1c4cc]" />

                  <PaymentDetailsBar />

                  <div className="flex w-full flex-col gap-6 sm:flex-row sm:items-end">
                    <div className="flex w-full flex-col gap-2 sm:flex-1">
                      <label className="text-base font-medium leading-[1.35] text-[#202020]">
                        {copy.cardNameLabel}
                      </label>
                      <input
                        type="text"
                        placeholder={copy.cardNamePlaceholder}
                        autoComplete="cc-name"
                        className={fieldShell}
                      />
                    </div>
                    <div className="flex w-full flex-col gap-2 sm:flex-1">
                      <label className="text-base font-medium leading-[1.35] text-[#202020]">
                        {copy.cardNumberLabel}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder={copy.cardNumberPlaceholder}
                          autoComplete="cc-number"
                          className={cn(fieldShell, "pr-11")}
                        />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          alt=""
                          src={assets.cardInputIcon}
                          width={20}
                          height={20}
                          className="pointer-events-none absolute top-1/2 right-[18px] size-5 -translate-y-1/2"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full flex-col gap-6 sm:flex-row sm:items-end">
                    <div className="flex w-full flex-col gap-2 sm:flex-1">
                      <label className="text-base font-medium leading-[1.35] text-[#202020]">
                        {copy.expirationLabel}
                      </label>
                      <input
                        type="text"
                        placeholder={copy.expirationPlaceholder}
                        autoComplete="cc-exp"
                        className={fieldShell}
                      />
                    </div>
                    <div className="flex w-full flex-col gap-2 sm:flex-1">
                      <label className="text-base font-medium leading-[1.35] text-[#202020]">
                        {copy.cvvLabel}
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          inputMode="numeric"
                          autoComplete="cc-csc"
                          className={cn(fieldShell, "pr-11")}
                        />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          alt=""
                          src={assets.cvvLockIcon}
                          width={20}
                          height={20}
                          className="pointer-events-none absolute top-1/2 right-[18px] size-5 -translate-y-1/2"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-stretch">
                  <SaveCardToggle label={copy.saveCardLabel} />
                  <button
                    type="button"
                    className="flex min-h-[54px] flex-1 items-center justify-center rounded-xl bg-[#269de7] px-4 text-base font-medium leading-[1.35] text-white"
                  >
                    {confirmPayLabel}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <aside className="w-full max-w-[548px] shrink-0 justify-self-end rounded-[24px] border border-[#f5f6f7] bg-white p-6 shadow-[0px_2px_3px_rgba(37,37,37,0.16)] xl:sticky xl:top-24">
            <div className="mx-auto flex w-full max-w-[500px] flex-col gap-7">
              <div className="flex w-full gap-3">
                <input
                  type="text"
                  placeholder={copy.couponPlaceholder}
                  className="h-[50px] min-w-0 flex-1 rounded-xl border border-[#ace1ff] bg-white px-4 text-sm font-medium text-[#343e56] outline-none placeholder:text-[#888e9c]"
                />
                <button
                  type="button"
                  className="h-[50px] w-[115px] shrink-0 rounded-xl border border-[#0087d4] bg-[rgba(33,174,255,0.1)] text-base font-medium text-[#21aeff]"
                >
                  {copy.couponApplyLabel}
                </button>
              </div>

              <div className="w-full rounded-xl bg-[#1c2533] p-4">
                <div className="flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    src={assets.orderSummaryIcon}
                    width={28}
                    height={28}
                    className="size-7"
                  />
                  <h2 className="text-lg font-semibold leading-[1.3] text-white">
                    {copy.summaryHeading}
                  </h2>
                </div>
              </div>

              <div className="flex w-full flex-col gap-5">
                <div className="flex items-center justify-between">
                  <p className="text-base font-medium text-[#4f586d]">
                    {copy.subtotalLabel}
                  </p>
                  <p className="text-lg font-semibold text-[#343e56]">
                    {formatUsd(subtotal)}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-base font-medium text-[#20ad83]">
                    {copy.bundleSavingLabel}
                  </p>
                  <p className="text-lg font-semibold text-[#20ad83]">
                    -{formatUsd(bundleSaving)}
                  </p>
                </div>
                <div className="h-px w-full border-t border-dashed border-[#c1c4cc]" />
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-semibold text-[#222e48]">
                    {copy.totalLabel}
                  </p>
                  <p className="text-2xl font-semibold text-[#222e48]">
                    {formatUsd(total)}
                  </p>
                </div>
              </div>

              <div className="flex w-full flex-col gap-5">
                <button
                  type="button"
                  className="flex h-14 w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#f27b34] via-[#d8366b] to-[#7e359c] text-lg font-medium leading-[1.5] text-white"
                >
                  {copy.checkoutCtaLabel}
                </button>

                <div className="flex items-center justify-center gap-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    src={assets.secureCheckoutIcon}
                    width={20}
                    height={20}
                    className="size-5"
                  />
                  <p className="text-sm font-medium leading-[1.35] text-[#6a7283]">
                    {copy.sslLabel}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

function PaymentDetailsBar() {
  return (
    <div className="flex h-[52px] w-full items-center justify-center rounded-xl border border-[#ebecef] bg-[#f5f6f7] px-[18px]">
      <p className="text-lg font-medium leading-[1.5] text-[#222e48]">
        {copy.paymentDetailsHeading}
      </p>
    </div>
  )
}
