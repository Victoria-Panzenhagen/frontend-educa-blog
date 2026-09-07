import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
    throw new Error('NEXT_PUBLIC_API_URL não configurada');
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const name = searchParams.get('name');

        const params = new URLSearchParams();

        if (name?.trim()) {
            params.set('name', name.trim());
        }

        const query = params.toString();

        const response = await fetch(
            `${API_URL}/discipline${query ? `?${query}` : ''}`,
            {
                cache: 'no-store',
            },
        );

        if (!response.ok) {
            const errorBody = await response.text();

            return NextResponse.json(
                {
                    message: errorBody || 'Erro ao buscar disciplinas.',
                },
                { status: response.status },
            );
        }

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error('Erro ao buscar disciplinas:', error);

        return NextResponse.json(
            {
                message: 'Erro interno ao buscar disciplinas.',
            },
            { status: 500 },
        );
    }
}