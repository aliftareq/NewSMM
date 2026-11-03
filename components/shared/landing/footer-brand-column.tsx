import type { LandingFooterContent } from "@/types/landing/footer"

import { LinkTo } from "@/components/shared/link-to"

type FooterBrandColumnProps = {
  brand: LandingFooterContent["brand"]
}

export function FooterBrandColumn({ brand }: FooterBrandColumnProps) {
  return (
    <div className="flex w-full min-w-0 max-w-[307px] flex-col gap-6 pb-6 xl:max-w-none xl:w-[307px]">
      <div className="flex flex-col gap-3">
        <div className="flex flex-nowrap items-center gap-3">
          <span className="relative h-[39px] w-[50px] shrink-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={brand.logomarkSrc}
              className="absolute inset-[5.13%_2%_7.69%_2%] block size-auto max-w-none"
            />
          </span>
          <span
            className="shrink-0 bg-clip-text text-[28px] font-semibold leading-[34px] whitespace-nowrap text-transparent sm:text-[34px] sm:leading-[41px]"
            style={{ backgroundImage: brand.nameGradient }}
          >
            {brand.name}
          </span>
        </div>
        <p className="w-[274px] max-w-full text-sm font-normal leading-[1.35] text-white">
          {brand.description}
        </p>
      </div>

      <div className="flex h-[42.58px] w-full max-w-[208.338px] items-center justify-start sm:justify-center">
        <div className="flex rotate-[-0.11deg] flex-wrap items-center gap-[13.504px]">
          {brand.socialLinks.map((social) => (
            <LinkTo
              key={social.id}
              href={social.href}
              className="flex items-center justify-center rounded-[11.574px] bg-white backdrop-blur-[66.667px]"
              style={{ width: social.buttonSize, height: social.buttonSize }}
              aria-label={social.id}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={social.iconSrc}
                width={social.iconSize}
                height={social.iconSize}
                className="block shrink-0"
              />
            </LinkTo>
          ))}
        </div>
      </div>
    </div>
  )
}
