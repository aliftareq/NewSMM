/** Shared hero mount / scroll entrance (left column, visual, navbar on lg+). */
export const HERO_ENTRANCE = {
  trigger: "mount" as const,
  distance: 100,
  duration: 1.35,
  ease: "power3.out",
  threshold: 0.1,
  delay: 0,
  stagger: 0,
} as const

/** Blue panel + fold text (after column entrance completes). */
export const HERO_PANEL_OPEN_DURATION_S = 1.25
export const HERO_PANEL_OPEN_EASE = [0.22, 1, 0.36, 1] as const
