import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap text-lg font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive uppercase font-heading tracking-[2px] hover:cursor-pointer active:scale-[0.96]",
  {
    variants: {
      variant: {
        default: "bg-rainbow-green hover:tracking-[6px]",
        defaultAlt: "bg-rainbow-green hover:bg-rainbow-yellow",
        primary: "bg-rainbow-yellow hover:bg-rainbow-red hover:text-primary-foreground",
        primaryAlt: "bg-rainbow-yellow hover:bg-rainbow-blue",
        outline: "bg-rainbow-blue/15 text-rainbow-blue border-rainbow-blue border-2 hover:bg-rainbow-blue/30",
        secondary: "bg-rainbow-red hover:bg-rainbow-blue text-primary-foreground hover:text-primary",
        outlineSecondary: "bg-rainbow-red/15 text-rainbow-red border-rainbow-red border-2 hover:bg-rainbow-red/30",
        tertiary: "bg-rainbow-blue hover:bg-rainbow-red hover:text-primary-foreground",
        danger: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        dangerOutline: "bg-destructive/15 text-destructive border-destructive border-2 hover:bg-destructive/30",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
      },
      size: {
        default: "h-10 px-8 py-3 has-[>svg]:px-3",
        sm: "h-9 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-12 px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-sm",
        iconMd: "size-10 rounded-sm",
        iconLg: "size-11 rounded-sm"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean,
    shareUrl?: string
  }

function Button({
  className,
  variant,
  size,
  asChild = false,
  shareUrl,
  onClick,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"
  const handleShareLink = async() => {
    if(!shareUrl) return;
    const shareData = {
      title: "ArsenKids Խաղեր",
      text: 'Եկեք խաղացեք այս խաղը',
      url: shareUrl
    }
    try{
      console.log(navigator.canShare(shareData))
      if(navigator.canShare && navigator.canShare(shareData)){
        await navigator.share(shareData)
      } else{
        await navigator.clipboard.writeText(`Եկեք խաղացեք այս խաղը՝ ${shareUrl}`)
        toast.success("Հղումը պատճենված է")
      }
    } catch(error){
      console.error("Sharing Failed:",error);
      toast.error("Չհաջողվեց կիսվել։ Խնդրում ենք կրկին փորձել ավելի ուշ։")
    }
  }
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={!shareUrl ? onClick : handleShareLink}
      {...props}
    />
  )
}

export { Button, buttonVariants }