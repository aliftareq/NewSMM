import type { LandingFooterContent } from "@/types/landing/footer"

type FooterDecorationsProps = {
  assets: LandingFooterContent["assets"]
}

function GlareSparkle({
  className,
  assets,
}: {
  className: string
  assets: { a: string; b: string }
}) {
  return (
    <div className={className} aria-hidden>
      <div className="relative size-[49.339px] rotate-[46.53deg] skew-x-[3.07deg]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src={assets.a} className="absolute inset-y-0 right-[44.79%] left-0 block max-w-none" />
        <div className="absolute inset-x-0 top-[44.79%] bottom-0 flex items-center justify-center">
          <div className="-rotate-90 size-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src={assets.b} className="block size-full max-w-none" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function FooterDecorations({ assets }: FooterDecorationsProps) {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col"
        aria-hidden
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="relative h-10 w-full bg-white/[0.04] mix-blend-overlay shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.05)]"
          />
        ))}
      </div>

      <div
        className="pointer-events-none absolute bottom-[-383px] left-1/2 h-[499px] w-[1920px] max-w-none -translate-x-1/2"
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={assets.glowEllipse}
          className="block size-full max-w-none scale-[1.55]"
        />
      </div>

      <div
        className="pointer-events-none absolute top-[285px] left-1/2 h-[270px] w-[1132px] max-w-[90%] -translate-x-1/2"
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src={assets.decorativeDots} className="block size-full max-w-none" />
      </div>

      <GlareSparkle
        className="pointer-events-none absolute top-[209px] left-[8%] hidden h-[71.619px] w-[67.882px] lg:block"
        assets={assets.glareLeft}
      />
      <GlareSparkle
        className="pointer-events-none absolute top-[42px] right-[8%] hidden h-[71.619px] w-[67.882px] lg:block"
        assets={assets.glareRight}
      />
    </>
  )
}
