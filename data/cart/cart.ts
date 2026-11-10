import type { CartPageContent } from "@/types/cart/cart"

export const cartPageContent: CartPageContent = {
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
  upsellFollowersPriceValue: "2.00",
  removeConfirmTitle: "Remove this item?",
  removeConfirmDescriptionTemplate:
    "“{title}” will be removed from your cart. You can add it again from the order flow.",
  removeConfirmCancel: "Cancel",
  removeConfirmConfirm: "Remove",
  addServiceHref: "/service",
  addServiceModalTitle: "Add another service",
}
