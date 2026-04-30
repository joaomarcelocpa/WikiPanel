import type { UserResponse } from '../interfaces/user.interface';
import { API_URL, apiFetch, getAuthHeaders } from './api';

export async function getAllUsers(): Promise<UserResponse[]> {
    try {
        const response = await apiFetch(`${API_URL}/users`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error('Erro ao buscar usuários');
        return await response.json();
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'Erro na conexão com o servidor');
    }
}

export async function createUser(data: {
    name: string;
    email: string;
    password: string;
    type: string;
}): Promise<UserResponse> {
    try {
        const response = await apiFetch(`${API_URL}/users`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Erro ao criar usuário');
        return await response.json();
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'Erro na conexão com o servidor');
    }
}

export async function updateUser(
    id: string,
    data: { name?: string; email?: string; password?: string; type?: string },
): Promise<UserResponse> {
    try {
        const response = await apiFetch(`${API_URL}/users/${id}`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Erro ao atualizar usuário');
        return await response.json();
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'Erro na conexão com o servidor');
    }
}

export async function deleteUser(id: string): Promise<void> {
    try {
        const response = await apiFetch(`${API_URL}/users/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error('Erro ao deletar usuário');
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'Erro na conexão com o servidor');
    }
}
