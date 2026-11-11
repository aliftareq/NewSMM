import type { ServicesModalPlatformId } from "@/types/landing/services-modal"

/**
 * Per-platform service hero title, body, and h1 styling (`titleColor` or `titleGradient`).
 * Wired via `getServiceHeroContent(platformId)` on each `*-services` route.
 */
export type ServiceHeroIntroCopy = {
  title: string
  description: string
  titleColor?: string
  titleGradient?: string
}

/** Figma 25845:25938 — Instagram headline gradient */
export const SERVICE_HERO_INSTAGRAM_TITLE_GRADIENT =
  "linear-gradient(to right, #f27b34, #d8366b 50%, #7e359c)"

/** Figma 25845:28963 — TikTok headline gradient */
export const SERVICE_HERO_TIKTOK_TITLE_GRADIENT =
  "linear-gradient(to right, #202020, #616161 50%, #000000)"

/** Figma 25845:33496 — Threads headline gradient */
export const SERVICE_HERO_THREADS_TITLE_GRADIENT =
  "linear-gradient(96.57deg, #000000 1.1%, #5c5c5c 47.06%, #000000 93.03%)"

/** Figma 25845:36518 — SoundCloud headline gradient */
export const SERVICE_HERO_SOUNDCLOUD_TITLE_GRADIENT =
  "linear-gradient(to right, #ff5b10, #a53400)"

const PLATFORM_LABEL: Record<ServicesModalPlatformId, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  facebook: "Facebook",
  twitter: "Twitter",
  threads: "Threads",
  spotify: "Spotify",
  soundcloud: "Soundcloud",
}

/** Figma 25845:27452 — Facebook solid headline */
export const SERVICE_HERO_FACEBOOK_TITLE_COLOR = "#0080ff"

/** Figma 25845:30474 — YouTube solid headline */
export const SERVICE_HERO_YOUTUBE_TITLE_COLOR = "#ed2b2e"

/** Figma 25845:35007 — Spotify solid headline */
export const SERVICE_HERO_SPOTIFY_TITLE_COLOR = "#199e46"

/** Default solid headline colors until a platform has Figma-specific copy. */
const PLATFORM_HEADLINE_COLOR: Record<ServicesModalPlatformId, string> = {
  instagram: "#e1306c",
  tiktok: "#000000",
  youtube: "#ff0000",
  facebook: SERVICE_HERO_FACEBOOK_TITLE_COLOR,
  twitter: "#1d9bf0",
  threads: "#000000",
  spotify: "#1db954",
  soundcloud: "#ff5500",
}

function buildServiceHeroIntroCopy(
  platformId: ServicesModalPlatformId,
): ServiceHeroIntroCopy {
  const label = PLATFORM_LABEL[platformId]
  return {
    title: `Boost Your Reach with ${label} Promotion Services`,
    description: `Grow your ${label} presence with reliable and affordable promotion services. Increase your followers, post engagement, and brand visibility while reaching a wider audience and building a stronger online presence.`,
    titleColor: PLATFORM_HEADLINE_COLOR[platformId],
  }
}

export const serviceHeroIntroByPlatform: Record<
  ServicesModalPlatformId,
  ServiceHeroIntroCopy
> = {
  instagram: {
    title: "Boost Your Instagram Growth with Premium Promotion Services",
    description:
      "Grow your Instagram presence with the right follower package for your goals. Choose from flexible options designed to increase your audience, strengthen social proof, and give your profile a more established look.",
    titleGradient: SERVICE_HERO_INSTAGRAM_TITLE_GRADIENT,
  },
  /** Figma 25845:28962 — title 28963, body 28964 */
  tiktok: {
    title: "Boost Your Reach with TikTok Promotion Services",
    description:
      "Take your TikTok presence to the next level with powerful promotion services. Increase your video views, followers, and engagement while improving your content visibility and connecting with more potential audiences.",
    titleGradient: SERVICE_HERO_TIKTOK_TITLE_GRADIENT,
  },
  /** Figma 25845:30473 — title 30474, body 30475 */
  youtube: {
    title: "Boost Your Reach with YouTube Promotion Services",
    description:
      "Give your YouTube channel the exposure it deserves with professional promotion services. Explore solutions for increasing video views, subscribers, and engagement while strengthening your channel's visibility and online presence.",
    titleColor: SERVICE_HERO_YOUTUBE_TITLE_COLOR,
  },
  facebook: {
    title: "Boost Your Reach with Facebook Promotion Services",
    description:
      "Grow your Facebook presence with reliable and affordable promotion services. Increase your followers, post engagement, and brand visibility while reaching a wider audience and building a stronger online presence.",
    titleColor: SERVICE_HERO_FACEBOOK_TITLE_COLOR,
  },
  twitter: {
    ...buildServiceHeroIntroCopy("twitter"),
    title: "Boost Your Reach with Twitter (X) Promotion Services",
  },
  /** Figma 25845:33495 — title 33496, body 33497 */
  threads: {
    title: "Grow Your Threads Presence & Engagement",
    description:
      "Stand out on Threads with effective social media promotion services. Increase your followers, post views, and engagement while improving your profile visibility and connecting with a broader, more active audience.",
    titleGradient: SERVICE_HERO_THREADS_TITLE_GRADIENT,
  },
  /** Figma 25845:35006 — title 35007, body 35008 */
  spotify: {
    title: "Take Your Music Further with Spotify Promotion Services",
    description:
      "Take your music career further with professional Spotify promotion services. Increase your streams, followers, and playlist visibility while reaching new listeners and strengthening your presence in the competitive music industry.",
    titleColor: SERVICE_HERO_SPOTIFY_TITLE_COLOR,
  },
  /** Figma 25845:36517 — title 36518, body 36519 */
  soundcloud: {
    title: "Amplify Your Music\u2019s Reach with SoundCloud Promotion",
    description:
      "Give your music the attention it deserves with reliable SoundCloud promotion services. Increase your track plays, followers, and engagement while expanding your audience reach and building a stronger presence as an artist.",
    titleGradient: SERVICE_HERO_SOUNDCLOUD_TITLE_GRADIENT,
  },
}
