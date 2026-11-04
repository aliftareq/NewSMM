import { HowItWorksStepIllustration } from "@/components/shared/landing/how-it-works/how-it-works-step-illustration"
import { landingHowItWorksData } from "@/data/landing/how-it-works"
import { cn } from "@/lib/utils"
import type { HowItWorksData, HowItWorksStep } from "@/types/landing/how-it-works"

type HowItWorksSectionProps = {
  content?: HowItWorksData
  className?: string
}

function HowItWorksStepColumn({ step }: { step: HowItWorksStep }) {
  return (
    <article
      data-slot="how-it-works-step"
      className="flex min-w-0 flex-1 flex-col"
    >
      <div className="flex h-[78px] shrink-0 items-center justify-center rounded-2xl bg-[#269de7] p-6 shadow-[0px_6px_8px_0px_rgba(0,0,0,0.12)]">
        <p className="w-full text-center text-2xl font-medium leading-none text-white">
          {step.stepLabel}
        </p>
      </div>

      <div className="flex h-[200px] shrink-0 items-center justify-center border-x border-dashed border-[#dfe0e4] px-6 py-5">
        <HowItWorksStepIllustration step={step} />
      </div>

      <div className="flex min-h-[132px] shrink-0 flex-col justify-center rounded-2xl bg-[#f5f6f7] p-6">
        <h3 className="text-xl font-medium leading-[1.3] text-[#13203b]">{step.title}</h3>
        <p className="mt-2 text-sm font-medium leading-[1.35] text-n600">
          {step.description}
        </p>
      </div>
    </article>
  )
}

/** Figma 25704:29483 — How it works */
export function HowItWorksSection({
  content = landingHowItWorksData,
  className,
}: HowItWorksSectionProps) {
  const { intro, steps } = content

  return (
    <section
      data-slot="how-it-works-section"
      className={cn("relative w-full bg-white", className)}
    >
      <div className="info-container flex flex-col items-center gap-[60px] py-16 md:py-20">
        <div className="flex max-w-[705px] flex-col items-center gap-3 text-center">
          <div className="stats-highlight-subheading shrink-0 overflow-visible rounded-[33px] border-[0.5px] border-[#e8e8e3] bg-white/50 px-2 py-1">
            <div className="overflow-visible rounded-full border border-white bg-[#fafafa] px-3 py-1.5 shadow-[0px_2px_1.5px_0px_rgba(183,183,183,0.25)]">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="relative flex size-2.5 shrink-0 items-center justify-center overflow-visible"
                >
                  <span className="section-heading-dot-ripple" />
                  <span className="section-heading-dot-ripple section-heading-dot-ripple--delayed" />
                  <span className="relative z-1 block size-1 rounded-full bg-button shadow-[0_0_4px_2px_rgba(38,157,231,0.45)]" />
                </span>
                <p className="section-subtitle-label text-button font-medium">
                  {intro.badgeLabel}
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-[32px] font-semibold leading-normal text-black">
            {intro.headingPrefix}
            <span className="text-button">{intro.headingHighlight}</span>
          </h2>

          <p className="text-base leading-normal text-n600">{intro.description}</p>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <HowItWorksStepColumn key={step.id} step={step} />
          ))}
        </div>
      </div>
    </section>
  )
}
