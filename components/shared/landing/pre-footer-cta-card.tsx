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
export const CTA_DESIGN_HEIGHT = 414.171

export const CTA_CARD_GRADIENT =
  "linear-gradient(176.14deg, #F2FDFF 0%, #018ACF 100%)"

export const CTA_CARD_SHADOW =
  "0px 16px 30px -10.971px rgba(173, 175, 238, 0.6)"

const CTA_CARD_RADIUS = "36.571px"

/** Figma 27516:8351 — Inter Semi Bold 40 / tracking 0.4px / lh 1.35 */
const CTA_HEADING_CLASS =
  "max-w-[518px] font-sans text-[clamp(1.375rem,4.2cqw,2.5rem)] font-semibold leading-[1.35] tracking-[0.01em] @min-[900px]/cta:tracking-[0.4px]"

/** Figma 27516:8352 — Inter Medium 14.629 / lh 1.35 */
const CTA_DESCRIPTION_CLASS =
  "max-w-[691px] font-sans text-[clamp(0.75rem,1.35cqw,0.9143125rem)] font-medium leading-[1.35]"

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
    <div className="flex flex-col items-center gap-[clamp(0.75rem,2cqw,0.9143125rem)] text-center text-white">
      <h2 id={headingId} className={CTA_HEADING_CLASS}>
        <span className="block @min-[720px]/cta:whitespace-pre">
          {content.headingLines[0]}
        </span>
        <span className="block @min-[720px]/cta:whitespace-pre">
          {content.headingLineTwoPrefix}
          {content.headingLines[1]}
        </span>
      </h2>
      <p className={CTA_DESCRIPTION_CLASS}>
        <span className="block @min-[640px]/cta:inline">
          {content.descriptionLines[0]}
        </span>
        <span className="block @min-[640px]/cta:inline">
          {content.descriptionLines[1]}
        </span>
      </p>
    </div>
  )
}

function CtaButtons({ content }: { content: PreFooterCtaContent }) {
  return (
    <div
      className={cn(
        "flex w-full max-w-[691px] flex-col items-center justify-center gap-3",
        "@min-[520px]/cta:flex-row @min-[520px]/cta:gap-[14.629px]"
      )}
    >
      <LinkTo
        href={content.primaryButton.href}
        className={cn(
          buttonVariants({ variant: "default", size: "default" }),
          "w-full font-sans @min-[520px]/cta:w-auto"
        )}
      >
        {content.primaryButton.label}
        <PrimaryButtonArrow />
      </LinkTo>
      <LinkTo
        href={content.secondaryButton.href}
        className={cn(
          buttonVariants({ variant: "outline", size: "default" }),
          "relative w-full font-sans @min-[520px]/cta:w-auto"
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
        "max-sm:min-h-[340px]",
        "sm:aspect-[1280/414.171] sm:min-h-0"
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
          "relative z-10 flex flex-col items-center font-sans",
          "max-sm:px-4 max-sm:pb-10 max-sm:pt-8",
          "sm:absolute sm:inset-0 sm:justify-center sm:px-4 sm:py-4",
          "md:px-6",
          "lg:px-8"
        )}
      >
        <div
          className={cn(
            "flex w-full max-w-[691px] flex-col items-center",
            "gap-[clamp(1.25rem,3.5cqw,1.8285625rem)]"
          )}
        >
          <CtaCopyBlock content={content} headingId={headingId} />
          <CtaButtons content={content} />
        </div>
      </div>
    </div>
  )
}
