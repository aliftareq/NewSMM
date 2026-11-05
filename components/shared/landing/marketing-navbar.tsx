"use client"

import { useCallback, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { usePathname } from "next/navigation"

import { landingNavbarContent } from "@/data/landing/navbar"
import type { LandingNavbarContent } from "@/types/landing/navbar"
import { LinkTo } from "@/components/shared/link-to"
import { AnimatedContent } from "@/components/shared/animated-content"
import { MarketingNavbarBrandCluster } from "@/components/shared/landing/marketing-navbar-brand-cluster"
import {
  MarketingNavbarMobileMenu,
  MarketingNavbarMenuTrigger,
} from "@/components/shared/landing/marketing-navbar-mobile-menu"
import { OurServicesModal } from "@/components/shared/landing/services-modal/our-services-modal"
import { cn } from "@/lib/utils"

type MarketingNavbarProps = {
  content?: LandingNavbarContent
  className?: string
  /** Hero: absolute over background at top; fixed + glass when scrolled. */
  overlay?: boolean
  /** Hero landing: nav bar slides in from the top on mount. */
  mountReveal?: boolean
  onMountRevealComplete?: () => void
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
  overlay = false,
  mountReveal = false,
  onMountRevealComplete,
}: MarketingNavbarProps) {
  const pathname = usePathname()
  const [servicesModalOpen, setServicesModalOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [navRevealComplete, setNavRevealComplete] = useState(!mountReveal)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 8)
    }

    updateScrollState()
    window.addEventListener("scroll", updateScrollState, { passive: true })
    return () => window.removeEventListener("scroll", updateScrollState)
  }, [])

  const handleNavRevealComplete = useCallback(() => {
    setNavRevealComplete(true)
    onMountRevealComplete?.()
  }, [onMountRevealComplete])

  const signUp = content.auth.find((item) => item.variant === "primary")
  const login = content.auth.find((item) => item.variant === "text")

  const servicesButton = (
    <button
      type="button"
      onClick={() => setServicesModalOpen(true)}
      className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3"
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
    </button>
  )

  const bar = (
    <>
      <MarketingNavbarBrandCluster
        logoHref={content.logo.href}
        logoAlt={content.logo.alt}
        logomarkHoldStacked={mountReveal && !navRevealComplete}
        logomarkSplitReveal={mountReveal && navRevealComplete}
        servicesButton={servicesButton}
      />
      <OurServicesModal open={servicesModalOpen} onOpenChange={setServicesModalOpen} />
      <MarketingNavbarMobileMenu
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
        content={content}
        pathname={pathname}
        isNavLinkActive={isNavLinkActive}
        onOpenServices={() => setServicesModalOpen(true)}
      />

        <nav
          aria-label="Main"
          className="hidden items-center gap-8 overflow-hidden rounded-2xl bg-white py-2 pr-6 pl-2 shadow-[0px_2px_4px_0px_rgba(39,83,132,0.12)] lg:flex"
        >
          {content.navLinks.map((link) => {
            const active = isNavLinkActive(pathname, link.href)
            return (
              <LinkTo
                key={link.href}
                href={link.href}
                className={cn(
                  "relative inline-flex items-center justify-center text-sm font-medium leading-[1.6] whitespace-nowrap transition-colors",
                  active
                    ? "rounded-[12px] px-4 py-[7px] text-white drop-shadow-[0px_0px_1px_rgba(0,0,0,0.04),0px_1px_0px_rgba(0,0,0,0.06)]"
                    : "text-[#020618] hover:text-n600",
                )}
              >
                {active ? (
                  <>
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-[12px] bg-blue-brand"
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-[12px] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.6)]"
                    />
                  </>
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

          <MarketingNavbarMenuTrigger
            open={mobileMenuOpen}
            onOpen={() => setMobileMenuOpen(true)}
          />

          <div className="hidden items-center rounded-xl bg-white lg:flex">
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
    </>
  )

  const barRow = (
    <div className="flex h-[52px] w-full items-center justify-between gap-4">{bar}</div>
  )

  const barShell = isScrolled ? (
    <div className="info-container w-full">
      <div
        className={cn(
          "rounded-[12px] border border-white/70 bg-white/85 p-3 shadow-[0px_8px_32px_rgba(39,83,132,0.14)] backdrop-blur-xl transition-[border-radius,background-color,box-shadow,backdrop-filter,border-color,padding] duration-300 ease-out supports-[backdrop-filter]:bg-white/72 sm:p-4",
        )}
      >
        {barRow}
      </div>
    </div>
  ) : (
    <div className="info-container w-full">{barRow}</div>
  )

  const isFloating = overlay && isScrolled

  const headerPosition = isFloating
    ? "fixed inset-x-0 top-0 py-3"
    : overlay
      ? "absolute inset-x-0 top-0 py-6"
      : "sticky top-0 py-6"

  const shell = mountReveal ? (
    <AnimatedContent
      className="w-full"
      trigger="mount"
      direction="vertical"
      reverse
      distance={100}
      duration={0.8}
      ease="power3.out"
      threshold={0.1}
      onComplete={handleNavRevealComplete}
    >
      {barShell}
    </AnimatedContent>
  ) : (
    barShell
  )

  const header = (
    <header
      data-slot="marketing-navbar"
      data-floating={isFloating ? "true" : "false"}
      className={cn(
        "w-full bg-transparent transition-[padding] duration-300 ease-out",
        isFloating ? "z-[100]" : "z-50",
        headerPosition,
        className,
      )}
    >
      {shell}
    </header>
  )

  if (isFloating && mounted) {
    return createPortal(header, document.body)
  }

  return header
}
