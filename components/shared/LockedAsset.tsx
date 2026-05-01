"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AuthModal } from "@/components/shared/AuthModal";

type LockedAssetProps = {
  isThumbnail?: boolean;
};

export const LockedAsset = ({ isThumbnail = false }: LockedAssetProps) => {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] ?? "en";
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isThumbnail ? (
        <span className="flex h-full w-full items-center justify-center bg-dark-smooth/30">
          <LockIcon className="size-4 text-muted/40" />
        </span>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-5 bg-dark-smooth/20 backdrop-blur-sm">
          <LockIcon className="size-7 text-muted/30" />
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 font-sans text-sm font-medium text-muted transition-colors hover:border-primary/40 hover:text-primary"
          >
            Unlock to view
          </button>
        </div>
      )}

      {isOpen && (
        <AuthModal
          locale={locale}
          onClose={() => setIsOpen(false)}
          onSuccess={() => window.location.reload()}
        />
      )}
    </>
  );
};

const LockIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
