"use client"

import { useCallback, useState } from "react"

type PendingRemove = {
  id: string
  title: string
}

export function useCartRemoveConfirm(removeItem: (itemId: string) => void) {
  const [pending, setPending] = useState<PendingRemove | null>(null)

  const requestRemove = useCallback((id: string, title: string) => {
    setPending({ id, title })
  }, [])

  const dismissRemove = useCallback(() => {
    setPending(null)
  }, [])

  const confirmRemove = useCallback(() => {
    if (!pending) {
      return
    }
    removeItem(pending.id)
    setPending(null)
  }, [pending, removeItem])

  return {
    pendingTitle: pending?.title ?? null,
    removeDialogOpen: pending !== null,
    requestRemove,
    dismissRemove,
    confirmRemove,
  }
}
