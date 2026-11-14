"use client"

import { useState } from "react"
import { LinkTo } from "@/components/shared/link-to"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { dashboardAffiliateContent } from "@/data/dashboard/affiliate"
import { cn } from "@/lib/utils"
import type {
  DashboardAffiliateApplicantType,
  DashboardAffiliateContent,
  DashboardAffiliateStep,
} from "@/types/dashboard/affiliate"

type DashboardAffiliateSectionProps = {
  content?: DashboardAffiliateContent
}

type AffiliateStepId = DashboardAffiliateStep["id"]

const TEXTAREA_SHELL =
  "min-h-[91px] w-full resize-y rounded-xl border border-[#ebecef] bg-[#f5f6f7] px-[18px] py-4 text-sm font-medium leading-[1.35] text-[#202020] outline-none placeholder:text-[#798090] focus-visible:border-[#21aeff] focus-visible:ring-2 focus-visible:ring-[#21aeff]/20"

const INPUT_SHELL =
  "h-[52px] w-full rounded-xl border border-[#ebecef] bg-[#f5f6f7] px-[18px] py-4 text-base font-medium leading-[1.35] text-[#202020] outline-none placeholder:text-[#798090] focus-visible:border-[#21aeff] focus-visible:ring-2 focus-visible:ring-[#21aeff]/20"

const OUTLINE_CTA_CLASS =
  "flex h-[52px] w-full items-center justify-center rounded-xl border border-[#21aeff] text-base font-medium leading-[1.35] text-[#21aeff] transition-opacity hover:opacity-95"

const OUTLINE_CTA_BG =
  "linear-gradient(146.47deg, rgba(0, 135, 212, 0.08) 2.53%, rgba(50, 180, 255, 0.08) 61.03%, rgba(7, 149, 231, 0.07) 91.98%)"

const SELECT_TRIGGER_CLASS = cn(
  INPUT_SHELL,
  "flex !h-[52px] min-h-[52px] w-full items-center justify-between text-left",
  "data-[size=default]:!h-[52px]",
  "[&_[data-slot=select-icon]]:hidden [&_svg]:hidden",
)

const SECTION_BAR =
  "w-full rounded-xl bg-[#f5f6f7] p-3 text-lg font-medium leading-[1.5] text-[#343e56]"

const SLIDE_IN_CLASS =
  "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-right-8 motion-safe:duration-300"

function AffiliateBackButton({
  label,
  arrowSrc,
  onClick,
}: {
  label: string
  arrowSrc: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ width: "fit-content", maxWidth: "100%" }}
      className="box-border inline-flex h-11 w-fit max-w-full shrink-0 items-center justify-center gap-2.5 rounded-full border border-[#269de7] bg-white py-1.5 pl-1.5 pr-5 shadow-[0px_4px_6px_rgba(0,0,0,0.12)]"
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-[24px] bg-[#269de7]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={arrowSrc}
          width={32}
          height={32}
          className="block size-8 -scale-y-100 rotate-180"
        />
      </span>
      <span className="text-base font-medium leading-[1.5] whitespace-nowrap text-[#269de7]">
        {label}
      </span>
    </button>
  )
}

function CardDivider({ src }: { src: string }) {
  return (
    <div className="relative h-px w-full shrink-0" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" src={src} className="block h-px w-full max-w-none" />
    </div>
  )
}

function StepIndicator({
  steps,
  currentStepId,
  assets,
}: {
  steps: DashboardAffiliateContent["steps"]
  currentStepId: AffiliateStepId
  assets: DashboardAffiliateContent["assets"]
}) {
  return (
    <div
      className="flex w-full items-center justify-center gap-4"
      aria-label="Application progress"
    >
      {steps.map((step, index) => {
        const isCurrent = step.id === currentStepId
        const isComplete =
          index <
          steps.findIndex((entry) => entry.id === currentStepId)
        const isActive = isCurrent || isComplete

        let iconSrc = assets.stepInactive
        if (isComplete) {
          iconSrc = assets.stepComplete
        } else if (isCurrent) {
          iconSrc = assets.stepCurrentRing
        }

        return (
          <div key={step.id} className="flex items-center gap-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={iconSrc}
              width={16}
              height={16}
              className="block size-4 shrink-0"
              aria-hidden
            />
            <span
              className={cn(
                "text-base font-medium leading-[1.35]",
                isActive ? "text-[#21aeff]" : "text-[#c1c4cc]",
              )}
            >
              {step.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function AffiliateStepOne({
  content,
  trafficSources,
  setTrafficSources,
  targetRegion,
  setTargetRegion,
  services,
  setServices,
  onContinue,
}: {
  content: DashboardAffiliateContent
  trafficSources: string
  setTrafficSources: (value: string) => void
  targetRegion: string
  setTargetRegion: (value: string) => void
  services: string
  setServices: (value: string) => void
  onContinue: () => void
}) {
  const { assets } = content

  return (
  <>
      <div className="flex w-full flex-col gap-2">
        <h2 className="text-xl font-semibold leading-[1.35] text-[#222e48]">
          {content.application.title}
        </h2>
        <p className="text-base font-normal leading-[1.35] text-[#404a60]">
          {content.application.description}
        </p>
      </div>

      <CardDivider src={assets.divider} />

      <fieldset className="flex w-full flex-col gap-2 border-0 p-0">
        <legend className="text-xl font-semibold leading-[1.35] text-[#222e48]">
          {content.trafficSources.title}
        </legend>
        <p className="text-base font-normal leading-[1.35] text-[#404a60]">
          {content.trafficSources.description}
        </p>
        <textarea
          value={trafficSources}
          onChange={(event) => setTrafficSources(event.target.value)}
          placeholder={content.trafficSources.placeholder}
          className={cn(TEXTAREA_SHELL, "mt-2")}
          rows={3}
        />
      </fieldset>

      <CardDivider src={assets.divider} />

      <fieldset className="flex w-full flex-col gap-2 border-0 p-0">
        <legend className="text-xl font-semibold leading-[1.35] text-[#222e48]">
          {content.targetRegion.title}
        </legend>
        <p className="text-base font-normal leading-[1.35] text-[#404a60]">
          {content.targetRegion.description}
        </p>
        <textarea
          value={targetRegion}
          onChange={(event) => setTargetRegion(event.target.value)}
          placeholder={content.targetRegion.placeholder}
          className={cn(TEXTAREA_SHELL, "mt-2")}
          rows={3}
        />
      </fieldset>

      <CardDivider src={assets.divider} />

      <fieldset className="flex w-full flex-col gap-2 border-0 p-0">
        <legend className="text-xl font-semibold leading-[1.35] text-[#222e48]">
          {content.services.title}
        </legend>
        <p className="text-base font-normal leading-[1.35] text-[#404a60]">
          {content.services.description}
        </p>
        <textarea
          value={services}
          onChange={(event) => setServices(event.target.value)}
          placeholder={content.services.placeholder}
          className={cn(TEXTAREA_SHELL, "mt-2")}
          rows={3}
        />
      </fieldset>

      <button
        type="button"
        onClick={onContinue}
        className={OUTLINE_CTA_CLASS}
        style={{ backgroundImage: OUTLINE_CTA_BG }}
      >
        {content.continueLabel}
      </button>
    </>
  )
}

function EntityOptionButton({
  label,
  selected,
  checkboxEmptyIcon,
  checkboxCheckedIcon,
  onSelect,
}: {
  label: string
  selected: boolean
  checkboxEmptyIcon: string
  checkboxCheckedIcon: string
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex min-h-[52px] flex-1 items-center gap-2 rounded-xl border border-[#ebecef] bg-[#f5f6f7] px-[18px] py-4 text-left transition-colors",
        selected && "border-[#21aeff] bg-white",
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        src={selected ? checkboxCheckedIcon : checkboxEmptyIcon}
        width={20}
        height={20}
        className="size-5 shrink-0"
      />
      <span
        className={cn(
          "text-lg font-medium leading-[1.5]",
          selected ? "text-[#343e56]" : "text-[#404a60]",
        )}
      >
        {label}
      </span>
    </button>
  )
}

function AffiliateStepTwo({
  content,
  applicantType,
  setApplicantType,
  companyName,
  setCompanyName,
  companyCode,
  setCompanyCode,
  countryId,
  setCountryId,
  city,
  setCity,
  state,
  setState,
  street,
  setStreet,
  zip,
  setZip,
}: {
  content: DashboardAffiliateContent
  applicantType: DashboardAffiliateApplicantType
  setApplicantType: (value: DashboardAffiliateApplicantType) => void
  companyName: string
  setCompanyName: (value: string) => void
  companyCode: string
  setCompanyCode: (value: string) => void
  countryId: string
  setCountryId: (value: string) => void
  city: string
  setCity: (value: string) => void
  state: string
  setState: (value: string) => void
  street: string
  setStreet: (value: string) => void
  zip: string
  setZip: (value: string) => void
}) {
  const { stepTwo, assets } = content
  const isIndividual = applicantType === "individual"
  const primaryNameLabel = isIndividual
    ? stepTwo.firstNameLabel
    : stepTwo.companyNameLabel
  const primaryNamePlaceholder = isIndividual
    ? stepTwo.firstNamePlaceholder
    : stepTwo.companyNamePlaceholder
  const secondaryNameLabel = isIndividual
    ? stepTwo.lastNameLabel
    : stepTwo.companyCodeLabel
  const secondaryNamePlaceholder = isIndividual
    ? stepTwo.lastNamePlaceholder
    : stepTwo.companyCodePlaceholder

  return (
    <>
      <div className="flex w-full flex-col gap-2">
        <h2 className="text-xl font-semibold leading-[1.35] text-[#222e48]">
          {stepTwo.youAreTitle}
        </h2>
        <div className="flex w-full flex-col gap-[18px] sm:flex-row">
          {stepTwo.entityOptions.map((option) => (
            <EntityOptionButton
              key={option.id}
              label={option.label}
              selected={applicantType === option.id}
              checkboxEmptyIcon={assets.entityCheckboxEmpty}
              checkboxCheckedIcon={assets.entityCheckboxChecked}
              onSelect={() => setApplicantType(option.id)}
            />
          ))}
        </div>
      </div>

      <CardDivider src={assets.divider} />

      <div className="flex w-full flex-col gap-4">
        <p className={SECTION_BAR}>{stepTwo.baseInfoTitle}</p>
        <div className="flex w-full flex-col gap-4 sm:flex-row sm:gap-[18px]">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <label className="text-base font-medium leading-[1.35] text-[#202020]">
              {primaryNameLabel}
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              placeholder={primaryNamePlaceholder}
              className={INPUT_SHELL}
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <label className="text-base font-medium leading-[1.35] text-[#202020]">
              {secondaryNameLabel}
            </label>
            <input
              type="text"
              value={companyCode}
              onChange={(event) => setCompanyCode(event.target.value)}
              placeholder={secondaryNamePlaceholder}
              className={INPUT_SHELL}
            />
          </div>
        </div>
      </div>

      <CardDivider src={assets.divider} />

      <div className="flex w-full flex-col gap-4">
        <p className={SECTION_BAR}>{stepTwo.addressSectionTitle}</p>
        <div className="flex w-full flex-col gap-4 lg:flex-row lg:gap-[18px]">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <label className="text-base font-medium leading-[1.35] text-[#202020]">
              {stepTwo.countryLabel}
            </label>
            <Select
              value={countryId}
              onValueChange={(value) => {
                if (value) setCountryId(value)
              }}
            >
              <SelectTrigger className={SELECT_TRIGGER_CLASS}>
                <SelectValue placeholder={stepTwo.countryPlaceholder} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={assets.countryChevronIcon}
                  width={14}
                  height={14}
                  className="size-5 shrink-0"
                  aria-hidden
                />
              </SelectTrigger>
              <SelectContent align="start" side="bottom">
                {stepTwo.countries.map((country) => (
                  <SelectItem key={country.id} value={country.id}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <label className="text-base font-medium leading-[1.35] text-[#202020]">
              {stepTwo.cityLabel}
            </label>
            <input
              type="text"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              placeholder={stepTwo.cityPlaceholder}
              className={INPUT_SHELL}
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <label className="text-base font-medium leading-[1.35] text-[#202020]">
              {stepTwo.stateLabel}
            </label>
            <input
              type="text"
              value={state}
              onChange={(event) => setState(event.target.value)}
              placeholder={stepTwo.statePlaceholder}
              className={INPUT_SHELL}
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-end sm:gap-[18px]">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <label className="text-base font-medium leading-[1.35] text-[#202020]">
              {stepTwo.streetLabel}
            </label>
            <input
              type="text"
              value={street}
              onChange={(event) => setStreet(event.target.value)}
              placeholder={stepTwo.streetPlaceholder}
              className={INPUT_SHELL}
            />
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-[191px] sm:shrink-0">
            <label className="text-base font-medium leading-[1.35] text-[#202020]">
              {stepTwo.zipLabel}
            </label>
            <input
              type="text"
              value={zip}
              onChange={(event) => setZip(event.target.value)}
              placeholder={stepTwo.zipPlaceholder}
              className={INPUT_SHELL}
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        className={cn(OUTLINE_CTA_CLASS, "h-[54px]")}
        style={{ backgroundImage: OUTLINE_CTA_BG }}
      >
        {stepTwo.submitLabel}
      </button>
    </>
  )
}

function AffiliateFormCard({
  content,
  step,
  onContinue,
  onBack,
  stepOneProps,
  stepTwoProps,
}: {
  content: DashboardAffiliateContent
  step: AffiliateStepId
  onContinue: () => void
  onBack: () => void
  stepOneProps: Omit<
    React.ComponentProps<typeof AffiliateStepOne>,
    "content" | "onContinue"
  >
  stepTwoProps: Omit<React.ComponentProps<typeof AffiliateStepTwo>, "content">
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-6 overflow-hidden rounded-2xl bg-white p-6">
      {step === "step-02" ? (
        <div className="w-fit max-w-full shrink-0">
          <AffiliateBackButton
            label={content.backLabel}
            arrowSrc={content.assets.backArrow}
            onClick={onBack}
          />
        </div>
      ) : null}
      <StepIndicator
        steps={content.steps}
        currentStepId={step}
        assets={content.assets}
      />

      <div className="relative w-full overflow-x-hidden overflow-y-visible">
        <div key={step} className={cn("flex w-full flex-col gap-6", SLIDE_IN_CLASS)}>
          {step === "step-01" ? (
            <AffiliateStepOne
              content={content}
              onContinue={onContinue}
              {...stepOneProps}
            />
          ) : (
            <AffiliateStepTwo content={content} {...stepTwoProps} />
          )}
        </div>
      </div>
    </div>
  )
}

function AffiliateSidebar({ content }: { content: DashboardAffiliateContent }) {
  const { sidebar, commission, assets } = content

  return (
    <section className="flex w-full min-w-0 flex-col gap-4 xl:w-[430px] xl:shrink-0">
      <div className="flex w-full flex-col gap-4 rounded-2xl bg-white p-6">
        <h2 className="text-xl font-semibold leading-[1.35] text-[#222e48]">
          {sidebar.title}
        </h2>
        <p className="text-base font-normal leading-[1.35] text-[#404a60]">
          {sidebar.description}
        </p>
        <LinkTo
          href={sidebar.learnMoreHref}
          className={cn(OUTLINE_CTA_CLASS, "h-auto min-h-[52px] px-5 py-3")}
          style={{ backgroundImage: OUTLINE_CTA_BG }}
        >
          {sidebar.learnMoreLabel}
        </LinkTo>
      </div>

      <div className="flex w-full flex-col gap-4 rounded-2xl bg-white p-6">
        <h2 className="text-xl font-semibold leading-[1.35] text-[#222e48]">
          {commission.title}
        </h2>
        <p className="text-base font-normal leading-[1.35] text-[#404a60]">
          {commission.description}
        </p>

        <CardDivider src={assets.divider} />

        <div className="flex w-full gap-4 rounded-xl bg-[#f5f6f7] py-2">
          <p className="flex-1 px-5 text-sm font-semibold leading-[1.5] text-[#404a60]">
            {commission.goalColumnLabel}
          </p>
          <p className="flex-1 px-5 text-sm font-medium leading-[1.35] text-[#404a60]">
            {commission.rateColumnLabel}
          </p>
        </div>

        {commission.tiers.map((tier) => (
          <div key={tier.id} className="flex w-full gap-4">
            <p
              className={cn(
                "flex-1 px-5 py-1 text-sm font-medium leading-[1.35]",
                tier.emphasized ? "text-[#222e48]" : "text-[#404a60]",
              )}
            >
              {tier.goal}
            </p>
            <p
              className={cn(
                "flex-1 px-5 py-1 text-sm font-medium leading-[1.35]",
                tier.emphasized ? "text-[#222e48]" : "text-[#404a60]",
              )}
            >
              {tier.rate}
            </p>
          </div>
        ))}

        <CardDivider src={assets.divider} />

        <p className="text-center text-sm font-medium leading-[1.35] text-[#6a7283]">
          {commission.footnote}
        </p>
      </div>
    </section>
  )
}

/** Figma 25704:15222 + 25704:15413 */
export function DashboardAffiliateSection({
  content = dashboardAffiliateContent,
}: DashboardAffiliateSectionProps) {
  const [step, setStep] = useState<AffiliateStepId>("step-01")
  const [trafficSources, setTrafficSources] = useState("")
  const [targetRegion, setTargetRegion] = useState("")
  const [services, setServices] = useState("")
  const [applicantType, setApplicantType] =
    useState<DashboardAffiliateApplicantType>("company")
  const [companyName, setCompanyName] = useState("")
  const [companyCode, setCompanyCode] = useState("")
  const [countryId, setCountryId] = useState(content.stepTwo.defaultCountryId)
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [street, setStreet] = useState("")
  const [zip, setZip] = useState("")

  return (
    <div className="flex w-full min-w-0 flex-col gap-5 xl:flex-row xl:items-start">
      <AffiliateFormCard
        content={content}
        step={step}
        onContinue={() => setStep("step-02")}
        onBack={() => setStep("step-01")}
        stepOneProps={{
          trafficSources,
          setTrafficSources,
          targetRegion,
          setTargetRegion,
          services,
          setServices,
        }}
        stepTwoProps={{
          applicantType,
          setApplicantType,
          companyName,
          setCompanyName,
          companyCode,
          setCompanyCode,
          countryId,
          setCountryId,
          city,
          setCity,
          state,
          setState,
          street,
          setStreet,
          zip,
          setZip,
        }}
      />
      <AffiliateSidebar content={content} />
    </div>
  )
}