import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-primary"
        >
          Educa Blog
        </Link>

        <nav
          aria-label="Navegação principal"
          className="flex items-center gap-6"
        >
          <Link
            href="/"
            className="text-sm font-semibold text-muted transition-colors hover:text-primary"
          >
            Início
          </Link>

          <Link
            href="/login"
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Entrar
          </Link>
        </nav>
      </div>
    </header>
  );
}
