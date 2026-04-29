import type { CategorySummary } from './category.interface';
import type { SubCategorySummary } from './subcategory.interface';

export interface FileResponse {
    id: number;
    originalName: string;
    fileName: string;
    path: string;
    mimetype: string;
    size: number;
    uploaded_at: Date;
}

export interface InformationViewResponse {
    identifier: string;
    question: string;
    content: string;
    slug: string;
    file?: FileResponse;
    file_identifier?: number;
    category_identifier: string;
    category: CategorySummary;
    sub_category_identifier: string;
    subCategory: SubCategorySummary;
    user_identifier: string;
    user_name: string;
    created_at: string;
    updated_at: string;
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
