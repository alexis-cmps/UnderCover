import type { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white",
  secondary: "bg-neutral-700 hover:bg-neutral-600 active:bg-neutral-500 text-white",
  danger: "bg-red-600 hover:bg-red-700 active:bg-red-800 text-white",
  ghost: "bg-transparent hover:bg-neutral-800 active:bg-neutral-700 text-neutral-50",
};

/**
 * Bouton réutilisable avec variantes et accessibilité.
 * Zones tactiles >= 44px pour mobile.
 */
export function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        px-6 py-3 rounded-xl font-medium
        min-h-[44px] min-w-[44px]
        transition-colors duration-150
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-950
        ${variantClasses[variant]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
