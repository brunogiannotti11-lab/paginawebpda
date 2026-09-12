import { AdminLoginForm } from "@/components/admin-login-form";
import { SiteHeader } from "@/components/site-header";

export default function AdminLoginPage() {
  return (
    <>
      <SiteHeader admin />
      <main className="flex flex-1 items-start justify-center px-5 py-16 md:px-10">
        <div className="w-full max-w-md bg-paper px-6 py-7 text-ink shadow-[12px_16px_0_0_#0d0c09]">
          <h1 className="font-heading text-4xl leading-none">Entrar</h1>
          <p className="mt-3 mb-7 text-[1.05rem] leading-7 text-ink/70">
            Usuario y contraseña del mostrador. Las fichas no se ven sin esto.
          </p>
          <AdminLoginForm />
        </div>
      </main>
    </>
  );
}
