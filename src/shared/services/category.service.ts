import type { CategoryResponse } from '../interfaces/category.interface';
import { API_URL, getAuthHeaders } from './api';

export async function getAllCategories(): Promise<CategoryResponse[]> {
    try {
        const response = await fetch(`${API_URL}/category`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error('Erro ao buscar categorias');
        return await response.json();
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'Erro na conexão com o servidor');
    }
}

export async function getCategoryByIdentifier(identifier: string): Promise<CategoryResponse> {
    try {
        const response = await fetch(`${API_URL}/category/${identifier}`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error('Categoria não encontrada');
        return await response.json();
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'Erro na conexão com o servidor');
    }
}

export async function createCategory(data: { name: string }): Promise<CategoryResponse> {
    try {
        const response = await fetch(`${API_URL}/category`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Erro ao criar categoria');
        return await response.json();
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'Erro na conexão com o servidor');
    }
}
