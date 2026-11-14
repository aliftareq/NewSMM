"use client"

import {
  useLayoutEffect,
  useState,
  type RefObject,
} from "react"

/** Space reserved below/above the dialog (viewport margin + shell padding). */
const MODAL_VIEWPORT_INSET_PX = 96

export function useDashboardModalViewportScale(
  contentRef: RefObject<HTMLDivElement | null>,
  open: boolean,
) {
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    if (!open) {
      setScale(1)
      return
    }

    const measure = () => {
      const el = contentRef.current
      if (!el) return
      const naturalHeight = el.offsetHeight
      if (naturalHeight <= 0) return
      const available = window.innerHeight - MODAL_VIEWPORT_INSET_PX
      const next = Math.min(1, available / naturalHeight)
      setScale((current) =>
        Math.abs(current - next) < 0.002 ? current : next,
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
  }, [contentRef, open])

  return scale
}