import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "danger"; size?: "default" | "icon" | "small" };
export function Button({ className, variant = "primary", size = "default", ...props }: Props) {
  return <button className={cn("inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", variant === "primary" && "bg-primary text-primary-foreground hover:bg-primary/90", variant === "secondary" && "border border-border bg-card text-foreground hover:bg-muted", variant === "ghost" && "text-muted-foreground hover:bg-muted hover:text-foreground", variant === "danger" && "text-destructive hover:bg-destructive-soft", size === "default" && "h-10 px-4 text-sm", size === "small" && "h-8 px-3 text-xs", size === "icon" && "size-9", className)} {...props} />;
}
