"use client"

import { useCallback, useEffect, useState } from "react"

import {
  addCartItem,
  cartItemCount,
  cartSubtotal,
  readCart,
  removeCartItem,
  writeCart,
} from "@/lib/cart-storage"
import type { CartLineItem } from "@/types/cart/cart"

export function useCart() {
  const [items, setItems] = useState<CartLineItem[]>([])

  const refresh = useCallback(() => {
    setItems(readCart().items)
  }, [])

  useEffect(() => {
    refresh()
    const onUpdate = () => refresh()
    window.addEventListener("smm-cart-updated", onUpdate)
    window.addEventListener("storage", onUpdate)
    return () => {
      window.removeEventListener("smm-cart-updated", onUpdate)
      window.removeEventListener("storage", onUpdate)
    }
  }, [refresh])

  const setItemsAndPersist = useCallback((next: CartLineItem[]) => {
    writeCart(next)
    setItems(next)
  }, [])

  const removeItem = useCallback((itemId: string) => {
    setItems(removeCartItem(itemId))
  }, [])

  const addItem = useCallback((item: CartLineItem) => {
    setItems(addCartItem(item))
  }, [])

  return {
    items,
    setItemsAndPersist,
    removeItem,
    addItem,
    itemCount: cartItemCount(items),
    subtotal: cartSubtotal(items),
  }
}
