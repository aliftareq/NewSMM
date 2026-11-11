"use client"

import { useEffect, useId, useState } from "react"

import { forgotPasswordModalContent } from "@/data/auth/forgot-password-modal"
import { loginModalContent } from "@/data/auth/login-modal"
import type { AuthModalTab, LoginModalContent } from "@/types/auth/login-modal"
import { AuthModalViewTransition } from "@/components/shared/auth/auth-modal-view-transition"
import { ForgotPasswordModalBody } from "@/components/shared/auth/forgot-password-modal-body"
import { SetNewPasswordModalBody } from "@/components/shared/auth/set-new-password-modal-body"
import { TwoFactorModalBody } from "@/components/shared/auth/two-factor-modal-body"
import { setNewPasswordModalContent } from "@/data/auth/set-new-password-modal"
import { twoFactorModalContent } from "@/data/auth/two-factor-modal"
import { LinkTo } from "@/components/shared/link-to"
import { LAYOUT_IDS, SlidingTabPill } from "@/components/shared/sliding-tab-pill"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

type AuthModalView = "login" | "reset-password" | "two-factor" | "set-new-password"

const AUTH_MODAL_DISMISS_MS = 320

type LoginModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  activeTab: AuthModalTab
  onActiveTabChange: (tab: AuthModalTab) => void
  content?: LoginModalContent
}

function RememberMeToggle({
  label,
  checked,
  onCheckedChange,
}: {
  label: string
  checked: boolean
  onCheckedChange: (value: boolean) => void
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className="inline-flex cursor-pointer items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#21aeff]/45 focus-visible:ring-offset-2"
    >
      <span
        aria-hidden
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded border-2 border-[#21aeff] bg-white transition-colors",
          checked && "border-[#21aeff] bg-[#21aeff]",
        )}
      >
        {checked ? (
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="block"
            aria-hidden
          >
            <path
              d="M2 6.2L4.8 9L10 3"
              stroke="white"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </span>
      <span className="text-sm font-medium leading-[1.35] text-[#4f586d]">
        {label}
      </span>
    </button>
  )
}

export function LoginModal({
  open,
  onOpenChange,
  activeTab,
  onActiveTabChange,
  content = loginModalContent,
}: LoginModalProps) {
  const [view, setView] = useState<AuthModalView>("login")
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const emailId = useId()
  const passwordId = useId()
  const { assets } = content
  const isLogin = activeTab === "login"
  const isResetView = view === "reset-password"
  const isTwoFactorView = view === "two-factor"
  const isSetNewPasswordView = view === "set-new-password"

  useEffect(() => {
    if (open) return
    const timeout = window.setTimeout(() => {
      setView("login")
      setShowPassword(false)
    }, AUTH_MODAL_DISMISS_MS)
    return () => window.clearTimeout(timeout)
  }, [open])

  const tabs: { id: AuthModalTab; label: string }[] = [
    { id: "login", label: content.loginTabLabel },
    { id: "sign-up", label: content.signUpTabLabel },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        overlayClassName="duration-300 ease-out data-open:duration-300 data-closed:duration-300"
        className="box-border w-[calc(100%-2rem)] min-w-0 max-w-[565px] gap-0 overflow-visible rounded-[20px] border border-[#ebecef] bg-white p-8 shadow-[0px_8px_32px_rgba(39,83,132,0.14)] duration-300 ease-out will-change-[opacity,transform] data-open:duration-300 data-closed:duration-300 data-closed:fade-out-0 data-closed:zoom-out-100 sm:w-full sm:max-w-[565px]"
      >
        <DialogClose
          className="absolute top-[-20px] right-[-22px] z-10 flex h-[42px] w-[43.787px] items-center justify-center overflow-hidden rounded-[10.723px] border-0 bg-[#21aeff] p-0 outline-none transition-colors hover:bg-[#1da3f5] focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-0 focus-visible:outline-none"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={assets.closeIcon}
            width={30.383}
            height={30.383}
            className="block shrink-0"
          />
          <span className="sr-only">Close</span>
        </DialogClose>

        <DialogTitle className="sr-only">
          {isSetNewPasswordView
            ? setNewPasswordModalContent.title
            : isTwoFactorView
              ? twoFactorModalContent.title
              : isResetView
                ? forgotPasswordModalContent.title
                : isLogin
                  ? content.loginTabLabel
                  : content.signUpTabLabel}
        </DialogTitle>

        <AuthModalViewTransition viewKey={view} active={open}>
          {isSetNewPasswordView ? (
            <SetNewPasswordModalBody
              onBack={() => setView("two-factor")}
              onSubmit={() => onOpenChange(false)}
            />
          ) : isTwoFactorView ? (
            <TwoFactorModalBody
              onBack={() => setView("reset-password")}
              onContinue={() => setView("set-new-password")}
            />
          ) : isResetView ? (
            <ForgotPasswordModalBody
              onBack={() => setView("login")}
              onContinue={() => setView("two-factor")}
            />
          ) : (
            <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={assets.logomark}
              width={32}
              height={32}
              className="block shrink-0"
            />
            <span className="bg-gradient-to-r from-[#f27b34] via-[#d8366b] to-[#7e359c] bg-clip-text text-lg font-bold leading-[1.2] tracking-[-0.02em] text-transparent">
              {content.brandTitle}
            </span>
          </div>

          <div
            role="tablist"
            aria-label="Authentication"
            className="flex h-[54px] w-full gap-2 rounded-2xl border border-[#1e92ff] bg-[#f5f6f7] p-1"
          >
            {tabs.map((tab) => {
              const active = tab.id === activeTab
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => onActiveTabChange(tab.id)}
                  className={cn(
                    "relative flex h-full min-w-0 flex-1 items-center justify-center rounded-xl text-base font-semibold leading-[1.35] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#269de7]/45 focus-visible:ring-offset-1",
                    active ? "text-white" : "text-[#404a60] hover:text-[#343e56]",
                  )}
                >
                  {active ? (
                    <SlidingTabPill
                      layoutId={LAYOUT_IDS.authModal}
                      className="rounded-xl bg-[#269de7]"
                    />
                  ) : null}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              )
            })}
          </div>

          <form
            className="flex w-full flex-col gap-5"
            onSubmit={(event) => {
              event.preventDefault()
            }}
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor={emailId}
                className="text-sm font-medium leading-[1.35] text-[#343e56]"
              >
                {content.emailLabel}
              </label>
              <div className="flex h-[54px] items-center gap-3 rounded-xl border border-[#ebecef] bg-white px-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={assets.mailIcon}
                  width={20}
                  height={20}
                  className="size-5 shrink-0 object-contain opacity-70"
                />
                <input
                  id={emailId}
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder={content.emailPlaceholder}
                  className="min-w-0 flex-1 bg-transparent text-base font-medium leading-[1.35] text-[#343e56] placeholder:text-[#979ca8] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor={passwordId}
                className="text-sm font-medium leading-[1.35] text-[#343e56]"
              >
                {content.passwordLabel}
              </label>
              <div className="flex h-[54px] items-center gap-3 rounded-xl border border-[#ebecef] bg-white px-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={assets.lockIcon}
                  width={20}
                  height={20}
                  className="size-5 shrink-0 object-contain opacity-70"
                />
                <input
                  id={passwordId}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  placeholder={content.passwordPlaceholder}
                  className="min-w-0 flex-1 bg-transparent text-base font-medium leading-[1.35] text-[#343e56] placeholder:text-[#979ca8] focus:outline-none"
                />
                <button
                  type="button"
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((value) => !value)}
                  className="flex size-7 shrink-0 items-center justify-center rounded-md opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#21aeff]/45"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    src={showPassword ? assets.eyeIcon : assets.eyeOffIcon}
                    width={20}
                    height={20}
                    className="pointer-events-none block"
                  />
                </button>
              </div>
            </div>

            {isLogin ? (
              <div className="flex flex-wrap items-center justify-between gap-3">
                <RememberMeToggle
                  label={content.rememberMeLabel}
                  checked={rememberMe}
                  onCheckedChange={setRememberMe}
                />
                <button
                  type="button"
                  className="text-sm font-medium leading-[1.35] text-[#21aeff] hover:underline"
                  onClick={() => setView("reset-password")}
                >
                  {content.forgotPasswordLabel}
                </button>
              </div>
            ) : null}

            {isLogin ? (
              <button
                type="submit"
                className="flex h-[54px] w-full items-center justify-center rounded-xl bg-[#269de7] text-base font-medium leading-[1.35] text-white shadow-none transition-[box-shadow] hover:shadow-[0px_4px_14px_rgba(38,157,231,0.4)]"
              >
                {content.submitLoginLabel}
              </button>
            ) : (
              <LinkTo
                href={content.signUpHref}
                className="flex h-[54px] w-full items-center justify-center rounded-xl bg-[#269de7] text-base font-medium leading-[1.35] text-white shadow-none transition-[box-shadow] hover:shadow-[0px_4px_14px_rgba(38,157,231,0.4)]"
                onClick={() => onOpenChange(false)}
              >
                {content.signUpSubmitLabel}
              </LinkTo>
            )}
          </form>

          {isLogin ? (
            <>
              <p className="text-center text-sm font-medium leading-[1.35] text-[#979ca8]">
                {content.orLoginWithLabel}
              </p>
              <button
                type="button"
                className="flex h-[54px] w-full items-center justify-center gap-3 rounded-xl border border-[#ebecef] bg-white text-base font-medium leading-[1.35] text-[#343e56] transition-colors hover:border-[#c5e8fc] hover:bg-[#fafafa]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" src={assets.googleIcon} width={22} height={22} className="block shrink-0" />
                {content.googleCtaLabel}
              </button>
            </>
          ) : null}

          <p className="text-center text-sm font-medium leading-[1.35] text-[#4f586d]">
            {isLogin ? content.noAccountPrompt : content.haveAccountPrompt}{" "}
            {isLogin ? (
              <button
                type="button"
                className="font-semibold text-[#21aeff] hover:underline"
                onClick={() => onActiveTabChange("sign-up")}
              >
                {content.signUpNowLabel}
              </button>
            ) : (
              <button
                type="button"
                className="font-semibold text-[#21aeff] hover:underline"
                onClick={() => onActiveTabChange("login")}
              >
                {content.loginNowLabel}
              </button>
            )}
          </p>
            </div>
          )}
        </AuthModalViewTransition>
      </DialogContent>
    </Dialog>
  )
}
