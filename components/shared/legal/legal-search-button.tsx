type LegalSearchButtonProps = {
  iconSrc: string
  label?: string
}

/** Figma `book-button` (25843:20700): 56×48, 8px radius, top highlight + 24px search icon. */
export function LegalSearchButton({
  iconSrc,
  label = "Search sections",
}: LegalSearchButtonProps) {
  return (
    <button
      type="button"
      className="relative flex h-12 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-brand"
      aria-label={label}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-11px] h-[45px] w-[130px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0)_72%)]"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        src={iconSrc}
        width={24}
        height={24}
        className="relative z-10 block"
      />
    </button>
  )
}
