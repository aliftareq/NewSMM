"use client"

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react"

import { PlatformIcon } from "@/components/shared/landing/services-explorer/services-explorer-ui"
import { cn } from "@/lib/utils"
import type { DashboardSettingsSocialIcon } from "@/types/dashboard/settings"

/** Figma union tab bump (from social-usernames-panel.svg), viewBox 0 0 99 38 */
const TAB_BUMP_VIEWBOX = "0 0 99 38"
const TAB_BUMP_WIDTH_PX = 99
const TAB_BUMP_HEIGHT_PX = 37
const TAB_FILL_PATH =
  "M44 0H75C81.6274 0 87 5.37258 87 12V25C87 31.6274 92.3726 37 99 37H20C26.6274 37 32 31.6274 32 25V12C32 5.37258 37.3726 0 44 0Z"

const ICON_ROW_LEFT_PX = 47
const ICON_GAP_PX = 34
const ICON_SIZE_PX = 26
const PANEL_HEIGHT_PX = 109

const PLATFORM_LABELS: Record<string, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  twitter: "Twitter",
  spotify: "Spotify",
}

type SocialPlatformId = "instagram" | "tiktok" | "twitter" | "spotify"

type SocialUsernamesTabsProps = {
  socialIcons: DashboardSettingsSocialIcon[]
  socialIconsSprite: string
  socialUsernamesPanelSrc: string
  addUsernamePlusSrc: string
  addUsernameLabel: string
  defaultPlatformId?: SocialPlatformId
}

function SocialIconVisual({
  entry,
  spriteSrc,
}: {
  entry: DashboardSettingsSocialIcon
  spriteSrc: string
}) {
  if (entry.kind === "sprite") {
    return (
      <PlatformIcon icon={entry.icon} size={ICON_SIZE_PX} spriteSrc={spriteSrc} />
    )
  }
  return (
    <span className="relative block size-[26px] shrink-0 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        src={entry.src}
        className={entry.className ?? "size-full object-cover"}
      />
    </span>
  )
}

function MovingTabBump({
  leftPx,
  reduceMotion,
}: {
  leftPx: number
  reduceMotion: boolean
}) {
  return (
    <svg
      aria-hidden
      width={TAB_BUMP_WIDTH_PX}
      height={TAB_BUMP_HEIGHT_PX}
      viewBox={TAB_BUMP_VIEWBOX}
      className={cn(
        "pointer-events-none absolute top-0 z-[1]",
        reduceMotion
          ? "transition-none"
          : "transition-[transform] duration-200 ease-out",
      )}
      style={{ transform: `translateX(${leftPx}px)` }}
    >
      <path d={TAB_FILL_PATH} fill="#F5F6F7" />
      <path
        d={TAB_FILL_PATH}
        fill="none"
        stroke="#EBECEF"
        strokeWidth={1.2}
      />
    </svg>
  )
}

function DynamicPanelBody() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 top-[36px] z-0 rounded-b-xl border border-[#ebecef] bg-[#f5f6f7]"
      aria-hidden
    />
  )
}

/** Figma 25704:14624 — folder-tab social usernames. */
export function SocialUsernamesTabs({
  socialIcons,
  socialIconsSprite,
  socialUsernamesPanelSrc,
  addUsernamePlusSrc,
  addUsernameLabel,
  defaultPlatformId = "instagram",
}: SocialUsernamesTabsProps) {
  const panelId = useId()
  const headerRef = useRef<HTMLDivElement>(null)
  const iconRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [activeId, setActiveId] = useState<SocialPlatformId>(defaultPlatformId)
  const [bumpLeftPx, setBumpLeftPx] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)

  const [usernamesByPlatform] = useState<Record<string, string[]>>(() => {
    const initial: Record<string, string[]> = {}
    for (const icon of socialIcons) {
      initial[icon.id] = []
    }
    return initial
  })

  const activeIndex = Math.max(
    0,
    socialIcons.findIndex((icon) => icon.id === activeId),
  )

  const useStaticChrome = activeId === "instagram"

  const updateBumpPosition = useCallback(() => {
    if (useStaticChrome) {
      setBumpLeftPx(0)
      return
    }
    const header = headerRef.current
    const iconBtn = iconRefs.current[activeIndex]
    if (!header || !iconBtn) return

    const headerRect = header.getBoundingClientRect()
    const iconRect = iconBtn.getBoundingClientRect()
    const iconCenterX = iconRect.left - headerRect.left + iconRect.width / 2
    let left = iconCenterX - TAB_BUMP_WIDTH_PX / 2
    left = Math.max(0, left)
    setBumpLeftPx(left)
  }, [activeIndex, useStaticChrome])

  useLayoutEffect(() => {
    updateBumpPosition()
  }, [updateBumpPosition, activeId])

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReduceMotion(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    const onResize = () => updateBumpPosition()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [updateBumpPosition])

  const focusTabAt = (index: number) => {
    const icon = socialIcons[index]
    if (!icon) return
    setActiveId(icon.id as SocialPlatformId)
    iconRefs.current[index]?.focus()
  }

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const last = socialIcons.length - 1
    let next = index

    switch (event.key) {
      case "ArrowRight":
        next = index >= last ? 0 : index + 1
        break
      case "ArrowLeft":
        next = index <= 0 ? last : index - 1
        break
      case "Home":
        next = 0
        break
      case "End":
        next = last
        break
      default:
        return
    }

    event.preventDefault()
    focusTabAt(next)
  }

  return (
    <div
      className="relative w-full max-w-[789px]"
      style={{ minHeight: PANEL_HEIGHT_PX }}
    >
      {useStaticChrome ? (
        // Pixel-perfect Figma chrome (default Instagram tab)
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt=""
          src={socialUsernamesPanelSrc}
          className="pointer-events-none absolute inset-0 z-0 block h-[109px] w-full max-w-none object-fill"
        />
      ) : (
        <>
          <DynamicPanelBody />
          <MovingTabBump leftPx={bumpLeftPx} reduceMotion={reduceMotion} />
        </>
      )}

      <div
        ref={headerRef}
        className="absolute inset-x-0 top-0 z-10 h-[37px] w-full"
        role="tablist"
        aria-label="Social platforms"
      >
        <div
          className="flex h-full items-center"
          style={{
            gap: ICON_GAP_PX,
            paddingLeft: ICON_ROW_LEFT_PX,
          }}
        >
          {socialIcons.map((entry, index) => {
            const isActive = entry.id === activeId
            const label = PLATFORM_LABELS[entry.id] ?? entry.id
            return (
              <button
                key={entry.id}
                ref={(node) => {
                  iconRefs.current[index] = node
                }}
                type="button"
                role="tab"
                id={`${panelId}-tab-${entry.id}`}
                aria-selected={isActive}
                aria-controls={`${panelId}-panel`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveId(entry.id as SocialPlatformId)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={cn(
                  "flex size-[26px] shrink-0 items-center justify-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[#21aeff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f1f1f1]",
                  isActive ? "opacity-100" : "opacity-70 hover:opacity-100",
                )}
              >
                <SocialIconVisual entry={entry} spriteSrc={socialIconsSprite} />
                <span className="sr-only">{label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div
        id={`${panelId}-panel`}
        role="tabpanel"
        aria-labelledby={`${panelId}-tab-${activeId}`}
        className="absolute left-4 top-[51px] z-10"
      >
        <button
          type="button"
          className="inline-flex w-fit max-w-full items-center gap-1 rounded-lg border border-[#21aeff] bg-white px-[18px] py-3 text-sm font-medium leading-[1.35] text-[#21aeff] transition-colors hover:bg-[#f0f9ff]"
          data-platform={activeId}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={addUsernamePlusSrc}
            width={14}
            height={14}
            className="block size-3.5 shrink-0"
          />
          {addUsernameLabel}
        </button>

        {usernamesByPlatform[activeId]?.length ? (
          <ul className="mt-3 flex flex-col gap-2">
            {usernamesByPlatform[activeId].map((username) => (
              <li
                key={username}
                className="text-sm font-medium text-[#202020]"
              >
                {username}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  )
}