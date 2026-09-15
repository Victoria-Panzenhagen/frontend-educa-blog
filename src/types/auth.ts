export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthUser {
    id: number;
    name: string;
    email: string;
}

export interface LoginResponse {
    accessToken: string;
    tokenType: 'Bearer';
    user: AuthUser;
}