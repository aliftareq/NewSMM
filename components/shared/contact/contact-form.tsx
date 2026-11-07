"use client"

import type { ContactFormField } from "@/types/contact/contact"

const inputClassName =
  "w-full rounded-xl border border-solid border-n40 bg-n20 px-6 py-5 text-sm font-normal leading-[1.3] text-n700 outline-none placeholder:text-n400 focus:border-brand"

type ContactFormProps = {
  fields: ContactFormField[]
  submitLabel: string
  submitArrowSrc: string
}

function ContactField({ field }: { field: ContactFormField }) {
  return (
    <div className="flex w-full flex-col gap-3">
      <label
        htmlFor={field.id}
        className="text-base font-medium leading-[1.35] text-[#202020]"
      >
        {field.label}
      </label>
      {field.type === "textarea" ? (
        <textarea
          id={field.id}
          name={field.id}
          rows={6}
          placeholder={field.placeholder}
          className={`${inputClassName} min-h-[196px] resize-y`}
        />
      ) : (
        <input
          id={field.id}
          name={field.id}
          type="text"
          placeholder={field.placeholder}
          className={inputClassName}
          autoComplete={field.id === "whatsapp" ? "tel" : "off"}
        />
      )}
    </div>
  )
}

export function ContactForm({
  fields,
  submitLabel,
  submitArrowSrc,
}: ContactFormProps) {
  const [firstName, lastName, ...restFields] = fields

  return (
    <form
      className="flex w-full max-w-[738px] flex-col gap-8"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="flex w-full flex-col gap-5">
        <div className="flex w-full flex-col gap-5 sm:flex-row sm:gap-8">
          {firstName ? <ContactField field={firstName} /> : null}
          {lastName ? <ContactField field={lastName} /> : null}
        </div>
        {restFields.map((field) => (
          <ContactField key={field.id} field={field} />
        ))}
      </div>

      <button
        type="submit"
        className="inline-flex h-12 w-fit items-center justify-center gap-2.5 rounded-xl bg-brand px-7 py-1.5 text-base font-medium leading-[1.5] text-white transition-colors hover:bg-[#1a9de8]"
      >
        {submitLabel}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src={submitArrowSrc} width={16} height={16} className="size-4" />
      </button>
    </form>
  )
}
