import { useState, useEffect } from 'react';
import { MessageSquare, ChevronRight } from 'lucide-react';
import type { InformationViewResponse } from '../shared/interfaces/information.interface';
import { getInformationByCategory } from '../shared/services/information.service';

interface GeneralQuestionsProps {
    darkMode: boolean;
    categoryIdentifier: string;
}

const GeneralQuestions = ({ darkMode, categoryIdentifier }: GeneralQuestionsProps) => {
    const [expandedCard, setExpandedCard] = useState<number | null>(null);
    const [information, setInformation] = useState<InformationViewResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInformation = async () => {
            if (!categoryIdentifier) {
                setInformation([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const data = await getInformationByCategory(categoryIdentifier);
                setInformation(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro ao carregar informações');
                setInformation([]);
            } finally {
                setLoading(false);
            }
        };

        fetchInformation();
    }, [categoryIdentifier]);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Carregando informações...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-red-500 text-lg">
                    {error}
                </div>
            </div>
        );
    }

    if (information.length === 0) {
        return (
            <div className={`text-center py-20 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Nenhuma informação disponível nesta categoria.</p>
            </div>
        );
    }

    // Cores para as subcategorias
    const categoryColors = [
        '#155457',
        '#268c90',
        '#3fbec5',
        '#6ed3d8',
        '#155457',
        '#268c90',
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            {information.map((item, index) => {
                const isExpanded = expandedCard === index;
                const cor = categoryColors[index % categoryColors.length];

                return (
                    <div
                        key={item.identifier}
                        onClick={() => setExpandedCard(isExpanded ? null : index)}
                        className={`group relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                            isExpanded
                                ? 'shadow-2xl scale-105'
                                : darkMode
                                    ? 'bg-[#1f1f1f] border-gray-800 hover:border-[#3fbec5] hover:shadow-xl'
                                    : 'bg-white border-gray-100 hover:border-[#3fbec5] hover:shadow-xl'
                        }`}
                        style={{
                            background: isExpanded
                                ? `linear-gradient(135deg, ${cor} 0%, #3fbec5 100%)`
                                : undefined
                        }}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                                    isExpanded ? 'bg-white/20' : darkMode ? 'bg-gray-800' : 'bg-gray-50'
                                }`}
                            >
                                <MessageSquare
                                    className={`w-6 h-6 ${isExpanded ? 'text-white' : 'text-[#3fbec5]'}`}
                                />
                            </div>
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    isExpanded
                                        ? 'bg-white/20 text-white'
                                        : darkMode
                                            ? 'bg-gray-800 text-[#6ed3d8]'
                                            : 'bg-gray-50 text-[#155457]'
                                }`}
                            >
                                {item.subCategory.name}
                            </span>
                        </div>

                        <h3
                            className={`text-xl font-bold mb-3 line-clamp-2 ${
                                isExpanded ? 'text-white' : darkMode ? 'text-white' : 'text-[#155457]'
                            }`}
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            {item.question}
                        </h3>

                        <p
                            className={`text-sm mb-4 leading-relaxed ${
                                isExpanded ? 'text-white/90' : darkMode ? 'text-gray-400' : 'text-gray-600'
                            } ${isExpanded ? '' : 'line-clamp-3'}`}
                        >
                            {item.content}
                        </p>

                        {isExpanded && (
                            <div className="mt-4 pt-4 border-t border-white/20">
                                <div className="flex items-center text-white/80 text-xs mb-2">
                                    <span className="font-semibold">Subcategoria:</span>
                                    <span className="ml-2">{item.subCategory.name}</span>
                                </div>
                                <div className="flex items-center text-white/80 text-xs">
                                    <span className="font-semibold">Atualizado em:</span>
                                    <span className="ml-2">
                                        {new Date(item.created_at).toLocaleString('pt-BR', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            })}
                                    </span>
                                </div>
                            </div>
                        )}

                        <div
                            className={`flex items-center text-sm font-semibold mt-4 ${
                                isExpanded ? 'text-white' : 'text-[#3fbec5]'
                            }`}
                        >
                            {isExpanded ? 'Ver menos' : 'Saiba mais'}
                            <ChevronRight
                                className={`w-4 h-4 ml-1 transition-transform ${
                                    isExpanded ? 'rotate-90' : 'group-hover:translate-x-1'
                                }`}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default GeneralQuestions;