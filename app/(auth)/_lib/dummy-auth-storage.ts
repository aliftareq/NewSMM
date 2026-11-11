import {
  DUMMY_AUTH_SESSION_STORAGE_KEY,
  DUMMY_AUTH_UPDATED_EVENT,
  DUMMY_AUTH_USERS_STORAGE_KEY,
} from "@/app/(auth)/_lib/dummy-auth-constants"
import type {
  DummyAuthSession,
  DummyAuthUser,
  DummyAuthUsersRegistry,
} from "@/app/(auth)/_types/dummy-auth"

function emptyRegistry(): DummyAuthUsersRegistry {
  return { accounts: [] }
}

export function emitDummyAuthUpdated() {
  if (typeof window === "undefined") return
  window.dispatchEvent(new CustomEvent(DUMMY_AUTH_UPDATED_EVENT))
}

export function readDummyAuthUsers(): DummyAuthUsersRegistry {
  if (typeof window === "undefined") return emptyRegistry()
  try {
    const raw = window.localStorage.getItem(DUMMY_AUTH_USERS_STORAGE_KEY)
    if (!raw) return emptyRegistry()
    const parsed = JSON.parse(raw) as DummyAuthUsersRegistry
    if (!Array.isArray(parsed.accounts)) return emptyRegistry()
    return parsed
  } catch {
    return emptyRegistry()
  }
}

export function writeDummyAuthUsers(registry: DummyAuthUsersRegistry) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(
    DUMMY_AUTH_USERS_STORAGE_KEY,
    JSON.stringify(registry),
  )
}

function sessionStore(rememberMe: boolean): Storage | null {
  if (typeof window === "undefined") return null
  return rememberMe ? window.localStorage : window.sessionStorage
}

export function readDummyAuthSession(): DummyAuthSession | null {
  if (typeof window === "undefined") return null
  for (const storage of [window.sessionStorage, window.localStorage]) {
    try {
      const raw = storage.getItem(DUMMY_AUTH_SESSION_STORAGE_KEY)
      if (!raw) continue
      const parsed = JSON.parse(raw) as DummyAuthSession
      if (parsed?.user?.id && parsed.user.email) {
        return parsed
      }
    } catch {
      // try next storage
    }
  }
  return null
}

export function writeDummyAuthSession(
  session: DummyAuthSession | null,
  rememberMe: boolean,
) {
  if (typeof window === "undefined") return
  window.sessionStorage.removeItem(DUMMY_AUTH_SESSION_STORAGE_KEY)
  window.localStorage.removeItem(DUMMY_AUTH_SESSION_STORAGE_KEY)
  if (!session) {
    emitDummyAuthUpdated()
    return
  }
  const storage = sessionStore(rememberMe)
  storage?.setItem(DUMMY_AUTH_SESSION_STORAGE_KEY, JSON.stringify(session))
  emitDummyAuthUpdated()
}

export function persistDummyAuthUser(user: DummyAuthUser, rememberMe: boolean) {
  writeDummyAuthSession({ user }, rememberMe)
}
