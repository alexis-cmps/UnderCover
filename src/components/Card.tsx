import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Carte simple avec bordure et padding.
 */
export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`
        bg-neutral-800 rounded-2xl p-6
        border border-neutral-700
        ${className}
      `}
    >
      {children}
    </div>
  );
}
