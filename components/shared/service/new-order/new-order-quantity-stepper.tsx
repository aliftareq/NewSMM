type NewOrderQuantityStepperProps = {
  quantity: number
  onDecrement: () => void
  onIncrement: () => void
  canDecrement?: boolean
  canIncrement?: boolean
}

function StepperGlyph({ kind }: { kind: "minus" | "plus" }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="block size-6 shrink-0"
    >
      {kind === "minus" ? (
        <path
          d="M6 12H18"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      ) : (
        <>
          <path
            d="M12 6V18"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M6 12H18"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  )
}

export function NewOrderQuantityStepper({
  quantity,
  onDecrement,
  onIncrement,
  canDecrement = true,
  canIncrement = true,
}: NewOrderQuantityStepperProps) {
  return (
    <div className="flex h-[46px] w-full items-center justify-between rounded-lg bg-[#ebecef] px-0.5 py-2.5 shadow-[inset_0px_-1.21154px_0px_rgba(255,255,255,0.06)]">
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={!canDecrement}
        onClick={onDecrement}
        className="flex size-[42px] shrink-0 items-center justify-center rounded-lg bg-[#21aeff] p-2 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <StepperGlyph kind="minus" />
      </button>
      <span className="min-w-[2.5rem] text-center text-lg font-medium leading-[1.25] tabular-nums text-[#202020]">
        {quantity}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={!canIncrement}
        onClick={onIncrement}
        className="flex size-[42px] shrink-0 items-center justify-center rounded-lg bg-[#21aeff] p-2 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <StepperGlyph kind="plus" />
      </button>
    </div>
  )
}
