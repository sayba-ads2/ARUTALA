import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/admin-login-form";
import { getAdminUser } from "@/lib/admin-auth";
import { isServerSupabaseConfigured } from "@/lib/supabase-server";

export const metadata = {
  title: "Masuk panel admin",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (isServerSupabaseConfigured) {
    const user = await getAdminUser();
    if (user) redirect("/admin");
  }

  return (
    <div className="panel-login">
      <div className="panel-login__card">
        <p className="eyebrow">Panel admin</p>
        <h1 className="panel-login__title">Masuk untuk mengelola konten.</h1>
        <p className="panel-login__lede">
          Satu tempat untuk sponsor, berita, dokumentasi lapangan, dan status publikasi program.
        </p>
        <AdminLoginForm configured={isServerSupabaseConfigured} />
      </div>
    </div>
  );
}
