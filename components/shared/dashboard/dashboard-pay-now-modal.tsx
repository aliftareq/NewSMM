"use client"

import { useEffect, useId, useState } from "react"

import { dashboardPayNowModalContent } from "@/data/dashboard/pay-now-modal"
import type { DashboardPayNowModalContent } from "@/types/dashboard/pay-now-modal"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DashboardModalScaledBody } from "@/components/shared/dashboard/dashboard-modal-scaled-body"
import { DASHBOARD_MODAL_CONTENT_CLASS } from "@/components/shared/dashboard/dashboard-modal-shell"
import { cn } from "@/lib/utils"

const FIELD_SHELL =
  "flex h-[52px] w-full items-center rounded-xl border border-[#ebecef] bg-[#f5f6f7] px-[18px] py-4"

const PAY_WALLET_MARK_CLASS = "block size-8 shrink-0"

function formatMoney(amount: number): string {
  return `$${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

function replaceAmountTemplate(template: string, amount: number): string {
  return template.replace("{amount}", formatMoney(amount))
}

type DashboardPayNowModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  topUpAmount: number
  email: string
  content?: DashboardPayNowModalContent
}

/** Figma 25704:15744 */
export function DashboardPayNowModal({
  open,
  onOpenChange,
  topUpAmount,
  email,
  content = dashboardPayNowModalContent,
}: DashboardPayNowModalProps) {
  const nameId = useId()
  const cardId = useId()
  const monthId = useId()
  const yearId = useId()
  const cvvId = useId()

  const [saveCard, setSaveCard] = useState(false)
  const [country, setCountry] = useState(content.defaultCountry)

  useEffect(() => {
    if (!open) return
    setCountry(content.defaultCountry)
  }, [content.defaultCountry, open])

  const handleConfirm = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(DASHBOARD_MODAL_CONTENT_CLASS, "!gap-0 !px-8")}
        style={{ paddingLeft: 32, paddingRight: 32 }}
      >
        <DialogClose className="absolute top-[-20px] right-[-22px] z-10 flex h-[42px] w-[43.787px] items-center justify-center overflow-hidden rounded-[10.723px] border-0 bg-[#21aeff] p-0 outline-none transition-colors hover:bg-[#1da3f5] focus-visible:ring-2 focus-visible:ring-white/50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={content.assets.closeIcon}
            width={30.383}
            height={30.383}
            className="block shrink-0"
          />
          <span className="sr-only">Close</span>
        </DialogClose>

        <DashboardModalScaledBody
          open={open}
          extraViewportInsetPx={32}
          fillWidthWhenScaled
        >
          <DialogTitle className="text-left text-xl font-semibold leading-[1.35] text-[#222e48]">
            {content.title}
          </DialogTitle>

          <div className="relative h-px w-full shrink-0" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={content.assets.divider}
              className="block h-px w-full max-w-none"
            />
          </div>

          <div className="flex flex-col gap-6">
            <div
              className={cn(
                FIELD_SHELL,
                "h-auto min-h-[55px] items-center justify-between gap-3",
              )}
            >
              <p className="min-w-0 flex-1 text-base leading-[1.35] text-[#404a60]">
                <span>{content.topUpSummaryPrefix}</span>
                <span className="font-medium text-[#21aeff]">• {email}</span>
              </p>
              <p className="shrink-0 text-lg font-semibold leading-[1.3] text-[#21aeff]">
                {formatMoney(topUpAmount)}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-base font-medium leading-[1.35] text-[#202020]">
                {content.selectPaymentMethodLabel}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex min-h-[54px] items-center justify-center rounded-xl border border-[#dfe0e4] px-3 py-2.5 transition-colors hover:border-[#21aeff]/60"
                >
                  <span className="flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt=""
                      src={content.assets.applePayMark}
                      width={32}
                      height={32}
                      className={PAY_WALLET_MARK_CLASS}
                    />
                    <span className="text-lg font-medium leading-[1.25] text-[#202020]">
                      {content.applePayLabel}
                    </span>
                  </span>
                </button>
                <button
                  type="button"
                  className="flex min-h-[54px] items-center justify-center rounded-xl border border-[#dfe0e4] px-3 py-2.5 transition-colors hover:border-[#21aeff]/60"
                >
                  <span className="flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt=""
                      src={content.assets.googlePayMark}
                      width={32}
                      height={32}
                      className={cn(
                        PAY_WALLET_MARK_CLASS,
                        "origin-center scale-[1.2]",
                      )}
                    />
                    <span className="text-lg font-medium leading-[1.25] text-[#202020]">
                      {content.googlePayLabel}
                    </span>
                  </span>
                </button>
              </div>
            </div>

            <p className="text-center text-sm font-medium leading-[1.35] text-[#5b6477]">
              {content.orPayAnotherWayLabel}
            </p>

            <button
              type="button"
              className="mx-auto flex w-full max-w-[440px] flex-col items-center justify-center gap-4 rounded-xl bg-[#21aeff] px-4 py-5 text-white transition-opacity hover:opacity-95"
            >
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={content.assets.cardBrandVisa}
                  width={104}
                  height={41}
                  className="h-[41px] w-auto max-w-[104px] object-contain"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={content.assets.cardBrandMastercard}
                  width={69}
                  height={41}
                  className="h-[41px] w-auto max-w-[69px] object-contain"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={content.assets.cardBrandVisaElectron}
                  width={84}
                  height={41}
                  className="h-[41px] w-auto max-w-[84px] object-contain"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={content.assets.cardBrandMaestro}
                  width={64}
                  height={41}
                  className="h-[41px] w-auto max-w-[64px] object-contain"
                />
              </div>
              <p className="text-center text-lg font-medium leading-[1.5]">
                {replaceAmountTemplate(
                  content.payWithCardTemplate,
                  topUpAmount,
                )}
              </p>
            </button>

            <div className="flex flex-col gap-6">
              <div className="relative h-px w-full shrink-0" aria-hidden>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={content.assets.divider}
                  className="block h-px w-full max-w-none"
                />
              </div>

              <div
                className={cn(
                  FIELD_SHELL,
                  "h-[59px] justify-center text-lg font-medium leading-[1.5] text-[#222e48]",
                )}
              >
                {content.paymentDetailsLabel}
              </div>

              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-[18px] max-[640px]:grid-cols-1">
                  <div className="flex min-w-0 flex-col gap-2">
                    <label
                      htmlFor={nameId}
                      className="text-base font-medium leading-[1.35] text-[#202020]"
                    >
                      {content.nameOnCardLabel}
                    </label>
                    <input
                      id={nameId}
                      type="text"
                      autoComplete="cc-name"
                      placeholder={content.nameOnCardPlaceholder}
                      className={cn(
                        FIELD_SHELL,
                        "text-sm font-medium text-[#13203b] placeholder:text-[#798090]",
                      )}
                    />
                  </div>
                  <div className="flex min-w-0 flex-col gap-2">
                    <label
                      htmlFor={cardId}
                      className="text-base font-medium leading-[1.35] text-[#202020]"
                    >
                      {content.cardNumberLabel}
                    </label>
                    <div className={cn(FIELD_SHELL, "gap-2")}>
                      <input
                        id={cardId}
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        placeholder={content.cardNumberPlaceholder}
                        className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#13203b] outline-none placeholder:text-[#798090]"
                      />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt=""
                        src={content.assets.cardNumberIcon}
                        width={20}
                        height={20}
                        className="block size-5 shrink-0"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-[18px] max-[640px]:grid-cols-1">
                  <div className="flex min-w-0 flex-col gap-2">
                    <span className="text-base font-medium leading-[1.35] text-[#202020]">
                      {content.expirationLabel}
                    </span>
                    <div className="flex gap-3">
                      <input
                        id={monthId}
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-exp-month"
                        placeholder={content.monthPlaceholder}
                        className={cn(
                          FIELD_SHELL,
                          "min-w-0 flex-1 text-sm font-medium text-[#13203b] placeholder:text-[#798090]",
                        )}
                      />
                      <input
                        id={yearId}
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-exp-year"
                        placeholder={content.yearPlaceholder}
                        className={cn(
                          FIELD_SHELL,
                          "min-w-0 flex-1 text-sm font-medium text-[#13203b] placeholder:text-[#798090]",
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 max-[640px]:flex-col">
                    <div className="flex w-[100px] shrink-0 flex-col gap-2">
                      <label
                        htmlFor={cvvId}
                        className="text-base font-medium leading-[1.35] text-[#202020]"
                      >
                        {content.cvvLabel}
                      </label>
                      <div className={cn(FIELD_SHELL, "justify-end")}>
                        <input
                          id={cvvId}
                          type="text"
                          inputMode="numeric"
                          autoComplete="cc-csc"
                          className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#13203b] outline-none"
                        />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          alt=""
                          src={content.assets.cvvLockIcon}
                          width={20}
                          height={20}
                          className="block size-5 shrink-0"
                        />
                      </div>
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <span className="text-base font-medium leading-[1.35] text-[#202020]">
                        {content.countryLabel}
                      </span>
                      <Select
                        value={country}
                        onValueChange={(value) => {
                          if (value) setCountry(value)
                        }}
                      >
                        <SelectTrigger
                          size="default"
                          className={cn(
                            FIELD_SHELL,
                            "w-full min-w-0 gap-2 rounded-xl border-[#ebecef] bg-[#f5f6f7] px-[18px] py-4 text-sm font-medium text-[#13203b] shadow-none ring-0 focus-visible:border-[#21aeff] focus-visible:ring-2 focus-visible:ring-[#21aeff]/20 data-[size=default]:h-[52px]",
                            "[&_[data-slot=select-icon]]:hidden [&_svg]:hidden",
                          )}
                        >
                          <SelectValue className="min-w-0 flex-1 truncate text-left text-sm font-medium text-[#13203b]" />
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            alt=""
                            src={content.assets.countryChevronIcon}
                            width={14}
                            height={14}
                            className="block size-5 shrink-0"
                            aria-hidden
                          />
                        </SelectTrigger>
                        <SelectContent
                          align="start"
                          side="bottom"
                          sideOffset={8}
                          className="z-[100] max-h-[240px] rounded-xl border border-[#ebecef] bg-white p-1 shadow-[0px_8px_24px_rgba(39,83,132,0.14)]"
                        >
                          {content.countries.map((entry) => (
                            <SelectItem
                              key={entry}
                              value={entry}
                              className="rounded-lg py-2.5 text-sm font-medium text-[#13203b] focus:bg-[#f5f6f7]"
                            >
                              {entry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <p className="text-sm font-normal leading-[1.3] text-[#5b6477]">
                  {content.cvvHelpText}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
              <button
                type="button"
                onClick={() => setSaveCard((value) => !value)}
                aria-pressed={saveCard}
                className={cn(
                  "flex h-[54px] shrink-0 items-center justify-center gap-3 rounded-xl border border-[#21aeff] px-5 py-4 transition-colors",
                  saveCard && "bg-[#21aeff]/10",
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={content.assets.saveCardIcon}
                  width={20}
                  height={20}
                  className="block size-5 shrink-0"
                />
                <span className="whitespace-nowrap text-base font-medium leading-[1.35] text-[#21aeff]">
                  {content.saveCardLabel}
                </span>
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="flex h-[54px] min-w-0 flex-1 items-center justify-center rounded-xl bg-[#269de7] px-4 text-base font-medium leading-[1.35] text-white transition-opacity hover:opacity-95"
              >
                {content.confirmPayLabel}
              </button>
            </div>
          </div>
        </DashboardModalScaledBody>
      </DialogContent>
    </Dialog>
  )
}