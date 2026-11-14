"use client"

import { useMemo, useState } from "react"

import { PlatformIcon } from "@/components/shared/landing/services-explorer/services-explorer-ui"
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

        <div className="relative w-full min-h-[108px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={assets.socialUsernamesPanel}
            className="pointer-events-none absolute inset-0 block h-full w-full max-w-none object-fill"
          />
          <div className="relative flex flex-col gap-4 px-4 pb-4 pt-2 sm:px-6">
            <div className="flex flex-wrap items-center gap-[34px] pl-2 pt-1">
              {socialIcons.map((entry) =>
                entry.kind === "sprite" ? (
                  <PlatformIcon
                    key={entry.id}
                    icon={entry.icon}
                    size={26}
                    spriteSrc={assets.socialIconsSprite}
                  />
                ) : (
                  <span
                    key={entry.id}
                    className="relative block size-[26px] shrink-0 overflow-hidden"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt=""
                      src={entry.src}
                      className={entry.className ?? "size-full object-cover"}
                    />
                  </span>
                ),
              )}
            </div>
            <button
              type="button"
              className="inline-flex w-fit max-w-full items-center gap-1 rounded-lg border border-[#21aeff] bg-white px-[18px] py-3 text-sm font-medium leading-[1.35] text-[#21aeff] transition-colors hover:bg-[#f0f9ff]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={assets.addUsernamePlus}
                width={14}
                height={14}
                className="block size-3.5 shrink-0"
              />
              {contactInfo.addUsernameLabel}
            </button>
          </div>
        </div>

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

  const { assets, nav, tabPlaceholders } = content

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
          ) : (
            <div className="flex w-full flex-col gap-3 py-2">
              <h2 className="text-lg font-medium leading-[1.5] text-[#343e56]">
                {tabPlaceholders[activeTab].title}
              </h2>
              <p className="text-base font-normal leading-[1.35] text-[#798090]">
                {tabPlaceholders[activeTab].description}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}