import { DUMMY_GOOGLE_USER_EMAIL } from "@/app/(auth)/_lib/dummy-auth-constants"
import {
  persistDummyAuthUser,
  readDummyAuthSession,
  readDummyAuthUsers,
  writeDummyAuthSession,
  writeDummyAuthUsers,
} from "@/app/(auth)/_lib/dummy-auth-storage"
import type { DummyAuthUser } from "@/app/(auth)/_types/dummy-auth"

export type DummyAuthResult =
  | { ok: true; user: DummyAuthUser }
  | { ok: false; error: string }

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

function validateCredentials(email: string, password: string): string | null {
  const normalized = normalizeEmail(email)
  if (!normalized.includes("@") || normalized.length < 3) {
    return "Enter a valid email address."
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters."
  }
  return null
}

function createUserId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  return `user-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function userFromAccount(account: {
  id: string
  email: string
  createdAt: string
}): DummyAuthUser {
  return { id: account.id, email: account.email, createdAt: account.createdAt }
}

export function getDummyAuthUser(): DummyAuthUser | null {
  return readDummyAuthSession()?.user ?? null
}

export function dummyAuthSignUp(
  email: string,
  password: string,
  rememberMe = true,
): DummyAuthResult {
  const validationError = validateCredentials(email, password)
  if (validationError) {
    return { ok: false, error: validationError }
  }

  const normalized = normalizeEmail(email)
  const registry = readDummyAuthUsers()
  if (registry.accounts.some((account) => account.email === normalized)) {
    return { ok: false, error: "An account with this email already exists." }
  }

  const createdAt = new Date().toISOString()
  const account = {
    id: createUserId(),
    email: normalized,
    password,
    createdAt,
  }
  writeDummyAuthUsers({
    accounts: [...registry.accounts, account],
  })

  const user = userFromAccount(account)
  persistDummyAuthUser(user, rememberMe)
  return { ok: true, user }
}

export function dummyAuthLogin(
  email: string,
  password: string,
  rememberMe: boolean,
): DummyAuthResult {
  const validationError = validateCredentials(email, password)
  if (validationError) {
    return { ok: false, error: validationError }
  }

  const normalized = normalizeEmail(email)
  const account = readDummyAuthUsers().accounts.find(
    (item) => item.email === normalized,
  )
  if (!account || account.password !== password) {
    return { ok: false, error: "Invalid email or password." }
  }

  const user = userFromAccount(account)
  persistDummyAuthUser(user, rememberMe)
  return { ok: true, user }
}

export function dummyAuthLoginWithGoogle(rememberMe: boolean): DummyAuthResult {
  const registry = readDummyAuthUsers()
  let account = registry.accounts.find(
    (item) => item.email === DUMMY_GOOGLE_USER_EMAIL,
  )
  if (!account) {
    const createdAt = new Date().toISOString()
    account = {
      id: createUserId(),
      email: DUMMY_GOOGLE_USER_EMAIL,
      password: "",
      createdAt,
    }
    writeDummyAuthUsers({
      accounts: [...registry.accounts, account],
    })
  }
  const user = userFromAccount(account)
  persistDummyAuthUser(user, rememberMe)
  return { ok: true, user }
}

export function dummyAuthLogout() {
  writeDummyAuthSession(null, false)
}

export function formatDummyAuthDisplayName(email: string): string {
  if (email === DUMMY_GOOGLE_USER_EMAIL) {
    return "Google Demo"
  }
  const local = email.split("@")[0] ?? email
  const words = local
    .split(/[._-]+/)
    .filter(Boolean)
    .map(
      (part) =>
        `${part.charAt(0).toUpperCase()}${part.slice(1).toLowerCase()}`,
    )
  const label = words.length > 0 ? words.join(" ") : local
  if (label.length <= 24) return label
  return `${label.slice(0, 21)}…`
}
