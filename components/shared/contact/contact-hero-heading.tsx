import { LandingSectionBadge } from "@/components/shared/landing/landing-section-badge"
import type { ContactPageContent } from "@/types/contact/contact"

type ContactHeroHeadingProps = {
  hero: ContactPageContent["hero"]
}

export function ContactHeroHeading({ hero }: ContactHeroHeadingProps) {
  return (
    <div className="flex w-full flex-col items-center gap-3 text-center">
      <LandingSectionBadge label={hero.badgeLabel} />
      <h1 className="text-[36px] font-bold leading-[1.35] tracking-[0.36px] text-[#0e0e0e]">
        {hero.title}{" "}
        <span className="text-brand">{hero.titleHighlight}</span>
      </h1>
      <p className="max-w-[669px] text-base font-normal leading-[1.5] text-n600">
        {hero.description}
      </p>
    </div>
  )
}
