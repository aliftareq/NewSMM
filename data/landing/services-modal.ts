import type {
  ServicesModalContent,
  ServicesModalPlatform,
} from "@/types/landing/services-modal"

const BASE = "/images/landing/services-modal"
const PLATFORMS = `${BASE}/platforms`
const SERVICES = `${BASE}/services`

const instagramTheme = {
  accentText: "#e1306c",
  accentPrice: "#e11d48",
  allButtonBg: "#fff1f2",
  allButtonText: "#e1306c",
  featuredBorder: "#ffcfda",
  featuredGradientFrom: "#fffdfd",
  featuredGradientTo: "#fff7f9",
  gridArrowBorder: "#ffcfda",
}

const genericTheme = {
  accentText: "#1698e3",
  accentPrice: "#1698e3",
  allButtonBg: "#f0f9ff",
  allButtonText: "#1698e3",
  featuredBorder: "#bae6fd",
  featuredGradientFrom: "#ffffff",
  featuredGradientTo: "#f0f9ff",
  gridArrowBorder: "#bae6fd",
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
    theme?: typeof instagramTheme | typeof genericTheme
  }
): ServicesModalPlatform {
  const { buySlug, theme = genericTheme, ...rest } = config
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
      subtitle: "7 premium packages • Starts from $1.59",
      allServicesLabel: "All Soundcloud",
      allServicesHref: "/soundcloud-smm-panel",
    }),
  ],
}

export const servicesModalSpriteSrc = `${PLATFORMS}/social-icons-sprite.png`
