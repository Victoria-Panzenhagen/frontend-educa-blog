import Link from "next/link";
import { redirect } from "next/navigation";

import AdminPostsTable from "@/components/posts/AdminPostsTable";
import { getAuthUser } from "@/lib/auth";
import { serverApiFetch } from "@/lib/server-api";
import type { PaginatedResponse } from "@/types/post";
import type { Post } from "@/types/post";

export default async function AdminPostsPage() {
  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
  }

  const posts = await serverApiFetch<PaginatedResponse<Post>>("/posts/me");

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Meus posts</h1>

          <p className="mt-2 text-muted">
            Gerencie os posts que você publicou.
          </p>
        </div>

        <Link
          href="/posts/novo"
          className="rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-primary-dark"
        >
          Novo post
        </Link>
      </div>

      <AdminPostsTable posts={posts} />
    </main>
  );
}
