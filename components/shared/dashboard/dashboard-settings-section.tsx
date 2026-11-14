"use client"

import { useMemo, useState } from "react"

import {
  DashboardSelectContent,
  DashboardSelectItem,
  dashboardSelectValueLabel,
  labelsBySelectId,
} from "@/components/shared/dashboard/dashboard-select"
import {
  Select,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DashboardAddNewCardModal } from "@/components/shared/dashboard/dashboard-add-new-card-modal"
import { SocialUsernamesTabs } from "@/components/shared/dashboard/settings/social-usernames-tabs"
import { dashboardSettingsContent } from "@/data/dashboard/settings"
import { cn } from "@/lib/utils"
import type {
  DashboardSettingsContent,
  DashboardSettingsTabId,
} from "@/types/dashboard/settings"

type DashboardSettingsSectionProps = {
  content?: DashboardSettingsContent
}

const INPUT_SHELL =
  "flex h-[52px] w-full items-center rounded-xl border border-[#ebecef] bg-[#f5f6f7] px-[18px] py-4 text-base font-medium leading-[1.35] text-[#202020] outline-none"

const CHANGE_BUTTON_CLASS =
  "inline-flex h-[52px] w-[150px] shrink-0 items-center justify-center rounded-xl border border-[#21aeff] text-sm font-medium leading-[1.35] text-[#21aeff] transition-opacity hover:opacity-95"

const CHANGE_BUTTON_STYLE = {
  backgroundImage:
    "linear-gradient(111deg, rgba(0, 135, 212, 0.08) 2.53%, rgba(50, 180, 255, 0.08) 61.03%, rgba(7, 149, 231, 0.07) 91.98%)",
} as const

const SAVE_CHANGES_BUTTON_STYLE = {
  backgroundImage:
    "linear-gradient(152deg, rgba(0, 135, 212, 0.08) 2.53%, rgba(50, 180, 255, 0.08) 61.03%, rgba(7, 149, 231, 0.07) 91.98%)",
} as const

const PASSWORD_INPUT_CLASS =
  "h-[52px] w-full rounded-xl border border-[#ebecef] bg-[#f5f6f7] px-[18px] py-4 text-base font-medium leading-[1.35] text-[#5b6477] outline-none placeholder:text-[#5b6477] focus-visible:border-[#21aeff] focus-visible:ring-2 focus-visible:ring-[#21aeff]/20"

const BILLING_INPUT_CLASS =
  "h-[52px] w-full rounded-xl border border-[#ebecef] bg-[#f5f6f7] px-[18px] py-4 text-base font-medium leading-[1.35] text-[#202020] outline-none placeholder:text-[#798090] focus-visible:border-[#21aeff] focus-visible:ring-2 focus-visible:ring-[#21aeff]/20"

const BILLING_SELECT_TRIGGER_CLASS = cn(
  BILLING_INPUT_CLASS,
  "flex !h-[52px] min-h-[52px] w-full items-center justify-between text-left",
  "data-[size=default]:!h-[52px]",
  "[&_[data-slot=select-icon]]:hidden [&_svg]:hidden",
)

function SectionDivider({ src }: { src: string }) {
  return (
    <div className="relative h-px w-full shrink-0" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" src={src} className="block h-px w-full max-w-none" />
    </div>
  )
}

function SettingsToggle({
  checked,
  disabled,
  onToggle,
  toggleOnSrc,
}: {
  checked: boolean
  disabled?: boolean
  onToggle: () => void
  toggleOnSrc: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => {
        if (!disabled) onToggle()
      }}
      className={cn(
        "relative h-6 w-[39px] shrink-0 overflow-hidden",
        disabled ? "cursor-not-allowed opacity-90" : "cursor-pointer",
      )}
    >
      {checked ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt=""
          src={toggleOnSrc}
          width={39}
          height={24}
          className="block size-full max-w-none"
        />
      ) : (
        <span
          aria-hidden
          className="flex size-full items-center rounded-full bg-[#d8dde3] px-0.5"
        >
          <span className="size-5 rounded-full bg-white shadow-sm" />
        </span>
      )}
    </button>
  )
}

function GeneralSettingsPanel({
  content,
  emailPrefs,
  setEmailPref,
}: {
  content: DashboardSettingsContent
  emailPrefs: Record<string, boolean>
  setEmailPref: (id: string, value: boolean) => void
}) {
  const { contactInfo, socialIcons, emailSettings, assets } = content
  const { defaults } = contactInfo

  return (
    <div className="flex w-full min-w-0 flex-col gap-6">
      <div className="flex w-full flex-col gap-5">
        <h2 className="text-lg font-medium leading-[1.5] text-[#343e56]">
          {contactInfo.sectionTitle}
        </h2>
        <SectionDivider src={assets.sectionDivider} />
      </div>

      <div className="flex w-full flex-col gap-6">
        <div className="flex w-full flex-col gap-[18px]">
          <div className="flex w-full flex-col gap-[18px] lg:flex-row lg:items-end">
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <label className="text-base font-medium leading-[1.35] text-[#798090]">
                {contactInfo.firstNameLabel}
              </label>
              <div className={INPUT_SHELL}>{defaults.firstName}</div>
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <label className="text-base font-medium leading-[1.35] text-[#798090]">
                {contactInfo.lastNameLabel}
              </label>
              <div className={INPUT_SHELL}>{defaults.lastName}</div>
            </div>
            <button
              type="button"
              className={CHANGE_BUTTON_CLASS}
              style={CHANGE_BUTTON_STYLE}
            >
              {contactInfo.changeLabel}
            </button>
          </div>

          <div className="flex w-full flex-col gap-[18px] sm:flex-row sm:items-end">
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <label className="text-sm font-medium leading-[1.35] text-[#798090]">
                {contactInfo.emailLabel}
              </label>
              <div className={INPUT_SHELL}>{defaults.email}</div>
            </div>
            <button
              type="button"
              className={CHANGE_BUTTON_CLASS}
              style={CHANGE_BUTTON_STYLE}
            >
              {contactInfo.changeLabel}
            </button>
          </div>
        </div>

        <SocialUsernamesTabs
          socialIcons={socialIcons}
          socialIconsSprite={assets.socialIconsSprite}
          socialUsernamesPanelSrc={assets.socialUsernamesPanel}
          addUsernamePlusSrc={assets.addUsernamePlus}
          addUsernameLabel={contactInfo.addUsernameLabel}
          defaultPlatformId="instagram"
        />

        <div className="flex w-full flex-col gap-4">
          <h2 className="text-lg font-medium leading-[1.5] text-[#343e56]">
            {emailSettings.sectionTitle}
          </h2>
          {emailSettings.items.map((item) => (
            <div
              key={item.id}
              className="flex w-full flex-col gap-4 rounded-2xl border border-[#ebecef] bg-[#fafafb] px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 flex-col gap-2">
                <p className="text-base font-medium leading-[1.35] text-[#343e56]">
                  {item.title}
                </p>
                <p className="text-sm font-normal leading-[1.3] text-[#798090]">
                  {item.description}
                </p>
              </div>
              <SettingsToggle
                checked={emailPrefs[item.id] ?? item.defaultEnabled}
                disabled={item.locked}
                toggleOnSrc={assets.toggleOn}
                onToggle={() =>
                  setEmailPref(item.id, !(emailPrefs[item.id] ?? item.defaultEnabled))
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PasswordField({
  id,
  label,
  value,
  visible,
  placeholder,
  visibilityIconSrc,
  onChange,
  onToggleVisibility,
}: {
  id: string
  label: string
  value: string
  visible: boolean
  placeholder: string
  visibilityIconSrc: string
  onChange: (value: string) => void
  onToggleVisibility: () => void
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <label
        htmlFor={id}
        className="text-base font-medium leading-[1.35] text-[#798090]"
      >
        {label}
      </label>
      <div className="relative w-full">
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={cn(PASSWORD_INPUT_CLASS, "pr-12")}
        />
        <button
          type="button"
          onClick={onToggleVisibility}
          className="absolute right-[18px] top-1/2 flex size-5 -translate-y-1/2 items-center justify-center"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={visibilityIconSrc}
            width={20}
            height={20}
            className="block size-5 max-w-none"
          />
        </button>
      </div>
    </div>
  )
}

/** Figma 25704:14921 */
function SecuritySettingsPanel({ content }: { content: DashboardSettingsContent }) {
  const { security, assets } = content
  const { changePassword, accountProtection, deleteAccount } = security

  const [newPassword, setNewPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [newPasswordVisible, setNewPasswordVisible] = useState(false)
  const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(
    accountProtection.defaultTwoFactorEnabled,
  )

  return (
    <div className="flex w-full min-w-0 flex-col gap-6">
      <div className="flex w-full flex-col gap-6">
        <div className="flex w-full flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-medium leading-[1.3] text-[#343e56]">
              {changePassword.title}
            </h2>
            <p className="text-base font-normal leading-[1.35] text-[#6a7283]">
              {changePassword.description}
            </p>
          </div>
          <SectionDivider src={assets.sectionDivider} />
        </div>

        <div className="flex w-full flex-col gap-6">
          <div className="flex w-full flex-col gap-[18px] lg:flex-row lg:items-end">
            <PasswordField
              id="dashboard-settings-new-password"
              label={changePassword.newPasswordLabel}
              value={newPassword}
              visible={newPasswordVisible}
              placeholder={changePassword.passwordPlaceholder}
              visibilityIconSrc={assets.passwordVisibility}
              onChange={setNewPassword}
              onToggleVisibility={() =>
                setNewPasswordVisible((current) => !current)
              }
            />
            <PasswordField
              id="dashboard-settings-repeat-password"
              label={changePassword.repeatPasswordLabel}
              value={repeatPassword}
              visible={repeatPasswordVisible}
              placeholder={changePassword.passwordPlaceholder}
              visibilityIconSrc={assets.passwordVisibility}
              onChange={setRepeatPassword}
              onToggleVisibility={() =>
                setRepeatPasswordVisible((current) => !current)
              }
            />
          </div>

          <button
            type="button"
            className="flex h-[54px] w-full items-center justify-center rounded-xl border border-[#21aeff] px-5 text-base font-medium leading-[1.35] text-[#21aeff] transition-opacity hover:opacity-95"
            style={SAVE_CHANGES_BUTTON_STYLE}
          >
            {changePassword.saveChangesLabel}
          </button>

          <SectionDivider src={assets.sectionDivider} />

          <div className="flex w-full flex-col gap-4">
            <h3 className="text-lg font-medium leading-[1.5] text-[#343e56]">
              {accountProtection.sectionTitle}
            </h3>
            <div className="flex w-full flex-col gap-4 rounded-2xl border border-[#ebecef] bg-[#fafafb] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 flex-col gap-3">
                <p className="text-base font-medium leading-[1.35] text-[#343e56]">
                  {accountProtection.twoFactorTitle}
                </p>
                <p className="text-sm font-medium leading-[1.35] text-[#798090]">
                  {accountProtection.twoFactorDescription}
                </p>
              </div>
              <SettingsToggle
                checked={twoFactorEnabled}
                toggleOnSrc={assets.toggleOn}
                onToggle={() => setTwoFactorEnabled((current) => !current)}
              />
            </div>
          </div>
        </div>
      </div>

      <SectionDivider src={assets.securityBlockDivider} />

      <div className="w-full rounded-[20px] border border-[#ebecef] bg-[#fafafb] px-[18px] py-5">
        <div className="flex w-full flex-col gap-6">
          <div className="flex w-full flex-col gap-5">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-medium leading-[1.3] text-[#343e56]">
                {deleteAccount.title}
              </h2>
              <p className="text-base font-normal leading-[1.35] text-[#6a7283]">
                {deleteAccount.description.map((line, index) => (
                  <span key={line}>
                    {line}
                    {index < deleteAccount.description.length - 1 ? " " : ""}
                  </span>
                ))}
              </p>
            </div>
            <SectionDivider src={assets.deleteAccountSectionDivider} />
          </div>

          <div className="flex w-full flex-col gap-6">
            <div className="flex min-h-[54px] w-full items-center rounded-xl border border-[#ffedd2] bg-[#fff3e2] px-5 py-4">
              <p className="text-base leading-[1.35]">
                <span className="font-medium text-[#da912c]">
                  {deleteAccount.warningPrefix}
                </span>
                <span className="font-normal text-[#f7ac43]">
                  {deleteAccount.warningMiddle}
                </span>
                <span className="font-normal text-[#d38417]">
                  {deleteAccount.warningSuffix}
                </span>
              </p>
            </div>
            <button
              type="button"
              className="inline-flex h-[54px] w-fit items-center justify-center rounded-xl border border-[#ff4d4d] bg-white px-5 text-base font-medium leading-[1.35] text-[#ff4d4d] transition-colors hover:bg-[#fff5f5]"
            >
              {deleteAccount.requestDeletionLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function BillingTextField({
  id,
  label,
  placeholder,
  labelTone = "dark",
  value,
  onChange,
}: {
  id: string
  label: string
  placeholder: string
  labelTone?: "dark" | "muted"
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <label
        htmlFor={id}
        className={cn(
          "text-base font-medium leading-[1.35]",
          labelTone === "muted" ? "text-[#798090]" : "text-[#202020]",
        )}
      >
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={BILLING_INPUT_CLASS}
      />
    </div>
  )
}

/** Figma 25704:15068 */
function BillingSettingsPanel({ content }: { content: DashboardSettingsContent }) {
  const { billing, assets } = content
  const { personalInfo, savedCards, transactionsEmptyMessage } = billing

  const [addNewCardOpen, setAddNewCardOpen] = useState(false)
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({})
  const [countryId, setCountryId] = useState(personalInfo.defaultCountryId)

  const setField = (id: string, value: string) => {
    setFieldValues((prev) => ({ ...prev, [id]: value }))
  }

  const getValue = (id: string) => fieldValues[id] ?? ""

  const firstRow = personalInfo.fields.filter((field) =>
    ["first-name", "last-name"].includes(field.id),
  )
  const countryCityRow = personalInfo.fields.filter((field) =>
    ["city"].includes(field.id),
  )
  const streetField = personalInfo.fields.find(
    (field) => field.id === "street-address",
  )
  const optionalRow = personalInfo.fields.filter((field) =>
    ["business-name", "registration-number"].includes(field.id),
  )

  const countryLabels = labelsBySelectId(personalInfo.countries)

  return (
    <>
      <DashboardAddNewCardModal
        open={addNewCardOpen}
        onOpenChange={setAddNewCardOpen}
      />
      <div className="flex w-full min-w-0 flex-col gap-6">
      <div className="flex w-full flex-col gap-6">
        <div className="flex w-full flex-col gap-5">
          <h2 className="text-lg font-medium leading-[1.5] text-[#343e56]">
            {personalInfo.sectionTitle}
          </h2>
          <SectionDivider src={assets.sectionDivider} />
        </div>

        <div className="flex w-full flex-col gap-6">
          <div className="flex w-full flex-col gap-[18px] lg:flex-row lg:items-end">
            {firstRow.map((field) => (
              <BillingTextField
                key={field.id}
                id={`dashboard-billing-${field.id}`}
                label={field.label}
                placeholder={field.placeholder}
                labelTone={field.labelTone}
                value={getValue(field.id)}
                onChange={(value) => setField(field.id, value)}
              />
            ))}
          </div>

          <div className="flex w-full flex-col gap-[18px] lg:flex-row lg:items-end">
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <label
                htmlFor="dashboard-billing-country"
                className="text-base font-medium leading-[1.35] text-[#202020]"
              >
                {personalInfo.countryField.label}
              </label>
              <Select
                value={countryId}
                onValueChange={(value) => {
                  if (value) setCountryId(value)
                }}
              >
                <SelectTrigger
                  id="dashboard-billing-country"
                  className={BILLING_SELECT_TRIGGER_CLASS}
                >
                  <SelectValue
                    placeholder={personalInfo.countryField.placeholder}
                    className="min-w-0 flex-1 truncate text-left text-base font-medium text-[#202020] data-placeholder:text-[#798090]"
                  >
                    {(value) =>
                      dashboardSelectValueLabel(
                        value as string | null,
                        countryLabels,
                        personalInfo.countryField.placeholder,
                      )
                    }
                  </SelectValue>
                  <span
                    className="flex size-5 shrink-0 items-center justify-center rounded-full p-[3.333px]"
                    aria-hidden
                  >
                    <span className="relative block h-2 w-[14px] shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt=""
                        src={assets.countrySelectChevron}
                        width={14}
                        height={8}
                        className="block size-full max-w-none"
                      />
                    </span>
                  </span>
                </SelectTrigger>
                <DashboardSelectContent>
                  {personalInfo.countries.map((country) => (
                    <DashboardSelectItem key={country.id} value={country.id}>
                      {country.label}
                    </DashboardSelectItem>
                  ))}
                </DashboardSelectContent>
              </Select>
            </div>
            {countryCityRow.map((field) => (
              <BillingTextField
                key={field.id}
                id={`dashboard-billing-${field.id}`}
                label={field.label}
                placeholder={field.placeholder}
                labelTone={field.labelTone}
                value={getValue(field.id)}
                onChange={(value) => setField(field.id, value)}
              />
            ))}
          </div>

          {streetField ? (
            <BillingTextField
              id={`dashboard-billing-${streetField.id}`}
              label={streetField.label}
              placeholder={streetField.placeholder}
              labelTone={streetField.labelTone}
              value={getValue(streetField.id)}
              onChange={(value) => setField(streetField.id, value)}
            />
          ) : null}

          <div className="flex w-full flex-col gap-[18px] lg:flex-row lg:items-end">
            {optionalRow.map((field) => (
              <BillingTextField
                key={field.id}
                id={`dashboard-billing-${field.id}`}
                label={field.label}
                placeholder={field.placeholder}
                labelTone={field.labelTone}
                value={getValue(field.id)}
                onChange={(value) => setField(field.id, value)}
              />
            ))}
          </div>

          <button
            type="button"
            className="flex h-[54px] w-full items-center justify-center rounded-xl border border-[#21aeff] px-5 text-base font-medium leading-[1.35] text-[#21aeff] transition-opacity hover:opacity-95"
            style={SAVE_CHANGES_BUTTON_STYLE}
          >
            {personalInfo.saveChangesLabel}
          </button>

          <SectionDivider src={assets.sectionDivider} />
        </div>
      </div>

      <div className="w-full rounded-2xl border border-[#ebecef] bg-[#fafafb] px-[18px] py-5">
        <div className="flex w-full flex-col gap-6">
          <h2 className="text-xl font-medium leading-[1.3] text-[#343e56]">
            {savedCards.sectionTitle}
          </h2>
          <button
            type="button"
            onClick={() => setAddNewCardOpen(true)}
            className="flex h-[145px] w-full items-center justify-center rounded-xl border border-dashed border-[#21aeff] bg-white px-5 transition-colors hover:bg-[#f0f9ff]"
          >
            <span className="inline-flex items-center gap-3 text-base font-medium leading-[1.35] text-[#21aeff]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={assets.addUsernamePlus}
                width={14}
                height={14}
                className="block size-3.5 shrink-0"
              />
              {savedCards.addNewCardLabel}
            </span>
          </button>
        </div>
      </div>

      <div className="flex min-h-[52px] w-full items-center justify-center rounded-xl border border-[#ebecef] bg-[#fafafb] px-5 py-4">
        <p className="text-base font-medium leading-[1.35] text-[#404a60]">
          {transactionsEmptyMessage}
        </p>
      </div>
    </div>
    </>
  )
}

/** Figma 25704:14540 */
export function DashboardSettingsSection({
  content = dashboardSettingsContent,
}: DashboardSettingsSectionProps) {
  const [activeTab, setActiveTab] = useState<DashboardSettingsTabId>(
    content.defaultTabId,
  )

  const initialEmailPrefs = useMemo(() => {
    const map: Record<string, boolean> = {}
    for (const item of content.emailSettings.items) {
      map[item.id] = item.defaultEnabled
    }
    return map
  }, [content.emailSettings.items])

  const [emailPrefs, setEmailPrefs] =
    useState<Record<string, boolean>>(initialEmailPrefs)

  const setEmailPref = (id: string, value: boolean) => {
    setEmailPrefs((prev) => ({ ...prev, [id]: value }))
  }

  const { assets, nav } = content

  return (
    <section className="flex w-full min-w-0 flex-col overflow-hidden rounded-3xl border border-[#ebecef] bg-white">
      <div className="flex w-full min-w-0 flex-col lg:flex-row lg:items-stretch">
        <aside className="w-full shrink-0 p-[18px] lg:w-[253px]">
          <nav className="flex w-full flex-col gap-3" aria-label="Settings">
            {nav.map((item) => {
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-xl p-4 text-left text-base font-medium leading-[1.35] transition-colors",
                    isActive
                      ? "bg-[#269de7] text-white shadow-[0px_4px_4px_rgba(0,0,0,0.08)]"
                      : "text-[#222e48] hover:bg-[#f5f6f7]",
                  )}
                >
                  <span
                    className={cn(
                      "relative flex shrink-0 items-center justify-center",
                      item.id === "general" ? "size-5" : "size-6",
                    )}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt=""
                      src={
                        item.id === "general"
                          ? isActive
                            ? assets.navGeneralActive
                            : assets.navGeneralInactive
                          : item.iconSrc
                      }
                      className={cn(
                        "block max-w-none",
                        item.id === "general" ? "size-5" : "size-6",
                        isActive && item.id !== "general"
                          ? "brightness-0 invert"
                          : undefined,
                      )}
                    />
                  </span>
                  {item.label}
                </button>
              )
            })}
          </nav>
        </aside>

        <div
          className="hidden w-px shrink-0 self-stretch lg:block"
          aria-hidden
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={assets.panelDividerVertical}
            className="h-full w-px max-w-none"
          />
        </div>

        <div className="min-w-0 flex-1 px-4 pb-6 pt-[18px] sm:px-4 lg:pl-2 lg:pr-4">
          {activeTab === "general" ? (
            <GeneralSettingsPanel
              content={content}
              emailPrefs={emailPrefs}
              setEmailPref={setEmailPref}
            />
          ) : activeTab === "security" ? (
            <SecuritySettingsPanel content={content} />
          ) : (
            <BillingSettingsPanel content={content} />
          )}
        </div>
      </div>
    </section>
  )
}