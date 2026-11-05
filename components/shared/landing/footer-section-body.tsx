"use client"

import { useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { FooterBottomBar } from "@/components/shared/landing/footer-bottom-bar"
import { FooterBrandColumn } from "@/components/shared/landing/footer-brand-column"
import { FooterContactColumn } from "@/components/shared/landing/footer-contact-column"
import { FooterCta } from "@/components/shared/landing/footer-cta"
import { FooterLinkColumn } from "@/components/shared/landing/footer-link-column"
import { FooterTrustBadges } from "@/components/shared/landing/footer-trust-badges"
import type { LandingFooterContent } from "@/types/landing/footer"

gsap.registerPlugin(ScrollTrigger)

type FooterSectionBodyProps = {
  content: LandingFooterContent
}

export function FooterSectionBody({ content }: FooterSectionBodyProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const items = gsap.utils.toArray<HTMLElement>(
      ".footer-reveal-item",
      root,
    )
    if (items.length === 0) return

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    const finishReveal = () => {
      items.forEach((el) => el.classList.remove("footer-reveal-item"))
      gsap.set(items, { clearProps: "all" })
    }

    if (reduceMotion) {
      finishReveal()
      return
    }

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 88%",
          once: true,
          invalidateOnRefresh: true,
        },
        onComplete: finishReveal,
      })

      timeline.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.11,
      })

      ScrollTrigger.refresh()
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={rootRef}
      className="info-container relative z-[6] flex flex-col items-center gap-10 px-4 sm:gap-12 sm:px-6 lg:px-8 xl:gap-[68px]"
    >
      <div className="footer-reveal-item w-full min-w-0">
        <FooterCta
          cta={content.cta}
          glareStarLeft={content.assets.glareStarLeft}
          glareStarRight={content.assets.glareStarRight}
        />
      </div>

      <div className="flex w-full flex-col items-center gap-10 pb-8 sm:gap-12 sm:pb-10 xl:gap-[60px] xl:pb-12">
        <div className="footer-reveal-item flex w-full flex-col gap-10 xl:flex-row xl:items-start xl:justify-between xl:gap-[133px]">
          <FooterBrandColumn brand={content.brand} />

          <div className="grid w-full min-w-0 grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 md:gap-x-12 xl:contents">
            <FooterLinkColumn
              title={content.quickLinks.title}
              links={content.quickLinks.links}
              className="w-full min-w-0 xl:w-[160px] xl:shrink-0"
            />
            <FooterLinkColumn
              title={content.services.title}
              links={content.services.links}
              className="w-full min-w-0 xl:w-[173px] xl:shrink-0"
            />
            <FooterContactColumn
              contact={content.contact}
              className="sm:col-span-2 xl:col-span-1"
            />
          </div>
        </div>

        <div className="footer-reveal-item w-full min-w-0">
          <FooterTrustBadges badges={content.trustBadges} />
        </div>

        <div className="footer-reveal-item w-full min-w-0">
          <FooterBottomBar legal={content.legal} />
        </div>
      </div>
    </div>
  )
}
