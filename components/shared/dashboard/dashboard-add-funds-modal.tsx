"use client"

import { useEffect, useId, useState } from "react"

import { dashboardAddFundsModalContent } from "@/data/dashboard/add-funds-modal"
import type { DashboardAddFundsModalContent } from "@/types/dashboard/add-funds-modal"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { DashboardModalScaledBody } from "@/components/shared/dashboard/dashboard-modal-scaled-body"
import { DASHBOARD_MODAL_CONTENT_CLASS } from "@/components/shared/dashboard/dashboard-modal-shell"
import { cn } from "@/lib/utils"

const PRESET_SELECTED_BG =
  "linear-gradient(105.62deg, rgba(0, 135, 212, 0.12) 2.53%, rgba(50, 180, 255, 0.12) 61.03%, rgba(7, 149, 231, 0.104) 91.98%)"

const BONUS_BANNER_BG =
  "linear-gradient(143.3deg, rgba(0, 135, 212, 0.1) 2.53%, rgba(50, 180, 255, 0.1) 61.03%, rgba(7, 149, 231, 0.087) 91.98%)"

type DashboardAddFundsModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddFunds?: (amount: number) => void
  content?: DashboardAddFundsModalContent
}

function formatUsd(amount: number): string {
  const useCents = amount < 1000
  return useCents
    ? `$${amount.toFixed(2)}`
    : `$${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
}

function clampAmount(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function defaultPresetId(
  content: DashboardAddFundsModalContent,
): string {
  return (
    content.presets.find((preset) => preset.amount === content.defaultAmount)
      ?.id ?? ""
  )
}

function parseAmountDraft(raw: string): number | null {
  const digits = raw.replace(/[^\d.]/g, "")
  if (!digits || digits === ".") return null
  const parsed = Number.parseFloat(digits)
  return Number.isFinite(parsed) ? parsed : null
}

/** Figma 25704:15896 */
export function DashboardAddFundsModal({
  open,
  onOpenChange,
  onAddFunds,
  content = dashboardAddFundsModalContent,
}: DashboardAddFundsModalProps) {
  const amountInputId = useId()
  const [amount, setAmount] = useState(content.defaultAmount)
  const [selectedPresetId, setSelectedPresetId] = useState("")
  const [customAmountDraft, setCustomAmountDraft] = useState(() =>
    formatUsd(content.defaultAmount),
  )

  useEffect(() => {
    if (!open) return
    setAmount(content.defaultAmount)
    setSelectedPresetId(defaultPresetId(content))
    setCustomAmountDraft(formatUsd(content.defaultAmount))
  }, [content, open])

  const handlePresetSelect = (presetId: string, presetAmount: number) => {
    if (presetId === selectedPresetId) {
      setSelectedPresetId("")
      setAmount(0)
      setCustomAmountDraft("")
      return
    }
    setSelectedPresetId(presetId)
    setAmount(presetAmount)
    setCustomAmountDraft(formatUsd(presetAmount))
  }

  const handleCustomChange = (raw: string) => {
    setCustomAmountDraft(raw)
    setSelectedPresetId("")
    const parsed = parseAmountDraft(raw)
    setAmount(parsed ?? 0)
    if (raw.trim() === "") {
      setAmount(0)
    }
  }

  const handleCustomBlur = () => {
    const parsed = parseAmountDraft(customAmountDraft)
    const base = parsed ?? 0
    const clamped = clampAmount(base, content.minAmount, content.maxAmount)
    setAmount(clamped)
    setCustomAmountDraft(clamped > 0 ? formatUsd(clamped) : "")
    const match = content.presets.find((preset) => preset.amount === clamped)
    setSelectedPresetId(match?.id ?? "")
  }

  const parsedDraftAmount = parseAmountDraft(customAmountDraft)
  const noPresetSelected = selectedPresetId === ""
  const noCustomValue = customAmountDraft.trim() === ""
  const canSubmit =
    !(noPresetSelected && noCustomValue) &&
    parsedDraftAmount !== null &&
    parsedDraftAmount >= content.minAmount &&
    parsedDraftAmount <= content.maxAmount

  const handleSubmit = () => {
    if (!canSubmit || parsedDraftAmount === null) return
    const clamped = clampAmount(
      parsedDraftAmount,
      content.minAmount,
      content.maxAmount,
    )
    onOpenChange(false)
    onAddFunds?.(clamped)
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

        <DashboardModalScaledBody open={open}>
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
            <div className="rounded-2xl border border-[#f5f6f7] bg-[#f9f9f9] p-3">
              <div className="grid grid-cols-3 gap-3">
                {content.presets.map((preset) => {
                  const selected = preset.id === selectedPresetId
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() =>
                        handlePresetSelect(preset.id, preset.amount)
                      }
                      className={cn(
                        "flex min-h-[85px] min-w-0 flex-col items-center justify-center rounded-xl border px-3 py-4 transition-[border-color,background-image] duration-200",
                        selected
                          ? "border-[#21aeff]"
                          : "border-[#ebecef] bg-white",
                      )}
                      style={
                        selected
                          ? { backgroundImage: PRESET_SELECTED_BG }
                          : undefined
                      }
                    >
                      <span
                        className={cn(
                          "text-lg font-semibold leading-[1.3]",
                          selected ? "text-[#21aeff]" : "text-[#343e56]",
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

            <div className="text-center">
              <p className="text-base leading-[1.35] text-[#343e56]">
                {content.customAmountTitle}
              </p>
              <p className="text-base leading-[1.35] text-[#343e56]">
                {content.customAmountHint}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <label htmlFor={amountInputId} className="sr-only">
                Custom amount
              </label>
              <div className="flex h-[58px] w-full items-center rounded-xl border border-[#dfe0e4] px-5 py-4">
                <input
                  id={amountInputId}
                  type="text"
                  inputMode="decimal"
                  value={customAmountDraft}
                  onChange={(event) => handleCustomChange(event.target.value)}
                  onBlur={handleCustomBlur}
                  className="min-w-0 flex-1 bg-transparent text-base font-medium leading-[1.35] text-[#13203b] outline-none"
                />
              </div>

              <div
                className="flex h-[58px] w-full items-center rounded-xl px-5 py-4"
                style={{ backgroundImage: BONUS_BANNER_BG }}
              >
                <p className="text-base font-medium leading-[1.35] text-[#21aeff]">
                  {content.bonusBannerLabel}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={(event) => {
                if (!canSubmit) {
                  event.preventDefault()
                  event.stopPropagation()
                  return
                }
                handleSubmit()
              }}
              disabled={!canSubmit}
              aria-disabled={!canSubmit}
              tabIndex={canSubmit ? 0 : -1}
              className={cn(
                "flex h-[58px] w-full items-center justify-center rounded-xl text-base font-medium leading-[1.35] text-white transition-opacity",
                canSubmit
                  ? "bg-[#269de7] hover:opacity-95"
                  : "pointer-events-none cursor-not-allowed bg-[#269de7] opacity-50",
              )}
            >
              {content.submitLabel}
            </button>
          </div>
        </DashboardModalScaledBody>
      </DialogContent>
    </Dialog>
  )
}