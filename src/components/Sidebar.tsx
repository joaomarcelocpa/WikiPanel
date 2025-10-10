import { Sun, Moon, ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    activeSubtopic?: string;
    setActiveSubtopic?: (subtopic: string) => void;
    userName: string;
}

interface SubTopic {
    id: string;
    label: string;
}

interface Topic {
    id: string;
    label: string;
    subtopics?: SubTopic[];
}

interface Section {
    id: string;
    label: string;
    topics: Topic[];
}

const Sidebar = ({ darkMode, setDarkMode, activeTab, setActiveTab, activeSubtopic, setActiveSubtopic, userName }: SidebarProps) => {
    const [expandedSections, setExpandedSections] = useState<string[]>(['sms']);
    const [expandedTopics, setExpandedTopics] = useState<string[]>([]);

    const sections: Section[] = [
        {
            id: 'general',
            label: 'Dúvidas Gerais',
            topics: [
                { id: 'duvidas', label: 'Dúvidas Gerais' }
            ]
        },
        {
            id: 'sms',
            label: 'SMS',
            topics: [
                {
                    id: 'campaigns',
                    label: 'Campanhas',
                    subtopics: [
                        { id: 'criar-campanha', label: 'Como criar uma nova campanha?' },
                        { id: 'templates', label: 'Como usar templates?' },
                        { id: 'agendamento', label: 'Agendamento de campanhas' }
                    ]
                },
                {
                    id: 'blacklist',
                    label: 'Blacklist',
                    subtopics: [
                        { id: 'o-que-e', label: 'O que é a Blacklist?' },
                        { id: 'adicao-automatica', label: 'Adição automática' },
                        { id: 'importar', label: 'Importar lista em massa' }
                    ]
                },
                {
                    id: 'financial',
                    label: 'Financeiro',
                    subtopics: [
                        { id: 'comprar', label: 'Como comprar créditos?' },
                        { id: 'pagamento', label: 'Formas de pagamento' },
                        { id: 'sistema-creditos', label: 'Sistema de créditos' }
                    ]
                },
                {
                    id: 'companies',
                    label: 'Empresas',
                    subtopics: [
                        { id: 'criar', label: 'Como criar uma empresa?' },
                        { id: 'empresas-filhas', label: 'Empresas filhas' },
                        { id: 'permissoes', label: 'Gerenciar permissões' }
                    ]
                },
                {
                    id: 'services',
                    label: 'Serviços',
                    subtopics: [
                        { id: 'o-que-sao', label: 'O que são serviços?' },
                        { id: 'escolher-servico', label: 'Escolher o melhor serviço' },
                        { id: 'remetentes', label: 'Configurar remetentes' }
                    ]
                },
                {
                    id: 'reports',
                    label: 'Relatórios',
                    subtopics: [
                        { id: 'disponiveis', label: 'Relatórios disponíveis' },
                        { id: 'gerar', label: 'Gerar relatório de envios' },
                        { id: 'agendar', label: 'Agendar relatórios automáticos' }
                    ]
                },
                {
                    id: 'api',
                    label: 'API Externa',
                    subtopics: [
                        { id: 'credenciais', label: 'Obter credenciais' },
                        { id: 'url-base', label: 'URL base da API' },
                        { id: 'enviar-sms', label: 'Enviar SMS via API' }
                    ]
                },
                { id: 'faq', label: 'FAQ' }
            ]
        },
        {
            id: 'backoffice',
            label: 'Backoffice',
            topics: [
                {
                    id: 'operational',
                    label: 'Operacional',
                    subtopics: [
                        { id: 'gerenciar', label: 'Gerenciar operações diárias' },
                        { id: 'problemas-envio', label: 'Resolver problemas de envio' },
                        { id: 'alertas', label: 'Configurar alertas' }
                    ]
                },
                {
                    id: 'backoffice-financial',
                    label: 'Financeiro',
                    subtopics: [
                        { id: 'faturamento', label: 'Gerenciar faturamento' },
                        { id: 'precos', label: 'Configurar preços' },
                        { id: 'reembolsos', label: 'Processar reembolsos' }
                    ]
                },
                {
                    id: 'backoffice-companies',
                    label: 'Empresas',
                    subtopics: [
                        { id: 'criar-configurar', label: 'Criar e configurar empresas' },
                        { id: 'usuarios', label: 'Gerenciar usuários' },
                        { id: 'migrar-planos', label: 'Migrar entre planos' }
                    ]
                },
                {
                    id: 'suppliers',
                    label: 'Fornecedores',
                    subtopics: [
                        { id: 'cadastrar', label: 'Cadastrar fornecedor' },
                        { id: 'contas', label: 'Gerenciar contas' },
                        { id: 'sids', label: 'Gerenciar SIDs' }
                    ]
                },
                {
                    id: 'messaging',
                    label: 'Mensageria',
                    subtopics: [
                        { id: 'gateways', label: 'Configurar gateways' },
                        { id: 'servicos', label: 'Gerenciar serviços' },
                        { id: 'paineis', label: 'Configurar painéis' },
                        { id: 'numeros-procon', label: 'Gerenciar números Procon' }
                    ]
                },
                {
                    id: 'monitoring',
                    label: 'Monitoramento',
                    subtopics: [
                        { id: 'fake-dlr', label: 'Histórico Fake DLR' },
                        { id: 'servicos', label: 'Histórico de serviços' },
                        { id: 'gateways', label: 'Histórico de gateways' },
                        { id: 'empresas', label: 'Histórico de empresas' },
                        { id: 'usuarios', label: 'Histórico de usuários' },
                        { id: 'sms-pdus', label: 'Histórico SMS PDUs' },
                        { id: 'clicks', label: 'Histórico de clicks' }
                    ]
                },
                {
                    id: 'backoffice-users',
                    label: 'Usuários Backoffice',
                    subtopics: [
                        { id: 'criar', label: 'Criar usuários' },
                        { id: 'permissoes', label: 'Gerenciar permissões' },
                        { id: 'senhas', label: 'Gerar e resetar senhas' }
                    ]
                },
                { id: 'backoffice-faq', label: 'FAQ' }
            ]
        }
    ];

    const toggleSection = (sectionId: string) => {
        if (expandedSections.includes(sectionId)) {
            setExpandedSections(expandedSections.filter(id => id !== sectionId));
        } else {
            setExpandedSections([...expandedSections, sectionId]);
        }
    };

    const toggleTopic = (topicId: string) => {
        if (expandedTopics.includes(topicId)) {
            setExpandedTopics(expandedTopics.filter(id => id !== topicId));
        } else {
            setExpandedTopics([...expandedTopics, topicId]);
        }
    };

    const handleTopicClick = (topicId: string, hasSubtopics: boolean) => {
        if (hasSubtopics) {
            toggleTopic(topicId);
        } else {
            setActiveTab(topicId);
            if (setActiveSubtopic) {
                setActiveSubtopic('');
            }
        }
    };

    const handleSubtopicClick = (topicId: string, subtopicId: string) => {
        setActiveTab(topicId);
        if (setActiveSubtopic) {
            setActiveSubtopic(subtopicId);
        }
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
                    {sections.map((section) => {
                        const isSectionExpanded = expandedSections.includes(section.id);
                        const isGeneralSection = section.id === 'general';

                        return (
                            <div key={section.id}>
                                {/* Section Header */}
                                {!isGeneralSection && (
                                    <button
                                        onClick={() => toggleSection(section.id)}
                                        className={`w-full flex items-center justify-between px-2 py-2 text-left font-bold text-sm ${
                                            darkMode ? 'text-white' : 'text-[#155457]'
                                        }`}
                                    >
                                        <span>{section.label}</span>
                                        <ChevronDown
                                            className={`w-4 h-4 transition-transform ${
                                                isSectionExpanded ? 'rotate-0' : '-rotate-90'
                                            }`}
                                        />
                                    </button>
                                )}

                                {/* Topics */}
                                {(isGeneralSection || isSectionExpanded) && (
                                    <div className={`space-y-1 ${!isGeneralSection ? 'ml-2' : ''}`}>
                                        {section.topics.map((topic) => {
                                            const hasSubtopics = Boolean(topic.subtopics && topic.subtopics.length > 0);
                                            const isTopicExpanded = expandedTopics.includes(topic.id);
                                            const isActive = activeTab === topic.id && !hasSubtopics;

                                            return (
                                                <div key={topic.id}>
                                                    <button
                                                        onClick={() => handleTopicClick(topic.id, hasSubtopics)}
                                                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all ${
                                                            isActive
                                                                ? 'bg-[#3fbec5] text-white font-semibold'
                                                                : darkMode
                                                                    ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                                                    : 'text-gray-700 hover:bg-gray-50'
                                                        }`}
                                                    >
                                                        <span className="text-sm">{topic.label}</span>
                                                        {hasSubtopics && (
                                                            <ChevronRight
                                                                className={`w-4 h-4 transition-transform ${
                                                                    isTopicExpanded ? 'rotate-90' : ''
                                                                }`}
                                                            />
                                                        )}
                                                    </button>

                                                    {/* Subtopics */}
                                                    {hasSubtopics && isTopicExpanded && topic.subtopics && (
                                                        <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-700 pl-2">
                                                            {topic.subtopics.map((subtopic) => {
                                                                const isSubtopicActive =
                                                                    activeTab === topic.id && activeSubtopic === subtopic.id;

                                                                return (
                                                                    <button
                                                                        key={subtopic.id}
                                                                        onClick={() => handleSubtopicClick(topic.id, subtopic.id)}
                                                                        className={`w-full text-left px-3 py-1.5 rounded text-xs transition-all ${
                                                                            isSubtopicActive
                                                                                ? 'bg-[#3fbec5] text-white font-semibold'
                                                                                : darkMode
                                                                                    ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                                                                                    : 'text-gray-600 hover:bg-gray-50'
                                                                        }`}
                                                                    >
                                                                        {subtopic.label}
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