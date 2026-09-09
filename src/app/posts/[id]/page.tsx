import Link from "next/link";

import { postsService } from "@/services/api/post";

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;

  const post = await postsService.findOne(Number(id));

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <Link
        href="/"
        className="mb-8 inline-flex items-center text-sm font-medium text-primary transition hover:text-primary-dark"
      >
        ← Voltar para posts
      </Link>

      <article className="rounded-2xl border border-border bg-white p-8 shadow-sm">
        <div className="mb-6">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {post.discipline.name}
          </span>
        </div>

        <h1 className="text-4xl wrap-break-word font-bold leading-tight text-foreground">
          {post.title}
        </h1>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
          <span>Por {post.autor}</span>

          <span>•</span>

          <span>{new Date(post.createdAt).toLocaleDateString("pt-BR")}</span>
        </div>

        <div className="mt-8 border-t border-border pt-8">
          <p className="whitespace-pre-wrap wrap-break-word text-base leading-8 text-foreground">
            {post.content}
          </p>
        </div>
      </article>
    </main>
  );
}
