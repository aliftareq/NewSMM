import { newOrderContent } from "@/data/service/new-order"
import type { CartPageContent } from "@/types/cart/cart"

const CART_IMG = "/images/cart"

export const cartPageContent: CartPageContent = {
  assets: {
    trashIcon: `${CART_IMG}/trash.svg`,
    expandChevronIcon: `${CART_IMG}/cart-item-expand-chevron.svg`,
    profilePlaceholder: `${CART_IMG}/profile-placeholder.svg`,
    upsellCheckIcon: `${CART_IMG}/upsell-check.svg`,
    upsellPlusIcon: `${CART_IMG}/upsell-plus.svg`,
    addServicePlusVertical: `${CART_IMG}/add-service-plus-v.svg`,
    addServicePlusHorizontal: `${CART_IMG}/add-service-plus-h.svg`,
  },
  title: "Your Cart",
  itemsLabelTemplate: "({count} Items)",
  addServiceLabel: "Add another service",
  couponPlaceholder: "Have a coupon?",
  couponApplyLabel: "Apply",
  summaryHeading: "Order Summary",
  subtotalLabel: "Subtotal",
  totalLabel: "Total",
  checkoutCtaLabel: "Proceed to checkout",
  sslLabel: "256-bit SSL encrypted checkout",
  miniCartTitle: "Your cart",
  miniCartItemsTemplate: "{count} items",
  miniCartTotalLabel: "TOTAL",
  miniCartCheckoutLabel: "Checkout →",
  upsellFollowersTitle: "Add +200 Followers",
  upsellFollowersSubtitle: "Best value on this order",
  upsellFollowersPrice: "+$2.00",
  upsellFollowersCompareAtPrice: "+$2.00",
  upsellFollowersPriceValue: "2.00",
  upsellBestValueBadge: "Best value",
  upsellAddedSubtitle: "Best value on this order",
  defaultExpandedDetails: {
    handle: "UXD_SAM",
    avatarSrc: newOrderContent.profile.defaultPreview.avatarSrc,
    followersStat: "82K",
    followingStat: "12K",
    serviceSummary: "300 High quality followers",
  },
  removeConfirmTitle: "Remove this item?",
  removeConfirmDescriptionTemplate:
    "“{title}” will be removed from your cart. You can add it again from the order flow.",
  removeConfirmCancel: "Cancel",
  removeConfirmConfirm: "Remove",
  addServiceHref: "/services",
  addServiceModalTitle: "Add another service",
}
