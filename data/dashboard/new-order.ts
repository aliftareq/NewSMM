import { serviceHeroContent } from "@/data/service/hero"
import type { ServiceHeroContent } from "@/types/service/hero"
import type { DashboardNewOrderContent } from "@/types/dashboard/new-order"

const SERVICE_IMG = "/images/service"

/** Figma 25704:13937 — dashboard home new-order card */
export const dashboardNewOrderContent: DashboardNewOrderContent = {
  assets: {
    columnDivider: `${SERVICE_IMG}/order/divider-line.svg`,
  },
}

const dashboardPackages: ServiceHeroContent["orderWidget"]["packages"] = [
  {
    id: "dash-pkg-250",
    quantity: 250,
    unitLabel: "Followers",
    price: "$4.99",
    compareAtPrice: "$5.74",
  },
  {
    id: "dash-pkg-100",
    quantity: 100,
    saveLabel: "Save 13%",
    unitLabel: "Followers",
    price: "$2.99",
    compareAtPrice: "$3.44",
  },
  {
    id: "dash-pkg-500",
    quantity: 500,
    saveLabel: "Save 13%",
    unitLabel: "Followers",
    price: "$8.99",
    compareAtPrice: "$10.33",
  },
  {
    id: "dash-pkg-1k",
    quantity: 1000,
    quantityLabel: "1k",
    saveLabel: "Save 13%",
    unitLabel: "Followers",
    price: "$15.99",
    compareAtPrice: "$18.38",
  },
  {
    id: "dash-pkg-2500",
    quantity: 2500,
    quantityLabel: "2.5k",
    saveLabel: "Save 13%",
    unitLabel: "Followers",
    price: "$34.99",
    compareAtPrice: "$40.22",
  },
  {
    id: "dash-pkg-5k",
    quantity: 5000,
    quantityLabel: "5k",
    saveLabel: "Save 13%",
    unitLabel: "Followers",
    price: "$59.99",
    compareAtPrice: "$68.95",
  },
  {
    id: "dash-pkg-10k",
    quantity: 10000,
    quantityLabel: "10k",
    saveLabel: "Save 13%",
    unitLabel: "Followers",
    price: "$99.99",
    compareAtPrice: "$114.93",
  },
  {
    id: "dash-pkg-25k",
    quantity: 25000,
    quantityLabel: "25k",
    saveLabel: "$30 off",
    unitLabel: "Followers",
    price: "$199.99",
    compareAtPrice: "$229.99",
  },
  {
    id: "dash-pkg-50k",
    quantity: 50000,
    quantityLabel: "50k",
    saveLabel: "$56 off",
    unitLabel: "Followers",
    price: "$349.99",
    compareAtPrice: "$405.99",
  },
]

export const dashboardOrderWidgetContent: ServiceHeroContent["orderWidget"] = {
  ...serviceHeroContent.orderWidget,
  defaultPackageId: "dash-pkg-250",
  packages: dashboardPackages,
}