import Link from "next/link";
import { redirect } from "next/navigation";

import AdminPostsTable from "@/components/posts/AdminPostsTable";
import { PostPagination } from "@/components/posts/PostPagination";
import { getAuthUser } from "@/lib/auth";
import { serverApiFetch } from "@/lib/server-api";
import type { PaginatedResponse, Post } from "@/types/post";

interface AdminPostsPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function AdminPostsPage({
  searchParams,
}: AdminPostsPageProps) {
  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
  }

  const { page } = await searchParams;

  const currentPage = Math.max(1, Number(page) || 1);

  const limit = 3;

  const posts = await serverApiFetch<PaginatedResponse<Post>>(
    `/posts/me?page=${currentPage}&limit=${limit}`,
  );

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-8 flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-3xl font-bold text-foreground">Meus posts</h1>

          <p className="mt-2 text-muted">
            Gerencie os posts que você publicou.
          </p>
        </div>

        <Link
          href="/posts/novo"
          className="w-fit rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-primary-dark"
        >
          Novo post
        </Link>
      </div>

      <AdminPostsTable key={posts.page} posts={posts} />
      <PostPagination currentPage={posts.page} totalPages={posts.totalPages} />
    </main>
  );
}
