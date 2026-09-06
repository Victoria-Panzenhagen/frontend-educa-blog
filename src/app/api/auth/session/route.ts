import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import type { AuthUser } from '@/types/auth';

export async function GET() {
    const cookieStore = await cookies();

    const accessToken =
        cookieStore.get('access_token');

    const userCookie =
        cookieStore.get('auth_user');

    if (!accessToken || !userCookie) {
        return NextResponse.json(
            {
                authenticated: false,
                user: null,
            },
            {
                status: 401,
            },
        );
    }

    try {
        const user: AuthUser =
            JSON.parse(userCookie.value);

        return NextResponse.json({
            authenticated: true,
            user,
        });
    } catch {
        return NextResponse.json(
            {
                authenticated: false,
                user: null,
            },
            {
                status: 401,
            },
        );
    }
}