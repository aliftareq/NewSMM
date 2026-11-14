"use client"

import { useState } from "react"

import {
  DashboardSelectContent,
  DashboardSelectItem,
  dashboardSelectValueLabel,
  labelsBySelectId,
} from "@/components/shared/dashboard/dashboard-select"
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardSecondaryEmailModal } from "@/components/shared/dashboard/dashboard-secondary-email-modal"
import { dashboardSupportContent } from "@/data/dashboard/support"
import { cn } from "@/lib/utils"
import type { DashboardSupportContent } from "@/types/dashboard/support"

type DashboardSupportSectionProps = {
  content?: DashboardSupportContent
}

const FIELD_SHELL =
  "w-full rounded-xl border border-[#ebecef] bg-[#f5f6f7] px-[18px] py-4 text-base font-normal leading-[1.5] text-[#202020] outline-none placeholder:text-[#6a7283] focus-visible:border-[#21aeff] focus-visible:ring-2 focus-visible:ring-[#21aeff]/20"

const SELECT_TRIGGER_CLASS = cn(
  FIELD_SHELL,
  "flex h-[52px] items-center justify-between text-left",
  "[&_[data-slot=select-icon]]:hidden",
)

/** Figma 25704:14456 — dashboard support form. */
export function DashboardSupportSection({
  content = dashboardSupportContent,
}: DashboardSupportSectionProps) {
  const [requestTypeId, setRequestTypeId] = useState(
    content.defaultRequestTypeId,
  )
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [secondaryEmailOpen, setSecondaryEmailOpen] = useState(false)

  const { header, fields, requestTypes, submitLabel, assets } = content

  return (
    <>
      <DashboardSecondaryEmailModal
        open={secondaryEmailOpen}
        onOpenChange={setSecondaryEmailOpen}
      />
    <section className="flex w-full min-w-0 flex-col gap-6 rounded-2xl bg-white p-6">
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 flex-col gap-2">
          <h2 className="text-xl font-medium leading-[1.3] text-[#343e56]">
            {header.title}
          </h2>
          <p className="text-base font-normal leading-[1.35] text-[#6a7283]">
            {header.description}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSecondaryEmailOpen(true)}
          className="inline-flex h-auto shrink-0 items-center justify-center rounded-xl border-[1.2px] border-[#21aeff] bg-white px-[18px] py-3.5 text-base font-medium leading-[1.35] text-[#21aeff] transition-colors hover:bg-[#f0f9ff]"
        >
          {header.addSecondaryEmailLabel}
        </button>
      </div>

      <div className="relative h-px w-full shrink-0" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src={assets.divider} className="block h-px w-full max-w-none" />
      </div>

      <form
        className="flex w-full flex-col gap-[18px]"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="flex w-full flex-col gap-3">
          <label
            htmlFor="dashboard-support-request-type"
            className="text-base font-medium leading-[1.35] text-[#202020]"
          >
            {fields.requestTypeLabel}
          </label>
          <Select
            value={requestTypeId}
            onValueChange={(value) => {
              if (value) setRequestTypeId(value)
            }}
          >
            <SelectTrigger
              id="dashboard-support-request-type"
              className={SELECT_TRIGGER_CLASS}
            >
              <SelectValue className="text-base font-medium text-[#202020]">
                {(value) =>
                  dashboardSelectValueLabel(
                    value as string | null,
                    labelsBySelectId(requestTypes),
                  )
                }
              </SelectValue>
            </SelectTrigger>
            <DashboardSelectContent>
              {requestTypes.map((type) => (
                <DashboardSelectItem key={type.id} value={type.id}>
                  {type.label}
                </DashboardSelectItem>
              ))}
            </DashboardSelectContent>
          </Select>
        </div>

        <div className="flex w-full flex-col gap-3">
          <label
            htmlFor="dashboard-support-subject"
            className="text-base font-medium leading-[1.35] text-[#202020]"
          >
            {fields.subjectLabel}
          </label>
          <input
            id="dashboard-support-subject"
            name="subject"
            type="text"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            placeholder={fields.subjectPlaceholder}
            className={FIELD_SHELL}
            autoComplete="off"
          />
        </div>

        <div className="flex w-full flex-col gap-3">
          <label
            htmlFor="dashboard-support-message"
            className="text-base font-medium leading-[1.35] text-[#202020]"
          >
            {fields.messageLabel}
          </label>
          <textarea
            id="dashboard-support-message"
            name="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={fields.messagePlaceholder}
            rows={5}
            className={cn(FIELD_SHELL, "min-h-[148px] resize-y")}
          />
        </div>

        <button
          type="submit"
          className="flex h-[61px] w-full items-center justify-center rounded-xl bg-[#269de7] px-4 py-4 text-lg font-medium leading-[1.5] text-white transition-opacity hover:opacity-95"
        >
          {submitLabel}
        </button>
      </form>
    </section>
    </>
  )
}