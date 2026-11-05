import type { WhyChooseOurServiceCard } from "@/types/landing/why-choose-our-service"
import { cn } from "@/lib/utils"

type WhyChooseOurServiceCardProps = {
  card: WhyChooseOurServiceCard
  className?: string
}

export function WhyChooseOurServiceCard({
  card,
  className,
}: WhyChooseOurServiceCardProps) {
  return (
    <article
      data-slot="why-choose-our-service-card"
      className={cn(
        "flex h-full flex-col rounded-2xl bg-[#f6f6f6] p-5",
        className,
      )}
    >
      <div className="flex flex-col gap-7">
        <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#dfe0e4] bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={card.iconSrc}
            className={cn("block", card.iconClassName ?? "size-8 object-contain")}
          />
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-medium leading-[1.25] text-[#202020]">
            {card.title}
          </h3>
          <p className="text-base font-normal leading-[1.2] text-n600">
            {card.description}
          </p>
        </div>
      </div>
    </article>
  )
}
