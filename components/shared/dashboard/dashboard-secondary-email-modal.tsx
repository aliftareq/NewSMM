"use client"

import { useEffect, useId, useState } from "react"

import { DashboardModalScaledBody } from "@/components/shared/dashboard/dashboard-modal-scaled-body"
import { DASHBOARD_MODAL_CONTENT_CLASS } from "@/components/shared/dashboard/dashboard-modal-shell"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { dashboardSecondaryEmailModalContent } from "@/data/dashboard/secondary-email-modal"
import { cn } from "@/lib/utils"
import type { DashboardSecondaryEmailModalContent } from "@/types/dashboard/secondary-email-modal"

const FIELD_SHELL =
  "w-full rounded-xl border border-[#ebecef] bg-[#f5f6f7] px-[18px] py-4 text-base font-normal leading-[1.5] text-[#202020] outline-none placeholder:text-[#6a7283] focus-visible:border-[#21aeff] focus-visible:ring-2 focus-visible:ring-[#21aeff]/20"

type DashboardSecondaryEmailModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (email: string) => void
  content?: DashboardSecondaryEmailModalContent
}

/** Figma 25750:4383 — secondary email dialog */
export function DashboardSecondaryEmailModal({
  open,
  onOpenChange,
  onSave,
  content = dashboardSecondaryEmailModalContent,
}: DashboardSecondaryEmailModalProps) {
  const inputId = useId()
  const [email, setEmail] = useState("")

  useEffect(() => {
    if (!open) return
    setEmail("")
  }, [open])

  const canSave = email.trim().length > 0

  const handleSave = () => {
    if (!canSave) return
    onSave?.(email.trim())
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          DASHBOARD_MODAL_CONTENT_CLASS,
          "!max-w-[520px] sm:!max-w-[520px]",
          "!gap-0 !px-8",
        )}
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
          <DialogTitle className="sr-only">{content.fieldLabel}</DialogTitle>

          <div className="flex w-full flex-col gap-6">
            <div className="flex w-full flex-col gap-3">
              <label
                htmlFor={inputId}
                className="text-base font-medium leading-[1.35] text-[#202020]"
              >
                {content.fieldLabel}
              </label>
              <input
                id={inputId}
                name="secondary-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={content.placeholder}
                className={FIELD_SHELL}
                autoComplete="email"
              />
            </div>

            <button
              type="button"
              onClick={handleSave}
              disabled={!canSave}
              className={cn(
                "flex h-[52px] w-full items-center justify-center rounded-xl text-base font-medium leading-[1.35] text-white transition-opacity",
                canSave
                  ? "bg-[#269de7] hover:opacity-95"
                  : "cursor-not-allowed bg-[#269de7] opacity-50",
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