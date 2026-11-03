export type PreFooterCtaContent = {
  headingLines: [string, string]
  /** Leading space before line two matches Figma (` Media Presence?`). */
  headingLineTwoPrefix: string
  descriptionLines: [string, string]
  primaryButton: { label: string; href: string }
  secondaryButton: { label: string; href: string }
  assets: {
    glowWide: string
    glowCenter: string
    curveDark: string
    curveBlend1: string
    curveBlend2: string
    curveBlend3: string
    curveBlend4: string
    curveBlend5: string
  }
}
