export type DummyAuthUser = {
  id: string
  email: string
  createdAt: string
}

export type DummyAuthSession = {
  user: DummyAuthUser
}

export type DummyAuthAccount = {
  id: string
  email: string
  /** Demo-only; never store real passwords like this in production. */
  password: string
  createdAt: string
}

export type DummyAuthUsersRegistry = {
  accounts: DummyAuthAccount[]
}
