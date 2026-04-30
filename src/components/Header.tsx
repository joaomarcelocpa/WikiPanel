import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import type { InformationViewResponse } from '../shared/interfaces/information.interface';
import { searchInformation } from '../shared/services/information.service';

interface HeaderProps {
    userName: string;
    darkMode: boolean;
}

const Header = ({ userName, darkMode }: HeaderProps) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<InformationViewResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        if (!query.trim()) {
            setResults([]);
            setOpen(false);
            return;
        }

        debounceRef.current = setTimeout(async () => {
            setLoading(true);
            try {
                const data = await searchInformation(query);
                setResults(data);
                setOpen(true);
            } catch {
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 350);

        return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (item: InformationViewResponse) => {
        setQuery('');
        setResults([]);
        setOpen(false);
        navigate(`/${item.slug}`);
    };

    const handleClear = () => {
        setQuery('');
        setResults([]);
        setOpen(false);
    };

    return (
        <div className="mb-12" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            <h1
                className={`text-5xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-[#155457]'}`}
                style={{ fontFamily: 'Poppins, sans-serif' }}
            >
                Bem-vindo, <span className="text-[#3fbec5]">{userName}</span>
            </h1>
            <p className={`text-lg mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Sua central de conhecimento sobre o sistema de envio de SMS da M2C
            </p>

            {/* Search bar */}
            <div ref={containerRef} className="relative max-w-xl">
                <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-colors ${
                    open
                        ? 'border-[#3fbec5]'
                        : darkMode ? 'border-gray-700 bg-[#1a1a1a]' : 'border-gray-200 bg-white'
                } ${darkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
                    <Search className={`w-4 h-4 shrink-0 ${loading ? 'text-[#3fbec5] animate-pulse' : darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Buscar por pergunta ou conteúdo..."
                        className={`flex-1 text-sm bg-transparent outline-none ${darkMode ? 'text-white placeholder-gray-600' : 'text-gray-900 placeholder-gray-400'}`}
                    />
                    {query && (
                        <button onClick={handleClear} className={`shrink-0 ${darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}>
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Dropdown */}
                {open && (
                    <div className={`absolute top-full mt-2 w-full rounded-xl border shadow-xl z-50 overflow-hidden ${
                        darkMode ? 'bg-[#1a1a1a] border-gray-800' : 'bg-white border-gray-200'
                    }`}>
                        {results.length === 0 ? (
                            <div className={`px-4 py-3 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                Nenhum resultado para "{query}"
                            </div>
                        ) : (
                            <ul className="max-h-80 overflow-y-auto">
                                {results.map(item => (
                                    <li key={item.identifier}>
                                        <button
                                            onClick={() => handleSelect(item)}
                                            className={`w-full text-left px-4 py-3 transition-colors border-b last:border-b-0 ${
                                                darkMode
                                                    ? 'border-gray-800 hover:bg-gray-800'
                                                    : 'border-gray-100 hover:bg-gray-50'
                                            }`}
                                        >
                                            <p className={`text-sm font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                {item.question}
                                            </p>
                                            <p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                                {item.category.name} › {item.subCategory.name}
                                            </p>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
