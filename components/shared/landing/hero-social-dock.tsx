"use client"

import type { HeroSocialBarIcon } from "@/types/landing/hero"

import { HeroSpriteIcon } from "@/components/shared/landing/hero-sprite-icon"
import { LinkTo } from "@/components/shared/link-to"
import { cn } from "@/lib/utils"

const SOCIAL_META: Record<
  string,
  { label: string; href: string; glow: string }
> = {
  facebook: {
    label: "Facebook",
    href: "https://facebook.com",
    glow: "rgba(24, 119, 242, 0.7)",
  },
  instagram: {
    label: "Instagram",
    href: "https://instagram.com",
    glow: "rgba(225, 48, 108, 0.7)",
  },
  youtube: {
    label: "YouTube",
    href: "https://youtube.com",
    glow: "rgba(255, 0, 0, 0.7)",
  },
  tiktok: {
    label: "TikTok",
    href: "https://tiktok.com",
    glow: "rgba(0, 0, 0, 0.75)",
  },
  linkedin: {
    label: "LinkedIn",
    href: "https://linkedin.com",
    glow: "rgba(10, 102, 194, 0.7)",
  },
}

type HeroSocialDockProps = {
  icons: HeroSocialBarIcon[]
  spriteSrc: string
  className?: string
}

/**
 * Social icon row — idle float + hover lift/glow/tooltip (from smmgrower hero dock).
 */
export function HeroSocialDock({
  icons,
  spriteSrc,
  className,
}: HeroSocialDockProps) {
  return (
    <div
      className={cn(
        "absolute top-[535px] left-[47px] z-10 overflow-visible rounded-[20.321px] border-[0.847px] border-solid border-[#0087d4] bg-white/[0.08] px-[23.708px] py-[16.934px] backdrop-blur-[2px]",
        className,
      )}
    >
      <div className="group/dock relative flex min-w-[342px] items-center justify-between overflow-visible">
        {icons.map((icon, index) => {
          const meta = SOCIAL_META[icon.id]
          const label = meta?.label ?? icon.id
          const href = meta?.href ?? "#"
          const glow = meta?.glow ?? "rgba(33, 174, 255, 0.65)"

          return (
            <LinkTo
              key={icon.id}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="group/icon relative flex size-[51.65px] shrink-0 items-center justify-center overflow-visible focus-visible:z-50 hover:z-50"
            >
              <span className="hero-social-tooltip pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 z-50 -translate-x-1/2 translate-y-1 scale-95 rounded-md border border-white/15 bg-black/80 px-2 py-0.5 text-xs font-medium whitespace-nowrap text-white opacity-0 shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-md transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/icon:translate-y-0 group-hover/icon:scale-100 group-hover/icon:opacity-100 group-focus-visible/icon:translate-y-0 group-focus-visible/icon:scale-100 group-focus-visible/icon:opacity-100">
                {label}
              </span>

              <span
                className="hero-social-idle-float relative block size-[49.584px]"
                style={{ animationDelay: `${index * 0.22}s` }}
              >
                <span
                  className="hero-social-icon relative block size-full transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/icon:-translate-y-2.5 group-hover/icon:scale-110 group-focus-visible/icon:-translate-y-2.5 group-focus-visible/icon:scale-110"
                  style={{
                    filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.3))",
                  }}
                >
                  <span
                    aria-hidden
                    className="hero-social-icon-glow pointer-events-none absolute inset-[-18%] scale-[0.7] rounded-[22px] opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/icon:scale-100 group-hover/icon:opacity-90 group-focus-visible/icon:scale-100 group-focus-visible/icon:opacity-90"
                    style={{
                      background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
                    }}
                  />
                  <HeroSpriteIcon
                    spriteSrc={spriteSrc}
                    crop={icon.sprite}
                    containerClassName="relative z-[1] size-[49.584px]"
                  />
                </span>
              </span>
            </LinkTo>
          )
        })}
      </div>
    </div>
  )
}
