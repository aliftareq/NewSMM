"use client"

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { usePathname } from "next/navigation"

import { landingNavbarContent } from "@/data/landing/navbar"
import type { LandingNavbarContent } from "@/types/landing/navbar"
import { LinkTo } from "@/components/shared/link-to"
import { AnimatedContent } from "@/components/shared/animated-content"
import { MarketingNavbarCart } from "@/components/shared/cart/marketing-navbar-cart"
import { MarketingNavbarBrandCluster } from "@/components/shared/landing/marketing-navbar-brand-cluster"
import { MarketingNavbarUserMenu } from "@/components/shared/landing/marketing-navbar-user-menu"
import {
  MarketingNavbarMobileMenu,
  MarketingNavbarMenuTrigger,
} from "@/components/shared/landing/marketing-navbar-mobile-menu"
import { LoginModal } from "@/app/(auth)/_components/login-modal"
import { useDummyAuth } from "@/app/(auth)/_hooks/use-dummy-auth"
import { formatDummyAuthDisplayName } from "@/app/(auth)/_lib/dummy-auth"
import { OurServicesModal } from "@/components/shared/landing/services-modal/our-services-modal"
import type { AuthModalTab } from "@/types/auth/login-modal"
import { cn } from "@/lib/utils"
import { useLandingLgViewport } from "@/lib/landing-animation-trigger"
import { HERO_ENTRANCE } from "@/components/shared/landing/hero-entrance"

/** Fallback glass bar bottom (px from viewport top) before measure. */
const NAVBAR_BAR_BOTTOM_FALLBACK_PX = 110
const SERVICES_MODAL_NAV_GAP_PX = 20

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
  const isLgViewport = useLandingLgViewport()
  const [servicesModalOpen, setServicesModalOpen] = useState(false)
  const navbarBarShellRef = useRef<HTMLDivElement>(null)
  const [navbarBarBottomPx, setNavbarBarBottomPx] = useState(0)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [loginModalTab, setLoginModalTab] = useState<AuthModalTab>("login")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [navRevealComplete, setNavRevealComplete] = useState(!mountReveal)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { user, isAuthenticated, logout } = useDummyAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const SCROLL_GLASS_ON = 12
    const SCROLL_GLASS_OFF = 2
    let glassActive = window.scrollY > SCROLL_GLASS_ON

    const updateScrollState = () => {
      const y = window.scrollY
      if (!glassActive && y > SCROLL_GLASS_ON) {
        glassActive = true
        setIsScrolled(true)
      } else if (glassActive && y < SCROLL_GLASS_OFF) {
        glassActive = false
        setIsScrolled(false)
      }
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

  const openLoginModal = useCallback((tab: AuthModalTab = "login") => {
    setLoginModalTab(tab)
    setLoginModalOpen(true)
  }, [])

  const measureNavbarBarBottom = useCallback(() => {
    const el = navbarBarShellRef.current
    if (!el) return
    setNavbarBarBottomPx(Math.ceil(el.getBoundingClientRect().bottom))
  }, [])

  useLayoutEffect(() => {
    if (!servicesModalOpen) {
      setNavbarBarBottomPx(0)
      return
    }
    measureNavbarBarBottom()
  }, [servicesModalOpen, measureNavbarBarBottom, isScrolled])

  useEffect(() => {
    if (!servicesModalOpen) return

    measureNavbarBarBottom()
    const raf = requestAnimationFrame(measureNavbarBarBottom)
    const resizeObserver = new ResizeObserver(measureNavbarBarBottom)
    const el = navbarBarShellRef.current
    if (el) resizeObserver.observe(el)
    window.addEventListener("resize", measureNavbarBarBottom, { passive: true })
    window.addEventListener("scroll", measureNavbarBarBottom, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      window.removeEventListener("resize", measureNavbarBarBottom)
      window.removeEventListener("scroll", measureNavbarBarBottom)
    }
  }, [servicesModalOpen, measureNavbarBarBottom, isScrolled])

  const servicesModalAnchorTopPx =
    servicesModalOpen && isScrolled
      ? (navbarBarBottomPx || NAVBAR_BAR_BOTTOM_FALLBACK_PX) +
        SERVICES_MODAL_NAV_GAP_PX
      : 0

  const servicesButton = (
    <button
      type="button"
      onClick={() => setServicesModalOpen(true)}
      className={cn(
        "inline-flex cursor-pointer items-center gap-2 transition-[background-color,color,box-shadow] duration-300 ease-out",
        isScrolled
          ? "h-12 justify-center rounded-xl bg-button px-4 py-1.5 text-sm font-semibold leading-normal text-white shadow-[inset_0px_0px_8px_0px_rgba(255,255,255,0.04)]"
          : "h-[52px] rounded-2xl bg-white px-5 py-2 shadow-[0px_2px_4px_0px_rgba(39,83,132,0.12)] sm:px-6",
      )}
    >
      <span className="relative size-5 shrink-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={content.servicesMenu.menuIconSrc}
          className={cn(
            "absolute inset-[12.5%_3.13%] block size-auto max-w-none transition-[filter] duration-300",
            isScrolled && "brightness-0 invert",
          )}
        />
      </span>
      <span
        className={cn(
          "whitespace-nowrap",
          isScrolled
            ? "text-sm font-semibold leading-normal text-white"
            : "text-base font-medium leading-[1.35] text-n600",
        )}
      >
        {content.servicesMenu.label}
      </span>
      <span className="relative size-3 shrink-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={content.servicesMenu.chevronSrc}
          className={cn(
            "absolute inset-[21.49%_0_21.5%_0] block size-auto max-w-none transition-[filter] duration-300",
            isScrolled && "brightness-0 invert",
          )}
        />
      </span>
    </button>
  )

  const bar = (
    <>
      <MarketingNavbarBrandCluster
        logoHref={content.logo.href}
        logoAlt={content.logo.alt}
        logomarkHoldStacked={mountReveal && isLgViewport && !navRevealComplete}
        logomarkSplitReveal={mountReveal && isLgViewport && navRevealComplete}
        servicesButton={servicesButton}
      />
      <OurServicesModal
        open={servicesModalOpen}
        onOpenChange={setServicesModalOpen}
        anchorTopPx={servicesModalAnchorTopPx}
      />
      <LoginModal
        open={loginModalOpen}
        onOpenChange={setLoginModalOpen}
        activeTab={loginModalTab}
        onActiveTabChange={setLoginModalTab}
      />
      <MarketingNavbarMobileMenu
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
        content={content}
        pathname={pathname}
        navActiveReady={mounted}
        isNavLinkActive={isNavLinkActive}
        onOpenServices={() => setServicesModalOpen(true)}
        onOpenLogin={() => openLoginModal("login")}
        onOpenSignUp={() => openLoginModal("sign-up")}
        isAuthenticated={mounted && isAuthenticated}
        authDisplayName={
          user ? formatDummyAuthDisplayName(user.email) : undefined
        }
        authEmail={user?.email}
        userMenu={content.userMenu}
        onLogout={() => logout()}
      />

        <nav
          aria-label="Main"
          className="hidden items-center gap-8 overflow-hidden rounded-2xl bg-white py-2 pl-2 pr-2 shadow-[0px_2px_4px_0px_rgba(39,83,132,0.12)] lg:flex"
        >
          {content.navLinks.map((link) => {
            const active =
              mounted && isNavLinkActive(pathname, link.href)
            return (
              <LinkTo
                key={link.href}
                href={link.href}
                className={cn(
                  "relative inline-flex items-center justify-center text-sm font-medium leading-[1.6] whitespace-nowrap transition-colors",
                  active
                    ? "rounded-[12px] px-4 py-[7px] text-white drop-shadow-[0px_0px_1px_rgba(0,0,0,0.04),0px_1px_0px_rgba(0,0,0,0.06)]"
                    : "px-2 py-[7px] text-[#020618] hover:text-n600",
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
          <MarketingNavbarCart />

          <MarketingNavbarMenuTrigger
            open={mobileMenuOpen}
            onOpen={() => setMobileMenuOpen(true)}
          />

          {mounted && isAuthenticated && user ? (
            <MarketingNavbarUserMenu
              displayName={formatDummyAuthDisplayName(user.email)}
              email={user.email}
              avatarIconSrc={content.userMenu.avatarIconSrc}
              chevronIconSrc={content.userMenu.chevronIconSrc}
              onLogout={() => logout()}
            />
          ) : (
            <div className="hidden items-center rounded-xl bg-white lg:flex">
              {login ? (
                <button
                  type="button"
                  onClick={() => openLoginModal("login")}
                  className="cursor-pointer px-7 py-3 text-base font-medium leading-[1.35] text-[#202020] text-shadow-[0px_0.4px_0.3px_rgba(0,0,0,0.08)] whitespace-nowrap"
                >
                  {login.label}
                </button>
              ) : null}

              {signUp ? (
                <button
                  type="button"
                  onClick={() => openLoginModal("sign-up")}
                  className="relative flex h-12 cursor-pointer items-center justify-center gap-3 rounded-xl bg-button px-[18px] py-1.5 text-sm font-semibold leading-normal text-white shadow-[inset_0px_0px_8px_0px_rgba(255,255,255,0.04)]"
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
                </button>
              ) : null}
            </div>
          )}
        </div>
    </>
  )

  const barRow = (
    <div className="flex h-[52px] w-full items-center justify-between gap-4">{bar}</div>
  )

  const barShell = (
    <div className="info-container w-full">
      <div
        ref={navbarBarShellRef}
        data-slot="marketing-navbar-bar"
        className={cn(
          "rounded-[12px] border p-3 transition-[background-color,box-shadow,backdrop-filter,border-color] duration-300 ease-out sm:p-4",
          isScrolled
            ? "border-white/70 bg-white/85 shadow-[0px_8px_32px_rgba(39,83,132,0.14)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/72"
            : "border-transparent bg-transparent shadow-none",
        )}
      >
        {barRow}
      </div>
    </div>
  )

  const isFloating = overlay && isScrolled

  const headerPosition = isFloating
    ? "fixed inset-x-0 top-0 py-6"
    : overlay
      ? "absolute inset-x-0 top-0 py-6"
      : "sticky top-0 py-6"

  const shell = mountReveal ? (
    <AnimatedContent
      className="w-full"
      trigger="mount"
      direction="vertical"
      reverse
      distance={HERO_ENTRANCE.distance}
      duration={HERO_ENTRANCE.duration}
      ease={HERO_ENTRANCE.ease}
      threshold={HERO_ENTRANCE.threshold}
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
