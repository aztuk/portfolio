"use client";

import { useState } from "react";
import clsx from "clsx";

type LoginFormProps = {
  locale: string;
  redirectTo?: string;
  onSuccess?: () => void;
};

const labels = {
  en: {
    title: "Protected content",
    description: "This case study requires a password to view.",
    placeholder: "Password",
    submit: "Unlock",
    error: "Incorrect password.",
  },
  fr: {
    title: "Contenu protégé",
    description: "Ce cas d'usage nécessite un mot de passe.",
    placeholder: "Mot de passe",
    submit: "Déverrouiller",
    error: "Mot de passe incorrect.",
  },
} as const;

export const LoginForm = ({ locale, redirectTo = "/", onSuccess }: LoginFormProps) => {
  const l = locale in labels ? labels[locale as keyof typeof labels] : labels.en;
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: value }),
    });

    if (res.ok) {
      if (onSuccess) {
        onSuccess();
      } else {
        window.location.href = redirectTo;
      }
    } else {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="type-login-title text-ink mb-3">{l.title}</p>
        <p className="type-body-sm text-muted/70">{l.description}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={l.placeholder}
          autoFocus
          className={clsx(
            "type-body-md w-full rounded-2xl border bg-white/5 px-5 py-3.5 text-ink placeholder:text-muted/30 outline-none transition-colors",
            error ? "border-red-400/50" : "border-white/10 focus:border-primary/50",
          )}
        />
        {error && (
          <p className="type-body-xs text-red-400">{l.error}</p>
        )}
        <button
          type="submit"
          disabled={loading || !value}
          className="type-body-md-bold mt-1 w-full rounded-2xl bg-primary px-5 py-3.5 text-canvas transition-opacity hover:opacity-90 disabled:opacity-30"
        >
          {l.submit}
        </button>
      </form>
    </div>
  );
};
