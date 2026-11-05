const CHECKMARK_SRC = "/images/landing/about/checkmark-starburst.svg"

type HeroFeatureBadgesProps = {
  items: string[]
}

export function HeroFeatureBadges({ items }: HeroFeatureBadgesProps) {
  const rows = [items.slice(0, 2), items.slice(2, 4)].filter((row) => row.length > 0)

  return (
    <div className="flex flex-col gap-3">
      {rows.map((row, rowIndex) => (
        <div
          key={`hero-feature-row-${rowIndex}`}
          className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5"
        >
          {row.map((label) => (
            <div key={label} className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={CHECKMARK_SRC}
                width={18}
                height={18}
                className="size-[18px] shrink-0"
              />
              <p className="text-base font-medium leading-[1.35] text-n600">{label}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
