import type { LoginResponse } from '../interfaces/auth.interface';
import { API_URL } from './api';

export async function loginApi(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error('Email ou senha inválidos');
    return response.json();
}
