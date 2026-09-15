import { NextResponse } from "next/server";

import { getAuthUser } from "@/lib/auth";
import { ApiError, serverApiFetch } from "@/lib/server-api";

interface RouteProps {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteProps) {
  try {
    const { id } = await params;
    const user = await getAuthUser();

    if (!user || user.id !== Number(id)) {
      return NextResponse.json({ message: "Acesso não autorizado." }, { status: 403 });
    }

    const data = await serverApiFetch(`/users/${id}`);

    return NextResponse.json(data);
  } catch (error) {
    return handleError(error, "Erro ao buscar usuário.");
  }
}

export async function PUT(request: Request, { params }: RouteProps) {
  try {
    const { id } = await params;
    const user = await getAuthUser();

    if (!user || user.id !== Number(id)) {
      return NextResponse.json({ message: "Acesso não autorizado." }, { status: 403 });
    }

    const body = await request.json();
    const data = await serverApiFetch(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });

    const response = NextResponse.json(data);
    response.cookies.set(
      "auth_user",
      JSON.stringify({
        ...user,
        name: body.name,
        email: body.email,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      },
    );

    return response;
  } catch (error) {
    return handleError(error, "Erro ao atualizar usuário.");
  }
}

export async function DELETE(_request: Request, { params }: RouteProps) {
  try {
    const { id } = await params;
    const user = await getAuthUser();

    if (!user || user.id !== Number(id)) {
      return NextResponse.json({ message: "Acesso não autorizado." }, { status: 403 });
    }

    await serverApiFetch(`/users/${id}`, { method: "DELETE" });

    return NextResponse.json({ message: "Usuário excluído com sucesso." });
  } catch (error) {
    return handleError(error, "Erro ao excluir usuário.");
  }
}

function handleError(error: unknown, fallbackMessage: string) {
  console.error(fallbackMessage, error);

  if (error instanceof ApiError) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status },
    );
  }

  return NextResponse.json({ message: fallbackMessage }, { status: 500 });
}
