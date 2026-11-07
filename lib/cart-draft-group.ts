const DRAFT_GROUP_KEY = "smm-cart-draft-group"

function createGroupId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  return `g-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function getDraftGroupId(): string {
  if (typeof window === "undefined") {
    return "server"
  }
  const existing = window.sessionStorage.getItem(DRAFT_GROUP_KEY)
  if (existing?.trim()) {
    return existing
  }
  const id = createGroupId()
  window.sessionStorage.setItem(DRAFT_GROUP_KEY, id)
  return id
}

/** Call before starting a new order so extras sync does not overwrite prior cart lines. */
export function startNewDraftGroup(): string {
  if (typeof window === "undefined") {
    return "server"
  }
  const id = createGroupId()
  window.sessionStorage.setItem(DRAFT_GROUP_KEY, id)
  return id
}

export function isNewOrderFromSearchParams(
  searchParams: URLSearchParams,
): boolean {
  const flag = searchParams.get("newOrder")
  return flag === "1" || flag === "true"
}
