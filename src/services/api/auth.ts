import type {
    LoginRequest,
    LoginResponse,
} from '@/types/auth';

export async function login(
    credentials: LoginRequest,
): Promise<LoginResponse> {
    const response = await fetch(
        '/api/auth/login',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        },
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ?? 'Erro ao realizar login.',
        );
    }

    return data;
}

export async function logout(): Promise<void> {
    const response = await fetch(
        '/api/auth/logout',
        {
            method: 'POST',
        },
    );

    if (!response.ok) {
        throw new Error('Erro ao realizar logout.');
    }
}