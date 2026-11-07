import { LinkTo } from "@/components/shared/link-to"
import { cn } from "@/lib/utils"

type BlogBreadcrumbItem = {
  label: string
  href?: string
  isCurrent?: boolean
}

type BlogBreadcrumbProps = {
  items: BlogBreadcrumbItem[]
  chevronSrc: string
  mutedClassName?: string
}

export function BlogBreadcrumb({
  items,
  chevronSrc,
  mutedClassName = "text-[#6a7283]",
}: BlogBreadcrumbProps) {
  return (
    <nav
      className="flex flex-wrap items-center gap-1 rounded-lg bg-white px-4 py-2.5"
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <span key={`${item.label}-${index}`} className="flex items-center gap-1">
            {item.href && !item.isCurrent ? (
              <LinkTo
                href={item.href}
                className={cn(
                  "text-base font-medium leading-[1.18]",
                  item.isCurrent ? "text-brand" : mutedClassName,
                )}
              >
                {item.label}
              </LinkTo>
            ) : (
              <span
                className={cn(
                  "text-base font-medium leading-[1.18]",
                  item.isCurrent ? "text-brand" : mutedClassName,
                )}
                aria-current={item.isCurrent ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
            {!isLast ? (
              <span
                className="relative flex size-4 shrink-0 items-center justify-center"
                aria-hidden
              >
                <span className="-rotate-90">
                  <span className="relative block size-4 overflow-hidden">
                    <span className="absolute inset-[33.3%_21.07%_33.35%_20.83%]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt=""
                        src={chevronSrc}
                        width={9}
                        height={5}
                        className="absolute inset-0 block size-full max-w-none"
                      />
                    </span>
                  </span>
                </span>
              </span>
            ) : null}
          </span>
        )
      })}
    </nav>
  )
}
