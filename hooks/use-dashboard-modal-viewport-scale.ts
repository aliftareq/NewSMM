"use client"

import {
  useLayoutEffect,
  useState,
  type RefObject,
} from "react"

/** Viewport margin around the centered dialog */
const MODAL_VIEWPORT_MARGIN_PX = 48
/** Dialog vertical chrome (padding + close control clearance) */
const MODAL_SHELL_VERTICAL_CHROME_PX = 88

export type DashboardModalViewportScale = {
  scale: number
  scaledHeight: number
}

export function useDashboardModalViewportScale(
  contentRef: RefObject<HTMLDivElement | null>,
  open: boolean,
  extraViewportInsetPx = 0,
): DashboardModalViewportScale {
  const [state, setState] = useState<DashboardModalViewportScale>({
    scale: 1,
    scaledHeight: 0,
  })

  useLayoutEffect(() => {
    if (!open) {
      setState({ scale: 1, scaledHeight: 0 })
      return
    }

    const measure = () => {
      const el = contentRef.current
      if (!el) return
      const naturalHeight = el.offsetHeight
      if (naturalHeight <= 0) return

      const available =
        window.innerHeight -
        MODAL_VIEWPORT_MARGIN_PX * 2 -
        MODAL_SHELL_VERTICAL_CHROME_PX -
        extraViewportInsetPx

      const next = Math.min(1, available / naturalHeight)
      const scaledHeight = Math.ceil(naturalHeight * next)

      setState((current) =>
        Math.abs(current.scale - next) < 0.002 &&
        current.scaledHeight === scaledHeight
          ? current
          : { scale: next, scaledHeight },
      )
    }

    measure()
    const raf = window.requestAnimationFrame(measure)
    window.addEventListener("resize", measure)
    const observer = new ResizeObserver(measure)
    if (contentRef.current) observer.observe(contentRef.current)

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener("resize", measure)
      observer.disconnect()
    }
  }, [contentRef, extraViewportInsetPx, open])

  return state
}