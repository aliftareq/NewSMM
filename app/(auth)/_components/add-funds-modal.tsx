"use client"

import { useEffect, useId, useState } from "react"

import { addFundsModalContent } from "@/app/(auth)/_data/add-funds-modal"
import type { AddFundsModalContent } from "@/app/(auth)/_types/add-funds-modal"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const PROMO_BANNER_BG =
  "linear-gradient(139.7deg, rgba(0, 135, 212, 0.1) 2.53%, rgba(50, 180, 255, 0.1) 61.03%, rgba(7, 149, 231, 0.087) 91.98%)"

const PRESET_SELECTED_BG =
  "linear-gradient(105.62deg, rgba(0, 135, 212, 0.12) 2.53%, rgba(50, 180, 255, 0.12) 61.03%, rgba(7, 149, 231, 0.104) 91.98%)"

type AddFundsModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onContinueToPayment?: (amount: number) => void
  content?: AddFundsModalContent
}

function formatUsd(amount: number): string {
  const useCents = amount < 1000
  return useCents
    ? `$${amount.toFixed(2)}`
    : `$${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
}

function clampAmount(
  value: number,
  min: number,
  max: number,
): number {
  return Math.min(max, Math.max(min, value))
}

/** Figma 25739:7212 */
export function AddFundsModal({
  open,
  onOpenChange,
  onContinueToPayment,
  content = addFundsModalContent,
}: AddFundsModalProps) {
  const amountInputId = useId()
  const [amount, setAmount] = useState(content.defaultAmount)
  const [selectedPresetId, setSelectedPresetId] = useState("")
  const [hoveredPresetId, setHoveredPresetId] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    setAmount(content.defaultAmount)
    setSelectedPresetId("")
  }, [content.defaultAmount, content.presets, open])

  const handlePresetSelect = (presetId: string, presetAmount: number) => {
    setSelectedPresetId(presetId)
    setAmount(presetAmount)
  }

  const handleCustomChange = (raw: string) => {
    const digits = raw.replace(/[^\d.]/g, "")
    if (!digits) {
      setSelectedPresetId("")
      setAmount(0)
      return
    }
    const parsed = Number.parseFloat(digits)
    if (!Number.isFinite(parsed)) return
    setSelectedPresetId("")
    setAmount(parsed)
  }

  const handleCustomBlur = () => {
    const clamped = clampAmount(amount, content.minAmount, content.maxAmount)
    setAmount(clamped)
    const match = content.presets.find((preset) => preset.amount === clamped)
    if (match) setSelectedPresetId(match.id)
  }

  const handleContinue = () => {
    const clamped = clampAmount(amount, content.minAmount, content.maxAmount)
    onOpenChange(false)
    onContinueToPayment?.(clamped)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="box-border w-[calc(100%-2rem)] max-w-[700px] gap-0 overflow-visible rounded-3xl border border-[#ebecef] bg-white p-6 shadow-[0px_8px_32px_rgba(39,83,132,0.14)] sm:max-w-[700px] sm:p-8"
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

        <div className="relative my-6 h-px w-full shrink-0" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={content.assets.divider}
            className="block h-px w-full max-w-none"
          />
        </div>

        <div
          className="mb-6 rounded-xl px-5 py-4"
          style={{ backgroundImage: PROMO_BANNER_BG }}
        >
          <p className="text-base font-medium leading-[1.35]">
            <span className="text-[#21aeff]">{content.promoHighlight}</span>
            <span className="text-[#5b6477]">{content.promoBody}</span>
          </p>
        </div>

        <div className="mb-6 rounded-2xl border border-[#f5f6f7] bg-[#f9f9f9] p-3">
          <div className="grid grid-cols-3 gap-3">
            {content.presets.map((preset) => {
              const selected = preset.id === selectedPresetId
              const emphasized =
                selected || hoveredPresetId === preset.id
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handlePresetSelect(preset.id, preset.amount)}
                  onMouseEnter={() => setHoveredPresetId(preset.id)}
                  onMouseLeave={() => setHoveredPresetId(null)}
                  className={cn(
                    "flex h-[85px] min-w-0 flex-col items-center justify-center rounded-xl border px-3 py-4 transition-[border-color,background-image] duration-200",
                    emphasized
                      ? "border-[#21aeff]"
                      : "border-[#ebecef] bg-white",
                  )}
                  style={
                    emphasized
                      ? { backgroundImage: PRESET_SELECTED_BG }
                      : undefined
                  }
                >
                  <span
                    className={cn(
                      "text-lg font-semibold leading-[1.3] transition-colors duration-200",
                      emphasized ? "text-[#21aeff]" : "text-[#343e56]",
                    )}
                  >
                    {preset.label}
                  </span>
                  {preset.bonusLabel ? (
                    <span className="mt-2 text-base font-medium leading-[1.35] text-[#21aeff]">
                      {preset.bonusLabel}
                    </span>
                  ) : null}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mb-6 text-center">
          <p className="text-base leading-[1.35] text-[#343e56]">
            {content.customAmountTitle}
          </p>
          <p className="text-base leading-[1.35] text-[#343e56]">
            {content.customAmountHint}
          </p>
        </div>

        <div className="mb-6">
          <label htmlFor={amountInputId} className="sr-only">
            Custom amount
          </label>
          <div className="flex h-[58px] w-full items-center rounded-xl border border-[#dfe0e4] px-5 py-4">
            <input
              id={amountInputId}
              type="text"
              inputMode="decimal"
              value={amount > 0 ? formatUsd(amount) : ""}
              onChange={(event) => handleCustomChange(event.target.value)}
              onBlur={handleCustomBlur}
              className="min-w-0 flex-1 bg-transparent text-lg font-medium leading-[1.5] text-[#13203b] outline-none"
            />
            <span className="shrink-0 text-base font-medium leading-[1.35] text-[#798090]">
              {content.customAmountMinLabel}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleContinue}
          disabled={amount < content.minAmount}
          className="flex h-[58px] w-full items-center justify-center rounded-xl bg-[#269de7] text-base font-medium leading-[1.35] text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
        >
          {content.continueLabel}
        </button>
      </DialogContent>
    </Dialog>
  )
}
