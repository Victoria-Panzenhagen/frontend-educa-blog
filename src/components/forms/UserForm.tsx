"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { login } from "@/services/api/auth";

interface UserFormProps {
  mode: "create" | "edit";
  successHref?: string;
  initialData?: {
    id: number;
    name: string;
    email: string;
  };
}

export default function UserForm({
  mode,
  successHref = "/admin/users",
  initialData,
}: UserFormProps) {
  const router = useRouter();
  const isEdit = mode === "edit";
  const [name, setName] = useState(initialData?.name ?? "");
  const [email, setEmail] = useState(initialData?.email ?? "");
  const [password, setPassword] = useState(isEdit ? "***" : "");
  const [passwordEdited, setPasswordEdited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canSubmit =
    name.trim() !== "" && email.trim() !== "" && (isEdit || password !== "");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || (!isEdit && !password)) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setLoading(true);

      const body = {
        name: name.trim(),
        email: email.trim(),
        ...(passwordEdited && password ? { password } : {}),
      };
      const response = await fetch(
        isEdit ? `/api/users/${initialData?.id}` : "/api/users",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
      );
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "Não foi possível salvar o usuário.");
      }

      if (!isEdit) {
        await login({
          email: email.trim(),
          password,
        });
      }

      router.push(successHref);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar usuário.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p className="text-sm text-muted">
        <span className="text-red-500">*</span> Campos obrigatórios
      </p>

      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Nome <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          disabled={loading}
          placeholder="Ex.: Maria Silva"
          className="w-full rounded-lg border border-border bg-white px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          E-mail <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={loading}
          placeholder="maria.silva@email.com"
          className="w-full rounded-lg border border-border bg-white px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Senha {!isEdit && <span className="text-red-500">*</span>}
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onFocus={() => {
            if (!passwordEdited) {
              setPassword("");
              setPasswordEdited(true);
            }
          }}
          onChange={(event) => {
            setPasswordEdited(true);
            setPassword(event.target.value);
          }}
          disabled={loading}
          placeholder="Digite uma senha"
          className="w-full rounded-lg border border-border bg-white px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
        />
        {isEdit && (
          <p className="mt-2 text-sm text-muted">
            A senha atual está protegida. Clique no campo para informar uma nova.
          </p>
        )}
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="flex justify-end gap-3">
        <button type="button" onClick={() => router.back()} disabled={loading} className="rounded-lg border border-border bg-white px-5 py-3 text-sm font-medium text-foreground transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60">
          Cancelar
        </button>
        <button type="submit" disabled={!canSubmit || loading} className="rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? "Salvando..." : isEdit ? "Salvar alterações" : "Cadastrar usuário"}
        </button>
      </div>
    </form>
  );
}
