import type { LandingFooterContent } from "@/types/landing/footer"

import { LinkTo } from "@/components/shared/link-to"

type FooterBrandColumnProps = {
  brand: LandingFooterContent["brand"]
}

export function FooterBrandColumn({ brand }: FooterBrandColumnProps) {
  return (
    <div className="max-w-[307px] pb-6">
      <div className="mb-6 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="relative h-[39px] w-[50px] shrink-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={brand.logomarkSrc}
              className="absolute inset-[5.13%_2%_7.69%_2%] block size-auto max-w-none"
            />
          </span>
          <span
            className="bg-clip-text text-[34px] font-semibold leading-normal text-transparent"
            style={{ backgroundImage: brand.nameGradient }}
          >
            {brand.name}
          </span>
        </div>
        <p className="max-w-[274px] text-sm font-normal leading-[1.35] text-white">
          {brand.description}
        </p>
      </div>

      <div className="flex items-center gap-[13.504px]">
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
  )
}
