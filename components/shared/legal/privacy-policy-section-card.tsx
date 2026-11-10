import type { PrivacyPolicySection } from "@/types/legal/privacy-policy-page"

type PrivacyPolicySectionCardProps = {
  section: PrivacyPolicySection
}

export function PrivacyPolicySectionCard({
  section,
}: PrivacyPolicySectionCardProps) {
  return (
    <article className="flex w-full flex-col gap-6 rounded-2xl border border-n30 bg-n20 p-5">
      <div className="flex w-full items-center justify-between rounded-xl bg-white px-3 py-1">
        <div className="flex min-w-0 flex-1 items-center p-2.5">
          <h2 className="text-base font-medium leading-[1.18] text-[#202020]">
            {section.title}
          </h2>
        </div>
      </div>
      <p className="w-full text-sm font-normal leading-[1.35] text-n700">
        {section.body}
      </p>
    </article>
  )
}
