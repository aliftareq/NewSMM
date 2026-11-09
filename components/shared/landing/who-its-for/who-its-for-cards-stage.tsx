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
const PIN_SCROLL_VH = 2.85
const LOGOMARK_SPLIT_PROGRESS = 0.44
const STEPPER_REVEAL_PROGRESS = 0.05

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

    const root = rootRef.current
    const stageRow = stageRowRef.current
    const stepper = stepperRef.current
    const pinTarget = pinTargetRef?.current
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]
    if (!root || !stageRow || !pinTarget || cards.length === 0) return undefined

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
      return undefined
    }

    const syncRevealState = (progress: number) => {
      setStepperRevealed(progress >= STEPPER_REVEAL_PROGRESS)
      setLogomarkSplitReveal(progress >= LOGOMARK_SPLIT_PROGRESS)
    }

    const buildTimeline = () => {
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
            duration: 1.2,
            ease: "power2.inOut",
          },
          0.15,
        )
        tl.to(
          bottomClip,
          {
            attr: {
              y: WHO_ITS_FOR_STEPPER_CENTER_Y,
              height: WHO_ITS_FOR_STEPPER_LINE_SEGMENT_HEIGHT,
            },
            duration: 1.2,
            ease: "power2.inOut",
          },
          0.15,
        )
      }

      const spreadToSlot = {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 2.05,
        ease: "power2.inOut",
      }

      tl.to([cards[0], cards[3]], spreadToSlot, 0.58)
      tl.to([cards[1], cards[2]], spreadToSlot, 0.88)

      scrollTimelineRef.current = tl
      return tl
    }

    const ctx = gsap.context(() => {
      const timeline = buildTimeline()

      ScrollTrigger.create({
        trigger: stageRow,
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

    return () => {
      scrollTimelineRef.current?.kill()
      scrollTimelineRef.current = null
      ctx.revert()
    }
  }, [audiencesLeft, audiencesRight, isDesktop, pinTargetRef])

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
