import type React from "react";
import SiteShell from "@/components/site-shell";
import { orgSchema, webSchema, eventSchema, siteUrl } from "../layout";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteShell>{children}</SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            { ...orgSchema, "@id": `${siteUrl}/#organization` },
            webSchema,
            { ...eventSchema, organizer: { "@id": `${siteUrl}/#organization` } },
          ]),
        }}
      />
    </>
  );
}
