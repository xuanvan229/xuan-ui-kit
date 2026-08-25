"use client"

import { useRender } from "@base-ui/react/use-render"

import { cn } from "@/lib/utils"

function Breadcrumb({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <nav aria-label="Breadcrumb" data-slot="breadcrumb">
      <ol
        className={cn("flex items-center gap-2 font-sans text-sm", className)}
        {...props}
      />
    </nav>
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center", className)}
      {...props}
    />
  )
}

function BreadcrumbLink({
  className,
  render,
  ...props
}: useRender.ComponentProps<"a">) {
  return useRender({
    render: render ?? <a />,
    props: {
      "data-slot": "breadcrumb-link",
      className: cn(
        "rounded-sm px-1 py-0.5 text-ink-secondary transition-control outline-none hover:bg-fill-menu hover:text-ink focus-visible:focus-ring",
        className
      ),
      ...props,
    },
  })
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      aria-current="page"
      className={cn("px-1 py-0.5 font-semibold text-ink-heading", className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      data-slot="breadcrumb-separator"
      className={cn("flex text-line-chevron", className)}
      {...props}
    >
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9.5 6.5L15 12l-5.5 5.5" />
      </svg>
    </li>
  )
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      aria-label="More"
      data-slot="breadcrumb-ellipsis"
      className={cn(
        "flex size-6 cursor-pointer items-center justify-center rounded-sm text-ink-secondary transition-control outline-none hover:bg-fill-menu hover:text-ink focus-visible:focus-ring",
        className
      )}
      {...props}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <circle cx="5" cy="12" r="1.6" />
        <circle cx="12" cy="12" r="1.6" />
        <circle cx="19" cy="12" r="1.6" />
      </svg>
    </button>
  )
}

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
}
