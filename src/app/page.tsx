import { PostSearch } from "@/components/posts/PostSearch";
import { PostPagination } from "@/components/posts/PostPagination";
import { PostCard } from "@/components/posts/PostCard";
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
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Conhecimento que transforma
        </h1>

        <p className="mt-3 text-lg text-gray-600">
          Compartilhe conhecimento, experiências e ideias.
        </p>
      </section>

      <PostSearch />

      {posts.data.length === 0 ? (
        <div className="rounded-xl border p-10 text-center">
          <h2 className="text-xl font-semibold">Nenhum post encontrado</h2>

          <p className="mt-2 text-gray-500">Tente buscar por outro termo.</p>
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
    </main>
  );
}
