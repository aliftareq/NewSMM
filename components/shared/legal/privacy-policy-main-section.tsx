import {
  PrivacyPolicyContentPanel,
} from "@/components/shared/legal/privacy-policy-content-panel"
import type { LegalDocumentActiveTab } from "@/components/shared/legal/privacy-policy-toolbar"
import type { PrivacyPolicyPageContent } from "@/types/legal/privacy-policy-page"

type PrivacyPolicyMainSectionProps = Pick<
  PrivacyPolicyPageContent,
  "sections" | "searchPlaceholder" | "tabs" | "assets"
> & {
  activeTab: LegalDocumentActiveTab
  ariaLabel: string
}

export function PrivacyPolicyMainSection({
  ariaLabel,
  ...props
}: PrivacyPolicyMainSectionProps) {
  return (
    <section
      className="relative z-10 bg-white pb-14 pt-4 sm:pb-16 sm:pt-6 lg:pb-20 lg:pt-20"
      aria-label={ariaLabel}
    >
      <div className="info-container px-4 sm:px-6 lg:px-8">
        <PrivacyPolicyContentPanel {...props} />
      </div>
    </section>
  )
}
