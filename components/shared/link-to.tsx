import Link from "next/link"
import type { ComponentProps } from "react"

export type LinkToProps = ComponentProps<typeof Link>

export function LinkTo(props: LinkToProps) {
  return <Link {...props} />
}
