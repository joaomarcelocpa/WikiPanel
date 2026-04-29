import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { loginApi } from '../services/auth.service';
import type { UserInfo } from '../interfaces/user.interface';

interface AuthContextType {
    user: UserInfo | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('wiki_token'));
    const [user, setUser] = useState<UserInfo | null>(() => {
        const stored = localStorage.getItem('wiki_user');
        return stored ? JSON.parse(stored) : null;
    });

    const login = useCallback(async (email: string, password: string) => {
        const data = await loginApi(email, password);
        localStorage.setItem('wiki_token', data.access_token);
        localStorage.setItem('wiki_user', JSON.stringify(data.user));
        setToken(data.access_token);
        setUser(data.user);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('wiki_token');
        localStorage.removeItem('wiki_user');
        setToken(null);
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
