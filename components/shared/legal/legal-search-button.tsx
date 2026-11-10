type LegalSearchButtonProps = {
  iconSrc: string
  highlightSrc: string
  label?: string
}

/** Figma `book-button` (25843:20300): 56×48, highlight `bg` (25843:20301), 24px search icon. */
export function LegalSearchButton({
  iconSrc,
  highlightSrc,
  label = "Search sections",
}: LegalSearchButtonProps) {
  return (
    <button
      type="button"
      className="relative box-border flex h-12 w-14 shrink-0 cursor-pointer items-center justify-center overflow-clip rounded-lg bg-brand px-4 py-3"
      aria-label={label}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        aria-hidden
        src={highlightSrc}
        width={130}
        height={45}
        className="pointer-events-none absolute left-1/2 top-[-11px] max-w-none -translate-x-1/2"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        src={iconSrc}
        width={24}
        height={24}
        className="relative z-10 m-auto block size-6 shrink-0"
      />
    </button>
  )
}
