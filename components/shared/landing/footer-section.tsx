import { landingFooterContent } from "@/data/landing/footer"
import type { LandingFooterContent } from "@/types/landing/footer"

import { AnimatedContent } from "@/components/shared/animated-content"
import { landingScrollRevealProps } from "@/components/shared/landing/landing-section-heading-reveal"
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
    <footer className="relative isolate overflow-clip bg-primary-black pt-12 text-white sm:pt-16 md:pt-20 xl:pt-[100px]">
      <FooterDecorations assets={content.assets} />

      <div className="info-container relative z-[6] flex flex-col items-center gap-10 px-4 sm:gap-12 sm:px-6 lg:px-8 xl:gap-[68px]">
        <AnimatedContent className="w-full" {...landingScrollRevealProps}>
          <FooterCta
            cta={content.cta}
            glareStarLeft={content.assets.glareStarLeft}
            glareStarRight={content.assets.glareStarRight}
          />
        </AnimatedContent>

        <div className="flex w-full flex-col items-center gap-10 pb-8 sm:gap-12 sm:pb-10 xl:gap-[60px] xl:pb-12">
          <AnimatedContent
            className="flex w-full flex-col gap-10 xl:flex-row xl:items-start xl:justify-between xl:gap-[133px]"
            {...landingScrollRevealProps}
            delay={0.05}
          >
            <FooterBrandColumn brand={content.brand} />

            <div className="grid w-full min-w-0 grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 md:gap-x-12 xl:contents">
              <FooterLinkColumn
                title={content.quickLinks.title}
                links={content.quickLinks.links}
                className="w-full min-w-0 xl:w-[160px] xl:shrink-0"
              />
              <FooterLinkColumn
                title={content.services.title}
                links={content.services.links}
                className="w-full min-w-0 xl:w-[173px] xl:shrink-0"
              />
              <FooterContactColumn
                contact={content.contact}
                className="sm:col-span-2 xl:col-span-1"
              />
            </div>
          </AnimatedContent>

          <AnimatedContent
            className="flex w-full flex-col gap-10 sm:gap-12 xl:gap-[60px]"
            {...landingScrollRevealProps}
            delay={0.08}
            stagger={0}
          >
            <FooterTrustBadges badges={content.trustBadges} />
            <FooterBottomBar legal={content.legal} />
          </AnimatedContent>
        </div>
      </div>
    </footer>
  )
}
