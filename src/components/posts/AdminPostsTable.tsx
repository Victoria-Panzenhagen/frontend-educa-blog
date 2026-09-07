"use client";

import { useState } from "react";
import Link from "next/link";

import ConfirmDialog from "@/components/ui/ConfirmDialog";
import type { PaginatedResponse } from "@/types/post";
import type { Post } from "@/types/post";

interface AdminPostsTableProps {
  posts: PaginatedResponse<Post>;
}

export default function AdminPostsTable({ posts }: AdminPostsTableProps) {
  const [postsData, setPostsData] = useState(posts);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleDelete() {
    if (!postToDelete) {
      return;
    }

    try {
      setDeleting(true);
      setError("");
      setSuccess("");

      const response = await fetch(`/api/posts/${postToDelete.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();

        throw new Error(data.message || "Não foi possível excluir o post.");
      }

      setPostsData((current) => ({
        ...current,
        total: current.total - 1,
        data: current.data.filter((post) => post.id !== postToDelete.id),
      }));

      setSuccess("Post excluído com sucesso.");
      setPostToDelete(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao excluir o post.");
    } finally {
      setDeleting(false);
    }
  }

  if (postsData.data.length === 0) {
    return (
      <>
        <div className="rounded-xl border border-border bg-white p-10 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">
            Você ainda não publicou nenhum post.
          </h2>

          <p className="mt-2 text-sm text-muted">
            Comece compartilhando seu conhecimento.
          </p>

          <Link
            href="/posts/novo"
            className="mt-6 inline-block rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-primary-dark"
          >
            Criar primeiro post
          </Link>
        </div>

        <ConfirmDialog
          open={postToDelete !== null}
          title="Excluir post?"
          message={
            postToDelete
              ? `Tem certeza que deseja excluir o post "${postToDelete.title}"? Esta ação não poderá ser desfeita.`
              : ""
          }
          confirmLabel="Excluir"
          loading={deleting}
          onConfirm={handleDelete}
          onCancel={() => {
            if (!deleting) {
              setPostToDelete(null);
            }
          }}
        />
      </>
    );
  }

  return (
    <>
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-175">
            <thead className="border-b border-border bg-background">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Título
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Disciplina
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Data
                </th>

                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                  Ações
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {postsData.data.map((post) => (
                <tr key={post.id}>
                  <td className="max-w-md px-6 py-4">
                    <span className="block wrap-break-word font-medium text-foreground">
                      {post.title}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-muted">
                    {post.discipline.name}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-sm text-muted">
                    {new Date(post.createdAt).toLocaleDateString("pt-BR")}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/posts/${post.id}`}
                        className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary"
                      >
                        Visualizar
                      </Link>

                      <Link
                        href={`/posts/${post.id}/editar`}
                        className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary"
                      >
                        Editar
                      </Link>

                      <button
                        type="button"
                        onClick={() => {
                          setError("");
                          setSuccess("");
                          setPostToDelete(post);
                        }}
                        className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog
        open={postToDelete !== null}
        title="Excluir post?"
        message={
          postToDelete
            ? `Tem certeza que deseja excluir o post "${postToDelete.title}"? Esta ação não poderá ser desfeita.`
            : ""
        }
        confirmLabel="Excluir"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => {
          if (!deleting) {
            setPostToDelete(null);
          }
        }}
      />
    </>
  );
}
