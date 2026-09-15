"use client";

import { useState } from "react";
import Link from "next/link";

import ConfirmDialog from "@/components/ui/ConfirmDialog";
import type { User } from "@/types/user";

interface UsersTableProps {
  users: User[];
}

export default function UsersTable({ users }: UsersTableProps) {
  const [usersData, setUsersData] = useState(users);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleDelete() {
    if (!userToDelete) return;

    try {
      setDeleting(true);
      const response = await fetch(`/api/users/${userToDelete.id}`, {
        method: "DELETE",
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "Não foi possível excluir o usuário.");
      }

      setUsersData((current) =>
        current.filter((user) => user.id !== userToDelete.id),
      );
      setUserToDelete(null);
      setSuccess("Usuário excluído com sucesso.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao excluir usuário.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      {success && <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{success}</div>}

      {usersData.length === 0 ? (
        <div className="rounded-xl border border-border bg-white p-10 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">Nenhum usuário cadastrado.</h2>
          <Link href="/admin/users/novo" className="mt-6 inline-block rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-primary-dark">Cadastrar primeiro usuário</Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-150">
              <thead className="border-b border-border bg-background"><tr><th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Nome</th><th className="px-6 py-4 text-left text-sm font-semibold text-foreground">E-mail</th><th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Ações</th></tr></thead>
              <tbody className="divide-y divide-border">
                {usersData.map((user) => <tr key={user.id}><td className="px-6 py-4 font-medium text-foreground">{user.name}</td><td className="px-6 py-4 text-sm text-muted">{user.email}</td><td className="px-6 py-4"><div className="flex justify-end gap-2"><Link href={`/admin/users/${user.id}/editar`} className="rounded-lg px-3 py-2 text-sm font-medium text-primary transition hover:bg-primary/10">Editar</Link><button type="button" onClick={() => { setUserToDelete(user); setError(""); setSuccess(""); }} className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50">Excluir</button></div></td></tr>)}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ConfirmDialog open={userToDelete !== null} title="Excluir usuário?" message={userToDelete ? `Tem certeza que deseja excluir ${userToDelete.name}? Esta ação não poderá ser desfeita.` : ""} confirmLabel="Excluir" loading={deleting} onConfirm={handleDelete} onCancel={() => !deleting && setUserToDelete(null)} />
    </>
  );
}
