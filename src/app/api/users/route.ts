import { NextResponse } from "next/server";

import { ApiError, serverApiFetch } from "@/lib/server-api";

export async function GET() {
  try {
    const data = await serverApiFetch("/users");

    return NextResponse.json(data);
  } catch (error) {
    return handleError(error, "Erro ao buscar usuários.");
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const apiUrl = process.env.API_INTERNAL_URL;

    if (!apiUrl) {
      throw new Error("API_INTERNAL_URL não configurada");
    }

    const response = await fetch(`${apiUrl}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const responseBody = await response.text();

    if (!response.ok) {
      let message = "Erro ao criar usuário.";

      try {
        const parsed = JSON.parse(responseBody);
        message = Array.isArray(parsed.message)
          ? parsed.message.join(", ")
          : parsed.message || message;
      } catch {
        message = responseBody || message;
      }

      return NextResponse.json({ message }, { status: response.status });
    }

    const data = responseBody ? JSON.parse(responseBody) : undefined;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return handleError(error, "Erro ao criar usuário.");
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
