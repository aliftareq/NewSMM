/** Compact counts (e.g. `82K`) — UI appends the word “Followers”. */
export type CartLineItemDetails = {
  handle: string
  avatarSrc: string
  followersStat: string
  followingStat: string
  serviceSummary: string
}

export type CartLineItem = {
  id: string
  title: string
  platformLabel: string
  price: string
  /** Links an upsell row to its parent line item. */
  parentId?: string
  /** Shown when the line item card is expanded on the cart page. */
  details?: CartLineItemDetails
}

export type CartState = {
  items: CartLineItem[]
}

export type CartPageAssets = {
  trashIcon: string
  expandChevronIcon: string
  profilePlaceholder: string
  upsellCheckIcon: string
  upsellPlusIcon: string
  addServicePlusVertical: string
  addServicePlusHorizontal: string
}

export type CartPageContent = {
  assets: CartPageAssets
  title: string
  itemsLabelTemplate: string
  addServiceLabel: string
  couponPlaceholder: string
  couponApplyLabel: string
  summaryHeading: string
  subtotalLabel: string
  totalLabel: string
  checkoutCtaLabel: string
  sslLabel: string
  miniCartTitle: string
  miniCartItemsTemplate: string
  miniCartTotalLabel: string
  miniCartCheckoutLabel: string
  upsellFollowersTitle: string
  upsellFollowersSubtitle: string
  upsellFollowersPrice: string
  upsellFollowersCompareAtPrice: string
  upsellFollowersPriceValue: string
  upsellBestValueBadge: string
  upsellAddedSubtitle: string
  defaultExpandedDetails: CartLineItemDetails
  removeConfirmTitle: string
  removeConfirmDescriptionTemplate: string
  removeConfirmCancel: string
  removeConfirmConfirm: string
  addServiceHref: string
  addServiceModalTitle: string
}
