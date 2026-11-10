import { formatUsd } from "@/lib/build-order-href"
import type { CartLineItem, CartLineItemDetails } from "@/types/cart/cart"

function formatCompactCount(value: number): string {
  if (value >= 1_000_000) {
    return `${Math.round(value / 1_000_000)}M`
  }
  if (value >= 1_000) {
    return `${Math.round(value / 1_000)}K`
  }
  return String(value)
}

const QUALITY_SUMMARY_LABEL: Record<string, string> = {
  "high-quality": "High quality",
  real: "Real",
}

type BuildCartFromExtrasInput = {
  groupId: string
  quantity: number
  unitLabel: string
  platformLabel: string
  followersPrice: string
  storyViewsTitle: string
  extrasPrice: number
  handle: string
  avatarSrc: string
  followersCount: number
  followingCount: number
  qualityId: string
}

export function buildCartItemsFromExtras(
  input: BuildCartFromExtrasInput,
): CartLineItem[] {
  const followersId = `${input.groupId}-followers`
  const qualityLabel =
    QUALITY_SUMMARY_LABEL[input.qualityId] ?? QUALITY_SUMMARY_LABEL["high-quality"]
  const details: CartLineItemDetails = {
    handle: input.handle.replace(/^@/, ""),
    avatarSrc: input.avatarSrc,
    followersStat: formatCompactCount(input.followersCount),
    followingStat: formatCompactCount(input.followingCount),
    serviceSummary: `${input.quantity} ${qualityLabel} followers`,
  }
  const items: CartLineItem[] = [
    {
      id: followersId,
      title: `${input.quantity} ${input.unitLabel}`,
      platformLabel: input.platformLabel,
      price: input.followersPrice,
      details,
    },
  ]

  if (input.extrasPrice > 0) {
    items.push({
      id: `${input.groupId}-story-views`,
      title: input.storyViewsTitle,
      platformLabel: input.platformLabel,
      price: formatUsd(input.extrasPrice),
    })
  }

  return items
}
