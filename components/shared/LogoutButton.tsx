"use client";

import { useTranslations } from "next-intl";

type LogoutButtonProps = {
  isAuthenticated: boolean;
};

export const LogoutButton = ({ isAuthenticated }: LogoutButtonProps) => {
  const t = useTranslations("ui");

  if (!isAuthenticated) return null;

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.reload();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      aria-label={t("lock")}
      className="type-nav-chip fixed right-3 top-14 z-50 flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3 py-2 text-ink/70 backdrop-blur-md transition-colors hover:border-white/30 hover:text-ink lg:right-6 lg:top-16 lg:px-4"
    >
      <LockIcon />
      <span>{t("lock")}</span>
    </button>
  );
};

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-3"
    aria-hidden
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
