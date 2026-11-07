import { MarketingCtaShell } from "@/app/(marketing)/_components/marketing-cta-shell"

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <MarketingCtaShell>{children}</MarketingCtaShell>
}
