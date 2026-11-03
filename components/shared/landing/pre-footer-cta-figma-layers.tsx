import type { PreFooterCtaContent } from "@/types/landing/pre-footer-cta"

const BLEND_LAYERS = [
  { key: "curveBlend1", inset: "inset-[-0.74%_-0.56%]" },
  { key: "curveBlend2", inset: "inset-[-0.74%_-0.56%]" },
  { key: "curveBlend3", inset: "inset-[-0.49%_-0.38%]" },
  { key: "curveBlend4", inset: "inset-[-0.25%_-0.19%]" },
  { key: "curveBlend5", inset: "inset-[-0.25%_-0.19%]" },
] as const satisfies ReadonlyArray<{
  key: keyof PreFooterCtaContent["assets"]
  inset: string
}>

type CtaFigmaLayersProps = {
  assets: PreFooterCtaContent["assets"]
}

/** Decorations scale with card size (% = Figma 1280×414.171) */
export function CtaFigmaLayers({ assets }: CtaFigmaLayersProps) {
  return (
    <div className="pointer-events-none absolute inset-0 isolate overflow-hidden">
      <div className="absolute left-1/2 top-[64.71%] h-[16.78%] w-[20.29%] -translate-x-1/2">
        <div className="absolute inset-[-131.58%_-35.21%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={assets.glowCenter} className="block size-full max-w-none" />
        </div>
      </div>

      <div className="absolute left-1/2 top-[89.49%] w-[158.57%] -translate-x-1/2">
        <div className="relative w-full pt-[76.3%]">
          <div className="absolute inset-0">
            <div className="absolute inset-[-0.71%_-0.54%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" src={assets.curveDark} className="block size-full max-w-none" />
            </div>
          </div>
        </div>
      </div>

      {BLEND_LAYERS.map(({ key, inset }) => (
        <div
          key={key}
          className="absolute top-[87.05%] left-[-26.36%] w-[152.33%] mix-blend-plus-lighter"
        >
          <div className="relative w-full pt-[76.26%]">
            <div className={`absolute inset-0 ${inset}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" src={assets[key]} className="block size-full max-w-none" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
