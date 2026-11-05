import Image from "next/image"

import { AnimatedContent } from "@/components/shared/animated-content"
import { StatsHighlightIntroHeadline } from "@/components/shared/landing/stats-highlight/stats-highlight-intro-headline"
import { StatsHighlightAvatarCard } from "@/components/shared/landing/stats-highlight/stats-highlight-avatar-card"
import { StatsHighlightStatCopy } from "@/components/shared/landing/stats-highlight/stats-highlight-stat-copy"
import {
  LandingSectionHeadingReveal,
  landingScrollRevealProps,
} from "@/components/shared/landing/landing-section-heading-reveal"
import { landingStatsHighlightData } from "@/data/landing/stats-highlight"
import { cn } from "@/lib/utils"
import type { StatsHighlightData } from "@/types/landing/stats-highlight"

type StatsHighlightSectionProps = {
  content?: StatsHighlightData
  className?: string
}

/** Figma 3543:11051 — Who we are stats highlight grid */
export function StatsHighlightSection({
  content = landingStatsHighlightData,
  className,
}: StatsHighlightSectionProps) {
  const { intro, avatarCard, servicesCard, ordersCard, worldwideCard } = content

  return (
    <section
      data-slot="stats-highlight-section"
      className={cn("relative w-full bg-background", className)}
    >
      <div className="info-container flex flex-col gap-10 py-16 md:py-20 lg:gap-12 lg:py-25">
        <LandingSectionHeadingReveal className="flex w-full flex-col items-start gap-6 lg:flex-row lg:justify-between lg:gap-10">
          <div className="stats-highlight-subheading shrink-0 overflow-visible rounded-[33px] border-[0.5px] border-[#e8e8e3] bg-white/50 px-2 py-1">
            <div className="overflow-visible rounded-full border border-white bg-[#fafafa] px-3 py-1.5 shadow-[0px_2px_1.5px_0px_rgba(183,183,183,0.25)]">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="relative flex size-2.5 shrink-0 items-center justify-center overflow-visible"
                >
                  <span className="section-heading-dot-ripple" />
                  <span className="section-heading-dot-ripple section-heading-dot-ripple--delayed" />
                  <span className="relative z-1 block size-1 rounded-full bg-button shadow-[0_0_4px_2px_rgba(38,157,231,0.45)]" />
                </span>
                <p className="section-subtitle-label text-button font-semibold">
                  {intro.subheading.label}
                </p>
              </div>
            </div>
          </div>

          <StatsHighlightIntroHeadline
            headingPrimary={intro.headingPrimary}
            headingSecondary={intro.headingSecondary}
          />
        </LandingSectionHeadingReveal>

        <AnimatedContent
          className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
          {...landingScrollRevealProps}
          stagger={0.08}
        >
          <StatsHighlightAvatarCard
            stat={avatarCard.stat}
            rowOneAvatars={avatarCard.rowOneAvatars}
            rowTwoAvatars={avatarCard.rowTwoAvatars}
          />

          <article
            data-slot="stats-highlight-services-card"
            className="relative h-[300px] overflow-hidden rounded-2xl bg-[#2cb1f4] p-[19px]"
          >
            <div className="absolute top-[19px] right-[19px] size-[93px] shrink-0">
              <Image
                src={servicesCard.decorationSrc}
                alt=""
                width={93}
                height={93}
                className="size-[93px]"
                unoptimized
              />
            </div>

            <div className="relative z-10 flex h-full flex-col justify-between">
              <StatsHighlightStatCopy
                stat={servicesCard.stat}
                labelClassName="text-[rgba(255,255,255,0.9)]"
                valueClassName="text-white"
              />
              <p className="max-w-[270px] text-sm leading-[1.3] font-normal text-white">
                {servicesCard.description}
              </p>
            </div>
          </article>

          <article
            data-slot="stats-highlight-orders-card"
            className="relative h-[300px] overflow-hidden rounded-2xl border border-[rgba(134,134,134,0.18)] bg-white p-[19px] shadow-[0px_2px_6px_0px_rgba(83,83,83,0.12)]"
          >
            <p className="max-w-[270px] text-sm leading-[1.3] font-normal text-[#2b2b22]">
              {ordersCard.description}
            </p>

            <div className="absolute bottom-[21px] left-[19px] flex items-center gap-6">
              <div className="relative h-[91px] w-[112px] shrink-0 overflow-hidden rounded-xl bg-[#d9d9d9]">
                <Image
                  src={ordersCard.imageSrc}
                  alt={ordersCard.imageAlt ?? ""}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-xl bg-[rgba(0,0,0,0.08)]"
                />
              </div>
              <StatsHighlightStatCopy stat={ordersCard.stat} />
            </div>
          </article>

          <article
            data-slot="stats-highlight-worldwide-card"
            className="relative h-[300px] overflow-hidden rounded-2xl"
          >
            <Image
              src={worldwideCard.backgroundSrc}
              alt={worldwideCard.backgroundAlt ?? ""}
              fill
              className="object-cover"
              sizes="(min-width: 1280px) 308px, 50vw"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl bg-[rgba(0,0,0,0.29)]"
            />

            <div className="absolute inset-[10px] flex flex-col justify-between rounded-2xl border border-[rgba(255,255,255,0.22)] bg-[rgba(121,121,121,0.22)] p-6 backdrop-blur-[5px]">
              <StatsHighlightStatCopy
                stat={worldwideCard.stat}
                labelClassName="text-white"
                valueClassName="text-white"
              />
              <p className="max-w-[241px] text-base leading-normal font-medium text-white">
                {worldwideCard.description}
              </p>
            </div>
          </article>
        </AnimatedContent>
      </div>
    </section>
  )
}
