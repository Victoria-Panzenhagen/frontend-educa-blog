import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark",

    secondary:
      "border border-border bg-white text-foreground hover:bg-background",

    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      className={`rounded-lg px-5 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
