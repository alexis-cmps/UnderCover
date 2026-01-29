import type { ReactNode } from "react";
import { Button } from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

/**
 * Modal simple avec overlay.
 * Anti-spoiler: utilisé pour les transitions pass-the-phone.
 */
export function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
      onClick={onClose}
    >
      <div
        className="bg-neutral-800 rounded-2xl p-6 max-w-md w-full border border-neutral-700"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="mb-6">{children}</div>
        {footer || (
          <Button onClick={onClose} fullWidth>
            Fermer
          </Button>
        )}
      </div>
    </div>
  );
}
