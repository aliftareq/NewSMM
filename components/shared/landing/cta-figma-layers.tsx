import type { CtaContent } from "@/types/landing/cta"

import { cn } from "@/lib/utils"

const BLEND_LAYERS = [
  { key: "curveBlend1", inset: "inset-[-0.74%_-0.56%]", blur: "blur-[5.486px]" },
  { key: "curveBlend2", inset: "inset-[-0.74%_-0.56%]", blur: "blur-[5.486px]" },
  { key: "curveBlend3", inset: "inset-[-0.49%_-0.38%]", blur: "blur-[3.657px]" },
  { key: "curveBlend4", inset: "inset-[-0.25%_-0.19%]", blur: "blur-[1.829px]" },
  { key: "curveBlend5", inset: "inset-[-0.25%_-0.19%]", blur: "blur-[1.829px]", opacity: 0.2 },
] as const satisfies ReadonlyArray<{
  key: keyof CtaContent["assets"]
  inset: string
  blur: string
  opacity?: number
}>

type CtaFigmaLayersProps = {
  assets: CtaContent["assets"]
}

/** Dev Mode — % positions match 1280×414.17 artboard at any card width */
export function CtaFigmaLayers({ assets }: CtaFigmaLayersProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-[37.53%] h-[66.91%] w-[57.14%] -translate-x-1/2">
        <div className="absolute inset-[-82.51%_-31.25%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={assets.glowWide} className="block size-full max-w-none" />
        </div>
      </div>

      <div className="absolute left-1/2 top-[64.71%] h-[16.78%] w-[20.29%] -translate-x-1/2 opacity-60">
        <div className="absolute inset-[-131.58%_-35.21%] blur-[45.714px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={assets.glowCenter} className="block size-full max-w-none" />
        </div>
      </div>

      <div className="absolute left-1/2 top-[89.49%] w-[158.57%] -translate-x-1/2">
        <div className="relative w-full pt-[76.3%]">
          <div className="absolute inset-0 blur-[5.486px]">
            <div className="absolute inset-[-0.71%_-0.54%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" src={assets.curveDark} className="block size-full max-w-none" />
            </div>
          </div>
        </div>
      </div>

      {BLEND_LAYERS.map((layer) => (
        <div
          key={layer.key}
          className={cn(
            "absolute top-[87.05%] left-[-26.36%] w-[152.33%] mix-blend-plus-lighter",
            layer.blur
          )}
          style={"opacity" in layer ? { opacity: layer.opacity } : undefined}
        >
          <div className="relative w-full pt-[76.26%]">
            <div className={`absolute inset-0 ${layer.inset}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" src={assets[layer.key]} className="block size-full max-w-none" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
