import Link from "next/link";

import { getAuthUser } from "@/lib/auth";

export default async function Header() {
  const user = await getAuthUser();

  return (
    <header className="border-b border-border bg-primary text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-xl font-bold transition hover:opacity-90"
        >
          Educa Blog
        </Link>

        <nav className="flex items-center gap-5 text-sm">
          <Link href="/" className="transition hover:opacity-80">
            Início
          </Link>

          {user ? (
            <>
              <Link href="/admin/posts" className="transition hover:opacity-80">
                Meus posts
              </Link>

              <Link href="/admin/users" className="transition hover:opacity-80">
                Meu perfil
              </Link>

              <span className="hidden sm:inline">Olá, {user.name}</span>

              <form action="/api/auth/logout" method="POST">
                <button
                  type="submit"
                  className="rounded-lg border border-white/30 px-3 py-2 font-medium transition hover:bg-white/10"
                >
                  Sair
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-white px-4 py-2 font-medium text-primary transition hover:bg-gray-100"
            >
              Entrar
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
