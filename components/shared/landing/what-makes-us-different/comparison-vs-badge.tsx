import { cn } from "@/lib/utils"

/** Figma export — Group 2087326518 (25704:30726); VS is separate text layer in Figma */
const VS_SPHERES_SRC = "/images/landing/what-makes-us-different/vs-badge.svg"

/**
 * Figma 25704:30721 → 30723
 * Frame 340×276; dashed ring 276×276 @ left 32; inner 216; VS 60px bold.
 */
export function ComparisonVsBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex min-h-[211px] w-full shrink-0 justify-center overflow-visible sm:min-h-[243px] xl:min-h-[276px]",
        className,
      )}
      aria-hidden
    >
      <div className="origin-center scale-[0.7647058824] sm:scale-[0.8823529412] xl:scale-100">
        <div
          className="relative shrink-0 bg-transparent"
          style={{ width: 340, height: 276 }}
          data-slot="comparison-vs-badge"
        >
          <div
            className="absolute left-[32px] top-0 box-border flex size-[276px] items-center justify-center rounded-full border-4 border-dashed border-[#21aeff] bg-transparent p-[30px]"
            data-name="vs-ring"
          >
            <div className="relative size-[216px] shrink-0 bg-transparent">
              {/* Clip filter bleed — Figma has no square/matte behind VS */}
              <div className="absolute left-0 top-0 size-[216px] overflow-hidden rounded-full bg-transparent">
                <div className="absolute inset-[-10.05%_-23.01%_-35.97%_-23.01%]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={VS_SPHERES_SRC}
                    alt=""
                    width={315}
                    height={315}
                    decoding="async"
                    className="block size-full max-w-none bg-transparent"
                  />
                </div>
              </div>
              <span className="pointer-events-none absolute left-1/2 top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2 bg-transparent whitespace-nowrap text-[60px] font-bold uppercase leading-[1.3] text-white">
                VS
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
