import type { ServicesModalPlatformId } from "@/types/landing/services-modal"
import type { ServiceOrderProductOption } from "@/types/service/hero"

/** Figma 25941:5500 — product labels per platform for the order widget select. */
export const serviceOrderProductsByPlatform: Record<
  ServicesModalPlatformId,
  ServiceOrderProductOption[]
> = {
  instagram: [
    { id: "instagram-followers", label: "Instagram Followers" },
    { id: "instagram-likes", label: "Instagram Likes" },
    { id: "instagram-views", label: "Instagram Views" },
    { id: "instagram-comments", label: "Instagram Comments" },
  ],
  tiktok: [
    { id: "tiktok-followers", label: "TikTok Followers" },
    { id: "tiktok-likes", label: "TikTok Likes" },
    { id: "tiktok-views", label: "TikTok Views" },
  ],
  youtube: [
    { id: "youtube-subscribers", label: "YouTube Subscribers" },
    { id: "youtube-views", label: "YouTube Views" },
    { id: "youtube-likes", label: "YouTube Likes" },
  ],
  facebook: [
    { id: "facebook-followers", label: "Facebook Followers" },
    { id: "facebook-likes", label: "Facebook Likes" },
    { id: "facebook-views", label: "Facebook Views" },
  ],
  twitter: [
    { id: "twitter-followers", label: "Twitter Followers" },
    { id: "twitter-likes", label: "Twitter Likes" },
    { id: "twitter-views", label: "Twitter Views" },
  ],
  threads: [
    { id: "threads-followers", label: "Threads Followers" },
    { id: "threads-likes", label: "Threads Likes" },
  ],
  spotify: [
    { id: "spotify-followers", label: "Spotify Followers" },
    { id: "spotify-plays", label: "Spotify Plays" },
  ],
  soundcloud: [
    { id: "soundcloud-followers", label: "SoundCloud Followers" },
    { id: "soundcloud-plays", label: "SoundCloud Plays" },
  ],
}

export const SERVICE_ORDER_SERVICE_SELECT_LABEL = "Select service"

export const SERVICE_ORDER_SELECT_CHEVRON = "/images/landing/chevron-down.svg"

export function getDefaultServiceProductId(
  platformId: ServicesModalPlatformId | string,
): string {
  return (
    serviceOrderProductsByPlatform[platformId as ServicesModalPlatformId]?.[0]
      ?.id ?? "instagram-followers"
  )
}
