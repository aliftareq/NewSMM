export const HOW_IT_WORKS_ENTER_DURATION_MS = 1400
/** Delay between each step column starting its rise (1 → 2 → 3). */
export const HOW_IT_WORKS_ENTER_INTERVAL_MS = 280
export const HOW_IT_WORKS_ENTER_EASING = "cubic-bezier(0.33, 1, 0.68, 1)"
export const HOW_IT_WORKS_VIEWPORT_BOTTOM_GAP_PX = 32

export function clearHowItWorksItemMotionStyles(items: HTMLElement[]) {
  for (const el of items) {
    el.style.transition = ""
    el.style.transform = ""
    el.style.opacity = ""
  }
}

export function playHowItWorksEnterAnimation(
  items: HTMLElement[],
  onComplete: () => void,
  onScheduledComplete?: (timeoutId: number) => void,
) {
  for (const el of items) {
    const rect = el.getBoundingClientRect()
    const startTranslateY =
      window.innerHeight - rect.top + HOW_IT_WORKS_VIEWPORT_BOTTOM_GAP_PX

    el.style.transform = `translate3d(0, ${startTranslateY}px, 0)`
    el.style.opacity = "0"
    el.style.transition = "none"
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      items.forEach((el, index) => {
        const delayMs = index * HOW_IT_WORKS_ENTER_INTERVAL_MS
        el.style.transition = [
          `transform ${HOW_IT_WORKS_ENTER_DURATION_MS}ms ${HOW_IT_WORKS_ENTER_EASING} ${delayMs}ms`,
          `opacity 600ms ease-out ${delayMs}ms`,
        ].join(", ")
        el.style.transform = "translate3d(0, 0, 0)"
        el.style.opacity = "1"
      })

      const lastDelay = (items.length - 1) * HOW_IT_WORKS_ENTER_INTERVAL_MS
      const completeTimeoutId = window.setTimeout(
        onComplete,
        lastDelay + HOW_IT_WORKS_ENTER_DURATION_MS,
      )
      onScheduledComplete?.(completeTimeoutId)
    })
  })
}
