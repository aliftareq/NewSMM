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

type WhoItsForCardsStageProps = {
  audiencesLeft: WhoItsForAudience[]
  audiencesRight: WhoItsForAudience[]
  dividerSrc: string
  stepperSrc: string
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
  const stepperRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const spreadTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const hasPlayedRef = useRef(false)

  const [stepperRevealed, setStepperRevealed] = useState(false)
  const [logomarkSplitReveal, setLogomarkSplitReveal] = useState(false)

  useLayoutEffect(() => {
    const root = rootRef.current
    const stepper = stepperRef.current
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]
    if (!root || cards.length === 0) return undefined

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

    gsap.set(cards, { clearProps: "transform,zIndex" })
    if (stepper) {
      gsap.set(stepper, { opacity: 0, scale: 0.72, transformOrigin: "50% 50%" })
    }

    const ctx = gsap.context(() => {
      const runSequence = () => {
        if (hasPlayedRef.current) return
        hasPlayedRef.current = true

        spreadTimelineRef.current?.kill()
        gsap.killTweensOf(cards)
        if (stepper) gsap.killTweensOf(stepper)

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

        const offsets = cards.map((el) => {
          const rect = el.getBoundingClientRect()
          const cardCenterX = rect.left + rect.width / 2 - rootRect.left
          const cardCenterY = rect.top + rect.height / 2 - rootRect.top
          return {
            x: originX - cardCenterX,
            y: originY - cardCenterY,
          }
        })

        gsap.set(cards, {
          x: (i) => offsets[i]?.x ?? 0,
          y: (i) => offsets[i]?.y ?? 0,
          opacity: 0,
          zIndex: (i) => 20 + i,
          force3D: true,
        })

        setStepperRevealed(true)

        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(cards, { clearProps: "transform,zIndex,opacity" })
            if (stepper) {
              gsap.set(stepper, { clearProps: "transform,opacity" })
            }
            spreadTimelineRef.current = null
          },
        })

        spreadTimelineRef.current = tl

        if (stepper) {
          tl.fromTo(
            stepper,
            { opacity: 0, scale: 0.72, transformOrigin: "50% 50%" },
            {
              opacity: 1,
              scale: 1,
              duration: 0.75,
              ease: "power2.out",
            },
          )
        }

        tl.call(() => setLogomarkSplitReveal(true))

        const spreadToSlot = {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power2.inOut",
        }

        tl.to([cards[0], cards[3]], spreadToSlot, "+=0.3")
        tl.to([cards[1], cards[2]], spreadToSlot, "<")
      }

      const trigger = ScrollTrigger.create({
        trigger: root,
        start: "top 82%",
        once: true,
        onEnter: () => {
          requestAnimationFrame(runSequence)
        },
      })

      ScrollTrigger.refresh()

      if (trigger.isActive) {
        requestAnimationFrame(runSequence)
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
