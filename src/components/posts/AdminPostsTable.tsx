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
    if (!postToDelete) return;

    const deletedPostId = postToDelete.id;

    try {
      setDeleting(true);
      setError("");
      setSuccess("");

      const response = await fetch(`/api/posts/${deletedPostId}`, {
        method: "DELETE",
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "Não foi possível excluir o post.");
      }

      setPostsData((current) => ({
        ...current,
        total: Math.max(0, current.total - 1),
        data: current.data.filter((post) => post.id !== deletedPostId),
      }));

      setPostToDelete(null);
      setSuccess("Post excluído com sucesso.");
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
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/posts/${post.id}`}
                          title="Visualizar post"
                          aria-label={`Visualizar post ${post.title}`}
                          className="rounded-lg p-2 text-muted transition hover:bg-primary/10 hover:text-primary"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-5 w-5"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 12s3.75-6 9.75-6 9.75 6 9.75 6-3.75 6-9.75 6-9.75-6-9.75-6Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        </Link>

                        <Link
                          href={`/posts/${post.id}/editar`}
                          title="Editar post"
                          aria-label={`Editar post ${post.title}`}
                          className="rounded-lg p-2 text-muted transition hover:bg-primary/10 hover:text-primary"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-5 w-5"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m16.862 4.487 2.651 2.651M4.5 19.5l4.5-1 10.513-10.513a1.875 1.875 0 0 0-2.651-2.651L6.349 15.849l-1.849 3.651Z"
                            />
                          </svg>
                        </Link>

                        <button
                          type="button"
                          title="Excluir post"
                          aria-label={`Excluir post ${post.title}`}
                          onClick={() => {
                            setPostToDelete(post);
                            setError("");
                            setSuccess("");
                          }}
                          className="rounded-lg p-2 text-muted transition hover:bg-red-50 hover:text-red-600"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-5 w-5"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 7.5h12M9.75 7.5V5.25h4.5V7.5m-6.75 0 .75 11.25h7.5L16.5 7.5M10.5 11v4.5m3-4.5v4.5"
                            />
                          </svg>
                        </button>
                      </div>{" "}
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
