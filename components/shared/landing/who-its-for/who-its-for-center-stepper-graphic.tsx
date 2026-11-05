/** Figma 25704:30539 — vertical stepper (inline for line reveal animation). */
const STEPPER_LINE_PATH =
  "M19 0V2.94828M19 342V339.052M19 8.84483V14.7414M19 20.6379V26.5345M19 32.431V38.3276M19 44.2241V50.1207M19 56.0172V61.9138M19 67.8104V73.7069M19 79.6035L19 85.5M19 91.3966V97.2931M19 103.19V109.086M19 114.983V120.879M19 126.776V132.672M19 138.569V144.466M19 150.362V156.259M19 162.155V168.052M19 173.948V179.845M19 185.741V191.638M19 197.534L19 203.431M19 209.328V215.224M19 221.121V227.017M19 232.914V238.81M19 244.707V250.603M19 256.5V262.396M19 268.293V274.19M19 280.086V285.983M19 291.879V297.776M19 303.672V309.569M19 315.465L19 321.362M19 327.258V333.155"

/** viewBox center — aligns with logomark anchor at 50% of 342px column */
export const WHO_ITS_FOR_STEPPER_CENTER_Y = 171
export const WHO_ITS_FOR_STEPPER_TOP_CIRCLE_Y = 18
export const WHO_ITS_FOR_STEPPER_BOTTOM_CIRCLE_Y = 324
export const WHO_ITS_FOR_STEPPER_LINE_SEGMENT_HEIGHT =
  WHO_ITS_FOR_STEPPER_CENTER_Y - WHO_ITS_FOR_STEPPER_TOP_CIRCLE_Y

export function WhoItsForCenterStepperGraphic() {
  return (
    <svg
      viewBox="0 0 36 342"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="block size-full object-contain"
      aria-hidden
    >
      <defs>
        <clipPath id="who-its-for-stepper-top-line-clip">
          <rect
            data-slot="who-its-for-stepper-line-top-clip"
            x="0"
            y={WHO_ITS_FOR_STEPPER_TOP_CIRCLE_Y}
            width="36"
            height="0"
          />
        </clipPath>
        <clipPath id="who-its-for-stepper-bottom-line-clip">
          <rect
            data-slot="who-its-for-stepper-line-bottom-clip"
            x="0"
            y={WHO_ITS_FOR_STEPPER_BOTTOM_CIRCLE_Y}
            width="36"
            height="0"
          />
        </clipPath>
      </defs>

      <g clipPath="url(#who-its-for-stepper-top-line-clip)">
        <path
          d={STEPPER_LINE_PATH}
          stroke="#222E48"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </g>
      <g clipPath="url(#who-its-for-stepper-bottom-line-clip)">
        <path
          d={STEPPER_LINE_PATH}
          stroke="#222E48"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </g>

      <g>
        <rect width="36" height="36" rx="18" fill="white" />
        <circle cx="18" cy="18" r="14" fill="#21AEFF" />
      </g>
      <g>
        <rect y="306" width="36" height="36" rx="18" fill="white" />
        <circle cx="18" cy="324" r="14" fill="#21AEFF" />
      </g>
    </svg>
  )
}
