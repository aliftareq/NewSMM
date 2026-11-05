"use client"

import {
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { WhoItsForAudienceCard } from "@/components/shared/landing/who-its-for/who-its-for-audience-card"
import { WhoItsForCenterStepper } from "@/components/shared/landing/who-its-for/who-its-for-center-stepper"
import type { WhoItsForAudience } from "@/types/landing/who-its-for"

gsap.registerPlugin(ScrollTrigger)

const SPREAD_DURATION = 1
const SPREAD_EASE = "power3.out"

type WhoItsForCardsStageProps = {
  audiencesLeft: WhoItsForAudience[]
  audiencesRight: WhoItsForAudience[]
  dividerSrc: string
  stepperSrc: string
}

type CardSlotMetrics = {
  left: number
  top: number
  width: number
  height: number
}

function setCardRef(
  refs: RefObject<(HTMLDivElement | null)[]>,
  index: number,
  node: HTMLDivElement | null,
) {
  refs.current[index] = node
}

export function WhoItsForCardsStage({
  audiencesLeft,
  audiencesRight,
  dividerSrc,
  stepperSrc,
}: WhoItsForCardsStageProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const layoutRef = useRef<HTMLDivElement>(null)
  const stepperRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const spreadTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const hasPlayedRef = useRef(false)

  const [stepperRevealed, setStepperRevealed] = useState(false)
  const [logomarkSplitReveal, setLogomarkSplitReveal] = useState(false)

  useLayoutEffect(() => {
    const root = rootRef.current
    const layout = layoutRef.current
    const stepper = stepperRef.current
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]
    if (!root || !layout || cards.length === 0) return undefined

    hasPlayedRef.current = false
    setStepperRevealed(false)
    setLogomarkSplitReveal(false)

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false

    if (reduce) {
      setStepperRevealed(true)
      setLogomarkSplitReveal(true)
      return undefined
    }

    gsap.set(cards, { clearProps: "all" })
    gsap.set(layout, { clearProps: "minHeight" })
    if (stepper) {
      gsap.set(stepper, { opacity: 0, scale: 0.72, transformOrigin: "50% 50%" })
    }

    const revealStepper = () => {
      setStepperRevealed(true)
      if (!stepper) {
        setLogomarkSplitReveal(true)
        return
      }
      gsap.fromTo(
        stepper,
        { opacity: 0, scale: 0.72, transformOrigin: "50% 50%" },
        {
          opacity: 1,
          scale: 1,
          duration: 0.55,
          ease: "back.out(1.4)",
          clearProps: "transform,opacity",
          onComplete: () => setLogomarkSplitReveal(true),
        },
      )
    }

    const ctx = gsap.context(() => {
      const measureSlots = (): CardSlotMetrics[] => {
        const layoutRect = layout.getBoundingClientRect()
        return cards.map((el) => {
          const rect = el.getBoundingClientRect()
          return {
            left: rect.left - layoutRect.left,
            top: rect.top - layoutRect.top,
            width: rect.width,
            height: rect.height,
          }
        })
      }

      const stackCards = (slots: CardSlotMetrics[]) => {
        const layoutWidth = layout.offsetWidth
        const layoutHeight = layout.offsetHeight
        const centerX = layoutWidth / 2
        const centerY = layoutHeight / 2
        const maxW = Math.max(...slots.map((s) => s.width))
        const maxH = Math.max(...slots.map((s) => s.height))
        const stackLeft = centerX - maxW / 2
        const stackTop = centerY - maxH / 2

        gsap.set(layout, {
          position: "relative",
          minHeight: layoutHeight,
        })

        cards.forEach((el, i) => {
          gsap.set(el, {
            position: "absolute",
            left: stackLeft + (maxW - slots[i].width) / 2,
            top: stackTop + (maxH - slots[i].height) / 2,
            width: slots[i].width,
            margin: 0,
            zIndex: 20 + i,
            x: 0,
            y: 0,
            scale: 0.96,
            opacity: 0.92,
            force3D: true,
          })
        })

        return slots
      }

      const runSpread = () => {
        if (hasPlayedRef.current) return
        hasPlayedRef.current = true

        spreadTimelineRef.current?.kill()
        gsap.killTweensOf(cards)

        const slots = measureSlots()
        stackCards(slots)

        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(cards, { clearProps: "all" })
            gsap.set(layout, { clearProps: "minHeight,position" })
            revealStepper()
            spreadTimelineRef.current = null
          },
        })

        spreadTimelineRef.current = tl

        tl.to(
          cards,
          {
            left: (i) => slots[i]?.left ?? 0,
            top: (i) => slots[i]?.top ?? 0,
            scale: 1,
            opacity: 1,
            duration: SPREAD_DURATION,
            ease: SPREAD_EASE,
            overwrite: "auto",
          },
          0,
        )
      }

      const trigger = ScrollTrigger.create({
        trigger: root,
        start: "top 82%",
        once: true,
        onEnter: () => {
          requestAnimationFrame(runSpread)
        },
      })

      ScrollTrigger.refresh()

      if (trigger.isActive) {
        requestAnimationFrame(runSpread)
      }
    }, root)

    return () => {
      spreadTimelineRef.current?.kill()
      ctx.revert()
    }
  }, [audiencesLeft, audiencesRight])

  return (
    <div
      ref={rootRef}
      className="relative w-full max-w-[1320px]"
      data-slot="who-its-for-cards-stage"
    >
      <div
        ref={layoutRef}
        className="relative flex w-full flex-col gap-5 lg:flex-row lg:items-stretch lg:justify-between"
      >
        <div className="relative z-10 flex flex-1 flex-col gap-5 lg:max-w-[582px]">
          {audiencesLeft.map((audience, index) => (
            <div
              key={audience.id}
              ref={(node) => setCardRef(cardRefs, index, node)}
              className="will-change-[left,top,transform,opacity]"
            >
              <WhoItsForAudienceCard
                audience={audience}
                dividerSrc={dividerSrc}
              />
            </div>
          ))}
        </div>

        <WhoItsForCenterStepper
          ref={stepperRef}
          stepperSrc={stepperSrc}
          revealed={stepperRevealed}
          logomarkSplitReveal={logomarkSplitReveal}
          className="z-0"
        />

        <div className="relative z-10 flex flex-1 flex-col gap-5 lg:max-w-[582px]">
          {audiencesRight.map((audience, index) => (
            <div
              key={audience.id}
              ref={(node) =>
                setCardRef(cardRefs, index + audiencesLeft.length, node)
              }
              className="will-change-[left,top,transform,opacity]"
            >
              <WhoItsForAudienceCard
                audience={audience}
                dividerSrc={dividerSrc}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
