import { formatUsd } from "@/lib/build-order-href"
import type { CartLineItem } from "@/types/cart/cart"

type BuildCartFromExtrasInput = {
  groupId: string
  quantity: number
  unitLabel: string
  platformLabel: string
  followersPrice: string
  storyViewsTitle: string
  extrasPrice: number
}

export function buildCartItemsFromExtras(
  input: BuildCartFromExtrasInput,
): CartLineItem[] {
  const followersId = `${input.groupId}-followers`
  const items: CartLineItem[] = [
    {
      id: followersId,
      title: `${input.quantity} ${input.unitLabel}`,
      platformLabel: input.platformLabel,
      price: input.followersPrice,
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
