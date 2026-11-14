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
import {
  DashboardSelectContent,
  DashboardSelectItem,
  dashboardSelectValueLabel,
  labelsBySelectId,
} from "@/components/shared/dashboard/dashboard-select"
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select"
import { dashboardAddNewCardModalContent } from "@/data/dashboard/add-new-card-modal"
import { cn } from "@/lib/utils"
import type { DashboardAddNewCardModalContent } from "@/types/dashboard/add-new-card-modal"

type DashboardAddNewCardModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  content?: DashboardAddNewCardModalContent
}

const FIELD_SHELL =
  "flex h-[52px] w-full items-center rounded-xl border border-[#ebecef] bg-[#f5f6f7] px-[18px] py-4"

const SELECT_TRIGGER_CLASS = cn(
  FIELD_SHELL,
  "justify-between text-left shadow-none ring-0",
  "focus-visible:border-[#21aeff] focus-visible:ring-2 focus-visible:ring-[#21aeff]/20",
  "[&_[data-slot=select-icon]]:hidden [&_svg]:hidden",
  "data-[size=default]:!h-[52px]",
)

const SAVE_CARD_STYLE = {
  backgroundImage:
    "linear-gradient(128deg, rgba(0, 135, 212, 0.08) 2.53%, rgba(50, 180, 255, 0.08) 61.03%, rgba(7, 149, 231, 0.07) 91.98%)",
} as const

function CountryChevron({ src }: { src: string }) {
  return (
    <span
      className="flex size-5 shrink-0 items-center justify-center rounded-full p-[3.333px]"
      aria-hidden
    >
      <span className="relative block h-2 w-[14px] shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={src}
          width={14}
          height={8}
          className="block size-full max-w-none"
        />
      </span>
    </span>
  )
}

/** Figma 25704:15640 */
export function DashboardAddNewCardModal({
  open,
  onOpenChange,
  content = dashboardAddNewCardModalContent,
}: DashboardAddNewCardModalProps) {
  const cardNameId = useId()
  const cardNumberId = useId()
  const monthId = useId()
  const yearId = useId()
  const cvvId = useId()

  const [cardName, setCardName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const [cvv, setCvv] = useState("")
  const [countryId, setCountryId] = useState(content.defaultCountryId)

  useEffect(() => {
    if (!open) return
    setCardName("")
    setCardNumber("")
    setMonth("")
    setYear("")
    setCvv("")
    setCountryId(content.defaultCountryId)
  }, [content.defaultCountryId, open])

  const handleSave = () => {
    onOpenChange(false)
  }

  const countryLabels = labelsBySelectId(content.countries)

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
          <div className="flex w-full flex-col gap-6">
            <DialogTitle className="text-xl font-semibold leading-[1.35] text-[#222e48]">
              {content.title}
            </DialogTitle>

            <div className="relative h-px w-full shrink-0" aria-hidden>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={content.assets.headerDivider}
                className="block h-px w-full max-w-none"
              />
            </div>

            <div className="flex w-full flex-col gap-6">
              <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 sm:items-end">
                <div className="flex min-w-0 flex-col gap-2">
                  <label
                    htmlFor={cardNameId}
                    className="text-base font-medium leading-[1.35] text-[#202020]"
                  >
                    {content.cardNameLabel}
                  </label>
                  <input
                    id={cardNameId}
                    type="text"
                    autoComplete="cc-name"
                    value={cardName}
                    onChange={(event) => setCardName(event.target.value)}
                    placeholder={content.cardNamePlaceholder}
                    className={cn(
                      FIELD_SHELL,
                      "text-sm font-medium text-[#202020] outline-none placeholder:text-[#798090] focus-visible:border-[#21aeff] focus-visible:ring-2 focus-visible:ring-[#21aeff]/20",
                    )}
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-2">
                  <label
                    htmlFor={cardNumberId}
                    className="text-base font-medium leading-[1.35] text-[#202020]"
                  >
                    {content.cardNumberLabel}
                  </label>
                  <div className={cn(FIELD_SHELL, "gap-2")}>
                    <input
                      id={cardNumberId}
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      value={cardNumber}
                      onChange={(event) => setCardNumber(event.target.value)}
                      placeholder={content.cardNumberPlaceholder}
                      className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#202020] outline-none placeholder:text-[#798090]"
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

              <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 sm:items-end">
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
                      value={month}
                      onChange={(event) => setMonth(event.target.value)}
                      placeholder={content.monthPlaceholder}
                      className={cn(
                        FIELD_SHELL,
                        "min-w-0 flex-1 text-sm font-medium text-[#202020] outline-none placeholder:text-[#798090] focus-visible:border-[#21aeff] focus-visible:ring-2 focus-visible:ring-[#21aeff]/20",
                      )}
                    />
                    <input
                      id={yearId}
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-exp-year"
                      value={year}
                      onChange={(event) => setYear(event.target.value)}
                      placeholder={content.yearPlaceholder}
                      className={cn(
                        FIELD_SHELL,
                        "min-w-0 flex-1 text-sm font-medium text-[#202020] outline-none placeholder:text-[#798090] focus-visible:border-[#21aeff] focus-visible:ring-2 focus-visible:ring-[#21aeff]/20",
                      )}
                    />
                  </div>
                </div>

                <div className="flex gap-3 max-sm:flex-col sm:items-end">
                  <div className="flex w-[100px] shrink-0 flex-col gap-2">
                    <label
                      htmlFor={cvvId}
                      className="text-base font-medium leading-[1.35] text-[#202020]"
                    >
                      {content.cvvLabel}
                    </label>
                    <div className={cn(FIELD_SHELL, "h-14 justify-end")}>
                      <input
                        id={cvvId}
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        value={cvv}
                        onChange={(event) => setCvv(event.target.value)}
                        className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#202020] outline-none"
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
                      value={countryId}
                      onValueChange={(value) => {
                        if (value) setCountryId(value)
                      }}
                    >
                      <SelectTrigger className={SELECT_TRIGGER_CLASS}>
                        <SelectValue className="min-w-0 flex-1 truncate text-left text-sm font-medium text-[#202020] data-placeholder:text-[#798090]">
                          {(value) =>
                            dashboardSelectValueLabel(
                              value as string | null,
                              countryLabels,
                            )
                          }
                        </SelectValue>
                        <CountryChevron src={content.assets.countryChevronIcon} />
                      </SelectTrigger>
                      <DashboardSelectContent>
                        {content.countries.map((country) => (
                          <DashboardSelectItem key={country.id} value={country.id}>
                            {country.label}
                          </DashboardSelectItem>
                        ))}
                      </DashboardSelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <p className="text-sm font-normal leading-[1.3] text-[#5b6477]">
                {content.authorizationNote}
              </p>

              <div className="flex w-full flex-col gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="flex h-[54px] min-h-[54px] flex-1 items-center justify-center rounded-xl border border-[#ff4d4d] bg-white px-5 text-base font-medium leading-[1.35] text-[#ff4d4d] transition-colors hover:bg-[#ff4d4d] hover:text-white"
                >
                  {content.cancelLabel}
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex h-[54px] min-h-[54px] flex-1 items-center justify-center rounded-xl border border-[#21aeff] px-5 text-base font-medium leading-[1.35] text-[#21aeff] transition-colors hover:bg-[#21aeff] hover:text-white hover:[background-image:none]"
                  style={SAVE_CARD_STYLE}
                >
                  {content.saveCardLabel}
                </button>
              </div>
            </div>
          </div>
        </DashboardModalScaledBody>
      </DialogContent>
    </Dialog>
  )
}