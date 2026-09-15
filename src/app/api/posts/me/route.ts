import { NextResponse } from 'next/server';
import { ApiError, serverApiFetch } from '@/lib/server-api';

export async function GET() {
    try {
        const data = await serverApiFetch('/posts/me');

        return NextResponse.json(data);
    } catch (error) {
        console.error('Erro ao buscar meus posts:', error);

        if (error instanceof ApiError) {
            return NextResponse.json(
                { message: error.message },
                { status: error.status },
            );
        }

        return NextResponse.json(
            { message: 'Erro interno ao buscar seus posts.' },
            { status: 500 },
        );
    }
}