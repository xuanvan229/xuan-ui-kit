import { cn } from "@/lib/utils"

const SPINNER_SIZE = {
  sm: "size-4",
  default: "size-5",
  lg: "size-6",
} as const

type SpinnerProps = Omit<React.ComponentProps<"span">, "children"> & {
  size?: keyof typeof SPINNER_SIZE
  /** Announced to assistive tech. */
  label?: string
}

function Spinner({
  className,
  size = "default",
  label = "Loading",
  ...props
}: SpinnerProps) {
  return (
    <span
      data-slot="spinner"
      data-size={size}
      role="status"
      aria-label={label}
      className={cn("inline-flex text-accent-500", className)}
      {...props}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        aria-hidden="true"
        className={cn("animate-spin", SPINNER_SIZE[size])}
      >
        <circle
          data-slot="spinner-track"
          cx="12"
          cy="12"
          r="9"
          className="stroke-line-control"
        />
        <path d="M21 12a9 9 0 0 0-9-9" />
      </svg>
    </span>
  )
}

export { Spinner }
