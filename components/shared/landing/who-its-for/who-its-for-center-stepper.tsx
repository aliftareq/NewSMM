import Image from "next/image"

type WhoItsForCenterStepperProps = {
  stepperSrc: string
  logomarkSrc: string
}

/** Figma 25704:30539–30548 — vertical stepper + center logomark */
export function WhoItsForCenterStepper({
  stepperSrc,
  logomarkSrc,
}: WhoItsForCenterStepperProps) {
  return (
    <div
      aria-hidden
      className="relative hidden w-9 shrink-0 self-center lg:block"
      data-slot="who-its-for-center-stepper"
    >
      <div className="relative mx-auto h-[342px] w-9">
        <Image
          src={stepperSrc}
          alt=""
          width={36}
          height={342}
          className="size-full object-contain"
          unoptimized
        />
        <div className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-xl border border-[#86d3ff] bg-white">
          <div className="relative h-9 w-[46px]">
            <Image
              src={logomarkSrc}
              alt=""
              width={46}
              height={36}
              className="size-full object-contain"
              unoptimized
            />
          </div>
        </div>
      </div>
    </div>
  )
}
