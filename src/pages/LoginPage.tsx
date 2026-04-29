import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../shared/contexts/AuthContext';

interface LoginPageProps {
    darkMode: boolean;
}

export default function LoginPage({ darkMode }: LoginPageProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/');
        } catch {
            setError('Email ou senha inválidos. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${
            darkMode ? 'bg-[#0f0f0f]' : 'bg-gray-50'
        }`}>
            <div className={`w-full max-w-md rounded-2xl shadow-xl p-8 transition-colors duration-300 ${
                darkMode ? 'bg-[#1a1a1a]' : 'bg-white'
            }`}>
                {/* Logo / Header */}
                <div className="text-center mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-[#155457] flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl font-bold font-heading">W</span>
                    </div>
                    <h1 className={`text-2xl font-bold font-heading ${
                        darkMode ? 'text-white' : 'text-[#155457]'
                    }`}>
                        Wiki Panel
                    </h1>
                    <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Faça login para continuar
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className={`block text-sm font-medium mb-1.5 ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="seu@email.com"
                            className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all focus:ring-2 focus:ring-[#3fbec5] focus:border-transparent ${
                                darkMode
                                    ? 'bg-[#0f0f0f] border-gray-700 text-white placeholder-gray-600'
                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                            }`}
                        />
                    </div>

                    <div>
                        <label className={`block text-sm font-medium mb-1.5 ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                            Senha
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all focus:ring-2 focus:ring-[#3fbec5] focus:border-transparent ${
                                darkMode
                                    ? 'bg-[#0f0f0f] border-gray-700 text-white placeholder-gray-600'
                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                            }`}
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 rounded-lg bg-[#155457] hover:bg-[#268c90] text-white text-sm font-semibold transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </div>
    );
}
