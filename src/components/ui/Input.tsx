import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, id, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-foreground">
          {label}
        </label>
      )}

      <input
        id={id}
        className={`rounded-xl border border-border bg-white px-4 py-3 text-foreground outline-none transition placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary/10 ${className}`}
        {...props}
      />
    </div>
  );
}
