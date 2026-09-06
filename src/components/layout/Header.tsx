import Link from "next/link";
import { getAuthUser } from "@/lib/auth";

export default async function Header() {
  const user = await getAuthUser();

  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-primary transition hover:text-primary-dark"
        >
          Educa Blog
        </Link>

        {/* Navegação */}
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-foreground transition hover:text-primary"
          >
            Início
          </Link>

          {user ? (
            <>
              <span className="text-sm text-muted">
                Olá, <strong className="text-foreground">{user.name}</strong>
              </span>

              <form action="/api/auth/logout" method="POST">
                <button
                  type="submit"
                  className="text-sm font-medium text-primary transition hover:text-primary-dark"
                >
                  Sair
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium text-primary transition hover:text-primary-dark"
            >
              Entrar
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
