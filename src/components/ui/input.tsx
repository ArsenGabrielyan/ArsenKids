import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const inputVariants = cva(
     "h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:ring-[3px] font-heading file:text-foreground file:bg-transparent placeholder:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive selection:bg-primary selection:text-primary-foreground dark:bg-input/30",
     {
          variants: {
               variant: {
                    default: "border-input bg-transparent focus-visible:border-ring focus-visible:ring-ring/50",
                    wordGuesser: "border-2 border-rainbow-blue bg-transparent focus-visible:border-blue-500 focus-visible:ring-blue-500/50",
               }
          },
          defaultVariants: {
               variant: "default",
          },
     }
)

function Input({ className, type, variant, ...props }: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
     return (
          <input
               type={type}
               data-slot="input"
               className={cn(inputVariants({variant, className}))}
               {...props}
          />
     )
}

export { Input }
