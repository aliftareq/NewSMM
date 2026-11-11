import { HeroReviews } from "@/components/shared/landing/hero-reviews"
import { landingHeroContent } from "@/data/landing/hero"
import { serviceHeroContent } from "@/data/service/hero"
import type { ServiceHeroContent } from "@/types/service/hero"
import { cn } from "@/lib/utils"

type ServiceHeroIntroProps = {
  content?: ServiceHeroContent["intro"]
  className?: string
}

const PAYMENT_CHIP_CLASS =
  "relative box-border h-[38px] w-[73.76px] shrink-0 rounded-[6.706px] bg-white shadow-[0px_2.235px_6.706px_rgba(65,65,65,0.12)]"

function PaymentBrandChip({
  src,
  imageClassName,
}: {
  src: string
  imageClassName: string
}) {
  return (
    <div className={cn(PAYMENT_CHIP_CLASS, "overflow-hidden")}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" src={src} className={imageClassName} />
    </div>
  )
}

function PaymentWalletChip({
  iconSrc,
  label,
  iconClassName,
}: {
  iconSrc: string
  label: string
  iconClassName?: string
}) {
  return (
    <div className={PAYMENT_CHIP_CLASS}>
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-[4.47px]">
        {iconClassName ? (
          <span className="relative block h-[26.824px] w-[26.408px] shrink-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src={iconSrc} className={iconClassName} />
          </span>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            alt=""
            src={iconSrc}
            className="size-[26.824px] shrink-0 object-contain"
          />
        )}
        <span className="whitespace-nowrap text-[15.088px] font-medium leading-[1.25] text-[#202020]">
          {label}
        </span>
      </div>
    </div>
  )
}

export function ServiceHeroIntro({
  content = serviceHeroContent.intro,
  className,
}: ServiceHeroIntroProps) {
  const { trustCard } = content

  return (
    <div
      className={cn(
        "flex w-full min-w-0 max-w-[594px] flex-col items-start gap-4 p-0 sm:gap-[18px] md:mx-auto md:max-w-[640px] lg:mx-0 lg:max-w-none xl:max-w-[594px]",
        className,
      )}
    >
      <div className="flex w-full flex-col items-start gap-2 sm:gap-3">
        <HeroReviews reviews={landingHeroContent.reviews} />
      </div>

      <div className="flex w-full flex-col items-start gap-5 sm:gap-7">
        <div className="flex w-full flex-col items-start gap-3">
          <h1
            className={cn(
              "w-full [word-break:break-word] text-[28px] font-bold leading-[1.2] tracking-[-0.56px] min-[400px]:text-[32px] sm:text-[40px] sm:tracking-[-0.8px] lg:text-[48px] lg:tracking-[-0.96px]",
              content.titleGradient && "text-transparent",
            )}
            style={
              content.titleGradient
                ? {
                    backgroundImage: content.titleGradient,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }
                : { color: content.titleColor ?? "#232323" }
            }
          >
            {content.title}
          </h1>
          <p className="w-full text-base font-medium leading-[1.35] text-[#4f586d]">
            {content.description}
          </p>
        </div>

        <div className="box-border mx-auto flex w-full max-w-[547px] items-center rounded-xl border-[1.3px] border-[#dfe0e4] bg-white p-4 sm:p-5 lg:max-w-none xl:mx-0 xl:max-w-[547px]">
          <div className="flex min-w-0 flex-1 flex-col items-start gap-[18px]">
            <div className="flex w-full min-w-0 flex-col items-start gap-3 sm:gap-4">
              <p className="w-full text-sm font-medium leading-[1.35] text-[#343e56] sm:text-base">
                {trustCard.paymentTitle}
              </p>
              <div className="grid w-full grid-cols-3 gap-2 sm:gap-[10px] lg:max-w-[492.59px] lg:self-center xl:flex xl:h-[38px] xl:flex-nowrap xl:items-center xl:justify-center">
                {trustCard.paymentLogos.map((logo, index) =>
                  logo.type === "wallet" ? (
                    <div
                      key={`wallet-${index}`}
                      className="flex justify-center sm:shrink-0"
                    >
                      <PaymentWalletChip
                        iconSrc={logo.iconSrc}
                        label={logo.label}
                        iconClassName={logo.iconClassName}
                      />
                    </div>
                  ) : (
                    <div
                      key={logo.src}
                      className="flex justify-center sm:shrink-0"
                    >
                      <PaymentBrandChip
                        src={logo.src}
                        imageClassName={logo.className}
                      />
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
                <p className="text-lg font-medium leading-[1.25] text-[#21aeff] sm:text-xl">
                  {trustCard.backupTitle}
                </p>
              </div>
              <p className="w-full text-sm font-normal leading-[1.2] text-[#343e56] sm:text-base">
                {trustCard.backupDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
