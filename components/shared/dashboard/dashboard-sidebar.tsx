"use client"

import {
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from "react"

import {
  dashboardShellContent,
  isDashboardNavActive,
} from "@/data/dashboard/shell"
import type { DashboardShellContent } from "@/types/dashboard/shell"
import { LinkTo } from "@/components/shared/link-to"
import { cn } from "@/lib/utils"

const BALANCE_CARD_BG =
  "linear-gradient(102.33deg, rgba(0, 135, 212, 0.2) 2.53%, rgba(50, 180, 255, 0.2) 61.03%, rgba(7, 149, 231, 0.174) 91.98%)"

const NAV_ROW_HOVER = "transition-colors hover:bg-[#269de7]/10"

const SIDEBAR_VERTICAL_PADDING_PX = 60

function useSidebarViewportScale(
  contentRef: RefObject<HTMLDivElement | null>,
  activePath: string,
) {
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const measure = () => {
      const el = contentRef.current
      if (!el) return
      const naturalHeight = el.offsetHeight
      if (naturalHeight <= 0) return
      const available = window.innerHeight - SIDEBAR_VERTICAL_PADDING_PX
      const next = Math.min(1, available / naturalHeight)
      setScale((current) =>
        Math.abs(current - next) < 0.002 ? current : next,
      )
    }

    measure()
    window.addEventListener("resize", measure)
    const observer = new ResizeObserver(measure)
    if (contentRef.current) observer.observe(contentRef.current)

    return () => {
      window.removeEventListener("resize", measure)
      observer.disconnect()
    }
  }, [contentRef, activePath])

  return scale
}

type DashboardSidebarProps = {
  activePath: string
  content?: DashboardShellContent
  className?: string
  /** Close mobile drawer after navigation */
  onNavigate?: () => void
}

function NavDivider({ src }: { src: string }) {
  return (
    <div className="relative h-px w-full shrink-0" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" src={src} className="block h-px w-full max-w-none" />
    </div>
  )
}

/** Figma 25704:13904 */
export function DashboardSidebar({
  activePath,
  content = dashboardShellContent,
  className,
  onNavigate,
}: DashboardSidebarProps) {
  const iconShell = "flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f7f8f9] p-1.5"
  const rowIcon = "block size-5 shrink-0 object-contain"
  const contentRef = useRef<HTMLDivElement>(null)
  const scale = useSidebarViewportScale(contentRef, activePath)

  return (
    <aside
      className={cn(
        "flex h-screen w-[min(100vw,300px)] shrink-0 flex-col overflow-hidden bg-white px-[30px] py-[30px] shadow-[0px_4px_10px_rgba(0,0,0,0.05)]",
        className,
      )}
    >
      <div
        ref={contentRef}
        className="flex w-full min-w-0 flex-col gap-[30px] will-change-transform"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: scale < 1 ? `${100 / scale}%` : "100%",
        }}
      >
      <LinkTo
        href={content.brand.href}
        className="flex items-center gap-2"
        onClick={onNavigate}
      >
        <span className="relative block h-[39px] w-[50px] shrink-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={content.assets.logomark}
            width={50}
            height={39}
            className="absolute inset-[5.13%_2%_7.69%_2%] block size-auto max-w-none"
          />
        </span>
        <span className="text-center text-xl font-semibold leading-[1.35] text-[#202020]">
          {content.brand.nameMain}
          <span className="text-[#21aeff]">{content.brand.nameAccent}</span>
        </span>
      </LinkTo>

      <NavDivider src={content.assets.divider} />

      <div className="flex w-full min-w-0 flex-1 flex-col items-stretch gap-6">
        <div
          className="flex w-full flex-col gap-4 rounded-2xl border border-[rgba(33,174,255,0.4)] p-5"
          style={{ backgroundImage: BALANCE_CARD_BG }}
        >
          <div className="flex w-full flex-col gap-2 text-left">
            <p className="text-base font-medium leading-[1.35] text-[#5b6477]">
              {content.balance.label}
            </p>
            <p className="text-lg font-semibold leading-[1.3] text-[#222e48]">
              {content.balance.defaultAmount}
            </p>
          </div>
          <button
            type="button"
            className="flex h-11 w-full items-center justify-center gap-1 rounded-[10px] border border-[#21aeff] bg-white py-1.5 pl-2 pr-3 text-sm font-medium leading-[1.35] text-[#21aeff]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={content.assets.addFundsPlus}
              width={18}
              height={18}
              className="block size-[18px] shrink-0"
            />
            {content.balance.addFundsLabel}
          </button>
        </div>

        <nav className="flex w-full flex-col gap-2" aria-label="Dashboard">
          {content.navItems.map((item) => {
            const active = isDashboardNavActive(activePath, item.href)

            if (active) {
              return (
                <LinkTo
                  key={item.id}
                  href={item.href}
                  onClick={onNavigate}
                  className="flex w-full items-center gap-4 overflow-hidden rounded-xl bg-[#269de7] px-5 py-2 transition-opacity hover:opacity-95"
                >
                  <span className={iconShell}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt=""
                      src={item.iconSrc}
                      width={20}
                      height={20}
                      className={rowIcon}
                    />
                  </span>
                  <span className="text-base font-medium leading-[1.35] text-white">
                    {item.label}
                  </span>
                </LinkTo>
              )
            }

            return (
              <LinkTo
                key={item.id}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2",
                  NAV_ROW_HOVER,
                )}
              >
                <span className={iconShell}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    src={item.iconSrc}
                    width={20}
                    height={20}
                    className={rowIcon}
                  />
                </span>
                <span className="text-base font-medium leading-[1.35] text-[#404040]">
                  {item.label}
                </span>
              </LinkTo>
            )
          })}

          <NavDivider src={content.assets.divider} />
        </nav>

        <div className="relative mt-auto w-full overflow-hidden rounded-2xl border border-[rgba(33,174,255,0.14)] p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={content.assets.supportGlow}
            width={135}
            height={135}
            className="pointer-events-none absolute -left-12 -top-[60px] size-[135px] opacity-60"
            aria-hidden
          />
          <div className="relative flex flex-col gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={content.assets.supportSparkle}
              width={40}
              height={40}
              className="block size-10 shrink-0"
            />
            <div className="flex flex-col gap-1.5">
              <p className="text-base font-medium leading-[1.35] text-[#202020]">
                {content.supportCard.title}
              </p>
              <p className="text-sm font-normal leading-[1.3] text-[#6a7283]">
                {content.supportCard.description}
              </p>
            </div>
            <button
              type="button"
              className="flex h-[47px] w-full items-center justify-center rounded-xl bg-[#269de7] px-5 text-base font-medium leading-[1.35] text-white"
            >
              {content.supportCard.ctaLabel}
            </button>
          </div>
        </div>
      </div>
      </div>
    </aside>
  )
}