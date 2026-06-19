"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { inputClass } from "@/components/chat/MessageList";
import {
  CHAT_CTA_BUTTON_CLASS,
  CHAT_FORM_CLASS,
  CHAT_SHELL_ACCENT,
} from "@/lib/chatStyles";

type AdminLoginFormProps = {
  allowedEmails: readonly string[];
};

export function AdminLoginForm({ allowedEmails }: AdminLoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <form
      className={`mx-auto max-w-md overflow-hidden ${CHAT_FORM_CLASS}`}
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
          const res = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
          const data = (await res.json()) as { error?: string };
          if (!res.ok) {
            throw new Error(data.error ?? "Login failed.");
          }
          router.push("/admin/inbox");
          router.refresh();
        } catch (err) {
          setError(err instanceof Error ? err.message : "Login failed.");
        } finally {
          setLoading(false);
        }
      }}
    >
      <div className={CHAT_SHELL_ACCENT} aria-hidden />
      <div className="p-1">
      <h1 className="font-display text-2xl font-bold text-slate-900">
        Admin sign in
      </h1>
      <p className="mt-2 text-sm text-muted">
        Dispatch inbox for website chat. Authorized accounts:
      </p>
      <ul className="mt-2 list-inside list-disc text-sm text-slate-700">
        {allowedEmails.map((email) => (
          <li key={email}>{email}</li>
        ))}
      </ul>
      <label className="mt-6 block">
        <span className="mb-1.5 block text-sm font-medium text-slate-700">
          Email
        </span>
        <input
          type="email"
          name="email"
          required
          autoComplete="username"
          placeholder={allowedEmails[0] ?? "email@example.com"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </label>
      <label className="mt-4 block">
        <span className="mb-1.5 block text-sm font-medium text-slate-700">
          Password
        </span>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
        />
      </label>
      {error ? (
        <p className="mt-4 text-sm font-medium text-red-600" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={loading}
        className={`mt-6 min-h-[48px] w-full ${CHAT_CTA_BUTTON_CLASS}`}
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
      </div>
    </form>
  );
}
