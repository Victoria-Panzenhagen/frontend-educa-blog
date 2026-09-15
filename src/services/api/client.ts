const API_URL = process.env.API_INTERNAL_URL;

if (!API_URL) {
  throw new Error("API_INTERNAL_URL não configurada");
}

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  const responseBody = await response.text();

  if (!response.ok) {
    let message = `Erro na API: ${response.status}`;

    if (responseBody) {
      try {
        const data = JSON.parse(responseBody);

        if (typeof data.message === "string") {
          message = data.message;
        } else if (Array.isArray(data.message)) {
          message = data.message.join(", ");
        }
      } catch {
        message = responseBody;
      }
    }

    throw new Error(message);
  }

  if (!responseBody) {
    return undefined as T;
  }

  return JSON.parse(responseBody) as T;
}