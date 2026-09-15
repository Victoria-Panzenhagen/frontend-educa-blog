"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { Discipline } from "@/types/discipline";

interface PostFormData {
  id?: number;
  title: string;
  content: string;
  disciplineId: string;
}

interface PostFormProps {
  mode: "create" | "edit";
  initialData?: PostFormData;
}

export default function PostForm({ mode, initialData }: PostFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [content, setContent] = useState(initialData?.content ?? "");
  const [disciplineId, setDisciplineId] = useState(
    initialData?.disciplineId ?? "",
  );

  const isFormValid =
    title.trim() !== "" && content.trim() !== "" && disciplineId !== "";

  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [loadingDisciplines, setLoadingDisciplines] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEdit = mode === "edit";

  const router = useRouter();

  useEffect(() => {
    async function loadDisciplines() {
      try {
        setLoadingDisciplines(true);

        const response = await fetch("/api/discipline");

        if (!response.ok) {
          throw new Error("Não foi possível carregar as disciplinas.");
        }

        const data: Discipline[] = await response.json();

        setDisciplines(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao carregar disciplinas.",
        );
      } finally {
        setLoadingDisciplines(false);
      }
    }

    loadDisciplines();
  }, []);

  const handleSubmit: React.ComponentProps<"form">["onSubmit"] = async (
    event,
  ) => {
    if (!event) return;
   
    event.preventDefault();

    setError("");

    if (!title.trim()) {
      setError("Informe o título do post.");
      return;
    }

    if (!content.trim()) {
      setError("Informe o conteúdo do post.");
      return;
    }

    if (!disciplineId) {
      setError("Selecione uma disciplina.");
      return;
    }

    try {
      setLoading(true);

      const body = {
        title: title.trim(),
        content: content.trim(),
        disciplineId: Number(disciplineId),
      };

      const response = await fetch(
        isEdit ? `/api/posts/${initialData?.id}` : "/api/posts",
        {
          method: isEdit ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Não foi possível salvar o post.");
      }

      router.push(`/admin/posts`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar o post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <p className="text-sm text-muted">
          <span className="text-red-500">*</span> Campos obrigatórios
        </p>

        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Título <span className="text-red-500">*</span>
        </label>

        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Digite o título do post"
          disabled={loading}
          className="w-full rounded-lg border border-border bg-white px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      <div>
        <label
          htmlFor="discipline"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Disciplina <span className="text-red-500">*</span>
        </label>

        <select
          id="discipline"
          value={disciplineId}
          onChange={(event) => setDisciplineId(event.target.value)}
          disabled={loading || loadingDisciplines}
          className="w-full rounded-lg border border-border bg-white px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <option value="">
            {loadingDisciplines
              ? "Carregando disciplinas..."
              : "Selecione uma disciplina"}
          </option>

          {disciplines.map((discipline) => (
            <option key={discipline.id} value={discipline.id}>
              {discipline.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="content"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Conteúdo <span className="text-red-500">*</span>
        </label>

        <textarea
          id="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Escreva o conteúdo do post"
          rows={10}
          disabled={loading}
          className="w-full resize-y rounded-lg border border-border bg-white px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          disabled={loading}
          className="rounded-lg border border-border bg-white px-5 py-3 text-sm font-medium text-foreground transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={!isFormValid || loading || loadingDisciplines}
          className="rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Salvando..." : isEdit ? "Salvar alterações" : "Publicar"}
        </button>
      </div>
    </form>
  );
}
