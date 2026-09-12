import { NextResponse } from 'next/server';

import type {
    LoginRequest,
    LoginResponse,
} from '@/types/auth';

const API_URL = process.env.API_INTERNAL_URL;

if (!API_URL) {
    throw new Error('API_INTERNAL_URL não configurada');
}

export async function POST(request: Request) {
    try {
        const body: LoginRequest = await request.json();

        const response = await fetch(
            `${API_URL}/auth/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            },
        );

        if (!response.ok) {
            return NextResponse.json(
                {
                    message: 'E-mail ou senha inválidos.',
                },
                {
                    status: response.status,
                },
            );
        }

        const data: LoginResponse =
            await response.json();

        const responseNext = NextResponse.json({
            user: data.user,
        });

        responseNext.cookies.set(
            'access_token',
            data.accessToken,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
            },
        );

        responseNext.cookies.set(
            'auth_user',
            JSON.stringify(data.user),
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
            },
        );

        return responseNext;
    } catch {
        return NextResponse.json(
            {
                message: 'Não foi possível realizar o login.',
            },
            {
                status: 500,
            },
        );
    }
}