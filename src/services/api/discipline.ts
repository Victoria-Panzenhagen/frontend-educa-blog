import type { Discipline } from '@/types/discipline';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
    throw new Error('NEXT_PUBLIC_API_URL não configurada');
}

export async function getDisciplines(
    search?: string,
): Promise<Discipline[]> {
    const params = new URLSearchParams();

    if (search?.trim()) {
        params.set('name', search.trim());
    }

    const query = params.toString();

    const response = await fetch(
        `${API_URL}/discipline${query ? `?${query}` : ''}`,
        {
            cache: 'no-store',
        },
    );

    if (!response.ok) {
        throw new Error('Erro ao buscar disciplinas.');
    }

    return response.json();
}