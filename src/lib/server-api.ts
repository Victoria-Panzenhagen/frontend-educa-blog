import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
    throw new Error('NEXT_PUBLIC_API_URL não configurada');
}

export class ApiError extends Error {
    constructor(
        message: string,
        public status: number,
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

export async function serverApiFetch<T>(
    endpoint: string,
    options: RequestInit = {},
): Promise<T> {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    if (!accessToken) {
        throw new ApiError('Usuário não autenticado.', 401);
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
            ...options.headers,
        },
        cache: 'no-store',
    });

    if (!response.ok) {
        const errorBody = await response.text();

        let message = 'Erro ao comunicar com a API.';

        try {
            const parsedError = JSON.parse(errorBody);

            if (typeof parsedError.message === 'string') {
                message = parsedError.message;
            } else if (Array.isArray(parsedError.message)) {
                message = parsedError.message.join(', ');
            }
        } catch {
            if (errorBody) {
                message = errorBody;
            }
        }

        throw new ApiError(message, response.status);
    }

    return response.json();
}