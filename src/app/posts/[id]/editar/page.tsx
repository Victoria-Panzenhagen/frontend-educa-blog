import { notFound, redirect } from "next/navigation";

import PostForm from "@/components/forms/PostForm";
import { getAuthUser } from "@/lib/auth";
import type { Post } from "@/types/post";

const API_URL = process.env.API_INTERNAL_URL;

interface EditPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getPost(id: string): Promise<Post | null> {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Não foi possível carregar o post.");
  }

  return response.json();
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
  }

  const { id } = await params;

  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Editar post</h1>

        <p className="mt-2 text-muted">Atualize as informações do seu post.</p>
      </div>

      <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
        <PostForm
          mode="edit"
          initialData={{
            id: post.id,
            title: post.title,
            content: post.content,
            disciplineId: String(post.discipline.id),
          }}
        />
      </div>
    </main>
  );
}
