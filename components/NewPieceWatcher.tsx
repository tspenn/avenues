"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Latest = {
  slug: string;
  title: string;
  href: string;
};

const LISTINGS = new Set([
  "/",
  "/file",
  "/world-view",
  "/sidelines",
  "/writers",
  "/writers/whit-boone",
  "/horrow",
  "/about",
]);

const INTERVAL_MS = 45_000;

function isListing(pathname: string): boolean {
  const path = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
  return LISTINGS.has(path);
}

async function readLatest(): Promise<Latest | null> {
  try {
    const response = await fetch("/latest.json", { cache: "no-store" });
    if (!response.ok) {
      return null;
    }
    return (await response.json()) as Latest;
  } catch {
    return null;
  }
}

export function NewPieceWatcher() {
  const pathname = usePathname();
  const seen = useRef<string | null>(null);
  const [fresh, setFresh] = useState<Latest | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      if (document.visibilityState === "hidden") {
        return;
      }
      const latest = await readLatest();
      if (!latest?.slug || cancelled) {
        return;
      }
      if (seen.current === null) {
        seen.current = latest.slug;
        return;
      }
      if (latest.slug === seen.current) {
        return;
      }
      if (isListing(pathname)) {
        window.location.reload();
        return;
      }
      setFresh(latest);
    }

    void check();
    const timer = window.setInterval(() => {
      void check();
    }, INTERVAL_MS);
    const onVisible = () => {
      void check();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [pathname]);

  if (!fresh) {
    return null;
  }

  return (
    <div className="bg-header text-accent">
      <p className="mx-auto max-w-[65ch] px-6 py-2 font-serif text-sm">
        A new piece is up.{" "}
        <Link href={fresh.href} className="underline underline-offset-4">
          {fresh.title}
        </Link>
      </p>
    </div>
  );
}
