import { Sun, Moon, ChevronRight, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { CategoryResponse, SubCategoryResponse, InformationViewResponse } from '../shared/interfaces/information.interface';
import { getAllCategories, getSubCategoriesByCategory, getInformationBySubCategory } from '../shared/services/information.service';

interface SidebarProps {
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
    activeCategory: string;
    setActiveCategory: (category: string) => void;
    activeSubCategory: string;
    setActiveSubCategory: (subCategory: string) => void;
    activeInformation: string;
    setActiveInformation: (information: string) => void;
    userName: string;
}

const Sidebar = ({
                     darkMode,
                     setDarkMode,
                     activeCategory,
                     setActiveCategory,
                     setActiveSubCategory,
                     activeInformation,
                     setActiveInformation,
                     userName
                 }: SidebarProps) => {
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [subCategories, setSubCategories] = useState<{ [key: string]: SubCategoryResponse[] }>({});
    const [informations, setInformations] = useState<{ [key: string]: InformationViewResponse[] }>({});
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
    const [expandedSubCategories, setExpandedSubCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getAllCategories();

                if (!Array.isArray(data)) {
                    setError('Formato de dados inválido');
                    return;
                }

                setCategories(data);

                if (data.length > 0) {
                    const firstCategory = data[0];
                    setExpandedCategories([firstCategory.identifier]);
                    loadSubCategories(firstCategory.identifier);
                }
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Erro desconhecido');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const loadSubCategories = async (categoryIdentifier: string) => {
        if (subCategories[categoryIdentifier]) return;

        try {
            const data = await getSubCategoriesByCategory(categoryIdentifier);

            setSubCategories(prev => ({
                ...prev,
                [categoryIdentifier]: data
            }));
        } catch (error) {
            console.error('❌ Erro ao carregar subcategorias:', error);
        }
    };

    const loadInformations = async (subCategoryIdentifier: string) => {
        if (informations[subCategoryIdentifier]) return;

        try {
            const data = await getInformationBySubCategory(subCategoryIdentifier);

            setInformations(prev => ({
                ...prev,
                [subCategoryIdentifier]: data
            }));
        } catch (error) {
            console.error('❌ Erro ao carregar informações:', error);
        }
    };

    const toggleCategory = async (categoryIdentifier: string) => {
        const isExpanded = expandedCategories.includes(categoryIdentifier);

        if (isExpanded) {
            setExpandedCategories(expandedCategories.filter(id => id !== categoryIdentifier));
        } else {
            setExpandedCategories([...expandedCategories, categoryIdentifier]);
            await loadSubCategories(categoryIdentifier);
        }
    };

    const toggleSubCategory = async (subCategoryIdentifier: string) => {
        const isExpanded = expandedSubCategories.includes(subCategoryIdentifier);

        if (isExpanded) {
            setExpandedSubCategories(expandedSubCategories.filter(id => id !== subCategoryIdentifier));
        } else {
            setExpandedSubCategories([...expandedSubCategories, subCategoryIdentifier]);
            await loadInformations(subCategoryIdentifier);
        }
    };

    const handleInformationClick = (categoryId: string, subCategoryId: string, informationId: string) => {
        setActiveCategory(categoryId);
        setActiveSubCategory(subCategoryId);
        setActiveInformation(informationId);
    };

    return (
        <aside className={`fixed left-0 top-0 h-screen w-64 border-r overflow-y-auto flex flex-col ${
            darkMode ? 'bg-[#1a1a1a] border-gray-800' : 'bg-white border-gray-200'
        }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            <div className="p-4 flex-1">
                {/* Logo and Theme Toggle */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-800">
                    <img
                        src="/wiki-logo.png"
                        alt="WIKI M2C Logo"
                        className="h-8 w-auto"
                    />
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`p-2 rounded-lg transition-colors ${
                            darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600'
                        }`}
                    >
                        {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                    {/* Loading State */}
                    {loading && (
                        <div className={`text-center py-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            <p className="text-xs">Carregando...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <div className="text-center py-4">
                            <p className="text-xs text-red-500">{error}</p>
                        </div>
                    )}

                    {/* Categorias */}
                    {!loading && !error && categories.map((category) => {
                        const isCategoryExpanded = expandedCategories.includes(category.identifier);
                        const categorySubCategories = subCategories[category.identifier] || [];

                        const normalizedName = category.name
                            .toLowerCase()
                            .normalize('NFD')
                            .replace(/[\u0300-\u036f]/g, '')
                            .trim();
                        const isGeneralCategory = normalizedName === 'duvidas gerais' ||
                            category.name.toLowerCase().trim() === 'dúvidas gerais';

                        if (isGeneralCategory) {
                            const isActive = activeCategory === category.identifier;

                            return (
                                <button
                                    key={category.identifier}
                                    onClick={() => {
                                        setActiveCategory(category.identifier);
                                        setActiveSubCategory('');
                                        setActiveInformation('');
                                    }}
                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all ${
                                        isActive
                                            ? 'bg-[#3fbec5] text-white font-semibold'
                                            : darkMode
                                                ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                                : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <span className="text-sm font-bold">{category.name}</span>
                                </button>
                            );
                        }

                        return (
                            <div key={category.identifier}>
                                {/* Category Header */}
                                <button
                                    onClick={() => toggleCategory(category.identifier)}
                                    className={`w-full flex items-center justify-between px-2 py-2 text-left font-bold text-sm ${
                                        darkMode ? 'text-white' : 'text-[#155457]'
                                    }`}
                                >
                                    <span className="text-sm font-bold">{category.name}</span>
                                    <ChevronDown
                                        className={`w-4 h-4 transition-transform ${
                                            isCategoryExpanded ? 'rotate-0' : '-rotate-90'
                                        }`}
                                    />
                                </button>

                                {/* Subcategories */}
                                {isCategoryExpanded && (
                                    <div className="ml-2 space-y-1">
                                        {categorySubCategories.length === 0 && (
                                            <div className={`px-3 py-2 text-xs ${
                                                darkMode ? 'text-gray-500' : 'text-gray-400'
                                            }`}>
                                                Carregando subcategorias...
                                            </div>
                                        )}

                                        {categorySubCategories.map((subCategory) => {
                                            const isSubCategoryExpanded = expandedSubCategories.includes(subCategory.identifier);
                                            const subCategoryInformations = informations[subCategory.identifier] || [];

                                            return (
                                                <div key={subCategory.identifier}>
                                                    {/* SubCategory Header */}
                                                    <button
                                                        onClick={() => toggleSubCategory(subCategory.identifier)}
                                                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all ${
                                                            darkMode
                                                                ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                                                : 'text-gray-700 hover:bg-gray-50'
                                                        }`}
                                                    >
                                                        <span className="text-sm">{subCategory.name}</span>
                                                        <ChevronRight
                                                            className={`w-4 h-4 transition-transform ${
                                                                isSubCategoryExpanded ? 'rotate-90' : ''
                                                            }`}
                                                        />
                                                    </button>

                                                    {/* Informações (Perguntas) */}
                                                    {isSubCategoryExpanded && (
                                                        <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-700 pl-2">
                                                            {subCategoryInformations.length === 0 && (
                                                                <div className={`px-3 py-1.5 text-xs ${
                                                                    darkMode ? 'text-gray-500' : 'text-gray-400'
                                                                }`}>
                                                                    Carregando...
                                                                </div>
                                                            )}

                                                            {subCategoryInformations.map((info) => {
                                                                const isActive = activeInformation === info.identifier;

                                                                return (
                                                                    <button
                                                                        key={info.identifier}
                                                                        onClick={() => handleInformationClick(
                                                                            category.identifier,
                                                                            subCategory.identifier,
                                                                            info.identifier
                                                                        )}
                                                                        className={`w-full text-left px-3 py-1.5 rounded text-xs transition-all ${
                                                                            isActive
                                                                                ? 'bg-[#3fbec5] text-white font-semibold'
                                                                                : darkMode
                                                                                    ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                                                                                    : 'text-gray-600 hover:bg-gray-50'
                                                                        }`}
                                                                    >
                                                                        {info.question}
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {!loading && categories.length === 0 && (
                        <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            <p className="text-xs">Nenhuma categoria disponível</p>
                        </div>
                    )}
                </nav>
            </div>

            {/* User Section at Bottom */}
            <div className={`p-4 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                <div className={`flex items-center px-3 py-2 rounded-lg ${
                    darkMode ? 'bg-gray-800' : 'bg-gray-50'
                }`}>
                    <div className="w-9 h-9 rounded-full bg-[#3fbec5] flex items-center justify-center text-white text-sm font-semibold mr-3 flex-shrink-0">
                        {userName.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold truncate ${
                            darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                            {userName.split(' ')[0]}
                        </p>
                        <p className={`text-xs truncate ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                            {userName}
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;