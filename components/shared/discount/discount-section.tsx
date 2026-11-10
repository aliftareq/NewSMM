import { LandingSectionBadge } from "@/components/shared/landing/landing-section-badge"
import { LinkTo } from "@/components/shared/link-to"
import type { DiscountPageContent } from "@/types/discount/discount-page"

type DiscountSectionProps = {
  content: DiscountPageContent["discountSection"]
}

export function DiscountSection({ content }: DiscountSectionProps) {
  return (
    <section
      className="relative z-10 bg-[#edf8fe] py-[60px]"
      aria-label="Video discount program"
      data-slot="discount-section"
    >
      <div className="info-container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col items-center gap-[60px]">
          <div className="flex w-full max-w-[783px] flex-col items-center gap-3 text-center">
            <LandingSectionBadge label={content.badgeLabel} />
            <h2 className="text-[32px] font-semibold leading-none text-black">
              {content.title}
              <span className="text-brand">{content.titleHighlight}</span>
            </h2>
            <p className="text-base font-normal leading-[1.5] text-n600">
              {content.description}
            </p>
          </div>

          <div className="flex w-full flex-col gap-6">
            <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
              {content.steps.map((step) => (
                <article
                  key={step.id}
                  className="flex w-full flex-col rounded-2xl bg-white p-5"
                >
                  <div className="flex w-full flex-col gap-7">
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-xl border border-n40 bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt=""
                        src={step.iconSrc}
                        width={33}
                        height={33}
                        className="absolute left-1/2 top-1/2 size-[33px] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain"
                      />
                    </div>

                    <div className="flex w-full flex-col gap-4">
                      <h3 className="text-xl font-medium leading-[1.25] text-[#202020]">
                        {step.title}
                      </h3>
                      <ul className="flex max-w-[281px] flex-col gap-2">
                        {step.items.map((item) => (
                          <li
                            key={`${step.id}-${item.text}${item.emailLabel ?? ""}`}
                            className="list-disc text-sm font-medium leading-[1.35] text-[#4f586d] marker:text-[#4f586d] ms-[21px]"
                          >
                            {item.text}
                            {item.emailHref && item.emailLabel ? (
                              <a
                                href={item.emailHref}
                                className="text-brand underline decoration-solid underline-offset-2"
                              >
                                {item.emailLabel}
                              </a>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="flex w-full flex-col items-start justify-between gap-4 rounded-2xl border border-n30 bg-white px-6 py-4 shadow-[0px_4px_3px_rgba(63,63,63,0.12)] sm:flex-row sm:items-center">
              <div className="flex min-w-0 items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={content.giftCta.giftBoxSrc}
                  width={58}
                  height={63}
                  className="block h-[63px] w-[58px] shrink-0 object-contain"
                />
                <div className="flex min-w-0 max-w-[630px] flex-col gap-1.5">
                  <p className="text-xl font-medium leading-[1.3] text-[#269de7]">
                    {content.giftCta.title}
                  </p>
                  <p className="text-sm font-medium leading-[1.35] text-[#4f586d]">
                    {content.giftCta.description}
                  </p>
                </div>
              </div>

              <LinkTo
                href={content.giftCta.href}
                className="inline-flex shrink-0 cursor-pointer items-center rounded-xl border border-n40 bg-brand px-5 py-3 text-base font-medium leading-[1.35] text-white shadow-[0px_4px_3px_rgba(63,63,63,0.12)]"
              >
                {content.giftCta.buttonLabel}
              </LinkTo>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
