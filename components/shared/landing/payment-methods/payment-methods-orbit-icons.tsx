"use client"

import Image from "next/image"
import { useLayoutEffect, useRef } from "react"

const PAYMENT_ICON_BASE = "/images/landing/payment-methods/icons"

/** Figma 1280×460 artboard — 100×100 circular badge display size. */
const PAYMENT_ORBIT_ICONS = [
  { id: "paypal", src: `${PAYMENT_ICON_BASE}/paypal-badge.png`, baseAngle: 180 },
  {
    id: "gpay",
    src: `${PAYMENT_ICON_BASE}/google-pay-badge.png`,
    baseAngle: 151.85,
  },
  {
    id: "binance",
    src: `${PAYMENT_ICON_BASE}/binance-badge.png`,
    baseAngle: 119.6,
  },
  { id: "visa", src: `${PAYMENT_ICON_BASE}/visa-badge.png`, baseAngle: 90 },
  {
    id: "mastercard",
    src: `${PAYMENT_ICON_BASE}/mastercard-badge.png`,
    baseAngle: 60.4,
  },
  {
    id: "box",
    src: `${PAYMENT_ICON_BASE}/payment-gateway-badge.png`,
    baseAngle: 28.15,
  },
  {
    id: "applepay",
    src: `${PAYMENT_ICON_BASE}/apple-pay-badge.png`,
    baseAngle: 0,
  },
] as const

type PaymentIconId = (typeof PAYMENT_ORBIT_ICONS)[number]["id"]

const ENTRY_ORDER: readonly PaymentIconId[] = [
  "paypal",
  "gpay",
  "binance",
  "visa",
  "mastercard",
  "box",
  "applepay",
]

const EXIT_ORDER: readonly PaymentIconId[] = [
  "applepay",
  "box",
  "mastercard",
  "visa",
  "binance",
  "gpay",
  "paypal",
]

const REF_WIDTH = 1280
const REF_ICON = 100
const CX_RATIO = 0.5
const CY_RATIO = 0.9
const A_RATIO = 0.2266
const B_RATIO = 0.5065
const ENTER_BOTTOM_THETA = 270
const EXIT_BOTTOM_THETA = 270
const RISE_DURATION = 0.55
const RISE_STAGGER = 0.38
const HOLD_ON_ARC = 0.85
const IMMERSE_DURATION = 0.7
const IMMERSE_STAGGER = 0.38
const REPEAT_GAP = 0.2

type OrbitGeometry = {
  cx: number
  cy: number
  a: number
  b: number
  iconSize: number
}

type ThetaProxy = { theta: number }
type ArcProgress = { t: number }
type Gsap = typeof import("gsap").default
type GsapTimeline = ReturnType<Gsap["timeline"]>

function getGeometry(width: number, height: number): OrbitGeometry {
  return {
    cx: width * CX_RATIO,
    cy: height * CY_RATIO,
    a: width * A_RATIO,
    b: height * B_RATIO,
    iconSize: width * (REF_ICON / REF_WIDTH),
  }
}

function iconIndex(id: PaymentIconId) {
  return PAYMENT_ORBIT_ICONS.findIndex((icon) => icon.id === id)
}

function applyThetaToElement(
  gsap: Gsap,
  el: HTMLDivElement,
  thetaDeg: number,
  geometry: OrbitGeometry,
) {
  const normalized = ((thetaDeg % 360) + 360) % 360
  const theta = (normalized * Math.PI) / 180
  gsap.set(el, {
    left: geometry.cx + geometry.a * Math.cos(theta),
    top: geometry.cy - geometry.b * Math.sin(theta),
  })
}

function interpolateArc(
  fromTheta: number,
  toTheta: number,
  progress: number,
  direction: "decrease" | "increase",
) {
  const delta = toTheta - fromTheta
  if (direction === "decrease") {
    if (delta <= 0) {
      return fromTheta + delta * progress
    }
    return fromTheta - (360 - delta) * progress
  }

  if (delta >= 0) {
    return fromTheta + delta * progress
  }
  return fromTheta + (360 + delta) * progress
}

function tweenEnterAlongArc(
  gsap: Gsap,
  timeline: GsapTimeline,
  el: HTMLDivElement,
  proxy: ThetaProxy,
  baseAngle: number,
  geometry: OrbitGeometry,
  position: string | number,
) {
  const startTheta = ENTER_BOTTOM_THETA
  const endTheta = baseAngle
  const progress: ArcProgress = { t: 0 }

  proxy.theta = startTheta
  applyThetaToElement(gsap, el, startTheta, geometry)

  timeline.fromTo(
    progress,
    { t: 0 },
    {
      t: 1,
      duration: RISE_DURATION,
      ease: "power2.out",
      immediateRender: false,
      onStart: () => {
        gsap.set(el, { opacity: 1 })
      },
      onUpdate: () => {
        const theta = interpolateArc(
          startTheta,
          endTheta,
          progress.t,
          "decrease",
        )
        proxy.theta = theta
        applyThetaToElement(gsap, el, theta, geometry)
      },
    },
    position,
  )
}

function tweenExitAlongArc(
  gsap: Gsap,
  timeline: GsapTimeline,
  el: HTMLDivElement,
  proxy: ThetaProxy,
  baseAngle: number,
  geometry: OrbitGeometry,
  position: string | number,
) {
  const startTheta = baseAngle
  const endTheta = EXIT_BOTTOM_THETA
  const progress: ArcProgress = { t: 0 }

  proxy.theta = startTheta
  applyThetaToElement(gsap, el, startTheta, geometry)

  timeline.fromTo(
    progress,
    { t: 0 },
    {
      t: 1,
      duration: IMMERSE_DURATION,
      ease: "power2.in",
      immediateRender: false,
      onUpdate: () => {
        const theta = interpolateArc(
          startTheta,
          endTheta,
          progress.t,
          "decrease",
        )
        proxy.theta = theta
        applyThetaToElement(gsap, el, theta, geometry)
      },
      onComplete: () => {
        gsap.set(el, { opacity: 0 })
      },
    },
    position,
  )
}

export function PaymentMethodsOrbitIcons() {
  const containerRef = useRef<HTMLDivElement>(null)
  const iconRefs = useRef<(HTMLDivElement | null)[]>([])
  const timelineRef = useRef<GsapTimeline | null>(null)

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    let disposed = false
    let resizeObserver: ResizeObserver | null = null

    const runWithGsap = async () => {
      const { default: gsap } = await import("gsap")
      if (disposed) return

      const getElements = () =>
        iconRefs.current.filter((el): el is HTMLDivElement => el != null)

      const applyIconSize = (geometry: OrbitGeometry) => {
        getElements().forEach((el) => {
          el.style.width = `${geometry.iconSize}px`
          el.style.height = `${geometry.iconSize}px`
        })
      }

      const buildTimeline = (geometry: OrbitGeometry) => {
        timelineRef.current?.kill()

        const elements = getElements()
        if (elements.length !== PAYMENT_ORBIT_ICONS.length) return

        const thetaProxies: ThetaProxy[] = PAYMENT_ORBIT_ICONS.map(() => ({
          theta: ENTER_BOTTOM_THETA,
        }))

        applyIconSize(geometry)

        const resetToBottom = () => {
          PAYMENT_ORBIT_ICONS.forEach((icon, index) => {
            const el = iconRefs.current[index]
            if (!el) return
            thetaProxies[index].theta = ENTER_BOTTOM_THETA
            applyThetaToElement(gsap, el, ENTER_BOTTOM_THETA, geometry)
            gsap.set(el, { opacity: 0 })
          })
        }

        const placeAllAtRest = () => {
          PAYMENT_ORBIT_ICONS.forEach((icon, index) => {
            const el = iconRefs.current[index]
            if (!el) return
            thetaProxies[index].theta = icon.baseAngle
            applyThetaToElement(gsap, el, icon.baseAngle, geometry)
            gsap.set(el, { opacity: 1 })
          })
        }

        resetToBottom()

        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
        if (motionQuery.matches) {
          placeAllAtRest()
          return
        }

        const timeline = gsap.timeline({
          repeat: -1,
          repeatDelay: REPEAT_GAP,
        })

        timeline.add(resetToBottom, 0)

        ENTRY_ORDER.forEach((id, orderIndex) => {
          const index = iconIndex(id)
          const icon = PAYMENT_ORBIT_ICONS[index]
          const el = iconRefs.current[index]
          const proxy = thetaProxies[index]
          if (!icon || !el || !proxy) return

          tweenEnterAlongArc(
            gsap,
            timeline,
            el,
            proxy,
            icon.baseAngle,
            geometry,
            orderIndex * RISE_STAGGER + 0.02,
          )
        })

        const staggerEnd =
          (ENTRY_ORDER.length - 1) * RISE_STAGGER + RISE_DURATION

        timeline.to({}, { duration: HOLD_ON_ARC }, staggerEnd)

        timeline.addLabel("exit", ">")

        EXIT_ORDER.forEach((id, orderIndex) => {
          const index = iconIndex(id)
          const icon = PAYMENT_ORBIT_ICONS[index]
          const el = iconRefs.current[index]
          const proxy = thetaProxies[index]
          if (!icon || !el || !proxy) return

          tweenExitAlongArc(
            gsap,
            timeline,
            el,
            proxy,
            icon.baseAngle,
            geometry,
            `exit+=${orderIndex * IMMERSE_STAGGER}`,
          )
        })

        timelineRef.current = timeline
      }

      const syncLayout = () => {
        const { width, height } = container.getBoundingClientRect()
        if (width <= 0 || height <= 0) return
        buildTimeline(getGeometry(width, height))
      }

      syncLayout()

      resizeObserver = new ResizeObserver(syncLayout)
      resizeObserver.observe(container)
    }

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        intersectionObserver.disconnect()
        void runWithGsap()
      },
      { rootMargin: "280px" },
    )

    intersectionObserver.observe(container)

    return () => {
      disposed = true
      intersectionObserver.disconnect()
      resizeObserver?.disconnect()
      timelineRef.current?.kill()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-[2]"
      aria-hidden
    >
      {PAYMENT_ORBIT_ICONS.map((icon, index) => (
        <div
          key={icon.id}
          ref={(node) => {
            iconRefs.current[index] = node
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 opacity-0"
        >
          <Image
            src={icon.src}
            alt=""
            width={REF_ICON}
            height={REF_ICON}
            className="size-full object-contain"
            sizes="(max-width: 1280px) 12.5vw, 100px"
            quality={100}
            unoptimized
          />
        </div>
      ))}
    </div>
  )
}
