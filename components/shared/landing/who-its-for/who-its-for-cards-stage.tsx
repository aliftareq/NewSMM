"use client"

import {
  useLayoutEffect,
  useRef,
  type RefObject,
} from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { WhoItsForAudienceCard } from "@/components/shared/landing/who-its-for/who-its-for-audience-card"
import { WhoItsForCenterStepper } from "@/components/shared/landing/who-its-for/who-its-for-center-stepper"
import type { WhoItsForAudience } from "@/types/landing/who-its-for"

gsap.registerPlugin(ScrollTrigger)

type WhoItsForCardsStageProps = {
  audiencesLeft: WhoItsForAudience[]
  audiencesRight: WhoItsForAudience[]
  dividerSrc: string
  stepperSrc: string
  logomarkSrc: string
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
  logomarkSrc,
}: WhoItsForCardsStageProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const stepperRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const spreadTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const hasPlayedRef = useRef(false)

  useLayoutEffect(() => {
    const root = rootRef.current
    const stepper = stepperRef.current
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]
    if (!root || cards.length === 0) return undefined

    hasPlayedRef.current = false

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false

    if (reduce) {
      gsap.set(stepper, { opacity: 1, scale: 1, clearProps: "transform" })
      return undefined
    }

    gsap.set(stepper, {
      opacity: 0,
      scale: 0.72,
      transformOrigin: "50% 50%",
    })
    gsap.set(cards, { clearProps: "transform,zIndex" })

    const ctx = gsap.context(() => {
      const runSpread = () => {
        if (hasPlayedRef.current) return
        hasPlayedRef.current = true

        spreadTimelineRef.current?.kill()
        gsap.killTweensOf(cards)

        const rootRect = root.getBoundingClientRect()
        const centerX = rootRect.width / 2
        const centerY = rootRect.height / 2

        const offsets = cards.map((el, index) => {
          const rect = el.getBoundingClientRect()
          const cardCenterX = rect.left + rect.width / 2 - rootRect.left
          const cardCenterY = rect.top + rect.height / 2 - rootRect.top
          return {
            x: centerX - cardCenterX,
            y: centerY - cardCenterY + index * 6,
          }
        })

        gsap.set(stepper, { opacity: 0, scale: 0.72 })

        gsap.set(cards, {
          x: (i) => offsets[i]?.x ?? 0,
          y: (i) => offsets[i]?.y ?? 0,
          zIndex: (i) => 20 + i,
          force3D: true,
        })

        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(cards, { clearProps: "transform,zIndex" })
            gsap.to(stepper, {
              opacity: 1,
              scale: 1,
              duration: 0.55,
              ease: "back.out(1.4)",
              clearProps: "transform",
            })
            spreadTimelineRef.current = null
          },
        })

        spreadTimelineRef.current = tl

        tl.to(cards, {
          x: 0,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: { each: 0.09, from: "center" },
        })
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
      <div className="relative flex w-full flex-col gap-5 lg:flex-row lg:items-stretch lg:justify-between">
        <div className="relative z-10 flex flex-1 flex-col gap-5 lg:max-w-[582px]">
          {audiencesLeft.map((audience, index) => (
            <div
              key={audience.id}
              ref={(node) => setCardRef(cardRefs, index, node)}
              className="will-change-transform"
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
          logomarkSrc={logomarkSrc}
          className="z-0 opacity-0"
        />

        <div className="relative z-10 flex flex-1 flex-col gap-5 lg:max-w-[582px]">
          {audiencesRight.map((audience, index) => (
            <div
              key={audience.id}
              ref={(node) => setCardRef(cardRefs, index + audiencesLeft.length, node)}
              className="will-change-transform"
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
