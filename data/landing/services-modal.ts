import type {
  ServicesModalContent,
  ServicesModalPlatform,
  ServicesModalPlatformTheme,
} from "@/types/landing/services-modal"

const BASE = "/images/landing/services-modal"
const PLATFORMS = `${BASE}/platforms`
const SERVICES = `${BASE}/services`

const instagramTheme: ServicesModalPlatformTheme = {
  accentText: "#e1306c",
  accentPrice: "#e11d48",
  allButtonBg: "#fff1f2",
  allButtonText: "#e1306c",
  featuredBorder: "#ffcfda",
  featuredGradientFrom: "#fffdfd",
  featuredGradientTo: "#fff7f9",
  gridArrowBorder: "#ffcfda",
  tabActiveBg: "#e1306c",
  featuredSecondaryBorder: "#ffcfda",
  featuredSecondaryGradientFrom: "#fffdfd",
  featuredSecondaryGradientTo: "#fff7f9",
  badgePopularBg: "#ffe5e7",
  badgeSellerBg: "#ffe5e7",
  badgeSellerText: "#e1306c",
}

const tiktokTheme: ServicesModalPlatformTheme = {
  accentText: "#000000",
  accentPrice: "#000000",
  allButtonBg: "#f2f2f2",
  allButtonText: "#000000",
  featuredBorder: "#e5e5e5",
  featuredGradientFrom: "#ffffff",
  featuredGradientTo: "#f2f2f2",
  gridArrowBorder: "#e5e5e5",
  tabActiveBg: "#000000",
  featuredSecondaryBorder: "#e5e5e5",
  featuredSecondaryGradientFrom: "#ffffff",
  featuredSecondaryGradientTo: "#f7f7f7",
  badgePopularBg: "rgba(0,0,0,0.08)",
  badgeSellerBg: "rgba(0,0,0,0.06)",
  badgeSellerText: "#000000",
}

const youtubeTheme: ServicesModalPlatformTheme = {
  accentText: "#ff0000",
  accentPrice: "#ff0000",
  allButtonBg: "#fff1f1",
  allButtonText: "#ff0000",
  featuredBorder: "#ffcccc",
  featuredGradientFrom: "#ffffff",
  featuredGradientTo: "#fff0f0",
  gridArrowBorder: "#ffcccc",
  tabActiveBg: "#ff0000",
  featuredSecondaryBorder: "#ffcccc",
  featuredSecondaryGradientFrom: "#ffffff",
  featuredSecondaryGradientTo: "#fff0f0",
  badgePopularBg: "#ffebeb",
  badgeSellerBg: "#ffebeb",
  badgeSellerText: "#ff0000",
}

const facebookTheme: ServicesModalPlatformTheme = {
  accentText: "#1877f2",
  accentPrice: "#1877f2",
  allButtonBg: "#eef5fe",
  allButtonText: "#1877f2",
  featuredBorder: "#bfdbfe",
  featuredGradientFrom: "#ffffff",
  featuredGradientTo: "#f0f6ff",
  gridArrowBorder: "#bfdbfe",
  tabActiveBg: "#1877f2",
  featuredSecondaryBorder: "#bfdbfe",
  featuredSecondaryGradientFrom: "#ffffff",
  featuredSecondaryGradientTo: "#eef5fe",
  badgePopularBg: "#e7f0ff",
  badgeSellerBg: "rgba(24,119,242,0.1)",
  badgeSellerText: "#1877f2",
}

const twitterTheme: ServicesModalPlatformTheme = {
  accentText: "#1d9bf0",
  accentPrice: "#1d9bf0",
  allButtonBg: "#eef8fd",
  allButtonText: "#1d9bf0",
  featuredBorder: "#bae6fd",
  featuredGradientFrom: "#ffffff",
  featuredGradientTo: "#f0f9ff",
  gridArrowBorder: "#bae6fd",
  tabActiveBg: "#1d9bf0",
  featuredSecondaryBorder: "#bae6fd",
  featuredSecondaryGradientFrom: "#ffffff",
  featuredSecondaryGradientTo: "#f0f9ff",
  badgePopularBg: "#e8f6fc",
  badgeSellerBg: "rgba(29,155,240,0.1)",
  badgeSellerText: "#1d9bf0",
}

const threadsTheme: ServicesModalPlatformTheme = {
  accentText: "#000000",
  accentPrice: "#000000",
  allButtonBg: "#f2f2f2",
  allButtonText: "#000000",
  featuredBorder: "#e5e5e5",
  featuredGradientFrom: "#ffffff",
  featuredGradientTo: "#f7f7f7",
  gridArrowBorder: "#e5e5e5",
  tabActiveBg: "#000000",
  featuredSecondaryBorder: "#e5e5e5",
  featuredSecondaryGradientFrom: "#ffffff",
  featuredSecondaryGradientTo: "#f7f7f7",
  badgePopularBg: "rgba(0,0,0,0.08)",
  badgeSellerBg: "rgba(0,0,0,0.06)",
  badgeSellerText: "#000000",
}

const spotifyTheme: ServicesModalPlatformTheme = {
  accentText: "#1db954",
  accentPrice: "#1db954",
  allButtonBg: "#edfdf3",
  allButtonText: "#1db954",
  featuredBorder: "#bbf7d0",
  featuredGradientFrom: "#ffffff",
  featuredGradientTo: "#f0fdf4",
  gridArrowBorder: "#bbf7d0",
  tabActiveBg: "#1db954",
  featuredSecondaryBorder: "#bbf7d0",
  featuredSecondaryGradientFrom: "#ffffff",
  featuredSecondaryGradientTo: "#f0fdf4",
  badgePopularBg: "#dcfceb",
  badgeSellerBg: "rgba(29,185,84,0.12)",
  badgeSellerText: "#1db954",
}

const soundcloudTheme: ServicesModalPlatformTheme = {
  accentText: "#ff5500",
  accentPrice: "#ff5500",
  allButtonBg: "#fff4ed",
  allButtonText: "#ff5500",
  featuredBorder: "#fed7aa",
  featuredGradientFrom: "#ffffff",
  featuredGradientTo: "#fff7ed",
  gridArrowBorder: "#fed7aa",
  tabActiveBg: "#ff5500",
  featuredSecondaryBorder: "#fed7aa",
  featuredSecondaryGradientFrom: "#ffffff",
  featuredSecondaryGradientTo: "#fff7ed",
  badgePopularBg: "#ffe8d9",
  badgeSellerBg: "rgba(255,85,0,0.1)",
  badgeSellerText: "#ff5500",
}

const instagramFeatured = [
  {
    id: "followers",
    badge: "most-popular" as const,
    title: "Followers",
    description: "Real accounts • High retention",
    priceFrom: "$2.99",
    href: "/buy-instagram-followers",
    iconSrc: `${SERVICES}/followers.png`,
    iconCropClassName:
      "absolute h-[128.81%] left-[-20%] max-w-none top-[-16.95%] w-[138.18%]",
  },
  {
    id: "likes",
    badge: "best-seller" as const,
    title: "Likes",
    description: "Instant start • Split on photos",
    priceFrom: "$1.59",
    href: "/buy-instagram-likes",
    iconSrc: `${SERVICES}/likes.png`,
    iconCropClassName: "absolute left-[-24.68%] max-w-none size-[149.35%] top-[-24.68%]",
  },
]

const instagramGrid = [
  {
    id: "automatic-likes",
    title: "Automatic Likes",
    priceFrom: "$2.99",
    href: "/buy-instagram-automatic-likes",
    iconSrc: `${SERVICES}/automatic-likes.png`,
  },
  {
    id: "comments",
    title: "Comments",
    priceFrom: "$2.99",
    href: "/buy-instagram-comments",
    iconSrc: `${SERVICES}/comments.png`,
  },
  {
    id: "video-views",
    title: "Video Views",
    priceFrom: "$2.99",
    href: "/buy-instagram-video-views",
    iconSrc: `${SERVICES}/video-views.png`,
  },
  {
    id: "story-views",
    title: "Story Views",
    priceFrom: "$2.99",
    href: "/buy-instagram-story-views",
    iconSrc: `${SERVICES}/story-views.png`,
  },
  {
    id: "live-views",
    title: "Live Views",
    priceFrom: "$2.99",
    href: "/buy-instagram-live-views",
    iconSrc: `${SERVICES}/live-views.png`,
  },
  {
    id: "reposts",
    title: "Reposts",
    priceFrom: "$2.99",
    href: "/buy-instagram-reposts",
    iconSrc: `${SERVICES}/reposts.png`,
  },
  {
    id: "impressions",
    title: "Impressions",
    priceFrom: "$2.99",
    href: "/buy-instagram-impressions",
    iconSrc: `${SERVICES}/impressions.png`,
  },
  {
    id: "saves",
    title: "Saves",
    priceFrom: "$2.99",
    href: "/buy-instagram-saves",
    iconSrc: `${SERVICES}/saves.png`,
  },
]

function packagesForBuySlug(buySlug: string) {
  const prefix = `/buy-${buySlug}-`
  return {
    featured: instagramFeatured.map((service) => ({
      ...service,
      id: `${buySlug}-${service.id}`,
      href: service.href.replace("/buy-instagram-", prefix),
    })),
    grid: instagramGrid.map((service) => ({
      ...service,
      id: `${buySlug}-${service.id}`,
      href: service.href.replace("/buy-instagram-", prefix),
    })),
  }
}

const spriteInstagram = {
  kind: "sprite" as const,
  cropClassName:
    "absolute h-[639.76%] left-[-343.53%] max-w-none top-[-48.82%] w-[787.4%]",
}

const spriteTiktok = {
  kind: "sprite" as const,
  cropClassName:
    "absolute h-[639.76%] left-[-195.87%] max-w-none top-[-196.09%] w-[787.4%]",
}

const spriteYoutube = {
  kind: "sprite" as const,
  cropClassName:
    "absolute h-[639.76%] left-[-195.92%] max-w-none top-[-48.82%] w-[787.4%]",
}

const spriteFacebook = {
  kind: "sprite" as const,
  cropClassName:
    "absolute h-[639.76%] left-[-48.43%] max-w-none top-[-48.82%] w-[787.4%]",
}

const imageTwitter = {
  kind: "image" as const,
  src: `${PLATFORMS}/twitter.png`,
  cropClassName:
    "absolute h-[115.84%] left-[-8.11%] max-w-none top-[-6.86%] w-[115.16%]",
}

const imageThreads = {
  kind: "image" as const,
  src: `${PLATFORMS}/threads.png`,
  cropClassName:
    "absolute h-[114.94%] left-[-7.72%] max-w-none top-[-2.3%] w-[112.52%]",
}

const imageSpotify = {
  kind: "image" as const,
  src: `${PLATFORMS}/spotify.png`,
  cropClassName:
    "absolute h-[115.84%] left-[-8.11%] max-w-none top-[-6.86%] w-[115.16%]",
}

const imageSoundcloud = {
  kind: "image" as const,
  src: `${PLATFORMS}/soundcloud.png`,
  cropClassName:
    "absolute h-[115.84%] left-[-8.11%] max-w-none top-[-6.86%] w-[115.16%]",
}

function platformEntry(
  config: Omit<
    ServicesModalPlatform,
    "featured" | "grid" | "headerIcon" | "theme"
  > & {
    buySlug: string
    theme?: ServicesModalPlatformTheme
  }
): ServicesModalPlatform {
  const { buySlug, theme = instagramTheme, ...rest } = config
  const packages =
    buySlug === "instagram"
      ? { featured: instagramFeatured, grid: instagramGrid }
      : packagesForBuySlug(buySlug)

  return {
    ...rest,
    theme,
    headerIcon: rest.icon,
    ...packages,
  }
}

export const landingServicesModalContent: ServicesModalContent = {
  assetBase: BASE,
  defaultPlatformId: "instagram",
  platforms: [
    platformEntry({
      id: "instagram",
      label: "Instagram",
      buySlug: "instagram",
      packageCount: 10,
      icon: spriteInstagram,
      theme: instagramTheme,
      subtitle: "10 premium packages • Starts from $1.59",
      allServicesLabel: "All Instagram",
      allServicesHref: "/instagram-smm-panel",
    }),
    platformEntry({
      id: "tiktok",
      label: "TikTok",
      buySlug: "tiktok",
      packageCount: 7,
      icon: spriteTiktok,
      theme: tiktokTheme,
      subtitle: "7 premium packages • Starts from $1.59",
      allServicesLabel: "All TikTok",
      allServicesHref: "/tiktok-smm-panel",
    }),
    platformEntry({
      id: "youtube",
      label: "YouTube",
      buySlug: "youtube",
      packageCount: 7,
      icon: spriteYoutube,
      theme: youtubeTheme,
      subtitle: "7 premium packages • Starts from $1.59",
      allServicesLabel: "All YouTube",
      allServicesHref: "/youtube-smm-panel",
    }),
    platformEntry({
      id: "facebook",
      label: "Facebook",
      buySlug: "facebook",
      packageCount: 7,
      icon: spriteFacebook,
      theme: facebookTheme,
      subtitle: "7 premium packages • Starts from $1.59",
      allServicesLabel: "All Facebook",
      allServicesHref: "/facebook-smm-panel",
    }),
    platformEntry({
      id: "twitter",
      label: "Twitter",
      buySlug: "twitter",
      packageCount: 7,
      icon: imageTwitter,
      theme: twitterTheme,
      subtitle: "7 premium packages • Starts from $1.59",
      allServicesLabel: "All Twitter",
      allServicesHref: "/twitter-smm-panel",
    }),
    platformEntry({
      id: "threads",
      label: "Threads",
      buySlug: "threads",
      packageCount: 7,
      icon: imageThreads,
      theme: threadsTheme,
      subtitle: "7 premium packages • Starts from $1.59",
      allServicesLabel: "All Threads",
      allServicesHref: "/threads-smm-panel",
    }),
    platformEntry({
      id: "spotify",
      label: "Spotify",
      buySlug: "spotify",
      packageCount: 7,
      icon: imageSpotify,
      theme: spotifyTheme,
      subtitle: "7 premium packages • Starts from $1.59",
      allServicesLabel: "All Spotify",
      allServicesHref: "/spotify-smm-panel",
    }),
    platformEntry({
      id: "soundcloud",
      label: "Soundcloud",
      buySlug: "soundcloud",
      packageCount: 7,
      icon: imageSoundcloud,
      theme: soundcloudTheme,
      subtitle: "7 premium packages • Starts from $1.59",
      allServicesLabel: "All Soundcloud",
      allServicesHref: "/soundcloud-smm-panel",
    }),
  ],
}

export const servicesModalSpriteSrc = `${PLATFORMS}/social-icons-sprite.png`
