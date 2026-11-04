import { cn } from "@/lib/utils"

/** Figma 25704:30726 — Group 2087326518; VS is separate text layer in Figma */
const VS_BADGE_SPHERES_SRC =
  "/images/landing/what-makes-us-different/vs-badge.png"

export function ComparisonVsBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex w-full min-w-0 max-w-full shrink-0 justify-center overflow-hidden sm:overflow-visible",
        "min-h-[180px] sm:min-h-[211px] md:min-h-[243px] xl:min-h-[276px]",
        className,
      )}
      aria-hidden
    >
      <div className="origin-center scale-[0.62] min-[360px]:scale-[0.72] min-[420px]:scale-[0.82] sm:scale-[0.8823529412] xl:scale-100">
        <div
          className="relative shrink-0 bg-transparent"
          style={{ width: 340, height: 276 }}
          data-slot="comparison-vs-badge"
        >
          <div
            className="absolute left-[32px] top-0 box-border flex size-[276px] items-center justify-center bg-transparent p-[30px]"
            data-name="vs-ring"
          >
            <svg
              className="comparison-vs-badge__ring pointer-events-none absolute inset-0 size-full"
              viewBox="0 0 276 276"
              fill="none"
              aria-hidden
            >
              <rect
                className="comparison-vs-badge__ring-stroke"
                x="2"
                y="2"
                width="272"
                height="272"
                rx="136"
                stroke="#21AEFF"
                strokeWidth="4"
                strokeDasharray="2 22"
                fill="none"
              />
            </svg>

            <div className="comparison-vs-badge__sphere relative size-[216px] shrink-0">
              <span
                className="comparison-vs-badge__sphere-glow"
                aria-hidden
              />
              <div className="comparison-vs-badge__sphere-halo relative z-[1] size-full rounded-full">
                <div className="size-full overflow-hidden rounded-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={VS_BADGE_SPHERES_SRC}
                    alt=""
                    width={218}
                    height={218}
                    decoding="async"
                    className="block size-full max-w-none bg-transparent object-cover"
                  />
                </div>
              </div>
              <span className="pointer-events-none absolute left-1/2 top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2 bg-transparent whitespace-nowrap text-[60px] font-bold uppercase leading-[1.3] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
                VS
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
