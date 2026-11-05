import { serviceHeroContent } from "@/data/service/hero"
import type { ServiceHeroContent } from "@/types/service/hero"
import { ServiceHeroReviews } from "@/components/shared/service/service-hero-reviews"
import { cn } from "@/lib/utils"

type ServiceHeroIntroProps = {
  content?: ServiceHeroContent["intro"]
  className?: string
}

export function ServiceHeroIntro({
  content = serviceHeroContent.intro,
  className,
}: ServiceHeroIntroProps) {
  const { trustCard } = content

  return (
    <div
      className={cn(
        "flex w-full max-w-[594px] flex-col items-start gap-[18px] p-0",
        className,
      )}
    >
      <div className="flex flex-col items-start gap-3">
        <ServiceHeroReviews />
      </div>

      <div className="flex w-full flex-col items-start gap-7">
        <div className="flex w-full flex-col items-start gap-3">
          <h1 className="w-full bg-gradient-to-r from-[#f27b34] via-[#d8366b] to-[#7e359c] bg-clip-text text-[32px] font-bold leading-[1.2] tracking-[-0.02em] text-transparent sm:text-[40px] lg:text-[48px]">
            {content.title}
          </h1>
          <p className="w-full text-base font-medium leading-[1.35] text-[#4f586d]">
            {content.description}
          </p>
        </div>

        <div className="box-border flex w-full max-w-[547px] items-center rounded-xl border-[1.3px] border-[#dfe0e4] bg-white p-5">
          <div className="flex min-w-0 flex-1 flex-col items-start gap-[18px]">
            <div className="flex w-full flex-col items-start gap-4">
              <p className="w-full text-base font-medium leading-[1.35] text-[#343e56]">
                {trustCard.paymentTitle}
              </p>
              <div className="flex w-full flex-wrap items-center justify-center gap-[10px]">
                {trustCard.paymentLogos.map((logo, index) =>
                  logo.type === "wallet" ? (
                    <div
                      key={`wallet-${index}`}
                      className="relative flex h-[38px] w-[73.765px] shrink-0 items-center justify-center gap-[4.47px] overflow-hidden rounded-[6.706px] bg-white shadow-[0px_2.235px_6.706px_0px_rgba(65,65,65,0.12)]"
                    >
                      {logo.iconClassName ? (
                        <span className="relative block h-[26.824px] w-[26.408px] shrink-0 overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            alt=""
                            src={logo.iconSrc}
                            className={logo.iconClassName}
                          />
                        </span>
                      ) : (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          alt=""
                          src={logo.iconSrc}
                          className="size-[26.824px] shrink-0 object-contain"
                        />
                      )}
                      <span className="text-[15.088px] font-medium leading-[1.25] text-[#202020]">
                        {logo.label}
                      </span>
                    </div>
                  ) : (
                    <div
                      key={logo.src}
                      className="relative h-[38px] w-[73.765px] shrink-0 overflow-hidden rounded-[6.706px] bg-white shadow-[0px_2.235px_6.706px_0px_rgba(65,65,65,0.12)]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img alt="" src={logo.src} className={logo.className} />
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="relative h-0 w-full shrink-0 self-stretch">
              <div className="absolute inset-[-1px_0_0_0]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={trustCard.dividerSrc}
                  className="block size-full max-w-none"
                />
              </div>
            </div>

            <div className="flex w-full flex-col items-start gap-4">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={trustCard.backupIconSrc}
                  width={24}
                  height={24}
                  className="size-6 shrink-0"
                />
                <p className="text-xl font-medium leading-[1.25] text-[#21aeff]">
                  {trustCard.backupTitle}
                </p>
              </div>
              <p className="w-full text-base font-normal leading-[1.2] text-[#343e56]">
                {trustCard.backupDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
