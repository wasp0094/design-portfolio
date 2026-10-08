"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { profile } from "@/lib/site";

const GA_ID = "G-YDLQGRN17K";

type Gtag = (cmd: "event", name: string, params?: Record<string, unknown>) => void;

export function track(name: string, params?: Record<string, unknown>) {
  (window as unknown as { gtag?: Gtag }).gtag?.("event", name, params);
}

function classify(href: string): string {
  if (href.startsWith("mailto:")) return "contact_email";
  if (href.startsWith("tel:")) return "contact_phone";
  if (href === profile.booking || href.includes("cal.com")) return "book_call";
  if (href === profile.resume) return "resume_open";
  const url = new URL(href, location.href);
  if (url.origin !== location.origin) return "outbound_click";
  if (/^\/work\/[^/]+\/full/.test(url.pathname)) return "case_study_full_open";
  if (/^\/work\/[^/]+/.test(url.pathname) && url.pathname !== location.pathname) return "case_study_open";
  return "nav_click";
}

function label(el: Element) {
  return (el.getAttribute("aria-label") || el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 100);
}

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element).closest("a[href], button, [role=button]");
      if (!el) return;
      const section = el.closest("section[id], header[id], footer[id]")?.id || (el.closest("nav") ? "nav" : undefined);
      const common = { link_text: label(el), page_path: location.pathname, section };
      if (el instanceof HTMLAnchorElement) {
        track(classify(el.getAttribute("href")!), { ...common, link_url: el.href });
      } else if (el.closest(".shot")) {
        track("gallery_open", common);
      } else {
        track("button_click", common);
      }
    };
    const onCopy = () => {
      const text = String(window.getSelection() ?? "").trim();
      track("copy_text", { page_path: location.pathname, is_email: text === profile.email, length: text.length });
    };
    const onSubmit = (e: SubmitEvent) => {
      const form = e.target as HTMLFormElement;
      track("form_submit", { page_path: location.pathname, form_class: form.className });
    };
    document.addEventListener("click", onClick, true);
    document.addEventListener("copy", onCopy);
    document.addEventListener("submit", onSubmit, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("copy", onCopy);
      document.removeEventListener("submit", onSubmit, true);
    };
  }, []);

  useEffect(() => {
    const seen = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          const id = (en.target as HTMLElement).id;
          if (en.isIntersecting && !seen.has(id)) {
            seen.add(id);
            track("section_view", { section: id, page_path: pathname });
          }
        }
      },
      { threshold: 0.4 },
    );
    document.querySelectorAll("section[id], header[id], footer[id]").forEach((s) => io.observe(s));

    const marks = [25, 50, 75, 100];
    const hit = new Set<number>();
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const pct = max > 0 ? (scrollY / max) * 100 : 100;
      for (const m of marks) {
        if (pct >= m - 1 && !hit.has(m)) {
          hit.add(m);
          track("scroll_depth", { percent: m, page_path: pathname });
        }
      }
    };
    addEventListener("scroll", onScroll, { passive: true });

    const start = Date.now();
    const onHide = () => {
      if (document.visibilityState === "hidden") {
        track("page_time", { seconds: Math.round((Date.now() - start) / 1000), page_path: pathname });
      }
    };
    document.addEventListener("visibilitychange", onHide);

    return () => {
      io.disconnect();
      removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, [pathname]);

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
