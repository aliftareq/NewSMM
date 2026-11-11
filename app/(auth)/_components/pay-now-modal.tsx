"use client"

import { useId, useState } from "react"

import { payNowModalContent } from "@/app/(auth)/_data/pay-now-modal"
import { getTopUpReceiveTotal } from "@/app/(auth)/_lib/top-up-bonus"
import type { PayNowModalContent } from "@/app/(auth)/_types/pay-now-modal"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const FIELD_SHELL_CLASS =
  "flex h-12 w-full items-center rounded-xl border border-[#ebecef] bg-[#f5f6f7] px-4 py-3"

function formatMoney(amount: number): string {
  return `$${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

function replaceAmountTemplate(template: string, amount: number): string {
  return template.replace("{amount}", formatMoney(amount))
}

type PayNowModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  topUpAmount: number
  email: string
  content?: PayNowModalContent
}

/** Figma 25739:7078 — wider shell (661px) so payment fields stay in two columns. */
export function PayNowModal({
  open,
  onOpenChange,
  topUpAmount,
  email,
  content = payNowModalContent,
}: PayNowModalProps) {
  const nameId = useId()
  const cardId = useId()
  const expiryId = useId()
  const cvvId = useId()

  const [saveCard, setSaveCard] = useState(false)
  const receiveTotal = getTopUpReceiveTotal(topUpAmount)

  const handleConfirm = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="box-border w-[min(661px,calc(100vw-2rem))] max-w-[661px] gap-0 overflow-visible rounded-3xl border border-[#ebecef] bg-white p-6 shadow-[0px_8px_32px_rgba(39,83,132,0.14)] sm:max-w-[661px] sm:p-8"
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

        <DialogTitle className="text-left text-xl font-semibold leading-[1.35] text-[#222e48]">
          {content.title}
        </DialogTitle>

        <div className="relative my-4 h-px w-full shrink-0" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={content.assets.divider}
            className="block h-px w-full max-w-none"
          />
        </div>

        <div className="flex min-w-0 flex-col gap-4">
          <div className="flex flex-col gap-3">
            <div
              className={cn(
                FIELD_SHELL_CLASS,
                "h-auto min-h-12 items-center justify-between gap-3 py-3",
              )}
            >
              <p className="min-w-0 flex-1 truncate text-base leading-[1.35] text-[#404a60]">
                <span>{content.topUpSummaryPrefix}</span>
                <span className="font-medium text-[#21aeff]">• {email}</span>
              </p>
              <p className="shrink-0 text-base font-semibold leading-[1.3] text-[#21aeff]">
                {formatMoney(topUpAmount)}
              </p>
            </div>

            <div className="flex min-h-12 items-center justify-between gap-3 rounded-xl border border-[#c0e8d7] bg-[#e7f9f1] px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={content.assets.receiveIcon}
                  width={24}
                  height={24}
                  className="block size-6 shrink-0"
                />
                <p className="whitespace-nowrap text-base font-medium leading-[1.5] text-[#14b786]">
                  {content.youWillReceiveLabel}
                </p>
              </div>
              <p className="shrink-0 text-base font-semibold leading-[1.3] text-[#14b786]">
                {formatMoney(receiveTotal)}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium leading-[1.35] text-[#202020]">
              {content.selectPaymentMethodLabel}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className="flex items-center justify-center rounded-xl border border-[#dfe0e4] px-2 py-2 transition-colors hover:border-[#21aeff]/60"
              >
                <div className="flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    src={content.assets.applePayMark}
                    width={32}
                    height={32}
                    className="block size-8 shrink-0"
                  />
                  <span className="text-sm font-medium leading-[1.25] text-[#202020]">
                    {content.applePayLabel}
                  </span>
                </div>
              </button>
              <button
                type="button"
                className="flex items-center justify-center rounded-xl border border-[#dfe0e4] px-2 py-2 transition-colors hover:border-[#21aeff]/60"
              >
                <div className="flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    src={content.assets.googlePayMark}
                    width={32}
                    height={32}
                    className="block size-8 shrink-0 object-contain"
                  />
                  <span className="text-sm font-medium leading-[1.25] text-[#202020]">
                    {content.googlePayLabel}
                  </span>
                </div>
              </button>
            </div>
          </div>

          <p className="text-center text-sm font-medium leading-[1.35] text-[#5b6477]">
            {content.orPayAnotherWayLabel}
          </p>

          <button
            type="button"
            className="flex w-full max-w-[440px] flex-col items-center justify-center gap-3 self-center rounded-xl bg-[#21aeff] px-4 py-4 text-white transition-opacity hover:opacity-95"
          >
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={content.assets.cardBrandVisa}
                width={64}
                height={24}
                className="h-7 w-auto max-w-[72px] object-contain"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={content.assets.cardBrandMastercard}
                width={56}
                height={28}
                className="h-7 w-auto max-w-[56px] object-contain"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={content.assets.cardBrandMaestro}
                width={44}
                height={28}
                className="h-7 w-auto max-w-[44px] object-contain"
              />
            </div>
            <p className="text-center text-base font-medium leading-[1.5]">
              {replaceAmountTemplate(
                content.payWithCardTemplate,
                topUpAmount,
              )}
            </p>
          </button>

          <div className="flex flex-col gap-4">
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
                FIELD_SHELL_CLASS,
                "h-12 justify-center text-base font-medium leading-[1.5] text-[#222e48]",
              )}
            >
              {content.paymentDetailsLabel}
            </div>

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4 max-[520px]:grid-cols-1">
                <div className="flex min-w-0 flex-col gap-2">
                  <label
                    htmlFor={nameId}
                    className="text-sm font-medium leading-[1.35] text-[#202020]"
                  >
                    {content.nameOnCardLabel}
                  </label>
                  <input
                    id={nameId}
                    type="text"
                    autoComplete="cc-name"
                    placeholder={content.nameOnCardPlaceholder}
                    className={cn(
                      FIELD_SHELL_CLASS,
                      "text-sm font-medium text-[#13203b] placeholder:text-[#798090]",
                    )}
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-2">
                  <label
                    htmlFor={cardId}
                    className="text-sm font-medium leading-[1.35] text-[#202020]"
                  >
                    {content.cardNumberLabel}
                  </label>
                  <div className={cn(FIELD_SHELL_CLASS, "gap-2")}>
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

              <div className="grid grid-cols-2 gap-4">
                <div className="flex min-w-0 flex-col gap-2">
                  <label
                    htmlFor={expiryId}
                    className="text-sm font-medium leading-[1.35] text-[#202020]"
                  >
                    {content.expirationLabel}
                  </label>
                  <input
                    id={expiryId}
                    type="text"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    placeholder={content.expirationPlaceholder}
                    className={cn(
                      FIELD_SHELL_CLASS,
                      "text-sm font-medium text-[#13203b] placeholder:text-[#798090]",
                    )}
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-2">
                  <label
                    htmlFor={cvvId}
                    className="text-sm font-medium leading-[1.35] text-[#202020]"
                  >
                    {content.cvvLabel}
                  </label>
                  <div className={cn(FIELD_SHELL_CLASS, "justify-end gap-2")}>
                    <input
                      id={cvvId}
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#13203b] outline-none placeholder:text-[#798090]"
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
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
            <button
              type="button"
              onClick={() => setSaveCard((value) => !value)}
              aria-pressed={saveCard}
              className={cn(
                "flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#21aeff] px-4 py-3 transition-colors",
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
              <span className="text-base font-medium leading-[1.35] text-[#21aeff]">
                {content.saveCardLabel}
              </span>
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="flex h-12 min-w-0 flex-1 items-center justify-center rounded-xl bg-[#269de7] px-4 text-base font-medium leading-[1.35] text-white transition-opacity hover:opacity-95"
            >
              {replaceAmountTemplate(
                content.confirmPayTemplate,
                topUpAmount,
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
