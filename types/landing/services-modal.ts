export type ServicesModalPlatformId =
  | "instagram"
  | "tiktok"
  | "youtube"
  | "facebook"
  | "twitter"
  | "threads"
  | "spotify"
  | "soundcloud"

export type ServicesModalPlatformIcon =
  | {
      kind: "sprite"
      /** Tailwind classes positioning the sprite inside a 32×32 (or sized) clip box */
      cropClassName: string
    }
  | {
      kind: "image"
      src: string
      cropClassName?: string
    }

export type ServicesModalFeaturedBadge = "most-popular" | "best-seller"

export type ServicesModalFeaturedService = {
  id: string
  badge: ServicesModalFeaturedBadge
  title: string
  description: string
  priceFrom: string
  href: string
  iconSrc: string
  iconCropClassName?: string
}

export type ServicesModalGridService = {
  id: string
  title: string
  priceFrom: string
  href: string
  iconSrc: string
  iconCropClassName?: string
}

export type ServicesModalPlatformTheme = {
  accentText: string
  accentPrice: string
  allButtonBg: string
  allButtonText: string
  featuredBorder: string
  featuredGradientFrom: string
  featuredGradientTo: string
  gridArrowBorder: string
}

export type ServicesModalPlatform = {
  id: ServicesModalPlatformId
  label: string
  packageCount: number
  icon: ServicesModalPlatformIcon
  headerIcon?: ServicesModalPlatformIcon
  theme: ServicesModalPlatformTheme
  subtitle: string
  allServicesLabel: string
  allServicesHref: string
  featured?: ServicesModalFeaturedService[]
  grid?: ServicesModalGridService[]
}

export type ServicesModalContent = {
  assetBase: string
  platforms: ServicesModalPlatform[]
  defaultPlatformId: ServicesModalPlatformId
}
