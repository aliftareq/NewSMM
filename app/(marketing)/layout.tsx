import { CustomerReviewsSection } from "@/components/shared/landing/customer-reviews/customer-reviews-section"
import { WhyChooseUsSection } from "@/components/shared/landing/why-choose-us/why-choose-us-section"
import { FaqSection } from "@/components/shared/landing/faq/faq-section"
import { FooterSection } from "@/components/shared/landing/footer-section"
import { PreFooterCtaSection } from "@/components/shared/landing/pre-footer-cta-section"

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-full flex-col overflow-x-clip">
      <div className="flex-1">{children}</div>
      <WhyChooseUsSection />
      <CustomerReviewsSection />
      <FaqSection />
      <PreFooterCtaSection />
      <FooterSection />
    </div>
  )
}
