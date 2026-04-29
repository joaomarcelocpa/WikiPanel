import type { UserInfo } from './user.interface';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    user: UserInfo;
}
