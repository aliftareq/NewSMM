"use client"

import { useSyncExternalStore } from "react"

/** Tailwind `lg` — desktop keeps original mount / entrance animations. */
export const LANDING_LG_MEDIA = "(min-width: 1024px)"

export function readLandingLgViewport(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia(LANDING_LG_MEDIA).matches
}

/** Below `lg`, mount-based entrances become scroll reveals. */
export function resolveLandingRevealTrigger(
  desktopTrigger: "scroll" | "mount",
  isLgViewport: boolean,
): "scroll" | "mount" {
  if (desktopTrigger === "mount" && !isLgViewport) return "scroll"
  return desktopTrigger
}

function subscribeLandingLg(onStoreChange: () => void) {
  const mq = window.matchMedia(LANDING_LG_MEDIA)
  mq.addEventListener("change", onStoreChange)
  return () => mq.removeEventListener("change", onStoreChange)
}

function getLandingLgSnapshot() {
  return window.matchMedia(LANDING_LG_MEDIA).matches
}

function getLandingLgServerSnapshot() {
  return false
}

export function useLandingLgViewport(): boolean {
  return useSyncExternalStore(
    subscribeLandingLg,
    getLandingLgSnapshot,
    getLandingLgServerSnapshot,
  )
}
