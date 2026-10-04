import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva("inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", { variants: { variant: { default: "bg-primary text-primary-foreground hover:bg-primary/90", primary: "bg-primary text-primary-foreground hover:bg-primary/90", destructive: "bg-destructive text-primary-foreground hover:bg-destructive/90", danger: "text-destructive hover:bg-destructive-soft", outline: "border border-border bg-card text-foreground hover:bg-muted", secondary: "border border-border bg-card text-foreground hover:bg-muted", ghost: "text-muted-foreground hover:bg-muted hover:text-foreground", link: "text-primary underline-offset-4 hover:underline" }, size: { default: "h-10 px-4 text-sm", sm: "h-9 rounded-md px-3 text-sm", small: "h-8 px-3 text-xs", lg: "h-11 rounded-md px-8", icon: "size-9" } }, defaultVariants: { variant: "default", size: "default" } });
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { asChild?: boolean }
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => { const Comp = asChild ? Slot : "button"; return <Comp ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />; });
Button.displayName = "Button";
