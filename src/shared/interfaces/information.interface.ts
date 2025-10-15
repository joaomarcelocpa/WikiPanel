export interface FileResponse {
    id: number;
    originalName: string;
    fileName: string;
    path: string;
    mimetype: string;
    size: number;
    uploaded_at: Date;
}

export interface CategorySummary {
    identifier: string;
    name: string;
}

export interface SubCategorySummary {
    identifier: string;
    name: string;
    category_identifier: string;
}

export interface InformationViewResponse {
    identifier: string;
    question: string;
    content: string;
    file?: FileResponse;
    file_identifier?: number;
    category_identifier: string;
    category: CategorySummary;
    sub_category_identifier: string;
    subCategory: SubCategorySummary;
    user_identifier: string;
    user_name: string;
    created_at: Date;
    updated_at: Date;
}

export interface CategoryResponse {
    identifier: string;
    name: string;
    description?: string;
    created_at: Date;
    updated_at: Date;
}

export interface SubCategoryResponse {
    identifier: string;
    name: string;
    description?: string;
    category_identifier: string;
    created_at: Date;
    updated_at: Date;
}

export interface InformationCreateDto {
    question: string;
    content: string;
    file_identifier?: number;
    category_identifier: string;
    sub_category_identifier: string;
}

export interface InformationUpdateDto {
    question?: string;
    content?: string;
    file_identifier?: number;
    category_identifier?: string;
    sub_category_identifier?: string;
}