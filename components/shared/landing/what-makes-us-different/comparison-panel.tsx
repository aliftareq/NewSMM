import Image from "next/image"

import { ComparisonFeatureList } from "@/components/shared/landing/what-makes-us-different/comparison-feature-list"
import { ComparisonSideLabel } from "@/components/shared/landing/what-makes-us-different/comparison-side-label"
import { cn } from "@/lib/utils"

type ComparisonPanelProps = {
  variant: "positive" | "negative"
  sideLabel: string
  features: readonly string[]
  checkIconSrc: string
  crossIconSrc: string
  logomarkSrc: string
  positiveBrandLinePrimary: string
  positiveBrandLineAccent: string
  negativeHeaderTitle: string
}

export function ComparisonPanel({
  variant,
  sideLabel,
  features,
  checkIconSrc,
  crossIconSrc,
  logomarkSrc,
  positiveBrandLinePrimary,
  positiveBrandLineAccent,
  negativeHeaderTitle,
}: ComparisonPanelProps) {
  const isPositive = variant === "positive"
  const iconSrc = isPositive ? checkIconSrc : crossIconSrc

  const card = (
    <ComparisonCard
      variant={variant}
      logomarkSrc={logomarkSrc}
      positiveBrandLinePrimary={positiveBrandLinePrimary}
      positiveBrandLineAccent={positiveBrandLineAccent}
      negativeHeaderTitle={negativeHeaderTitle}
    >
      <ComparisonFeatureList features={features} iconSrc={iconSrc} />
    </ComparisonCard>
  )

  return (
    <div
      className={cn(
        "flex w-full max-w-[460px] flex-col items-stretch xl:flex-row xl:items-center",
      )}
    >
      <ComparisonSideLabel
        label={sideLabel}
        variant={variant}
        className={cn(isPositive ? "order-first xl:order-last" : "order-first")}
      />

      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col",
          isPositive ? "order-last xl:order-first" : "order-last",
        )}
      >
        {card}
      </div>
    </div>
  )
}

function ComparisonCard({
  variant,
  children,
  logomarkSrc,
  positiveBrandLinePrimary,
  positiveBrandLineAccent,
  negativeHeaderTitle,
}: {
  variant: "positive" | "negative"
  children: React.ReactNode
  logomarkSrc: string
  positiveBrandLinePrimary: string
  positiveBrandLineAccent: string
  negativeHeaderTitle: string
}) {
  const isPositive = variant === "positive"

  return (
    <article
      className={cn(
        "box-border w-full max-w-[400px] rounded-b-[20px] rounded-t-none border border-[#ebecef] bg-white px-1 pb-8 pt-1 xl:rounded-[20px]",
        isPositive
          ? "shadow-[0px_6px_20px_-12px_rgba(192,232,255,0.51)]"
          : "shadow-[0px_6px_56px_-12px_#ffecf0]",
      )}
    >
      <div
        className={cn(
          "mb-6 flex items-center rounded-2xl p-6 sm:p-8",
          isPositive ? "bg-[#e1f4ff]" : "bg-[#ffeded]",
        )}
      >
        {isPositive ? (
          <div className="flex items-center gap-2">
            <div className="relative h-[39px] w-[50px] shrink-0">
              <Image
                src={logomarkSrc}
                alt=""
                width={50}
                height={39}
                className="size-full object-contain"
              />
            </div>
            <p className="text-xl font-semibold leading-[1.35] text-[#202020]">
              {positiveBrandLinePrimary}
              <span className="text-[#21aeff]">{positiveBrandLineAccent}</span>
            </p>
          </div>
        ) : (
          <p className="bg-gradient-to-b from-[#f25b7a] to-[#ea3418] bg-clip-text text-xl font-semibold uppercase leading-[1.4] tracking-[-0.02em] text-transparent">
            {negativeHeaderTitle}
          </p>
        )}
      </div>
      {children}
    </article>
  )
}
