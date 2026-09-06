import { redirect } from "next/navigation";

import { getAuthUser } from "@/lib/auth";

export default async function NovoPostPage() {
  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
  }

  return <main>{/* formulário */}</main>;
}
