import { FooterSection } from "@/components/shared/landing/footer-section"
import { CtaSection } from "@/components/shared/landing/cta-section"

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-full flex-col overflow-x-clip">
      <div className="flex-1">{children}</div>
      <CtaSection />
      <FooterSection />
    </div>
  )
}
