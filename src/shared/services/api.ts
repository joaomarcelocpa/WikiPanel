export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

let unauthorizedHandler: (() => void) | null = null;

export function setUnauthorizedHandler(fn: () => void) {
    unauthorizedHandler = fn;
}

function isTokenExpired(token: string): boolean {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return Date.now() >= payload.exp * 1000;
    } catch {
        return true;
    }
}

export async function apiFetch(url: string, init: RequestInit = {}): Promise<Response> {
    const token = localStorage.getItem('wiki_token');

    if (token && isTokenExpired(token)) {
        unauthorizedHandler?.();
        throw new Error('Sessão expirada. Faça login novamente.');
    }

    const response = await fetch(url, init);

    if (response.status === 401) {
        unauthorizedHandler?.();
        throw new Error('Sessão expirada. Faça login novamente.');
    }

    return response;
}

export function getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('wiki_token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
}

// Sem Content-Type — o browser define automaticamente com o boundary correto ao usar FormData
export function getAuthHeadersMultipart(): HeadersInit {
    const token = localStorage.getItem('wiki_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
}
