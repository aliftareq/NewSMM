import type { ReactNode } from "react"

import { LinkTo } from "@/components/shared/link-to"
import { cn } from "@/lib/utils"

export function DashboardHomeCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        "w-full rounded-2xl bg-white p-6",
        className,
      )}
    >
      {children}
    </section>
  )
}

export function DashboardHomeCardTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-xl font-semibold leading-[1.35] text-[#222e48]">
      {children}
    </h2>
  )
}

export function DashboardHomeCardDivider({ src }: { src: string }) {
  return (
    <div className="relative h-px w-full shrink-0" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" src={src} className="block h-px w-full max-w-none" />
    </div>
  )
}

export function DashboardHomeLinkArrow({ src }: { src: string }) {
  return (
    <span className="inline-flex size-5 shrink-0 items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" src={src} width={20} height={20} className="block size-5 rotate-180" />
    </span>
  )
}

export function DashboardHomeTextLink({
  href,
  children,
  arrowSrc,
  className,
}: {
  href: string
  children: ReactNode
  arrowSrc: string
  className?: string
}) {
  return (
    <LinkTo
      href={href}
      className={cn(
        "inline-flex items-center gap-1 text-base font-medium leading-[1.35] text-[#21aeff]",
        className,
      )}
    >
      {children}
      <DashboardHomeLinkArrow src={arrowSrc} />
    </LinkTo>
  )
}

export function DashboardHomeOutlineButton({
  href,
  onClick,
  children,
  className,
  iconSrc,
}: {
  href?: string
  onClick?: () => void
  children: ReactNode
  className?: string
  iconSrc?: string
}) {
  const body = (
    <>
      {iconSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img alt="" src={iconSrc} width={18} height={18} className="size-[18px] shrink-0" />
      ) : null}
      <span>{children}</span>
    </>
  )

  const classes = cn(
    "inline-flex h-auto items-center justify-center gap-1.5 rounded-lg border border-[#21aeff] bg-white px-3 py-2.5 text-base font-medium leading-[1.35] text-[#21aeff] transition-colors hover:bg-[#f0f9ff]",
    iconSrc && "pl-2 pr-3",
    className,
  )

  if (href) {
    return (
      <LinkTo href={href} className={classes}>
        {body}
      </LinkTo>
    )
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {body}
    </button>
  )
}

export function DashboardHomePrimaryButton({
  href,
  children,
  className,
  type = "button",
}: {
  href?: string
  children: ReactNode
  className?: string
  type?: "button" | "submit"
}) {
  const classes = cn(
    "inline-flex h-[54px] min-w-[120px] items-center justify-center rounded-xl bg-[#269de7] px-8 text-base font-medium leading-[1.35] text-white transition-opacity hover:opacity-95",
    className,
  )

  if (href) {
    return (
      <LinkTo href={href} className={cn(classes, "w-full")}>
        {children}
      </LinkTo>
    )
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  )
}

export function DashboardHomeGhostRow({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-[10px] border border-[#f5f6f7] bg-[#f5f6f7] px-3.5 py-4",
        className,
      )}
    >
      {children}
    </div>
  )
}

export function DashboardHomeMutedRow({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[#ebecef] bg-[#fafafb] px-3.5 py-3.5",
        className,
      )}
    >
      {children}
    </div>
  )
}