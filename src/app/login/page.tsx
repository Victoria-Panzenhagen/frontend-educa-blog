import Link from "next/link";
import { LoginForm } from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-[calc(100vh-4.5rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-primary">
            Educa Blog
          </span>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
            Bem-vindo de volta
          </h1>

          <p className="mt-3 text-muted">
            Entre para gerenciar suas publicações.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
          <LoginForm />
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          <Link
            href="/"
            className="font-semibold text-primary hover:text-primary-dark"
          >
            ← Voltar para o início
          </Link>
        </p>
      </div>
    </main>
  );
}
