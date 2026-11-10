"use client"

import {
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { AnimatedContent } from "@/components/shared/animated-content"
import { WhoItsForAudienceCard } from "@/components/shared/landing/who-its-for/who-its-for-audience-card"
import { WhoItsForCenterStepper } from "@/components/shared/landing/who-its-for/who-its-for-center-stepper"
import { WHO_ITS_FOR_CENTER_LOGOMARK } from "@/components/shared/landing/brand-logomark-split"
import {
  WHO_ITS_FOR_STEPPER_BOTTOM_CIRCLE_Y,
  WHO_ITS_FOR_STEPPER_CENTER_Y,
  WHO_ITS_FOR_STEPPER_LINE_SEGMENT_HEIGHT,
  WHO_ITS_FOR_STEPPER_TOP_CIRCLE_Y,
} from "@/components/shared/landing/who-its-for/who-its-for-center-stepper-graphic"
import { landingScrollRevealProps } from "@/components/shared/landing/landing-section-heading-reveal"
import { useLandingLgViewport } from "@/lib/landing-animation-trigger"
import type { WhoItsForAudience } from "@/types/landing/who-its-for"

gsap.registerPlugin(ScrollTrigger)

const SCROLL_SCRUB_SMOOTHING = 1.35
const STEPPER_REVEAL_PROGRESS = 0.05

const CENTER_LINE_START = 0.15
const CENTER_LINE_DURATION = 1.75
const CENTER_LINE_END = CENTER_LINE_START + CENTER_LINE_DURATION
const LOGOMARK_SPLIT_START = CENTER_LINE_END + 0.05
const LOGOMARK_SPLIT_DURATION = 0.62
const LOGOMARK_SPLIT_END = LOGOMARK_SPLIT_START + LOGOMARK_SPLIT_DURATION
const CENTER_REVEAL_BEAT = CENTER_LINE_DURATION + LOGOMARK_SPLIT_DURATION
const CARDS_SPREAD_START = LOGOMARK_SPLIT_END + 0.08
/** Scroll-scrubbed travel from center — keep slower than the stepper line draw. */
const CARDS_SPREAD_DURATION = CENTER_REVEAL_BEAT * 2.2
const CARDS_PAIR_STAGGER = CENTER_LINE_DURATION * 0.45
const CARDS_SPREAD_END = CARDS_SPREAD_START + CARDS_PAIR_STAGGER + CARDS_SPREAD_DURATION
/** Extra scrub after cards land before unpinning (empty timeline segment). */
const PIN_HOLD_AFTER_CARDS = CENTER_REVEAL_BEAT * 1.15
const PIN_SCROLL_VH = 3.35

const LENIS_SCROLL_ROOT =
  typeof document !== "undefined" ? document.documentElement : null

function isLenisScrollProxyReady() {
  if (typeof window === "undefined") return false
  return Boolean((window as Window & { lenis?: { version?: string } }).lenis?.version)
}

type WhoItsForCardsStageProps = {
  audiencesLeft: WhoItsForAudience[]
  audiencesRight: WhoItsForAudience[]
  dividerSrc: string
  pinTargetRef?: RefObject<HTMLDivElement | null>
}

function setCardRef(
  refs: RefObject<(HTMLDivElement | null)[]>,
  index: number,
  node: HTMLDivElement | null,
) {
  refs.current[index] = node
}

type WhoItsForCardSlotProps = {
  audience: WhoItsForAudience
  dividerSrc: string
  isDesktop: boolean
  cardIndex: number
  setCardRef: typeof setCardRef
  cardRefs: RefObject<(HTMLDivElement | null)[]>
}

function WhoItsForCardSlot({
  audience,
  dividerSrc,
  isDesktop,
  cardIndex,
  setCardRef: assignRef,
  cardRefs,
}: WhoItsForCardSlotProps) {
  const card = (
    <WhoItsForAudienceCard audience={audience} dividerSrc={dividerSrc} />
  )

  if (!isDesktop) {
    return (
      <AnimatedContent
        className="w-full min-w-0"
        {...landingScrollRevealProps}
        stagger={0}
      >
        {card}
      </AnimatedContent>
    )
  }

  return (
    <div
      ref={(node) => assignRef(cardRefs, cardIndex, node)}
      className="will-change-transform"
    >
      {card}
    </div>
  )
}

function getStepperLineClips(stepper: HTMLDivElement | null) {
  if (!stepper) return { topClip: null, bottomClip: null }
  return {
    topClip: stepper.querySelector(
      '[data-slot="who-its-for-stepper-line-top-clip"]',
    ) as SVGRectElement | null,
    bottomClip: stepper.querySelector(
      '[data-slot="who-its-for-stepper-line-bottom-clip"]',
    ) as SVGRectElement | null,
  }
}

function setStepperLinesHidden(topClip: SVGRectElement | null, bottomClip: SVGRectElement | null) {
  if (topClip) {
    gsap.set(topClip, {
      attr: { y: WHO_ITS_FOR_STEPPER_TOP_CIRCLE_Y, height: 0 },
    })
  }
  if (bottomClip) {
    gsap.set(bottomClip, {
      attr: { y: WHO_ITS_FOR_STEPPER_BOTTOM_CIRCLE_Y, height: 0 },
    })
  }
}

function setStepperLinesRevealed(topClip: SVGRectElement | null, bottomClip: SVGRectElement | null) {
  if (topClip) {
    gsap.set(topClip, {
      attr: {
        y: WHO_ITS_FOR_STEPPER_TOP_CIRCLE_Y,
        height: WHO_ITS_FOR_STEPPER_LINE_SEGMENT_HEIGHT,
      },
    })
  }
  if (bottomClip) {
    gsap.set(bottomClip, {
      attr: {
        y: WHO_ITS_FOR_STEPPER_CENTER_Y,
        height: WHO_ITS_FOR_STEPPER_LINE_SEGMENT_HEIGHT,
      },
    })
  }
}

function getCenterLogomarkPaths(stepper: HTMLDivElement | null) {
  const anchor = stepper?.querySelector(
    '[data-slot="who-its-for-logomark-anchor"]',
  )
  const paths = anchor?.querySelectorAll("svg path")
  if (!paths || paths.length < 2) {
    return { top: null as SVGPathElement | null, bottom: null as SVGPathElement | null }
  }
  return {
    top: paths[0] as SVGPathElement,
    bottom: paths[1] as SVGPathElement,
  }
}

function computeCardSpreadOffsets(
  root: HTMLDivElement,
  stepper: HTMLDivElement | null,
  cards: HTMLDivElement[],
) {
  const rootRect = root.getBoundingClientRect()
  const anchor = stepper?.querySelector(
    '[data-slot="who-its-for-logomark-anchor"]',
  ) as HTMLElement | null

  let originX = rootRect.width / 2
  let originY = rootRect.height / 2
  if (anchor) {
    const anchorRect = anchor.getBoundingClientRect()
    if (anchorRect.width > 0 && anchorRect.height > 0) {
      originX = anchorRect.left + anchorRect.width / 2 - rootRect.left
      originY = anchorRect.top + anchorRect.height / 2 - rootRect.top
    }
  }

  return cards.map((el) => {
    const rect = el.getBoundingClientRect()
    const cardCenterX = rect.left + rect.width / 2 - rootRect.left
    const cardCenterY = rect.top + rect.height / 2 - rootRect.top
    return {
      x: originX - cardCenterX,
      y: originY - cardCenterY,
    }
  })
}

export function WhoItsForCardsStage({
  audiencesLeft,
  audiencesRight,
  dividerSrc,
  pinTargetRef,
}: WhoItsForCardsStageProps) {
  const isDesktop = useLandingLgViewport()
  const rootRef = useRef<HTMLDivElement>(null)
  const stageRowRef = useRef<HTMLDivElement>(null)
  const stepperRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const scrollTimelineRef = useRef<gsap.core.Timeline | null>(null)

  const [stepperRevealed, setStepperRevealed] = useState(false)
  const [logomarkSplitReveal, setLogomarkSplitReveal] = useState(false)

  const expectedCardCount = audiencesLeft.length + audiencesRight.length

  useLayoutEffect(() => {
    if (!isDesktop) {
      scrollTimelineRef.current?.kill()
      scrollTimelineRef.current = null
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]
      gsap.set(cards, { clearProps: "transform,zIndex,opacity" })
      setStepperRevealed(false)
      setLogomarkSplitReveal(false)
      return undefined
    }

    let cancelled = false
    let mountRaf = 0
    let gsapCtx: gsap.Context | null = null
    let mountAttempts = 0
    let scrollPinMounted = false

    const syncRevealState = (progress: number) => {
      setStepperRevealed(progress >= STEPPER_REVEAL_PROGRESS)
      const timeline = scrollTimelineRef.current
      const timelineProgress = timeline
        ? progress * (timeline.duration() || 1)
        : 0
      setLogomarkSplitReveal(timelineProgress >= LOGOMARK_SPLIT_END - 0.02)
    }

    const buildTimeline = (
      root: HTMLDivElement,
      stepper: HTMLDivElement | null,
      cards: HTMLDivElement[],
    ) => {
      scrollTimelineRef.current?.kill()
      scrollTimelineRef.current = null

      const offsets = computeCardSpreadOffsets(root, stepper, cards)
      const { topClip, bottomClip } = getStepperLineClips(stepper ?? null)

      setStepperLinesHidden(topClip, bottomClip)

      gsap.set(cards, {
        x: (i) => offsets[i]?.x ?? 0,
        y: (i) => offsets[i]?.y ?? 0,
        opacity: 0,
        zIndex: (i) => 20 + i,
        force3D: true,
      })

      if (stepper) {
        gsap.set(stepper, {
          opacity: 0,
          scale: 0.72,
          transformOrigin: "50% 50%",
        })
      }

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
      })

      if (stepper) {
        tl.to(
          stepper,
          {
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: "power2.out",
          },
          0,
        )
      }

      if (topClip && bottomClip) {
        tl.to(
          topClip,
          {
            attr: { height: WHO_ITS_FOR_STEPPER_LINE_SEGMENT_HEIGHT },
            duration: CENTER_LINE_DURATION,
            ease: "power1.inOut",
          },
          CENTER_LINE_START,
        )
        tl.to(
          bottomClip,
          {
            attr: {
              y: WHO_ITS_FOR_STEPPER_CENTER_Y,
              height: WHO_ITS_FOR_STEPPER_LINE_SEGMENT_HEIGHT,
            },
            duration: CENTER_LINE_DURATION,
            ease: "power1.inOut",
          },
          CENTER_LINE_START,
        )
      }

      const { top: logomarkTop, bottom: logomarkBottom } =
        getCenterLogomarkPaths(stepper ?? null)
      if (logomarkTop && logomarkBottom) {
        const { stackTopY, stackBottomY } = WHO_ITS_FOR_CENTER_LOGOMARK
        gsap.set([logomarkTop, logomarkBottom], {
          transformOrigin: "50% 50%",
          transformBox: "fill-box",
          force3D: true,
        })
        gsap.set(logomarkTop, { y: stackTopY })
        gsap.set(logomarkBottom, { y: stackBottomY })
        tl.to(
          logomarkTop,
          {
            y: 0,
            duration: LOGOMARK_SPLIT_DURATION,
            ease: "power3.out",
          },
          LOGOMARK_SPLIT_START,
        )
        tl.to(
          logomarkBottom,
          {
            y: 0,
            duration: LOGOMARK_SPLIT_DURATION,
            ease: "power3.out",
          },
          LOGOMARK_SPLIT_START + 0.04,
        )
      }

      const spreadToSlot = {
        x: 0,
        y: 0,
        opacity: 1,
        duration: CARDS_SPREAD_DURATION,
        ease: "power1.inOut",
      }

      tl.to([cards[0], cards[3]], spreadToSlot, CARDS_SPREAD_START)
      tl.to([cards[1], cards[2]], spreadToSlot, CARDS_SPREAD_START + CARDS_PAIR_STAGGER)

      tl.addLabel("cardsSettled", CARDS_SPREAD_END)
      tl.to({}, { duration: PIN_HOLD_AFTER_CARDS }, "cardsSettled")

      scrollTimelineRef.current = tl
      return tl
    }

    const mountScrollPin = () => {
      if (cancelled || scrollPinMounted) return

      const root = rootRef.current
      const stageRow = stageRowRef.current
      const stepper = stepperRef.current
      const pinTarget = pinTargetRef?.current
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]

      const domReady =
        Boolean(root) &&
        Boolean(stageRow) &&
        Boolean(pinTarget) &&
        cards.length >= expectedCardCount

      if (!domReady || !isLenisScrollProxyReady()) {
        mountAttempts += 1
        if (mountAttempts < 180) {
          mountRaf = requestAnimationFrame(mountScrollPin)
        }
        return
      }

      setStepperRevealed(false)
      setLogomarkSplitReveal(false)

      const reduce =
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false

      if (reduce) {
        setStepperRevealed(true)
        setLogomarkSplitReveal(true)
        const { topClip, bottomClip } = getStepperLineClips(stepper)
        setStepperLinesRevealed(topClip, bottomClip)
        gsap.set(cards, { clearProps: "transform,zIndex,opacity" })
        if (stepper) gsap.set(stepper, { clearProps: "transform,opacity" })
        return
      }

      gsapCtx?.revert()
      gsapCtx = gsap.context(() => {
        const timeline = buildTimeline(root, stepper, cards)

        ScrollTrigger.create({
          trigger: stageRow,
          scroller: LENIS_SCROLL_ROOT ?? undefined,
          start: "center center",
          end: () => `+=${Math.round(window.innerHeight * PIN_SCROLL_VH)}`,
          pin: pinTarget,
          pinSpacing: true,
          scrub: SCROLL_SCRUB_SMOOTHING,
          animation: timeline,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => syncRevealState(self.progress),
          onLeave: () => {
            gsap.set(cards, { clearProps: "transform,zIndex,opacity" })
            if (stepper) {
              gsap.set(stepper, { clearProps: "transform,opacity" })
              const { top, bottom } = getCenterLogomarkPaths(stepper)
              if (top && bottom) {
                gsap.set([top, bottom], {
                  clearProps: "transform,transformOrigin,transformBox",
                })
              }
            }
            setStepperRevealed(true)
            setLogomarkSplitReveal(true)
          },
          onLeaveBack: () => {
            syncRevealState(0)
          },
        })

        ScrollTrigger.refresh()
      }, root)

      scrollPinMounted = true
    }

    const onLenisScrollReady = () => {
      if (!cancelled) mountScrollPin()
    }

    mountScrollPin()
    window.addEventListener("lenis-scroll-ready", onLenisScrollReady)

    return () => {
      cancelled = true
      cancelAnimationFrame(mountRaf)
      window.removeEventListener("lenis-scroll-ready", onLenisScrollReady)
      scrollTimelineRef.current?.kill()
      scrollTimelineRef.current = null
      gsapCtx?.revert()
      gsapCtx = null
    }
  }, [
    audiencesLeft,
    audiencesRight,
    expectedCardCount,
    isDesktop,
    pinTargetRef,
  ])

  return (
    <div
      ref={rootRef}
      className="relative w-full max-w-[1320px]"
      data-slot="who-its-for-cards-stage"
    >
      <div
        ref={stageRowRef}
        className="relative flex w-full flex-col gap-5 lg:flex-row lg:items-stretch lg:justify-between"
      >
        <div className="relative z-10 flex flex-1 flex-col gap-5 lg:max-w-[582px]">
          {audiencesLeft.map((audience, index) => (
            <WhoItsForCardSlot
              key={audience.id}
              audience={audience}
              dividerSrc={dividerSrc}
              isDesktop={isDesktop}
              cardIndex={index}
              setCardRef={setCardRef}
              cardRefs={cardRefs}
            />
          ))}
        </div>

        <WhoItsForCenterStepper
          ref={stepperRef}
          revealed={stepperRevealed}
          logomarkSplitReveal={logomarkSplitReveal}
          logomarkScrollDriven
          className="z-0"
        />

        <div className="relative z-10 flex flex-1 flex-col gap-5 lg:max-w-[582px]">
          {audiencesRight.map((audience, index) => (
            <WhoItsForCardSlot
              key={audience.id}
              audience={audience}
              dividerSrc={dividerSrc}
              isDesktop={isDesktop}
              cardIndex={index + audiencesLeft.length}
              setCardRef={setCardRef}
              cardRefs={cardRefs}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
