"use client"

import { preFooterCtaContent } from "@/data/landing/pre-footer-cta"
import type { PreFooterCtaContent } from "@/types/landing/pre-footer-cta"

import {
  buttonVariants,
  OutlineButtonArrow,
  PrimaryButtonArrow,
} from "@/components/ui/button"
import { LinkTo } from "@/components/shared/link-to"
import { CtaFigmaLayers } from "@/components/shared/landing/pre-footer-cta-figma-layers"
import { cn } from "@/lib/utils"

export const CTA_DESIGN_WIDTH = 1280
export const CTA_DESIGN_HEIGHT = 414.17

/** Dev Mode — CTA fill */
export const CTA_CARD_GRADIENT =
  "linear-gradient(168.22deg, #F2FDFF -11.71%, #018ACF 88.72%)"

export const CTA_CARD_SHADOW =
  "0px 16px 30px -10.9714px rgba(173, 175, 238, 0.6)"

export const CTA_CARD_RADIUS = "36.5714px"

const CTA_HEADING_CLASS =
  "w-full max-w-[518px] font-sans text-[clamp(1.375rem,4.2cqw,2.5rem)] font-semibold leading-[1.35] tracking-[0.01em] text-white"

const CTA_DESCRIPTION_CLASS =
  "w-full max-w-[691px] font-sans text-[clamp(0.75rem,1.35cqw,0.9143125rem)] font-medium leading-[1.35] text-white"

type PreFooterCtaCardProps = {
  content?: PreFooterCtaContent
  headingId?: string
}

function CtaCopyBlock({
  content,
  headingId,
}: {
  content: PreFooterCtaContent
  headingId?: string
}) {
  return (
    <div className="flex w-full max-w-[691px] flex-col items-center gap-[14.629px] text-center">
      <h2 id={headingId} className={CTA_HEADING_CLASS}>
        <span className="block @min-[720px]/cta:whitespace-pre">
          {content.headingLines[0]}
        </span>
        <span className="block @min-[720px]/cta:whitespace-pre">
          {content.headingLineTwoPrefix}
          {content.headingLines[1]}
        </span>
      </h2>
      <p className={CTA_DESCRIPTION_CLASS}>{content.description}</p>
    </div>
  )
}

function CtaButtons({ content }: { content: PreFooterCtaContent }) {
  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-[14.629px]">
      <LinkTo
        href={content.primaryButton.href}
        className={cn(
          buttonVariants({ variant: "default", size: "default" }),
          "w-auto shrink-0 font-sans"
        )}
      >
        {content.primaryButton.label}
        <PrimaryButtonArrow />
      </LinkTo>
      <LinkTo
        href={content.secondaryButton.href}
        className={cn(
          buttonVariants({ variant: "outline", size: "default" }),
          "relative w-auto shrink-0 font-sans"
        )}
      >
        {content.secondaryButton.label}
        <OutlineButtonArrow />
      </LinkTo>
    </div>
  )
}

export function PreFooterCtaCard({
  content = preFooterCtaContent,
  headingId = "pre-footer-cta-heading",
}: PreFooterCtaCardProps) {
  return (
    <div
      className={cn(
        "@container/cta relative isolate w-full max-w-[1280px] overflow-clip font-sans",
        "aspect-[1280/414.17] max-sm:min-h-[340px] max-sm:aspect-auto"
      )}
      style={{
        borderRadius: CTA_CARD_RADIUS,
        boxShadow: CTA_CARD_SHADOW,
        backgroundImage: CTA_CARD_GRADIENT,
      }}
    >
      <CtaFigmaLayers assets={content.assets} />

      <div
        className={cn(
          "relative z-10 flex w-full flex-col items-center font-sans",
          "max-sm:px-4 max-sm:py-8",
          "sm:absolute sm:inset-0 sm:justify-center sm:px-0 sm:py-0"
        )}
      >
        <div
          className={cn(
            "flex w-full max-w-[691px] flex-col items-center",
            "gap-[clamp(1rem,3.5cqw,1.82875rem)]",
            "@min-[1280px]/cta:gap-[29.26px]"
          )}
        >
          <CtaCopyBlock content={content} headingId={headingId} />
          <CtaButtons content={content} />
        </div>
      </div>
    </div>
  )
}
