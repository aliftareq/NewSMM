import { cn } from "@/lib/utils"

type ComparisonSideLabelProps = {
  label: string
  variant: "positive" | "negative"
  className?: string
}

export function ComparisonSideLabel({
  label,
  variant,
  className,
}: ComparisonSideLabelProps) {
  return (
    <>
      {/* Desktop: vertical tab attached to card */}
      <div
        className={cn(
          "hidden h-[455px] w-[60px] shrink-0 flex-col items-center justify-center xl:flex",
          variant === "positive"
            ? "rounded-br-[20px] rounded-tr-[20px] bg-gradient-to-b from-[#38b5e6] to-[#30a3f4] pl-[11px] pr-2.5"
            : "rounded-bl-[20px] rounded-tl-[20px] bg-gradient-to-b from-[#ff6889] to-[#e11d48] pl-2.5 pr-[11px]",
          className,
        )}
        aria-hidden
      >
        <span
          className={cn(
            "-rotate-90 whitespace-nowrap text-[28px] font-semibold capitalize text-white",
            variant === "positive" && "tracking-[-0.02em] leading-[1.4]",
            variant === "negative" && "leading-normal",
          )}
        >
          {label}
        </span>
      </div>

      {/* Mobile / tablet: horizontal strip above card */}
      <div
        className={cn(
          "flex w-full min-w-0 items-center justify-center rounded-t-[20px] px-4 py-3 xl:hidden",
          variant === "positive"
            ? "bg-gradient-to-r from-[#38b5e6] to-[#30a3f4]"
            : "bg-gradient-to-r from-[#ff6889] to-[#e11d48]",
        )}
      >
        <span className="text-center text-base font-semibold capitalize text-white sm:text-lg md:text-xl">
          {label}
        </span>
      </div>
    </>
  )
}
