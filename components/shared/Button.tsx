import type { ReactNode } from "react"

type ButtonVariant = "primary" | "secondary" | "outline"
type ButtonSize = "sm" | "md" | "lg"

type ButtonProps = {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:opacity-90",
  secondary: "bg-background text-primary hover:bg-muted",
  outline:
    "border border-border bg-background text-foreground hover:bg-muted/50",
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-8 text-base",
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
}: ButtonProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  )
}
