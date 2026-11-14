export type DashboardDiscountCoupon = {
  id: string
  code: string
  discountAmount: string
  expiresIn: string
  description: string
  applyLabel: string
}

export type DashboardMyDiscountsContent = {
  table: {
    columns: {
      couponCode: string
      discount: string
      expiresIn: string
      description: string
    }
    showMoreLabel: string
    initialVisibleCount: number
    loadMoreCount: number
  }
  coupons: DashboardDiscountCoupon[]
  assets: {
    tableDivider: string
  }
}