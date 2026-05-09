"use client";

import { useState } from "react";

type ContactFormLabels = {
  name: string;
  email: string;
  message: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
};

type ContactFormProps = {
  labels: ContactFormLabels;
};

type SubmissionState = "idle" | "sending" | "success" | "error";

export const ContactForm = ({ labels }: ContactFormProps) => {
  const [state, setState] = useState<SubmissionState>("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          website: formData.get("website"),
        }),
      });

      if (!response.ok) {
        setState("error");
        return;
      }

      form.reset();
      setState("success");
    } catch {
      setState("error");
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <div className="grid gap-5 lg:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="type-context-label text-smooth/70">
            {labels.name}
          </span>
          <input
            className="type-body-md rounded-2xl border border-dark-smooth bg-white/[0.04] px-4 py-3 text-ink outline-none transition-colors placeholder:text-smooth/45 focus:border-primary"
            name="name"
            type="text"
            autoComplete="name"
            required
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="type-context-label text-smooth/70">
            {labels.email}
          </span>
          <input
            className="type-body-md rounded-2xl border border-dark-smooth bg-white/[0.04] px-4 py-3 text-ink outline-none transition-colors placeholder:text-smooth/45 focus:border-primary"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </label>
      </div>

      <label className="hidden">
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <label className="flex flex-col gap-2">
        <span className="type-context-label text-smooth/70">
          {labels.message}
        </span>
        <textarea
          className="type-body-md min-h-[180px] resize-y rounded-2xl border border-dark-smooth bg-white/[0.04] px-4 py-3 text-ink outline-none transition-colors placeholder:text-smooth/45 focus:border-primary"
          name="message"
          required
        />
      </label>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={state === "sending"}
          className="type-control-lg inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-dark shadow-elevation-2 transition-opacity hover:opacity-85 disabled:cursor-wait disabled:opacity-60 sm:py-2.5"
        >
          {state === "sending" ? labels.sending : labels.submit}
        </button>
        <p className="type-body-sm min-h-5 text-smooth" aria-live="polite">
          {state === "success" ? labels.success : null}
          {state === "error" ? labels.error : null}
        </p>
      </div>
    </form>
  );
};
