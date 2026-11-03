"use client"

import { usePathname } from "next/navigation"

import { landingNavbarContent } from "@/data/landing/navbar"
import type { LandingNavbarContent } from "@/types/landing/navbar"
import { LinkTo } from "@/components/shared/link-to"
import { cn } from "@/lib/utils"

type MarketingNavbarProps = {
  content?: LandingNavbarContent
  className?: string
}

function isNavLinkActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/"
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function MarketingNavbar({
  content = landingNavbarContent,
  className,
}: MarketingNavbarProps) {
  const pathname = usePathname()

  const signUp = content.auth.find((item) => item.variant === "primary")
  const login = content.auth.find((item) => item.variant === "text")

  return (
    <header
      className={cn(
        "relative z-20 w-full bg-transparent py-6",
        className
      )}
    >
      <div className="info-container flex h-[52px] items-center justify-between gap-4">
        <div className="flex shrink-0 items-center gap-3">
          <LinkTo href={content.logo.href} className="relative block h-[39px] w-[50px] shrink-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={content.logo.alt}
              src={content.logo.logomarkSrc}
              className="absolute inset-[5.13%_2%_7.69%_2%] block size-auto max-w-none"
            />
          </LinkTo>

          <LinkTo
            href={content.servicesMenu.href}
            className="hidden items-center gap-2 rounded-xl bg-white px-4 py-3 sm:inline-flex"
          >
            <span className="relative size-5 shrink-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={content.servicesMenu.menuIconSrc}
                className="absolute inset-[12.5%_3.13%] block size-auto max-w-none"
              />
            </span>
            <span className="text-base font-medium leading-[1.35] text-n600 whitespace-nowrap">
              {content.servicesMenu.label}
            </span>
            <span className="relative size-3 shrink-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={content.servicesMenu.chevronSrc}
                className="absolute inset-[21.49%_0_21.5%_0] block size-auto max-w-none"
              />
            </span>
          </LinkTo>
        </div>

        <nav
          aria-label="Main"
          className="hidden items-center gap-8 overflow-hidden rounded-2xl bg-white py-2 pr-6 pl-2 shadow-[0px_2px_4px_0px_rgba(39,83,132,0.12)] xl:flex"
        >
          {content.navLinks.map((link) => {
            const active = isNavLinkActive(pathname, link.href)
            return (
              <LinkTo
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-medium leading-[1.6] whitespace-nowrap transition-colors",
                  active
                    ? "rounded-xl px-4 py-[7px] text-white shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.6)]"
                    : "text-[#020618] hover:text-n600"
                )}
              >
                {active ? (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-xl bg-blue-brand"
                  />
                ) : null}
                <span className="relative">{link.label}</span>
              </LinkTo>
            )
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <LinkTo
            href={content.cart.href}
            aria-label={content.cart.label}
            className="relative flex size-12 items-center justify-center rounded-xl border border-[rgba(97,197,255,0.29)] bg-white shadow-[inset_0px_0px_8px_0px_rgba(255,255,255,0.04)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src={content.cart.iconSrc} width={24} height={24} className="block" />
          </LinkTo>

          <div className="hidden items-center rounded-xl bg-white sm:flex">
            {login ? (
              <LinkTo
                href={login.href}
                className="px-7 py-3 text-base font-medium leading-[1.35] text-[#202020] text-shadow-[0px_0.4px_0.3px_rgba(0,0,0,0.08)] whitespace-nowrap"
              >
                {login.label}
              </LinkTo>
            ) : null}

            {signUp ? (
              <LinkTo
                href={signUp.href}
                className="relative flex h-12 items-center justify-center gap-3 rounded-xl bg-button px-[18px] py-1.5 text-sm font-semibold leading-normal text-white shadow-[inset_0px_0px_8px_0px_rgba(255,255,255,0.04)]"
              >
                {signUp.label}
                <span
                  className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white p-1"
                  aria-hidden
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    src={content.signUpArrowSrc}
                    width={12}
                    height={12}
                    className="block shrink-0"
                  />
                </span>
              </LinkTo>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  )
}
