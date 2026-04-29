import type { InformationViewResponse, InformationCreateDto } from '../interfaces/information.interface';
import { API_URL, getAuthHeaders } from './api';

export async function getAllInformation(): Promise<InformationViewResponse[]> {
    try {
        const response = await fetch(`${API_URL}/information`, {
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
        const response = await fetch(`${API_URL}/information?categoryIdentifier=${categoryIdentifier}`, {
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
        const response = await fetch(`${API_URL}/information?subCategoryIdentifier=${subCategoryIdentifier}`, {
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
        const response = await fetch(`${API_URL}/information/${identifier}`, {
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
        const response = await fetch(`${API_URL}/information/slug/${slug}`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error('Informação não encontrada');
        return await response.json();
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'Erro na conexão com o servidor');
    }
}

export async function createInformation(data: InformationCreateDto): Promise<InformationViewResponse> {
    try {
        const response = await fetch(`${API_URL}/information`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Erro ao criar informação');
        return await response.json();
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'Erro na conexão com o servidor');
    }
}
