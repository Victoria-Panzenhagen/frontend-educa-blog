"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/Button";

interface PostPaginationProps {
  currentPage: number;
  totalPages: number;
}

export function PostPagination({
  currentPage,
  totalPages,
}: PostPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) {
    return null;
  }

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="mt-10 flex items-center justify-center gap-4">
      <Button
        type="button"
        variant="secondary"
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
      >
        ← Anterior
      </Button>

      <span className="text-sm text-gray-600">
        Página <strong className="text-gray-900">{currentPage}</strong> de{" "}
        <strong className="text-gray-900">{totalPages}</strong>
      </span>

      <Button
        type="button"
        variant="secondary"
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
      >
        Próxima →
      </Button>
    </div>
  );
}
