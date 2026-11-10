"use client"

import { useId, useState } from "react"

import { AuthFlowModalFrame } from "@/components/shared/auth/auth-flow-modal-frame"
import { setNewPasswordModalContent } from "@/data/auth/set-new-password-modal"
import type { SetNewPasswordModalContent } from "@/types/auth/set-new-password-modal"

type SetNewPasswordModalBodyProps = {
  onBack: () => void
  onSubmit?: () => void
  content?: SetNewPasswordModalContent
}

function PasswordField({
  id,
  label,
  placeholder,
  value,
  onChange,
  showPassword,
  onToggleVisibility,
  assets,
  autoComplete,
}: {
  id: string
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  showPassword: boolean
  onToggleVisibility: () => void
  assets: SetNewPasswordModalContent["assets"]
  autoComplete: string
}) {
  return (
    <div className="flex w-full min-w-0 flex-col gap-2">
      <label
        htmlFor={id}
        className="text-base font-medium leading-[1.35] text-[#202020]"
      >
        {label}
      </label>
      <div className="flex h-[52px] items-center justify-between gap-2 rounded-xl border border-[#ebecef] bg-[#f5f6f7] px-[18px] py-4 backdrop-blur-[40px]">
        <div className="flex min-w-0 flex-1 items-center gap-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={assets.lockIcon}
            width={20}
            height={20}
            className="shrink-0 opacity-70"
          />
          <input
            id={id}
            type={showPassword ? "text" : "password"}
            name={id}
            autoComplete={autoComplete}
            placeholder={placeholder}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-sm font-normal leading-[1.3] text-[#4f586d] placeholder:text-[#4f586d] focus:outline-none"
          />
        </div>
        <button
          type="button"
          aria-pressed={showPassword}
          onClick={onToggleVisibility}
          className="flex size-7 shrink-0 items-center justify-center rounded-md opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#21aeff]/45"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={showPassword ? assets.eyeIcon : assets.eyeOffIcon}
            width={18}
            height={18}
            className="pointer-events-none block"
          />
        </button>
      </div>
    </div>
  )
}

export function SetNewPasswordModalBody({
  onBack,
  onSubmit,
  content = setNewPasswordModalContent,
}: SetNewPasswordModalBodyProps) {
  const passwordId = useId()
  const confirmId = useId()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const canSubmit =
    password.length > 0 && confirmPassword.length > 0 && password === confirmPassword

  return (
    <AuthFlowModalFrame
      title={content.title}
      backLabel={content.backLabel}
      backArrowSrc={content.assets.backArrow}
      onBack={onBack}
    >
      <form
        className="flex w-full min-w-0 flex-col gap-6"
        onSubmit={(event) => {
          event.preventDefault()
          if (canSubmit) {
            onSubmit?.()
          }
        }}
      >
        <PasswordField
          id={passwordId}
          label={content.passwordLabel}
          placeholder={content.passwordPlaceholder}
          value={password}
          onChange={setPassword}
          showPassword={showPassword}
          onToggleVisibility={() => setShowPassword((v) => !v)}
          assets={content.assets}
          autoComplete="new-password"
        />

        <PasswordField
          id={confirmId}
          label={content.confirmPasswordLabel}
          placeholder={content.confirmPasswordPlaceholder}
          value={confirmPassword}
          onChange={setConfirmPassword}
          showPassword={showConfirmPassword}
          onToggleVisibility={() => setShowConfirmPassword((v) => !v)}
          assets={content.assets}
          autoComplete="new-password"
        />

        <button
          type="submit"
          disabled={!canSubmit}
          className="flex h-[54px] w-full min-w-0 items-center justify-center rounded-xl bg-[#269de7] px-4 py-4 text-base font-medium leading-[1.35] text-white shadow-none transition-[box-shadow,opacity] hover:shadow-[0px_4px_14px_rgba(38,157,231,0.4)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none"
        >
          {content.submitLabel}
        </button>
      </form>
    </AuthFlowModalFrame>
  )
}
