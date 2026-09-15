import { redirect } from "next/navigation";

import UserForm from "@/components/forms/UserForm";
import { getAuthUser } from "@/lib/auth";

export default async function AdminUsersPage() {
  const user = await getAuthUser();

  if (!user) redirect("/login");

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Meu perfil</h1>
        <p className="mt-2 text-muted">
          Atualize suas informações pessoais e senha.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
        <UserForm mode="edit" initialData={user} />
      </div>
    </main>
  );
}
