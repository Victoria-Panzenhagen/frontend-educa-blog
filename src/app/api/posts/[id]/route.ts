import { NextResponse } from 'next/server';

import { ApiError, serverApiFetch } from '@/lib/server-api';

interface RouteParams {
    params: Promise<{
        id: string;
    }>;
}

export async function PUT(
    request: Request,
    { params }: RouteParams,
) {
    try {
        const { id } = await params;
        const body = await request.json();

        const data = await serverApiFetch(
            `/posts/${id}`,
            {
                method: 'PUT',
                body: JSON.stringify(body),
            },
        );

        return NextResponse.json(data);
    } catch (error) {
        console.error('Erro ao atualizar post:', error);

        if (error instanceof ApiError) {
            return NextResponse.json(
                { message: error.message },
                { status: error.status },
            );
        }

        return NextResponse.json(
            { message: 'Erro interno ao atualizar post.' },
            { status: 500 },
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;

        await serverApiFetch(`/posts/${id}`, {
            method: 'DELETE',
        });

        return NextResponse.json(
            { message: 'Post excluído com sucesso.' },
            { status: 200 },
        );
    } catch (error) {
        console.error('Erro ao excluir post: -->>> ', error);

        if (error instanceof ApiError) {
            return NextResponse.json(
                { message: error.message },
                { status: error.status },
            );
        }

        return NextResponse.json(
            { message: 'Erro interno ao excluir post.' },
            { status: 500 },
        );
    }
}