import { CustomerReviewsSection } from "@/components/shared/landing/customer-reviews/customer-reviews-section"
import { serviceCustomerReviewsData } from "@/data/service/customer-reviews"
import type { ServiceCustomerReviewsContent } from "@/types/service/customer-reviews"
import { cn } from "@/lib/utils"

type ServiceCustomerReviewsSectionProps = {
  content?: ServiceCustomerReviewsContent
  className?: string
}

/** Figma 25734:4357 — reuses landing customer reviews carousel with service copy */
export function ServiceCustomerReviewsSection({
  content = serviceCustomerReviewsData,
  className,
}: ServiceCustomerReviewsSectionProps) {
  return (
    <CustomerReviewsSection content={content} className={cn(className)} />
  )
}
