"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center border font-sans font-medium whitespace-nowrap transition-control outline-none select-none focus-visible:focus-ring disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "border-accent-600 bg-accent-500 text-on-accent hover:border-accent-active hover:bg-accent-hover active:border-accent-600 active:bg-accent-active disabled:border-disabled-fill-line disabled:bg-disabled-fill disabled:text-ink-muted",
        secondary:
          "border-line-control bg-secondary-fill text-ink-strong hover:bg-fill-hover active:bg-fill-active disabled:border-disabled-line disabled:bg-disabled-bg disabled:text-ink-disabled data-popup-open:bg-fill-hover",
        outline:
          "border-accent-line bg-surface text-accent-700 hover:border-accent-line-hover hover:bg-accent-tint-97 active:border-accent-line-active active:bg-accent-tint-93 active:text-accent-800 disabled:border-disabled-fill disabled:bg-surface disabled:text-ink-disabled",
        ghost:
          "border-transparent bg-transparent text-accent-700 hover:bg-accent-tint-95 active:bg-accent-tint-90 active:text-accent-800 disabled:bg-transparent disabled:text-ink-disabled",
        plain:
          "border-line-control bg-surface text-ink-strong hover:bg-fill-hover active:bg-fill-active disabled:border-disabled-line disabled:bg-disabled-bg disabled:text-ink-disabled",
        destructive:
          "border-destructive-line bg-destructive text-on-accent hover:bg-destructive-hover disabled:border-disabled-fill-line disabled:bg-disabled-fill disabled:text-ink-muted",
      },
      size: {
        default:
          "h-10 rounded-[10px] px-3.5 pt-2 pb-2.5 text-[15px] leading-[1.25] has-[[data-slot=button-arrow]]:pr-2.5 has-[[data-slot=button-arrow]]:pl-3",
        compact: "h-8 rounded-md px-3 text-[13.5px] leading-[1.25]",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        size: "default",
        class:
          "bevel-primary text-shadow-button hover:shadow-flat active:bevel-primary-active disabled:shadow-flat disabled:text-shadow-none",
      },
      {
        variant: "secondary",
        size: "default",
        class:
          "bevel-secondary hover:shadow-flat active:shadow-flat disabled:shadow-flat data-popup-open:shadow-flat",
      },
      {
        variant: "outline",
        size: "default",
        class:
          "bevel-outline hover:shadow-flat active:bevel-outline-active disabled:shadow-flat",
      },
      {
        variant: "destructive",
        size: "default",
        class:
          "bevel-destructive text-shadow-destructive hover:shadow-flat disabled:shadow-flat disabled:text-shadow-none",
      },
    ],
    defaultVariants: { variant: "primary", size: "default" },
  }
)

type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof buttonVariants>

function Button({
  className,
  variant = "primary",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

function ButtonArrow({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="button-arrow"
      className={cn(
        "ml-1 inline-flex transition-transform duration-200 group-hover/button:translate-x-0.5",
        className
      )}
      {...props}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M9.5 6.5L15 12l-5.5 5.5" />
      </svg>
    </span>
  )
}

export { Button, ButtonArrow }
