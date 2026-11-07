"use client"

import { NewOrderPlatformIconSlot } from "@/components/shared/service/new-order/new-order-platform-icon-slot"
import { NewOrderProfileRow } from "@/components/shared/service/new-order/new-order-profile-row"
import { NewOrderQuantityStepper } from "@/components/shared/service/new-order/new-order-quantity-stepper"
import type { NewOrderAssets, NewOrderContent } from "@/types/service/new-order"
import { cn } from "@/lib/utils"

const INSTAGRAM_GRADIENT =
  "bg-gradient-to-r from-[#f27b34] via-[#d8366b] to-[#7e359c] bg-clip-text text-transparent"

type NewOrderConfigPanelProps = {
  content: NewOrderContent
  assets: NewOrderAssets
  quantity: number
  onDecrementQuantity: () => void
  onIncrementQuantity: () => void
  canDecrementQuantity?: boolean
  canIncrementQuantity?: boolean
  confirmedHandle: string | null
  isEditingProfile: boolean
  onStartProfileEdit: () => void
  onCancelProfileEdit: () => void
  onSaveProfile: (username: string) => void
  price: string
  compareAtPrice: string
  discountLabel: string
}

export function NewOrderConfigPanel({
  content,
  assets,
  quantity,
  onDecrementQuantity,
  onIncrementQuantity,
  canDecrementQuantity = true,
  canIncrementQuantity = true,
  confirmedHandle,
  isEditingProfile,
  onStartProfileEdit,
  onCancelProfileEdit,
  onSaveProfile,
  price,
  compareAtPrice,
  discountLabel,
}: NewOrderConfigPanelProps) {
  const { service, extraOffer, profile } = content

  return (
    <div className="flex h-full w-full min-w-0 flex-col gap-4">
      <div className="shrink-0 rounded-[24px] border border-[#f5f6f7] bg-white px-6 py-8 shadow-[0px_2px_6px_rgba(37,37,37,0.16)]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <NewOrderPlatformIconSlot
                  icon={service.platformIcon}
                  spriteSrc={assets.socialIconsSprite}
                />
                <div className="flex flex-col gap-1.5">
                  <p
                    className={cn(
                      "text-lg font-semibold leading-[1.3]",
                      INSTAGRAM_GRADIENT,
                    )}
                  >
                    {service.title}
                  </p>
                  <p className="text-base font-medium leading-[1.35] text-[#4f586d]">
                    {service.platformLabel}
                  </p>
                </div>
              </div>
              <div className="flex items-end gap-2">
                <p className="text-sm leading-[1.3] text-[#798090] line-through">
                  {compareAtPrice}
                </p>
                <div className="flex flex-col items-start gap-2">
                  <p
                    className={cn(
                      "text-lg font-semibold leading-[1.3]",
                      INSTAGRAM_GRADIENT,
                    )}
                  >
                    {price}
                  </p>
                  <span className="rounded-lg bg-[rgba(52,199,89,0.14)] px-2.5 py-1 text-sm font-medium leading-[1.35] text-[#08ae31]">
                    {discountLabel}
                  </span>
                </div>
              </div>
            </div>

            <NewOrderQuantityStepper
              quantity={quantity}
              onDecrement={onDecrementQuantity}
              onIncrement={onIncrementQuantity}
              canDecrement={canDecrementQuantity}
              canIncrement={canIncrementQuantity}
            />
          </div>

          <div className="h-px w-full border-t border-dashed border-[#c1c4cc]" />

          <div className="flex flex-col items-end gap-2">
            <p className="w-full text-right text-sm leading-[1.35]">
              <span className="font-medium text-[#e11d48]">
                {service.customersNoteRed}
              </span>{" "}
              <span className="font-normal text-[#4f586d]">
                {service.customersNoteRest}
              </span>
            </p>
            <div className="flex w-full items-center justify-between rounded-xl border border-[#ffc4d1] bg-[#fdf7f9] p-3">
              <div className="flex items-start gap-3">
                <div className="relative flex h-[42px] w-[40.895px] items-center justify-center rounded-[8.842px] bg-white shadow-[0px_2px_4px_rgba(114,114,114,0.12)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    src={assets.trendingIcon}
                    width={20}
                    height={20}
                    className="size-5"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <p
                    className={cn(
                      "text-lg font-semibold leading-[1.3]",
                      INSTAGRAM_GRADIENT,
                    )}
                  >
                    {extraOffer.title}
                  </p>
                  <p className="text-sm leading-[1.3] text-[#4f586d]">
                    {extraOffer.subtitle}
                  </p>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: extraOffer.progressTotal }).map(
                      (_, index) => (
                        <span
                          key={index}
                          className={cn(
                            "h-1.5 rounded-sm",
                            index === 0 ? "w-[19px] bg-[#e11d48]" : "w-[9px] bg-[#d9d9d9]",
                          )}
                        />
                      ),
                    )}
                  </div>
                </div>
              </div>
              <p className="text-lg font-semibold leading-[1.3] text-[#e11d48]">
                {extraOffer.priceDelta}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col rounded-[24px] border border-[#f5f6f7] bg-white p-6 shadow-[0px_2px_6px_rgba(37,37,37,0.16)] sm:p-8">
        <div className="flex h-full min-h-0 flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <p className="text-lg font-semibold leading-[1.3] text-[#222e48]">
              {profile.sectionTitle}
            </p>
            <p className="text-base font-medium leading-[1.35] text-[#5b6477]">
              {profile.sectionSubtitle}
            </p>
          </div>

          <div className="h-px w-full border-t border-dashed border-[#c1c4cc]" />

          <NewOrderProfileRow
            profile={profile}
            assets={assets}
            platformIcon={service.platformIcon}
            confirmedHandle={confirmedHandle}
            isEditing={isEditingProfile}
            onStartEdit={onStartProfileEdit}
            onCancel={onCancelProfileEdit}
            onSave={onSaveProfile}
          />
        </div>
      </div>
    </div>
  )
}
