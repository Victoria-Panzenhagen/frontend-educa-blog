"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function PostSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (search.trim()) {
      params.set("search", search.trim());
    } else {
      params.delete("search");
    }

    params.delete("page");

    const queryString = params.toString();

    router.push(queryString ? `/?${queryString}` : "/");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-10 flex flex-col gap-3 sm:flex-row"
    >
      <Input
        id="search"
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Buscar posts..."
        className="flex-1"
      />

      <Button type="submit">Buscar</Button>
    </form>
  );
}
