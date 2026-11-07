import { NewOrderPlatformIconSlot } from "@/components/shared/service/new-order/new-order-platform-icon-slot"
import { newOrderContent } from "@/data/service/new-order"
import type { CartLineItem } from "@/types/cart/cart"

type CartMiniLineItemProps = {
  item: CartLineItem
  onRemove: (id: string) => void
}

export function CartMiniLineItem({ item, onRemove }: CartMiniLineItemProps) {
  return (
    <div className="flex w-full items-center justify-between gap-3">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <NewOrderPlatformIconSlot
          icon={newOrderContent.service.platformIcon}
          spriteSrc={newOrderContent.assets.socialIconsSprite}
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium leading-[1.35] text-[#222e48]">
            {item.title}
          </p>
          <p className="text-xs font-normal leading-[1.35] text-[#4f586d]">
            • {item.platformLabel}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <p className="text-sm font-semibold leading-[1.3] text-[#343e56]">
          {item.price}
        </p>
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="flex size-8 items-center justify-center rounded-lg text-[#798090] transition-colors hover:bg-[#f5f6f7] hover:text-[#343e56]"
          aria-label={`Remove ${item.title}`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M3.5 5.5H16.5M8 5.5V4.25C8 3.83579 8.33579 3.5 8.75 3.5H11.25C11.6642 3.5 12 3.83579 12 4.25V5.5M7.25 8.25V14.25M12.75 8.25V14.25M5.25 5.5L6 15.25C6 15.6642 6.33579 16 6.75 16H13.25C13.6642 16 14 15.6642 14 15.25L14.75 5.5"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
