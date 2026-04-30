import type { SubCategoryResponse } from '../interfaces/subcategory.interface';
import { API_URL, apiFetch, getAuthHeaders } from './api';

export async function getSubCategoriesByCategory(categoryIdentifier: string): Promise<SubCategoryResponse[]> {
    try {
        const response = await apiFetch(`${API_URL}/category/${categoryIdentifier}/subcategory`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error('Erro ao buscar subcategorias');
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'Erro na conexão com o servidor');
    }
}

export async function createSubCategory(data: {
    name: string;
    category_identifier: string;
}): Promise<SubCategoryResponse> {
    try {
        const response = await apiFetch(`${API_URL}/category/${data.category_identifier}/subcategory`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ name: data.name }),
        });
        if (!response.ok) throw new Error('Erro ao criar subcategoria');
        return await response.json();
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'Erro na conexão com o servidor');
    }
}

export async function updateSubCategory(categoryIdentifier: string, subIdentifier: string, data: { name: string }): Promise<SubCategoryResponse> {
    try {
        const response = await apiFetch(`${API_URL}/category/${categoryIdentifier}/subcategory/${subIdentifier}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Erro ao atualizar subcategoria');
        return await response.json();
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'Erro na conexão com o servidor');
    }
}

export async function deleteSubCategory(categoryIdentifier: string, subIdentifier: string): Promise<void> {
    try {
        const response = await apiFetch(`${API_URL}/category/${categoryIdentifier}/subcategory/${subIdentifier}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error('Erro ao apagar subcategoria');
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'Erro na conexão com o servidor');
    }
}
