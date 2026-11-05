import { landingFooterContent } from "@/data/landing/footer"
import type { LandingFooterContent } from "@/types/landing/footer"

import { FooterDecorations } from "@/components/shared/landing/footer-decorations"
import { FooterSectionBody } from "@/components/shared/landing/footer-section-body"

type FooterSectionProps = {
  content?: LandingFooterContent
}

export function FooterSection({
  content = landingFooterContent,
}: FooterSectionProps) {
  return (
    <footer className="relative isolate overflow-clip bg-primary-black pt-12 text-white sm:pt-16 md:pt-20 xl:pt-[100px]">
      <FooterDecorations assets={content.assets} />
      <FooterSectionBody content={content} />
    </footer>
  )
}
