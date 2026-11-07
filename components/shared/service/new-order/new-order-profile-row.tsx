"use client"

import { useEffect, useState } from "react"

import { NewOrderPlatformIconSlot } from "@/components/shared/service/new-order/new-order-platform-icon-slot"
import { NewOrderProfileAvatarSlot } from "@/components/shared/service/new-order/new-order-profile-avatar-slot"
import type {
  NewOrderAssets,
  NewOrderContent,
  NewOrderPlatformIcon,
} from "@/types/service/new-order"
import { cn } from "@/lib/utils"

const INSTAGRAM_GRADIENT =
  "bg-gradient-to-r from-[#f27b34] via-[#d8366b] to-[#7e359c] bg-clip-text text-transparent"

type NewOrderProfileRowProps = {
  profile: NewOrderContent["profile"]
  assets: NewOrderAssets
  platformIcon: NewOrderPlatformIcon
  confirmedHandle: string | null
  isEditing: boolean
  onStartEdit: () => void
  onCancel: () => void
  onSave: (username: string) => void
}

export function NewOrderProfileRow({
  profile,
  assets,
  platformIcon,
  confirmedHandle,
  isEditing,
  onStartEdit,
  onCancel,
  onSave,
}: NewOrderProfileRowProps) {
  const [draft, setDraft] = useState(confirmedHandle ?? "")

  useEffect(() => {
    if (isEditing) {
      setDraft(confirmedHandle ?? "")
    }
  }, [confirmedHandle, isEditing])

  const showSummary = Boolean(confirmedHandle) && !isEditing

  if (!showSummary) {
    return (
      <div className="flex flex-col gap-3 rounded-xl border border-[#ebecef] bg-white p-3 shadow-[0px_2px_4px_rgba(50,50,50,0.13)] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <NewOrderPlatformIconSlot
            icon={platformIcon}
            spriteSrc={assets.socialIconsSprite}
            className="shrink-0"
          />
          <label className="min-w-0 flex-1 sm:max-w-[416px]">
            <span className="sr-only">Instagram username</span>
            <input
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={profile.usernamePlaceholder}
              autoComplete="off"
              spellCheck={false}
              className="h-11 w-full min-w-0 rounded-lg border border-[#21aeff] bg-white pl-4 pr-3 text-sm font-medium leading-[1.35] text-[#21aeff] outline-none placeholder:text-[#21aeff]/80"
            />
          </label>
        </div>
        <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-2">
          {confirmedHandle ? (
            <button
              type="button"
              onClick={onCancel}
              className="px-1 py-0.5 text-base font-medium leading-[1.35] text-[#6a7283]"
            >
              {profile.cancelLabel}
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => onSave(draft)}
            disabled={!draft.trim()}
            className="px-1 py-0.5 text-base font-medium leading-[1.35] text-[#21aeff] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {profile.saveLabel}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-[#ebecef] bg-white p-3 shadow-[0px_2px_4px_rgba(50,50,50,0.13)]">
      <div className="flex min-w-0 items-start gap-3">
        <NewOrderProfileAvatarSlot
          avatarSrc={profile.defaultPreview.avatarSrc}
          variant="raised"
        />
        <div className="flex min-w-0 flex-col gap-1.5">
          <p
            className={cn(
              "truncate text-lg font-semibold leading-[1.3]",
              INSTAGRAM_GRADIENT,
            )}
          >
            {confirmedHandle}
          </p>
          <p className="text-sm leading-[1.3] text-[#4f586d]">
            <span className="font-medium">
              {profile.defaultPreview.followersCount}
            </span>
            {` Followers  `}
            <span className="font-medium">
              {profile.defaultPreview.followingCount}
            </span>
            {` Following`}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onStartEdit}
        className="shrink-0 rounded-xl border border-[#21aeff] bg-white px-4 py-1.5 text-sm font-medium leading-[1.35] text-[#21aeff]"
      >
        {profile.changeAccountLabel}
      </button>
    </div>
  )
}
