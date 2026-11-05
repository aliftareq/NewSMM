"use client"

import { useEffect, useState } from "react"

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

export function useLandingLgViewport(): boolean {
  const [isLg, setIsLg] = useState(readLandingLgViewport)

  useEffect(() => {
    const mq = window.matchMedia(LANDING_LG_MEDIA)
    const update = () => setIsLg(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  return isLg
}
