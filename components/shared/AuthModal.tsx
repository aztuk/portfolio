"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { LoginForm } from "@/components/shared/LoginForm";

type AuthModalProps = {
  locale: string;
  onClose: () => void;
  onSuccess: () => void;
};

export const AuthModal = ({ locale, onClose, onSuccess }: AuthModalProps) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-canvas/80 px-4 py-8 backdrop-blur-md"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-sm rounded-[24px] border border-dark-smooth bg-dark/95 p-6 shadow-elevation-2 backdrop-blur-md sm:p-8 lg:rounded-[30px]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-5 top-5 flex size-8 items-center justify-center rounded-full text-muted/40 transition-colors hover:text-muted"
        >
          <CloseIcon />
        </button>

        <LoginForm locale={locale} onSuccess={onSuccess} />
      </div>
    </div>,
    document.body,
  );
};

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-4"
    aria-hidden
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
