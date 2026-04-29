export interface UserInfo {
    id: string;
    name: string;
    email: string;
    type: string;
}

export interface UserResponse {
    id: string;
    name: string;
    email: string;
    type: string;
    deleted: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}
