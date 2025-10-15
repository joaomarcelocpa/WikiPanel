import { useState, useEffect } from 'react';
import type { InformationViewResponse } from '../shared/interfaces/information.interface';
import { getInformationById } from '../shared/services/information.service';

interface TopicContentProps {
    darkMode: boolean;
    informationIdentifier: string;
}

const TopicContent = ({ darkMode, informationIdentifier }: TopicContentProps) => {
    const [information, setInformation] = useState<InformationViewResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInformation = async () => {
            if (!informationIdentifier) {
                setInformation(null);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const data = await getInformationById(informationIdentifier);
                setInformation(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro ao carregar informação');
                setInformation(null);
            } finally {
                setLoading(false);
            }
        };

        fetchInformation();
    }, [informationIdentifier]);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Carregando informação...
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

    if (!informationIdentifier) {
        return (
            <div className={`text-center py-20 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#155457]'}`}>
                    Bem-vindo à Central de Ajuda
                </h2>
                <p>Selecione um tópico no menu lateral para visualizar o conteúdo.</p>
            </div>
        );
    }

    if (!information) {
        return (
            <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <p>Informação não encontrada.</p>
            </div>
        );
    }

    return (
        <div style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            {/* Breadcrumb */}
            <div className={`mb-4 flex items-center gap-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <span>{information.category.name}</span>
                <span>›</span>
                <span>{information.subCategory.name}</span>
            </div>

            {/* Page Title */}
            <div className={`mb-8 pb-4 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                <h1
                    className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-[#155457]'}`}
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                    {information.question}
                </h1>
            </div>

            {/* Content Card */}
            <div className={`rounded-2xl border-2 p-8 ${
                darkMode ? 'bg-[#1f1f1f] border-gray-800' : 'bg-white border-gray-100'
            }`}>
                <div
                    className={`content-display text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    dangerouslySetInnerHTML={{ __html: information.content }}
                />

                {/* File Attachment */}
                {information.file && (
                    <div className={`mt-6 pt-6 border-t ${
                        darkMode ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                        <h3 className={`text-sm font-semibold mb-3 ${
                            darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                            Arquivo Anexo
                        </h3>
                        <a
                            href={information.file.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                                darkMode
                                    ? 'bg-gray-800 hover:bg-gray-700 text-[#6ed3d8]'
                                    : 'bg-gray-50 hover:bg-gray-100 text-[#155457]'
                            }`}
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            <span className="font-medium">{information.file.originalName}</span>
                            <span className={`text-xs ${
                                darkMode ? 'text-gray-500' : 'text-gray-400'
                            }`}>
                                ({(information.file.size / 1024).toFixed(2)} KB)
                            </span>
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopicContent;