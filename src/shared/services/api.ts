export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('wiki_token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
}
