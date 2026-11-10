import { MarketingNavbar } from "@/components/shared/landing/marketing-navbar"

export default function OrderFlowLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-full flex-col overflow-x-clip">
      <MarketingNavbar className="relative z-20 border-b border-[#f5f6f7] bg-white" />
      <div className="flex-1">{children}</div>
    </div>
  )
}
