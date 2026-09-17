"use client";

import { Analytics } from "@vercel/analytics/next";

export function SiteAnalytics() {
  return (
    <Analytics
      beforeSend={(event) => {
        if (event.type !== "pageview") return event;
        try {
          const url = new URL(event.url);
          url.search = "";
          url.hash = "";
          return { ...event, url: url.href };
        } catch {
          return event;
        }
      }}
    />
  );
}
