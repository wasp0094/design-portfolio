"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { unlock, type UnlockState } from "@/app/actions/unlock";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button className="gate-submit" type="submit" disabled={pending} data-hover>
      {pending ? "Checking…" : "Unlock"}
      <span className="arw">→</span>
    </button>
  );
}

/** The password prompt shown in place of the detailed study. */
export default function Unlock({ slug, title }: { slug: string; title: string }) {
  const [state, action] = useActionState<UnlockState, FormData>(unlock, {});

  return (
    <div className="gate">
      <div className="gate-card">
        <span className="gate-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="10.5" width="16" height="10" rx="2.5" />
            <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
          </svg>
        </span>

        <h1 className="gate-title">{title}, in full</h1>
        <p className="gate-note">
          This version shows every screen and the detail behind them. FourCore’s
          platform is under NDA, so it sits behind a password. The shorter public
          write-up is open to everyone.
        </p>

        <form className="gate-form" action={action}>
          <input type="hidden" name="slug" value={slug} />
          <label className="gate-label" htmlFor="cs-password">
            Password
          </label>
          <div className="gate-row">
            <input
              className="gate-input"
              id="cs-password"
              name="password"
              type="password"
              autoComplete="current-password"
              autoFocus
              required
              aria-describedby={state.error ? "cs-password-error" : undefined}
            />
            <Submit />
          </div>
          {state.error && (
            <p className="gate-error" id="cs-password-error" role="alert">
              {state.error}
            </p>
          )}
        </form>

        <p className="gate-ask">
          Reviewing my work and need access?{" "}
          <Link href="/#contact" data-hover>
            Ask me for the password
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
