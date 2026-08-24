import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/* ============================================================
   CASE-STUDY PASSWORD GATE

   Some work is under NDA: the detailed version of a study lives at
   /work/<slug>/full and is only rendered once the reader has proved they
   know the password. The check is deliberately server-side — the gated
   sections are never serialised into the page unless the cookie verifies,
   so "view source" reveals nothing.

   The password lives in CASE_STUDY_PASSWORD (.env.local, gitignored). No
   password set = the gate stays shut, rather than failing open.
   ============================================================ */

const COOKIE_PREFIX = "cs_unlock_";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function secret(): string | null {
  const s = process.env.CASE_STUDY_PASSWORD;
  return s && s.length > 0 ? s : null;
}

/** constant-time string compare that tolerates differing lengths */
function sameString(a: string, b: string): boolean {
  const ab = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  // hash both first so length never leaks and the buffers always match size
  const ah = createHmac("sha256", "cmp").update(ab).digest();
  const bh = createHmac("sha256", "cmp").update(bb).digest();
  return timingSafeEqual(ah, bh);
}

function sign(slug: string, exp: number, key: string): string {
  return createHmac("sha256", key).update(`unlock:${slug}:${exp}`).digest("base64url");
}

export const cookieName = (slug: string) => COOKIE_PREFIX + slug.replace(/[^a-z0-9-]/gi, "");

/** Is this the right password? False when no password is configured at all. */
export function checkPassword(input: string): boolean {
  const key = secret();
  if (!key) return false;
  return sameString(input.trim(), key);
}

/** Cookie value granting access to `slug`, valid for MAX_AGE. */
export function issueToken(slug: string): { value: string; maxAge: number } | null {
  const key = secret();
  if (!key) return null;
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
  return { value: `${exp}.${sign(slug, exp, key)}`, maxAge: MAX_AGE };
}

/** Has the current request earned access to `slug`? */
export async function hasAccess(slug: string): Promise<boolean> {
  const key = secret();
  if (!key) return false;

  const raw = (await cookies()).get(cookieName(slug))?.value;
  if (!raw) return false;

  const [expPart, sig] = raw.split(".");
  const exp = Number(expPart);
  if (!Number.isFinite(exp) || !sig) return false;
  if (exp * 1000 < Date.now()) return false;

  return sameString(sig, sign(slug, exp, key));
}

/** True when the site owner has configured a password at all. */
export const gateConfigured = () => secret() !== null;
