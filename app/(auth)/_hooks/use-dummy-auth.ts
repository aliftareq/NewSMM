"use client"

import { useCallback, useEffect, useState } from "react"

import { DUMMY_AUTH_UPDATED_EVENT } from "@/app/(auth)/_lib/dummy-auth-constants"
import {
  dummyAuthLogin,
  dummyAuthLoginWithGoogle,
  dummyAuthLogout,
  dummyAuthSignUp,
  getDummyAuthUser,
} from "@/app/(auth)/_lib/dummy-auth"
import type { DummyAuthUser } from "@/app/(auth)/_types/dummy-auth"

export function useDummyAuth() {
  const [user, setUser] = useState<DummyAuthUser | null>(null)

  const refresh = useCallback(() => {
    setUser(getDummyAuthUser())
  }, [])

  useEffect(() => {
    refresh()
    const onUpdate = () => refresh()
    window.addEventListener(DUMMY_AUTH_UPDATED_EVENT, onUpdate)
    window.addEventListener("storage", onUpdate)
    return () => {
      window.removeEventListener(DUMMY_AUTH_UPDATED_EVENT, onUpdate)
      window.removeEventListener("storage", onUpdate)
    }
  }, [refresh])

  const login = useCallback(
    (email: string, password: string, rememberMe: boolean) =>
      dummyAuthLogin(email, password, rememberMe),
    [],
  )

  const signUp = useCallback(
    (email: string, password: string, rememberMe = true) =>
      dummyAuthSignUp(email, password, rememberMe),
    [],
  )

  const loginWithGoogle = useCallback(
    (rememberMe: boolean) => dummyAuthLoginWithGoogle(rememberMe),
    [],
  )

  const logout = useCallback(() => {
    dummyAuthLogout()
    setUser(null)
  }, [])

  return {
    user,
    isAuthenticated: user !== null,
    login,
    signUp,
    loginWithGoogle,
    logout,
    refresh,
  }
}
