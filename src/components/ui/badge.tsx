import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-sm border text-xs py-0.5 font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-rainbow-blue [a&]:hover:bg-rainbow-red",
        defaultOutline:
          "border-transparent bg-white/90 text-rainbow-blue border-rainbow-blue border-2 [a&]:hover:bg-rainbow-blue/90 [a&]:hover:text-white",
        secondary:
          "border-transparent bg-rainbow-red [a&]:hover:bg-rainbow-blue",
        secondaryOutline:
          "border-transparent bg-white/90 text-rainbow-red border-rainbow-red border-2 [a&]:hover:bg-rainbow-red/90 [a&]:hover:text-white",
        tertiary:
          "border-transparent bg-rainbow-purple [a&]:hover:bg-rainbow-blue",
        tertiaryOutline:
          "border-transparent bg-white/90 text-rainbow-purple border-rainbow-purple border-2 [a&]:hover:bg-rainbow-purple/90 [a&]:hover:text-white",
        green:
          "border-transparent bg-rainbow-green [a&]:hover:bg-rainbow-blue",
        greenOutline:
          "border-transparent bg-white/90 text-rainbow-green border-rainbow-green border-2 [a&]:hover:bg-rainbow-green/90 [a&]:hover:text-black",
        orange:
          "border-transparent bg-rainbow-orange [a&]:hover:bg-rainbow-yellow",
        orangeOutline:
          "border-transparent bg-white/90 text-rainbow-orange border-rainbow-orange border-2 [a&]:hover:bg-rainbow-orange/90 [a&]:hover:text-white",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        destructiveOutline:
          "bg-white/90 text-destructive border-destructive border-2 [a&]:hover:bg-destructive/90 [a&]:hover:text-white focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60"
      },
      size: {
        default: "px-1",
        wide: "px-2"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }