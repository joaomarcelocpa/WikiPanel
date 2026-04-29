export interface SubCategorySummary {
    identifier: string;
    name: string;
    category_identifier: string;
}

export interface SubCategoryResponse {
    identifier: string;
    name: string;
    category_identifier: string;
    deleted: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}
