import { mockDuvidas } from '../mocks/mockData';
import type { Duvida } from '../mocks/mockData';

interface TopicContentProps {
    darkMode: boolean;
    type: string;
    activeSubtopic: string;
}

const TopicContent = ({ darkMode, type, activeSubtopic }: TopicContentProps) => {
    const subtopicMap: { [key: string]: { [key: string]: number } } = {
        // SMS
        campaigns: {
            'criar-campanha': 1,
            'templates': 2,
            'agendamento': 3
        },
        blacklist: {
            'o-que-e': 4,
            'adicao-automatica': 5,
            'importar': 6
        },
        financial: {
            'comprar': 7,
            'pagamento': 8,
            'sistema-creditos': 9
        },
        companies: {
            'criar': 10,
            'empresas-filhas': 11,
            'permissoes': 12
        },
        services: {
            'o-que-sao': 13,
            'escolher-servico': 14,
            'remetentes': 15
        },
        reports: {
            'disponiveis': 16,
            'gerar': 17,
            'agendar': 18
        },
        api: {
            'credenciais': 19,
            'url-base': 20,
            'enviar-sms': 21
        },
        faq: {},
        // BACKOFFICE
        operational: {
            'gerenciar': 100,
            'problemas-envio': 101,
            'alertas': 102
        },
        'backoffice-financial': {
            'faturamento': 103,
            'precos': 104,
            'reembolsos': 105
        },
        'backoffice-companies': {
            'criar-configurar': 106,
            'usuarios': 107,
            'migrar-planos': 108
        },
        suppliers: {
            'cadastrar': 109,
            'contas': 110,
            'sids': 111
        },
        messaging: {
            'gateways': 112,
            'servicos': 113,
            'paineis': 114,
            'numeros-procon': 115
        },
        monitoring: {
            'fake-dlr': 116,
            'servicos': 117,
            'gateways': 118,
            'empresas': 119,
            'usuarios': 120,
            'sms-pdus': 121,
            'clicks': 122
        },
        'backoffice-users': {
            'criar': 123,
            'permissoes': 124,
            'senhas': 125
        },
        'backoffice-faq': {}
    };

    const topicTitles: { [key: string]: string } = {
        // SMS
        campaigns: 'Campanhas',
        blacklist: 'Blacklist',
        financial: 'Financeiro',
        companies: 'Empresas',
        services: 'Serviços',
        reports: 'Relatórios',
        api: 'API Externa',
        faq: 'FAQ',
        // BACKOFFICE
        operational: 'Operacional',
        'backoffice-financial': 'Financeiro (Backoffice)',
        'backoffice-companies': 'Empresas (Backoffice)',
        suppliers: 'Fornecedores',
        messaging: 'Mensageria',
        monitoring: 'Monitoramento',
        'backoffice-users': 'Usuários Backoffice',
        'backoffice-faq': 'FAQ (Backoffice)'
    };

    // Se for FAQ, mostra todas as perguntas do tipo
    if (type === 'faq' || type === 'backoffice-faq') {
        const duvidas = mockDuvidas.filter((d: Duvida) => d.type === type);

        if (duvidas.length === 0) {
            return (
                <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <p>Nenhuma informação disponível para esta seção no momento.</p>
                </div>
            );
        }

        return (
            <div style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div className={`mb-8 pb-4 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                    <h1
                        className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-[#155457]'}`}
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                        {topicTitles[type]}
                    </h1>
                </div>

                <div className="space-y-4">
                    {duvidas.map((item) => (
                        <div
                            key={item.id}
                            className={`rounded-2xl border-2 overflow-hidden ${
                                darkMode ? 'bg-[#1f1f1f] border-gray-800' : 'bg-white border-gray-100'
                            }`}
                        >
                            <div className="p-6">
                                <h3
                                    className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-[#155457]'}`}
                                    style={{ fontFamily: 'Poppins, sans-serif' }}
                                >
                                    {item.pergunta}
                                </h3>
                                <div className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {item.resposta}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Se não houver subtópico selecionado, mostra mensagem
    if (!activeSubtopic) {
        return (
            <div className={`text-center py-20 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#155457]'}`}>
                    {topicTitles[type]}
                </h2>
                <p>Selecione um tópico no menu lateral para visualizar o conteúdo.</p>
            </div>
        );
    }

    // Busca o ID da dúvida baseado no subtópico ativo
    const duvidaId = subtopicMap[type]?.[activeSubtopic];

    if (!duvidaId) {
        return (
            <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <p>Conteúdo não encontrado.</p>
            </div>
        );
    }

    // Busca apenas a dúvida específica
    const duvida = mockDuvidas.find((d: Duvida) => d.id === duvidaId);

    if (!duvida) {
        return (
            <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <p>Conteúdo não encontrado.</p>
            </div>
        );
    }

    return (
        <div style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            {/* Page Title */}
            <div className={`mb-8 pb-4 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                <h1
                    className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-[#155457]'}`}
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                    {duvida.pergunta}
                </h1>
            </div>

            {/* Content Card */}
            <div className={`rounded-2xl border-2 p-8 ${
                darkMode ? 'bg-[#1f1f1f] border-gray-800' : 'bg-white border-gray-100'
            }`}>
                <div
                    className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                    {duvida.resposta}
                </div>
            </div>

            {/* Aqui você pode adicionar mais conteúdo depois */}
            <div className="mt-8">
                <div className={`rounded-2xl border-2 p-8 ${
                    darkMode ? 'bg-[#1f1f1f] border-gray-800' : 'bg-white border-gray-100'
                }`}>
                    <h3
                        className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#155457]'}`}
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                        Conteúdo Adicional
                    </h3>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Você pode adicionar mais seções, imagens, vídeos, exemplos de código, etc. aqui...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TopicContent;