// Arquivo: src/shared/services/information.service.ts

import type {
    InformationViewResponse,
    CategoryResponse,
    SubCategoryResponse,
} from '../interfaces/information.interface';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Headers para requisições públicas (sem autenticação)
function getPublicHeaders(): HeadersInit {
    return {
        'Content-Type': 'application/json',
    };
}

// // Headers para requisições autenticadas (caso necessário)
// function getAuthHeaders(): HeadersInit {
//     const token = localStorage.getItem('token');
//     return {
//         'Content-Type': 'application/json',
//         ...(token && { Authorization: `Bearer ${token}` }),
//     };
// }

// ===== CATEGORIAS =====

export async function getAllCategories(): Promise<CategoryResponse[]> {
    try {
        console.log('🔍 Buscando categorias em:', `${API_URL}/category`);
        const response = await fetch(`${API_URL}/category`, {
            method: 'GET',
            headers: getPublicHeaders(),
        });

        console.log('📡 Status da resposta:', response.status);

        if (!response.ok) {
            throw new Error('Erro ao buscar categorias');
        }

        const data = await response.json();
        console.log('✅ Categorias recebidas:', data);
        return data;
    } catch (error: unknown) {
        console.error('❌ Erro no getAllCategories:', error);
        throw new Error(
            error instanceof Error
                ? error.message
                : 'Erro na conexão com o servidor'
        );
    }
}

export async function getCategoryByIdentifier(
    identifier: string
): Promise<CategoryResponse> {
    try {
        const response = await fetch(`${API_URL}/category/${identifier}`, {
            method: 'GET',
            headers: getPublicHeaders(),
        });

        if (!response.ok) {
            throw new Error('Categoria não encontrada');
        }

        return await response.json();
    } catch (error: unknown) {
        throw new Error(
            error instanceof Error
                ? error.message
                : 'Erro na conexão com o servidor'
        );
    }
}

export async function getSubCategoriesByCategory(
    categoryIdentifier: string
): Promise<SubCategoryResponse[]> {
    try {
        console.log('🔍 Buscando subcategorias em:', `${API_URL}/category/${categoryIdentifier}/subcategories`);
        const response = await fetch(
            `${API_URL}/category/${categoryIdentifier}/subcategories`,
            {
                method: 'GET',
                headers: getPublicHeaders(),
            }
        );

        console.log('📡 Status da resposta subcategorias:', response.status);

        if (!response.ok) {
            throw new Error('Erro ao buscar subcategorias');
        }

        const data = await response.json();
        console.log('✅ Subcategorias recebidas:', data);
        return Array.isArray(data) ? data : [];
    } catch (error: unknown) {
        console.error('❌ Erro no getSubCategoriesByCategory:', error);
        throw new Error(
            error instanceof Error
                ? error.message
                : 'Erro na conexão com o servidor'
        );
    }
}

// ===== INFORMAÇÕES =====

export async function getAllInformation(): Promise<InformationViewResponse[]> {
    try {
        const response = await fetch(`${API_URL}/information`, {
            method: 'GET',
            headers: getPublicHeaders(),
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar informações');
        }

        return await response.json();
    } catch (error: unknown) {
        throw new Error(
            error instanceof Error
                ? error.message
                : 'Erro na conexão com o servidor'
        );
    }
}

export async function getInformationByCategory(
    categoryIdentifier: string
): Promise<InformationViewResponse[]> {
    try {
        const response = await fetch(
            `${API_URL}/information?categoryIdentifier=${categoryIdentifier}`,
            {
                method: 'GET',
                headers: getPublicHeaders(),
            }
        );

        if (!response.ok) {
            throw new Error('Erro ao buscar informações da categoria');
        }

        return await response.json();
    } catch (error: unknown) {
        throw new Error(
            error instanceof Error
                ? error.message
                : 'Erro na conexão com o servidor'
        );
    }
}

export async function getInformationBySubCategory(
    subCategoryIdentifier: string
): Promise<InformationViewResponse[]> {
    try {
        const response = await fetch(
            `${API_URL}/information?subCategoryIdentifier=${subCategoryIdentifier}`,
            {
                method: 'GET',
                headers: getPublicHeaders(),
            }
        );

        if (!response.ok) {
            throw new Error('Erro ao buscar informações da subcategoria');
        }

        return await response.json();
    } catch (error: unknown) {
        throw new Error(
            error instanceof Error
                ? error.message
                : 'Erro na conexão com o servidor'
        );
    }
}

export async function getInformationById(
    identifier: string
): Promise<InformationViewResponse> {
    try {
        const response = await fetch(`${API_URL}/information/${identifier}`, {
            method: 'GET',
            headers: getPublicHeaders(),
        });

        if (!response.ok) {
            throw new Error('Informação não encontrada');
        }

        return await response.json();
    } catch (error: unknown) {
        throw new Error(
            error instanceof Error
                ? error.message
                : 'Erro na conexão com o servidor'
        );
    }
}