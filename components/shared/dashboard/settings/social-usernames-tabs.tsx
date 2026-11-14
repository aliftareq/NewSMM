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

/** Figma union tab bump — cropped to path bounds (x 20–99) so width/2 = visual center */
const TAB_BUMP_VIEWBOX = "20 0 79 38"
const TAB_BUMP_WIDTH_PX = 79
const TAB_BUMP_HEIGHT_PX = 37
const TAB_FILL_PATH =
  "M44 0H75C81.6274 0 87 5.37258 87 12V25C87 31.6274 92.3726 37 99 37H20C26.6274 37 32 31.6274 32 25V12C32 5.37258 37.3726 0 44 0Z"
/** Outline without flat bottom (y=37) so tab meets panel with no seam line */
const TAB_STROKE_PATH =
  "M44 0H75C81.6274 0 87 5.37258 87 12V25C87 31.6274 92.3726 37 99 37M20 37C26.6274 37 32 31.6274 32 25V12C32 5.37258 37.3726 0 44 0"

const ICON_ROW_LEFT_PX = 47
const ICON_GAP_PX = 34
const ICON_SIZE_PX = 26
const PANEL_HEIGHT_EMPTY_PX = 109
/** Figma 25704:14794 — one saved row + Add username */
const PANEL_HEIGHT_EXPANDED_BASE_PX = 168
const PANEL_EXTRA_ROW_PX = 55
const USERNAME_ROW_GAP_PX = 12

/** Figma 25704:14810 — Add username control */
const ADD_USERNAME_BUTTON_CLASS =
  "group inline-flex h-[43px] w-[150px] shrink-0 items-center justify-center gap-1 self-start rounded-lg border border-solid border-[#21aeff] bg-white px-[18px] py-[12px] text-sm font-medium leading-[1.35] text-[#21aeff] backdrop-blur-[40px] transition-colors hover:border-[#21aeff] hover:bg-[#21aeff] hover:text-white"

/** Figma 25704:14799 — saved / draft username row */
const USERNAME_ROW_CLASS = "flex w-full items-center justify-between"
const USERNAME_ROW_LEFT_CLASS = "flex min-w-0 items-center gap-1"
const DELETE_USERNAME_BUTTON_CLASS =
  "inline-flex h-[43px] w-[120px] shrink-0 items-center justify-center rounded-lg border border-solid border-[#ff4d4d] bg-white px-[18px] py-[12px] text-sm font-medium leading-[1.35] text-[#ff4d4d] backdrop-blur-[40px] transition-colors hover:border-[#ff4d4d] hover:bg-[#ff4d4d] hover:text-white"
const USERNAME_TEXT_CLASS =
  "truncate text-sm font-medium leading-[1.35] text-[#222e48] whitespace-nowrap"

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
  addUsernamePlusSrc: string
  addUsernameLabel: string
  deleteUsernameLabel: string
  usernameAvatarSrc: string
  defaultPlatformId?: SocialPlatformId
}

function computePanelMinHeight(usernameCount: number, isAdding: boolean) {
  const rowCount = usernameCount + (isAdding ? 1 : 0)
  if (rowCount === 0) return PANEL_HEIGHT_EMPTY_PX
  return (
    PANEL_HEIGHT_EXPANDED_BASE_PX +
    Math.max(0, rowCount - 1) * PANEL_EXTRA_ROW_PX
  )
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
        d={TAB_STROKE_PATH}
        fill="none"
        stroke="#EBECEF"
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
      {/* Blend into panel: erase panel top border under active tab */}
      <rect x="20" y="36" width="79" height="2" fill="#F5F6F7" />
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
  addUsernamePlusSrc,
  addUsernameLabel,
  deleteUsernameLabel,
  usernameAvatarSrc,
  defaultPlatformId = "instagram",
}: SocialUsernamesTabsProps) {
  const panelId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const iconRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [activeId, setActiveId] = useState<SocialPlatformId>(defaultPlatformId)
  const [bumpLeftPx, setBumpLeftPx] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)

  const [usernamesByPlatform, setUsernamesByPlatform] = useState<
    Record<string, string[]>
  >(() => {
    const initial: Record<string, string[]> = {}
    for (const icon of socialIcons) {
      initial[icon.id] = []
    }
    return initial
  })
  const [isAddingByPlatform, setIsAddingByPlatform] = useState<
    Record<string, boolean>
  >({})
  const [draftUsername, setDraftUsername] = useState("")
  const draftInputRef = useRef<HTMLInputElement>(null)

  const usernames = usernamesByPlatform[activeId] ?? []
  const isAdding = Boolean(isAddingByPlatform[activeId])
  const panelMinHeight = computePanelMinHeight(usernames.length, isAdding)

  const activeIndex = Math.max(
    0,
    socialIcons.findIndex((icon) => icon.id === activeId),
  )

  const updateBumpPosition = useCallback(() => {
    const panel = panelRef.current
    const iconBtn = iconRefs.current[activeIndex]
    if (!panel || !iconBtn) return

    const panelRect = panel.getBoundingClientRect()
    const iconRect = iconBtn.getBoundingClientRect()
    const iconCenterX = iconRect.left - panelRect.left + iconRect.width / 2
    let left = iconCenterX - TAB_BUMP_WIDTH_PX / 2
    const maxLeft = panelRect.width - TAB_BUMP_WIDTH_PX
    left = Math.max(0, Math.min(maxLeft, left))
    setBumpLeftPx(left)
  }, [activeIndex])

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

  useEffect(() => {
    setDraftUsername("")
    setIsAddingByPlatform((prev) => {
      if (!prev[activeId]) return prev
      const next = { ...prev }
      delete next[activeId]
      return next
    })
  }, [activeId])

  useLayoutEffect(() => {
    if (!isAdding) return
    draftInputRef.current?.focus()
  }, [isAdding, activeId])

  const startAddingUsername = () => {
    setIsAddingByPlatform((prev) => ({ ...prev, [activeId]: true }))
    setDraftUsername("")
  }

  const cancelAddingUsername = () => {
    setIsAddingByPlatform((prev) => {
      const next = { ...prev }
      delete next[activeId]
      return next
    })
    setDraftUsername("")
  }

  const commitDraftUsername = () => {
    const value = draftUsername.trim()
    if (!value) return
    setUsernamesByPlatform((prev) => ({
      ...prev,
      [activeId]: [...(prev[activeId] ?? []), value],
    }))
    cancelAddingUsername()
  }

  const removeUsername = (index: number) => {
    setUsernamesByPlatform((prev) => ({
      ...prev,
      [activeId]: (prev[activeId] ?? []).filter((_, i) => i !== index),
    }))
  }

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
      ref={panelRef}
      className="relative w-full max-w-[789px]"
      style={{ minHeight: panelMinHeight }}
    >
      <DynamicPanelBody />
      <MovingTabBump leftPx={bumpLeftPx} reduceMotion={reduceMotion} />

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
        className={cn(
          "absolute inset-x-4 z-10 flex w-[calc(100%-2rem)] max-w-[758px] flex-col items-start",
          panelMinHeight > PANEL_HEIGHT_EMPTY_PX ? "top-[54px]" : "top-[51px]",
        )}
        style={{ gap: USERNAME_ROW_GAP_PX }}
      >
        {usernames.map((username, index) => (
          <div key={`${username}-${index}`} className={USERNAME_ROW_CLASS}>
            <div className={USERNAME_ROW_LEFT_CLASS}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={usernameAvatarSrc}
                width={27}
                height={27}
                className="block size-[27px] shrink-0"
              />
              <span className={USERNAME_TEXT_CLASS}>{username}</span>
            </div>
            <button
              type="button"
              onClick={() => removeUsername(index)}
              className={DELETE_USERNAME_BUTTON_CLASS}
            >
              {deleteUsernameLabel}
            </button>
          </div>
        ))}

        {isAdding ? (
          <div className={USERNAME_ROW_CLASS}>
            <div className={USERNAME_ROW_LEFT_CLASS}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={usernameAvatarSrc}
                width={27}
                height={27}
                className="block size-[27px] shrink-0"
              />
              <input
                ref={draftInputRef}
                type="text"
                value={draftUsername}
                onChange={(event) => setDraftUsername(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault()
                    commitDraftUsername()
                  }
                  if (event.key === "Escape") {
                    event.preventDefault()
                    cancelAddingUsername()
                  }
                }}
                placeholder={addUsernameLabel}
                className={cn(
                  USERNAME_TEXT_CLASS,
                  "min-w-0 flex-1 border-0 bg-transparent outline-none placeholder:text-[#798090]",
                )}
                aria-label={addUsernameLabel}
              />
            </div>
            <button
              type="button"
              onClick={cancelAddingUsername}
              className={DELETE_USERNAME_BUTTON_CLASS}
            >
              {deleteUsernameLabel}
            </button>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => {
            if (isAdding) {
              draftInputRef.current?.focus()
              return
            }
            startAddingUsername()
          }}
          className={ADD_USERNAME_BUTTON_CLASS}
          data-platform={activeId}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={addUsernamePlusSrc}
            width={14}
            height={14}
            className="block size-[14px] shrink-0 transition-[filter] group-hover:brightness-0 group-hover:invert"
          />
          <span className="whitespace-nowrap">{addUsernameLabel}</span>
        </button>
      </div>
    </div>
  )
}