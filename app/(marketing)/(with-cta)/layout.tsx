import { CtaSection } from "@/components/shared/landing/cta-section"

export default function MarketingWithCtaLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
      <CtaSection />
    </>
  )
}
