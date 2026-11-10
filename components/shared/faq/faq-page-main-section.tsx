import { FaqPagePanel } from "@/components/shared/faq/faq-page-panel"
import type { FaqPageContent } from "@/types/faq/faq-page"

type FaqPageMainSectionProps = Pick<
  FaqPageContent,
  "faq" | "searchPlaceholder" | "categories" | "assets"
>

export function FaqPageMainSection({
  faq,
  searchPlaceholder,
  categories,
  assets,
}: FaqPageMainSectionProps) {
  return (
    <section
      className="relative z-10 bg-white pb-14 pt-4 sm:pb-16 sm:pt-6 lg:pb-20 lg:pt-20"
      aria-label="FAQ list"
    >
      <div className="info-container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1320px]">
          <FaqPagePanel
            content={{
              faq,
              searchPlaceholder,
              categories,
              assets,
            }}
          />
        </div>
      </div>
    </section>
  )
}
