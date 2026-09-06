import { PostCard } from "@/components/posts/PostCard";
import { PostPagination } from "@/components/posts/PostPagination";
import { PostSearch } from "@/components/posts/PostSearch";
import { postsService } from "@/services/api/post";

interface HomeProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;

  const search = params.search;
  const page = Number(params.page) || 1;

  const posts = await postsService.findAll({
    search,
    page,
    limit: 3,
  });

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="mb-12">
        <span className="text-sm font-bold uppercase tracking-widest text-primary">
          Educa Blog
        </span>

        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Conhecimento que transforma
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
          Compartilhe conhecimento, experiências e ideias com nossa comunidade.
        </p>
      </section>

      <PostSearch />

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Posts recentes</h2>

          {posts.total > 0 && (
            <span className="text-sm text-muted">
              {posts.total} {posts.total === 1 ? "post" : "posts"}
            </span>
          )}
        </div>

        {posts.data.length === 0 ? (
          <div className="rounded-2xl border border-border bg-white p-12 text-center">
            <h2 className="text-xl font-bold text-foreground">
              Nenhum post encontrado
            </h2>

            <p className="mt-2 text-muted">Tente buscar por outro termo.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.data.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            <PostPagination
              currentPage={posts.page}
              totalPages={posts.totalPages}
            />
          </>
        )}
      </section>
    </main>
  );
}
