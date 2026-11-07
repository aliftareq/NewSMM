import { CtaSection } from "@/components/shared/landing/cta-section"

export function MarketingCtaShell({
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
