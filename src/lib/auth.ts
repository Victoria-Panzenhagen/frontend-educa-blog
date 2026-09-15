import { cookies } from 'next/headers';

import type { AuthUser } from '@/types/auth';

export async function getAuthUser(): Promise<AuthUser | null> {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get('access_token');
    const userCookie = cookieStore.get('auth_user');

    if (!accessToken || !userCookie) {
        return null;
    }

    try {
        return JSON.parse(userCookie.value) as AuthUser;
    } catch {
        return null;
    }
}