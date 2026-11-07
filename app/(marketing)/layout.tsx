import { FooterSection } from "@/components/shared/landing/footer-section"

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-full flex-col overflow-x-clip">
      <div className="flex-1">{children}</div>
      <FooterSection />
    </div>
  )
}
