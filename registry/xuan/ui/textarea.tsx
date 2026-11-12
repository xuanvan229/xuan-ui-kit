"use client"

import { Field as FieldPrimitive } from "@base-ui/react/field"

import { cn } from "@/lib/utils"

function Textarea({
  className,
  ref,
  id,
  name,
  value,
  defaultValue,
  disabled,
  autoFocus,
  ...props
}: React.ComponentProps<"textarea">) {
  // note: Field.Control owns id/name/value/disabled so Field can label and validate the control;
  // textarea-only attributes (rows, cols) stay on the rendered element.
  return (
    <FieldPrimitive.Control
      ref={ref}
      id={id}
      name={name}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      autoFocus={autoFocus}
      render={
        <textarea
          data-slot="textarea"
          className={cn(
            "w-full min-w-0 resize-y rounded-md border border-line-control bg-surface px-3 py-2 font-sans text-[15px] leading-[1.45] font-normal text-ink transition-control outline-none placeholder:text-ink-muted hover:border-line-input-hover focus-visible:border-accent-600 focus-visible:focus-ring disabled:cursor-not-allowed disabled:resize-none disabled:border-disabled-line disabled:bg-disabled-bg disabled:text-ink-disabled aria-invalid:border-error aria-invalid:focus-visible:focus-ring-error data-invalid:border-error data-invalid:focus-visible:focus-ring-error",
            className
          )}
          {...props}
        />
      }
    />
  )
}

type TextareaCounterProps = React.ComponentProps<"span"> & {
  count: number
  max: number
}

function TextareaCounter({
  count,
  max,
  className,
  ...props
}: TextareaCounterProps) {
  return (
    <span
      data-slot="textarea-counter"
      data-over={count > max ? "true" : null}
      className={cn(
        "font-sans text-xs font-medium text-ink-muted data-over:text-error-text",
        className
      )}
      {...props}
    >
      {count} / {max}
    </span>
  )
}

export { Textarea, TextareaCounter }
