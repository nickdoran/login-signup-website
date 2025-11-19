export interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    user: User;
}
