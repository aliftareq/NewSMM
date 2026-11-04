import { LandingTorusDecoration } from "@/components/shared/landing/landing-torus-decoration"
import { landingWhyChooseUsContent } from "@/data/landing/why-choose-us"

/** Figma 25704:30885 — top-right torus (247×244) */
export function WhyChooseUsSectionDecorations() {
  return (
    <LandingTorusDecoration
      src={landingWhyChooseUsContent.decorationSrc}
      className="absolute -top-[88px] -right-[53px] z-0 hidden h-[244px] w-[247px] xl:block"
    />
  )
}
