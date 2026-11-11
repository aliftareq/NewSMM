import type { QuickOrderModalContent } from "@/app/(auth)/_types/quick-order-modal"

const LOGIN_CLOSE = "/images/auth/login-modal/close.svg"

/** Figma 25687:7054 */
export const quickOrderModalContent: QuickOrderModalContent = {
  assets: {
    divider: "/images/auth/add-funds-modal/divider.svg",
    closeIcon: LOGIN_CLOSE,
  },
  title: "Add Instagram to Your Order",
  subtitle: "Quick order · added to cart in one step",
}
