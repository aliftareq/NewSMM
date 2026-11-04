import { FaqSection } from "@/components/shared/landing/faq/faq-section"
import { FooterSection } from "@/components/shared/landing/footer-section"
import { PreFooterCtaSection } from "@/components/shared/landing/pre-footer-cta-section"

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-full flex-col">
      <div className="flex-1">{children}</div>
      <FaqSection />
      <PreFooterCtaSection />
      <FooterSection />
    </div>
  )
}
