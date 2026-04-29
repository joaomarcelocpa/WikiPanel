export interface CategorySummary {
    identifier: string;
    name: string;
}

export interface CategoryResponse {
    identifier: string;
    name: string;
    deleted: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}
