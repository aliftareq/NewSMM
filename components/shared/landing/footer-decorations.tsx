import type { LandingFooterContent } from "@/types/landing/footer"

import { cn } from "@/lib/utils"

type FooterDecorationsProps = {
  assets: LandingFooterContent["assets"]
}

function GlassStripe() {
  return (
    <div
      className="relative h-8 w-full shrink-0 self-stretch bg-[rgba(0,0,0,0.04)] shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.04)] sm:h-10"
      aria-hidden
    />
  )
}

function GlareStar({
  className,
  src,
  shineDelay = "a",
}: {
  className: string
  src: string
  shineDelay?: "a" | "b"
}) {
  return (
    <div className={className} aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        src={src}
        width={136}
        height={144}
        className={cn(
          "footer-glare-star block h-[52px] w-[49px] max-w-none object-contain sm:h-[71.619px] sm:w-[67.882px]",
          shineDelay === "b"
            ? "footer-glare-star--delay-b"
            : "footer-glare-star--delay-a",
        )}
      />
    </div>
  )
}

export function FooterDecorations({ assets }: FooterDecorationsProps) {
  return (
    <>
      {/* z-0 — glass effect (8 × 40px stripes) */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex h-[256px] flex-col items-start sm:h-[320px]"
        aria-hidden
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <GlassStripe key={index} />
        ))}
      </div>

      {/* z-1 — blue glow */}
      <div
        className="pointer-events-none absolute bottom-[-280px] left-1/2 z-[1] h-[360px] w-[min(1920px,140vw)] max-w-none -translate-x-1/2 sm:bottom-[-383px] sm:h-[499px] sm:w-[1920px]"
        aria-hidden
      >
        <div className="absolute inset-[-46.43%_-12.07%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={assets.glowEllipse}
            className="block size-full max-w-none"
          />
        </div>
      </div>

      {/* z-2 — decorative dots */}
      <div
        className="pointer-events-none absolute top-[200px] left-1/2 z-[2] h-[180px] w-[min(1132px,calc(100%-2rem))] max-w-[calc(100%-2rem)] -translate-x-1/2 opacity-50 sm:top-[240px] sm:h-[220px] lg:top-[285px] lg:h-[270px]"
        aria-hidden
      >
        <div className="absolute inset-[-0.74%_-0.18%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={assets.decorativeDots}
            className="block size-full max-w-none"
          />
        </div>
      </div>

      {/* z-3 — CTA area left sparkle (desktop) */}
      <GlareStar
        className="pointer-events-none absolute top-[209px] left-[max(1rem,calc(50%-960px+161px))] z-[3] hidden min-[1920px]:left-[161px] xl:block"
        src={assets.glareStarLeft}
        shineDelay="a"
      />

      {/* z-4 — CTA area top-right sparkle (desktop) */}
      <GlareStar
        className="pointer-events-none absolute top-[42px] right-[max(1rem,calc(50%-960px+98px))] z-[4] hidden min-[1920px]:right-[98px] xl:block"
        src={assets.glareStarRight}
        shineDelay="b"
      />
    </>
  )
}
