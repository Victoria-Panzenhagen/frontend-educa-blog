import { NextResponse } from 'next/server';

import { ApiError, serverApiFetch } from '@/lib/server-api';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const data = await serverApiFetch('/posts', {
            method: 'POST',
            body: JSON.stringify(body),
        });

        return NextResponse.json(data, {
            status: 201,
        });
    } catch (error) {
        console.error('Erro ao criar post:', error);

        if (error instanceof ApiError) {
            return NextResponse.json(
                { message: error.message },
                { status: error.status },
            );
        }

        return NextResponse.json(
            { message: 'Erro interno ao criar post.' },
            { status: 500 },
        );
    }
}