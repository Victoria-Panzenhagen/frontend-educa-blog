import Link from "next/link";

import UserForm from "@/components/forms/UserForm";

export default function RegisterPage() {
  return (
    <main className="flex min-h-[calc(100vh-4.5rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-primary">
            Educa Blog
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
            Crie sua conta
          </h1>
          <p className="mt-3 text-muted">
            Cadastre-se para publicar e gerenciar seus conteúdos.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
          <UserForm mode="create" successHref="/admin/posts" />
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          Já possui uma conta?{" "}
          <Link href="/login" className="font-semibold text-primary hover:text-primary-dark">
            Entrar
          </Link>
        </p>
      </div>
    </main>
  );
}
