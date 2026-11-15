import { NextResponse, type NextRequest } from "next/server";
import { markdown404 } from "@/lib/md404";

function quality(accept: string, type: string) {
  const entry = accept.split(",").map((s) => s.trim()).find((s) => s.startsWith(type));
  if (!entry) return -1;
  const q = entry.match(/;\s*q=([\d.]+)/);
  return q ? Number(q[1]) : 1;
}

function markdownPath(path: string) {
  if (path === "/") return "/index.md";
  if (path.endsWith("/md")) return path;
  if (path === "/privacy") return "/privacy/md";
  if (/^\/work\/[^/]+$/.test(path)) return `${path}/md`;
  return null;
}

export function proxy(request: NextRequest) {
  const accept = request.headers.get("accept") ?? "";
  const md = quality(accept, "text/markdown");

  if (md > 0 && md >= quality(accept, "text/html")) {
    const path = request.nextUrl.pathname.replace(/(.)\/$/, "$1");
    const target = markdownPath(path);
    if (!target) return markdown404(path);
    return NextResponse.rewrite(new URL(target, request.url));
  }

  const res = NextResponse.next();
  res.headers.set("Vary", "Accept");
  return res;
}

export const config = {
  matcher: ["/((?!_next/|.*\\.).*)"],
};
