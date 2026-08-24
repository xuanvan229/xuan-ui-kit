"use client"

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"

import { cn } from "@/lib/utils"

type AvatarProps = AvatarPrimitive.Root.Props & {
  tone?: "warm" | "tint"
  size?: "default" | "sm"
}

function Avatar({
  className,
  tone = "warm",
  size = "default",
  ...props
}: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-tone={tone}
      data-size={size}
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full font-sans text-[10px] font-semibold select-none",
        size === "default" ? "size-6" : "size-[22px]",
        tone === "warm"
          ? "bg-neutral-bg text-neutral-text"
          : "bg-accent-tint-94 text-accent-deep",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("size-full object-cover", className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn("flex size-full items-center justify-center", className)}
      {...props}
    />
  )
}

export { Avatar, AvatarFallback, AvatarImage }
