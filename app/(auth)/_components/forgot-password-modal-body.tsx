"use client"

import { useId } from "react"

import { AuthFlowModalFrame } from "@/app/(auth)/_components/auth-flow-modal-frame"
import { forgotPasswordModalContent } from "@/data/auth/forgot-password-modal"
import type { ForgotPasswordModalContent } from "@/types/auth/forgot-password-modal"

type ForgotPasswordModalBodyProps = {
  onBack: () => void
  onContinue: () => void
  content?: ForgotPasswordModalContent
}

export function ForgotPasswordModalBody({
  onBack,
  onContinue,
  content = forgotPasswordModalContent,
}: ForgotPasswordModalBodyProps) {
  const emailId = useId()
  const { assets } = content

  return (
    <AuthFlowModalFrame
      title={content.title}
      backLabel={content.backLabel}
      backArrowSrc={assets.backArrow}
      onBack={onBack}
    >
      <form
        className="flex w-full min-w-0 flex-col gap-6"
        onSubmit={(event) => {
          event.preventDefault()
          onContinue()
        }}
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor={emailId}
            className="text-base font-medium leading-[1.35] text-[#202020]"
          >
            {content.emailLabel}
          </label>
          <div className="flex h-[52px] items-center gap-2 rounded-xl border border-[#ebecef] bg-[#f5f6f7] px-[18px] py-4 backdrop-blur-[40px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={assets.mailIcon}
              width={20}
              height={20}
              className="size-5 shrink-0 object-contain opacity-70"
            />
            <input
              id={emailId}
              type="email"
              name="email"
              autoComplete="email"
              placeholder={content.emailPlaceholder}
              className="min-w-0 flex-1 bg-transparent text-sm font-normal leading-[1.3] text-[#4f586d] placeholder:text-[#4f586d] focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex h-[54px] w-full min-w-0 items-center justify-center rounded-xl bg-[#269de7] px-4 py-4 text-base font-medium leading-[1.35] text-white shadow-none transition-[box-shadow] hover:shadow-[0px_4px_14px_rgba(38,157,231,0.4)]"
        >
          {content.continueLabel}
        </button>
      </form>
    </AuthFlowModalFrame>
  )
}
