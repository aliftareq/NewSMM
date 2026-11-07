"use client"

import { cartPageContent } from "@/data/cart/cart"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type CartRemoveItemDialogProps = {
  open: boolean
  itemTitle: string | null
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function CartRemoveItemDialog({
  open,
  itemTitle,
  onOpenChange,
  onConfirm,
}: CartRemoveItemDialogProps) {
  const description = itemTitle
    ? cartPageContent.removeConfirmDescriptionTemplate.replace(
        "{title}",
        itemTitle,
      )
    : ""

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="max-w-md rounded-3xl border border-[#ebecef] bg-white p-6 shadow-[0px_8px_24px_rgba(37,37,37,0.12)]"
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-[#222e48]">
            {cartPageContent.removeConfirmTitle}
          </DialogTitle>
          <DialogDescription className="text-sm leading-[1.35] text-[#4f586d]">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-3 sm:gap-3">
          <Button
            type="button"
            variant="outline"
            className="h-11 w-full sm:w-auto"
            onClick={() => onOpenChange(false)}
          >
            {cartPageContent.removeConfirmCancel}
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="h-11 w-full sm:w-auto"
            onClick={() => {
              onConfirm()
              onOpenChange(false)
            }}
          >
            {cartPageContent.removeConfirmConfirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
