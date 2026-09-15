import { redirect } from "next/navigation";

import PostForm from "@/components/forms/PostForm";
import { getAuthUser } from "@/lib/auth";

export default async function NewPostPage() {
  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Novo post</h1>

        <p className="mt-2 text-muted">
          Compartilhe seu conhecimento com a comunidade.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
        <PostForm mode="create" />
      </div>
    </main>
  );
}
