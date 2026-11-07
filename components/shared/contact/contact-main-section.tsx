import { ContactForm } from "@/components/shared/contact/contact-form"
import { LinkTo } from "@/components/shared/link-to"
import type { ContactPageContent } from "@/types/contact/contact"

type ContactMainSectionProps = Pick<
  ContactPageContent,
  "form" | "supportChannels" | "assets"
>

export function ContactMainSection({
  form,
  supportChannels,
  assets,
}: ContactMainSectionProps) {
  return (
    <section
      className="relative z-10 bg-white py-20"
      aria-labelledby="contact-form-heading"
    >
      <h2 id="contact-form-heading" className="sr-only">
        Contact form and support
      </h2>
      <div className="info-container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-[18px] rounded-2xl bg-n20 p-[18px]">
          <div className="flex w-full flex-col items-stretch justify-between gap-8 rounded-[18px] border border-solid border-n30 bg-white p-6 lg:flex-row lg:gap-10 lg:p-6">
            <ContactForm
              fields={form.fields}
              submitLabel={form.submitLabel}
              submitArrowSrc={assets.submitArrowSrc}
            />

            <div className="relative mx-auto h-[320px] w-full max-w-[430px] shrink-0 overflow-hidden rounded-[22px] bg-white sm:h-[420px] lg:mx-0 lg:h-[540px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={assets.supportPhotoSrc}
                width={430}
                height={540}
                className="size-full object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-[22px] bg-[rgba(67,67,67,0.2)]"
                aria-hidden
              />
            </div>
          </div>

          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            {supportChannels.map((channel) => (
              <article
                key={channel.id}
                className="flex flex-col items-center justify-center rounded-[18px] border-[0.7px] border-solid border-n30 bg-white p-6"
              >
                <div className="flex w-full flex-col items-center justify-center gap-6">
                  <div className="relative h-[68px] w-[69px] shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt=""
                      src={channel.iconSrc}
                      width={69}
                      height={68}
                      className="size-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-4 text-center">
                    <h3 className="text-lg font-semibold leading-[1.5] text-[#181818]">
                      {channel.title}
                    </h3>
                    <LinkTo
                      href={channel.href}
                      className="text-lg font-medium leading-[1.5] text-brand underline"
                    >
                      {channel.value}
                    </LinkTo>
                    <p className="max-w-[316px] text-base font-normal leading-[1.35] text-[#3c3c3c]">
                      {channel.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
