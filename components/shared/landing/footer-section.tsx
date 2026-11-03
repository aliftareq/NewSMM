import { landingFooterContent } from "@/data/landing/footer"
import type { LandingFooterContent } from "@/types/landing/footer"

import { FooterBottomBar } from "@/components/shared/landing/footer-bottom-bar"
import { FooterBrandColumn } from "@/components/shared/landing/footer-brand-column"
import { FooterContactColumn } from "@/components/shared/landing/footer-contact-column"
import { FooterCta } from "@/components/shared/landing/footer-cta"
import { FooterDecorations } from "@/components/shared/landing/footer-decorations"
import { FooterLinkColumn } from "@/components/shared/landing/footer-link-column"
import { FooterTrustBadges } from "@/components/shared/landing/footer-trust-badges"

type FooterSectionProps = {
  content?: LandingFooterContent
}

export function FooterSection({
  content = landingFooterContent,
}: FooterSectionProps) {
  return (
    <footer className="relative overflow-hidden bg-primary-black pt-[100px] text-white">
      <FooterDecorations assets={content.assets} />

      <div className="info-container relative flex flex-col gap-[68px]">
        <FooterCta cta={content.cta} />

        <div className="flex flex-col gap-[60px] pb-12">
          <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:justify-between">
            <FooterBrandColumn brand={content.brand} />
            <FooterLinkColumn
              title={content.quickLinks.title}
              links={content.quickLinks.links}
              className="w-[160px] shrink-0"
            />
            <FooterLinkColumn
              title={content.services.title}
              links={content.services.links}
              className="w-[173px] shrink-0"
            />
            <FooterContactColumn contact={content.contact} />
          </div>

          <FooterTrustBadges badges={content.trustBadges} />
          <FooterBottomBar legal={content.legal} />
        </div>
      </div>
    </footer>
  )
}
