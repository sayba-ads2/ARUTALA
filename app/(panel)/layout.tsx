import type React from "react";
import type { Metadata } from "next";
import AdminTopbar from "@/components/admin-topbar";

export const metadata: Metadata = {
  title: "Panel admin",
  robots: { index: false, follow: false },
};

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminTopbar />
      <main id="isi">{children}</main>
    </>
  );
}
