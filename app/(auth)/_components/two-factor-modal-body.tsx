"use client"

import { useCallback, useId, useMemo, useRef, useState } from "react"

import { AuthFlowModalFrame } from "@/app/(auth)/_components/auth-flow-modal-frame"
import { twoFactorModalContent } from "@/data/auth/two-factor-modal"
import type { TwoFactorModalContent } from "@/types/auth/two-factor-modal"
import { cn } from "@/lib/utils"

type TwoFactorModalBodyProps = {
  onBack: () => void
  onContinue: () => void
  content?: TwoFactorModalContent
}

export function TwoFactorModalBody({
  onBack,
  onContinue,
  content = twoFactorModalContent,
}: TwoFactorModalBodyProps) {
  const groupId = useId()
  const length = content.codeLength
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])
  const [digits, setDigits] = useState<string[]>(() => Array(length).fill(""))

  const setDigit = useCallback((index: number, value: string) => {
    setDigits((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
  }, [])

  const focusInput = (index: number) => {
    const el = inputRefs.current[index]
    el?.focus()
    el?.select()
  }

  const handleChange = (index: number, raw: string) => {
    const value = raw.replace(/\D/g, "").slice(-1)
    setDigit(index, value)
    if (value && index < length - 1) {
      focusInput(index + 1)
    }
  }

  const handleKeyDown = (index: number, key: string) => {
    if (key === "Backspace" && !digits[index] && index > 0) {
      focusInput(index - 1)
    }
    if (key === "ArrowLeft" && index > 0) {
      focusInput(index - 1)
    }
    if (key === "ArrowRight" && index < length - 1) {
      focusInput(index + 1)
    }
  }

  const handlePaste = (index: number, text: string) => {
    const chars = text.replace(/\D/g, "").slice(0, length - index).split("")
    if (chars.length === 0) return
    setDigits((prev) => {
      const next = [...prev]
      chars.forEach((char, offset) => {
        next[index + offset] = char
      })
      return next
    })
    const nextFocus = Math.min(index + chars.length, length - 1)
    focusInput(nextFocus)
  }

  const codeComplete = useMemo(() => digits.every((d) => d.length === 1), [digits])

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
          if (codeComplete) {
            onContinue()
          }
        }}
      >
        <div className="flex w-full min-w-0 flex-col gap-2">
          <p
            id={`${groupId}-label`}
            className="text-base font-medium leading-[1.35] text-[#202020]"
          >
            {content.codeLabel}
          </p>
          <div
            role="group"
            aria-labelledby={`${groupId}-label`}
            className="grid w-full min-w-0 grid-cols-6 gap-2"
          >
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el
                }}
                type="text"
                inputMode="numeric"
                autoComplete={index === 0 ? "one-time-code" : "off"}
                maxLength={1}
                value={digit}
                aria-label={`Digit ${index + 1} of ${length}`}
                onChange={(event) => handleChange(index, event.target.value)}
                onKeyDown={(event) => handleKeyDown(index, event.key)}
                onPaste={(event) => {
                  event.preventDefault()
                  handlePaste(index, event.clipboardData.getData("text"))
                }}
                className={cn(
                  "h-[52px] w-full min-w-0 rounded-lg border border-[#e8e8e3] bg-white text-center text-lg font-medium leading-[1.35] text-[#202020] outline-none transition-colors",
                  "focus:border-[#21aeff] focus:ring-2 focus:ring-[#21aeff]/25",
                )}
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!codeComplete}
          className="flex h-[54px] w-full min-w-0 items-center justify-center rounded-xl bg-[#269de7] px-4 py-4 text-base font-medium leading-[1.35] text-white shadow-none transition-[box-shadow,opacity] hover:shadow-[0px_4px_14px_rgba(38,157,231,0.4)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none"
        >
          {content.submitLabel}
        </button>
      </form>
    </AuthFlowModalFrame>
  )
}
