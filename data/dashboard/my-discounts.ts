import type { DashboardMyDiscountsContent } from "@/types/dashboard/my-discounts"

const IMG = "/images/dashboard/home"

const sampleCoupon = {
  code: "XXX1020",
  discountAmount: "$10.00",
  expiresIn: "Perpetual",
  description: "-$10 discount (for shopping cart of $150+)",
  applyLabel: "Apply coupon",
} as const

export const dashboardMyDiscountsContent: DashboardMyDiscountsContent = {
  table: {
    columns: {
      couponCode: "Coupon Code",
      discount: "Discount",
      expiresIn: "Expires in",
      description: "Description",
    },
    showMoreLabel: "Show more",
    initialVisibleCount: 4,
    loadMoreCount: 4,
  },
  coupons: Array.from({ length: 8 }, (_, index) => ({
    id: `coupon-${index + 1}`,
    code: index < 4 ? sampleCoupon.code : `XXX10${21 + index}`,
    discountAmount: sampleCoupon.discountAmount,
    expiresIn: index % 3 === 0 ? "30 days" : sampleCoupon.expiresIn,
    description: sampleCoupon.description,
    applyLabel: sampleCoupon.applyLabel,
  })),
  assets: {
    tableDivider: `${IMG}/card-divider.svg`,
  },
}