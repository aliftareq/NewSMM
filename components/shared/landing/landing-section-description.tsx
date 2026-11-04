import { cn } from "@/lib/utils"

type LandingSectionDescriptionProps = {
  children: React.ReactNode
  className?: string
}

/** Shared body copy under landing section headings (Why Choose Us, Customer Reviews, …). */
export function LandingSectionDescription({
  children,
  className,
}: LandingSectionDescriptionProps) {
  return (
    <p
      className={cn(
        "w-full text-base leading-normal font-normal text-pretty text-[#343e56]",
        className,
      )}
    >
      {children}
    </p>
  )
}
