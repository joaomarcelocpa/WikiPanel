import type { InformationViewResponse, InformationCreateDto } from '../interfaces/information.interface';
import { API_URL, apiFetch, getAuthHeaders, getAuthHeadersMultipart } from './api';

export async function searchInformation(query: string): Promise<InformationViewResponse[]> {
    try {
        const response = await apiFetch(`${API_URL}/information?search=${encodeURIComponent(query)}`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error('Erro ao buscar informações');
        return await response.json();
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'Erro na conexão com o servidor');
    }
}

export async function getAllInformation(): Promise<InformationViewResponse[]> {
    try {
        const response = await apiFetch(`${API_URL}/information`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error('Erro ao buscar informações');
        return await response.json();
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'Erro na conexão com o servidor');
    }
}

export async function getInformationByCategory(categoryIdentifier: string): Promise<InformationViewResponse[]> {
    try {
        const response = await apiFetch(`${API_URL}/information?categoryIdentifier=${categoryIdentifier}`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error('Erro ao buscar informações da categoria');
        return await response.json();
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'Erro na conexão com o servidor');
    }
}

export async function getInformationBySubCategory(subCategoryIdentifier: string): Promise<InformationViewResponse[]> {
    try {
        const response = await apiFetch(`${API_URL}/information?subCategoryIdentifier=${subCategoryIdentifier}`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error('Erro ao buscar informações da subcategoria');
        return await response.json();
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'Erro na conexão com o servidor');
    }
}

export async function getInformationById(identifier: string): Promise<InformationViewResponse> {
    try {
        const response = await apiFetch(`${API_URL}/information/${identifier}`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error('Informação não encontrada');
        return await response.json();
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'Erro na conexão com o servidor');
    }
}

export async function getInformationBySlug(slug: string): Promise<InformationViewResponse> {
    try {
        const response = await apiFetch(`${API_URL}/information/slug/${slug}`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error('Informação não encontrada');
        return await response.json();
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'Erro na conexão com o servidor');
    }
}

export async function updateInformation(
    identifier: string,
    data: { question?: string; content?: string; category_identifier?: string; sub_category_identifier?: string },
    file?: File,
): Promise<InformationViewResponse> {
    try {
        const formData = new FormData();
        if (data.question) formData.append('question', data.question);
        if (data.content) formData.append('content', data.content);
        if (data.category_identifier) formData.append('category_identifier', data.category_identifier);
        if (data.sub_category_identifier) formData.append('sub_category_identifier', data.sub_category_identifier);
        if (file) formData.append('file', file);

        const response = await apiFetch(`${API_URL}/information/${identifier}`, {
            method: 'PUT',
            headers: getAuthHeadersMultipart(),
            body: formData,
        });
        if (!response.ok) throw new Error('Erro ao atualizar informação');
        return await response.json();
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'Erro na conexão com o servidor');
    }
}

export async function deleteInformation(identifier: string): Promise<void> {
    try {
        const response = await apiFetch(`${API_URL}/information/${identifier}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error('Erro ao apagar informação');
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'Erro na conexão com o servidor');
    }
}

export async function createInformation(data: InformationCreateDto, file?: File): Promise<InformationViewResponse> {
    try {
        const formData = new FormData();
        formData.append('question', data.question);
        formData.append('content', data.content);
        formData.append('category_identifier', data.category_identifier);
        formData.append('sub_category_identifier', data.sub_category_identifier);
        if (file) formData.append('file', file);

        const response = await apiFetch(`${API_URL}/information`, {
            method: 'POST',
            headers: getAuthHeadersMultipart(),
            body: formData,
        });
        if (!response.ok) throw new Error('Erro ao criar informação');
        return await response.json();
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'Erro na conexão com o servidor');
    }
}
