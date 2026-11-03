import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const PRIMARY_BUTTON_ARROW = "/images/ui/arrow-up-right.svg"
const OUTLINE_BUTTON_ARROW = "/images/ui/arrow-up-right-outline.svg"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "rounded-[10.971px] bg-[#269de7] font-medium text-white hover:bg-[#2296d4]",
        outline:
          "rounded-[10.971px] border-[1.371px] border-solid border-[#1698e3] bg-white font-medium text-[#1698e3] shadow-[inset_0px_0px_7.314px_0px_rgba(255,255,255,0.5)] hover:bg-[#f8fcff]",
        secondary:
          "rounded-4xl text-sm bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "rounded-4xl text-sm hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "rounded-4xl text-sm bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-sm text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-9 gap-1.5 px-3 text-sm has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
        xs: "h-6 gap-1 px-2.5 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 px-3 text-sm has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        lg: "h-10 gap-1.5 px-4 text-sm has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-9",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        size: "default",
        className:
          "h-[50px] min-h-[50px] gap-[10.971px] px-[21.943px] text-[16px] leading-[1.35]",
      },
      {
        variant: "outline",
        size: "default",
        className:
          "h-[50px] min-h-[50px] gap-[10.971px] px-[29.257px] text-[16px] leading-[1.35]",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function PrimaryButtonArrow({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex size-[21.943px] shrink-0 items-center justify-center rounded-full bg-white p-[3.657px]",
        className
      )}
      aria-hidden
    >
      <img
        src={PRIMARY_BUTTON_ARROW}
        alt=""
        width={10.9714}
        height={10.9714}
        className="block shrink-0"
      />
    </span>
  )
}

function OutlineButtonArrow({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex size-[21.943px] shrink-0 items-center justify-center rounded-full bg-[#1698e3] p-[3.657px]",
        className
      )}
      aria-hidden
    >
      <img
        src={OUTLINE_BUTTON_ARROW}
        alt=""
        width={10.9714}
        height={10.9714}
        className="block shrink-0"
      />
    </span>
  )
}

type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    /** Trailing arrow badge from Figma CTAs; default true for `default` and `outline` at `size="default"`. */
    showArrow?: boolean
  }

function Button({
  className,
  variant = "default",
  size = "default",
  showArrow,
  children,
  ...props
}: ButtonProps) {
  const isFigmaCtaSize = size === "default"
  const shouldShowArrow =
    showArrow ??
    (isFigmaCtaSize && (variant === "default" || variant === "outline"))

  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
      {shouldShowArrow && variant === "default" ? <PrimaryButtonArrow /> : null}
      {shouldShowArrow && variant === "outline" ? <OutlineButtonArrow /> : null}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
