import { cn } from "@/lib/utils"

type NewOrderProfileAvatarSlotProps = {
  avatarSrc: string
  variant?: "muted" | "raised"
  className?: string
}

export function NewOrderProfileAvatarSlot({
  avatarSrc,
  variant = "muted",
  className,
}: NewOrderProfileAvatarSlotProps) {
  return (
    <div
      className={cn(
        "relative h-[42px] w-[40.895px] shrink-0 overflow-hidden rounded-[8.842px] bg-white",
        variant === "muted" && "bg-[#ededed]",
        variant === "raised" &&
          "shadow-[0px_2px_4px_rgba(114,114,114,0.12)]",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        src={avatarSrc}
        width={41}
        height={42}
        className="size-full object-cover"
      />
    </div>
  )
}
