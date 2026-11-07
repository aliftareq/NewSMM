export type CartLineItem = {
  id: string
  title: string
  platformLabel: string
  price: string
  /** Links an upsell row to its parent line item. */
  parentId?: string
}

export type CartState = {
  items: CartLineItem[]
}

export type CartPageContent = {
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
  upsellFollowersPriceValue: string
  removeConfirmTitle: string
  removeConfirmDescriptionTemplate: string
  removeConfirmCancel: string
  removeConfirmConfirm: string
  addServiceHref: string
  addServiceModalTitle: string
}
