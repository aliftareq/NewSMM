"use client"

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { Menu, XIcon } from "lucide-react"

import { LinkTo } from "@/components/shared/link-to"
import {
  Dialog,
  DialogClose,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  buttonVariants,
  PrimaryButtonArrow,
} from "@/components/ui/button"
import type { LandingNavbarContent } from "@/types/landing/navbar"
import { cn } from "@/lib/utils"

type MarketingNavbarMobileMenuProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  content: LandingNavbarContent
  pathname: string
  isNavLinkActive: (pathname: string, href: string) => boolean
  onOpenServices: () => void
}

export function MarketingNavbarMobileMenu({
  open,
  onOpenChange,
  content,
  pathname,
  isNavLinkActive,
  onOpenServices,
}: MarketingNavbarMobileMenuProps) {
  const signUp = content.auth.find((item) => item.variant === "primary")
  const login = content.auth.find((item) => item.variant === "text")

  const close = () => onOpenChange(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogPrimitive.Backdrop
          className={cn(
            "fixed inset-0 z-[110] bg-black/25 duration-200 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
            "supports-backdrop-filter:backdrop-blur-md",
          )}
        />
        <DialogPrimitive.Popup
          id="marketing-navbar-mobile-menu"
          data-slot="marketing-navbar-mobile-menu"
          className={cn(
            "fixed inset-x-4 top-[max(1rem,env(safe-area-inset-top))] z-[110] max-h-[min(520px,calc(100dvh-2rem))] overflow-y-auto rounded-2xl bg-white p-5 shadow-[0px_16px_48px_rgba(39,83,132,0.18)] ring-1 ring-black/5 outline-none",
            "duration-200 data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-top-4 data-closed:animate-out data-closed:fade-out-0 data-closed:slide-out-to-top-4",
            "sm:inset-x-auto sm:left-1/2 sm:w-full sm:max-w-md sm:-translate-x-1/2 sm:top-24",
          )}
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <DialogTitle className="text-lg font-semibold text-[#020618]">
              Menu
            </DialogTitle>
            <DialogClose
              render={
                <button
                  type="button"
                  className="flex size-10 items-center justify-center rounded-xl border border-[rgba(97,197,255,0.29)] bg-white text-[#020618] shadow-[inset_0px_0px_8px_0px_rgba(255,255,255,0.04)]"
                  aria-label="Close menu"
                />
              }
            >
              <XIcon className="size-5" />
            </DialogClose>
          </div>

          <nav aria-label="Mobile main" className="flex flex-col gap-1">
            {content.navLinks.map((link) => {
              const active = isNavLinkActive(pathname, link.href)
              return (
                <LinkTo
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className={cn(
                    "rounded-xl px-4 py-3 text-base font-medium leading-[1.4] transition-colors",
                    active
                      ? "bg-blue-brand text-white shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.6)]"
                      : "text-[#020618] hover:bg-[#f5f6f7]",
                  )}
                >
                  {link.label}
                </LinkTo>
              )
            })}
          </nav>

          <div className="mt-4 border-t border-[#ebecef] pt-4">
            <button
              type="button"
              onClick={() => {
                close()
                onOpenServices()
              }}
              className="flex w-full items-center gap-3 rounded-xl bg-[#f5f6f7] px-4 py-3 text-left text-base font-medium text-n600"
            >
              <span className="relative size-5 shrink-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={content.servicesMenu.menuIconSrc}
                  className="absolute inset-[12.5%_3.13%] block size-auto max-w-none"
                />
              </span>
              {content.servicesMenu.label}
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            {login ? (
              <LinkTo
                href={login.href}
                onClick={close}
                className={cn(
                  buttonVariants({ variant: "outline", size: "default" }),
                  "w-full justify-center font-sans sm:flex-1",
                )}
              >
                {login.label}
              </LinkTo>
            ) : null}
            {signUp ? (
              <LinkTo
                href={signUp.href}
                onClick={close}
                className={cn(
                  buttonVariants({ variant: "default", size: "default" }),
                  "w-full justify-center gap-2 font-sans sm:flex-1",
                )}
              >
                {signUp.label}
                <PrimaryButtonArrow />
              </LinkTo>
            ) : null}
          </div>
        </DialogPrimitive.Popup>
      </DialogPortal>
    </Dialog>
  )
}

type MarketingNavbarMenuTriggerProps = {
  open: boolean
  onOpen: () => void
}

export function MarketingNavbarMenuTrigger({
  open,
  onOpen,
}: MarketingNavbarMenuTriggerProps) {
  return (
    <button
      type="button"
      className="relative flex size-12 items-center justify-center rounded-xl border border-[rgba(97,197,255,0.29)] bg-white shadow-[inset_0px_0px_8px_0px_rgba(255,255,255,0.04)] lg:hidden"
      aria-label={open ? "Menu open" : "Open menu"}
      aria-expanded={open}
      aria-controls="marketing-navbar-mobile-menu"
      onClick={onOpen}
    >
      <Menu className="size-6 text-[#020618]" strokeWidth={2} />
    </button>
  )
}
