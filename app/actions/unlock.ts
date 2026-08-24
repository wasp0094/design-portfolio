"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { checkPassword, cookieName, gateConfigured, issueToken } from "@/lib/gate";
import { projects } from "@/lib/data";

export type UnlockState = { error?: string };

/** Server Action behind the unlock form. Runs only on the server, so the
 *  password never reaches the client and a wrong guess reveals nothing. */
export async function unlock(
  _prev: UnlockState,
  formData: FormData,
): Promise<UnlockState> {
  const slug = String(formData.get("slug") ?? "");
  const password = String(formData.get("password") ?? "");

  // only ever unlock a study that actually exists and asked to be gated
  const project = projects.find((p) => p.slug === slug);
  if (!project?.study?.gated) return { error: "Unknown case study." };

  if (!gateConfigured()) {
    return { error: "No password is configured for this site yet." };
  }
  if (!password) return { error: "Enter the password." };
  if (!checkPassword(password)) return { error: "That password isn’t right." };

  const token = issueToken(slug);
  if (!token) return { error: "Could not issue access. Try again." };

  (await cookies()).set(cookieName(slug), token.value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: token.maxAge,
  });

  redirect(`/work/${slug}/full`);
}

/** Drop the access cookie again — the "lock this back up" affordance. */
export async function relock(formData: FormData): Promise<void> {
  const slug = String(formData.get("slug") ?? "");
  (await cookies()).delete(cookieName(slug));
  redirect(`/work/${slug}`);
}
