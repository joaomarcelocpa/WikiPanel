import { useState } from 'react';
import { MessageSquare, Shield, Target, BarChart3, Clock, Users, ChevronRight } from 'lucide-react';

interface DuvidasGeraisProps {
    darkMode: boolean;
}

const DuvidasGerais = ({ darkMode }: DuvidasGeraisProps) => {
    const [expandedCard, setExpandedCard] = useState<number | null>(null);

    const duvidas = [
        {
            icon: MessageSquare,
            titulo: "Como enviar SMS em massa?",
            categoria: "Envios",
            cor: "#155457",
            descricao: "Aprenda a criar e enviar campanhas de SMS para múltiplos destinatários de forma rápida e eficiente.",
            conteudo: "Para enviar SMS em massa: Acesse o menu Campanhas, faça upload da lista de contatos, personalize sua mensagem e envie ou agende.",
            passos: ["Acesse Campanhas", "Selecione destinatários", "Configure mensagem", "Envie ou agende"]
        },
        {
            icon: Shield,
            titulo: "Sistema de Blacklist",
            categoria: "Segurança",
            cor: "#268c90",
            descricao: "Entenda como funciona o bloqueio automático de números que solicitaram cancelamento.",
            conteudo: "A blacklist protege automaticamente. Quando um destinatário responde SAIR ou CANCELAR, o número é bloqueado instantaneamente.",
            passos: ["Bloqueio automático", "Gestão manual", "Importação de listas", "Relatórios"]
        },
        {
            icon: Target,
            titulo: "Segmentação inteligente",
            categoria: "Estratégia",
            cor: "#3fbec5",
            descricao: "Saiba como segmentar seus contatos para envios mais direcionados e efetivos.",
            conteudo: "Use filtros avançados por região, comportamento, histórico e perfil demográfico para campanhas assertivas.",
            passos: ["Crie segmentos", "Aplique filtros", "Teste grupos", "Analise resultados"]
        },
        {
            icon: BarChart3,
            titulo: "Análise de métricas",
            categoria: "Relatórios",
            cor: "#6ed3d8",
            descricao: "Acompanhe o desempenho das suas campanhas com dashboards em tempo real.",
            conteudo: "Visualize taxas de entrega, leitura, cliques e conversões. Exporte relatórios personalizados.",
            passos: ["Acesse dashboard", "Filtre período", "Analise KPIs", "Exporte dados"]
        },
        {
            icon: Clock,
            titulo: "Agendamento de campanhas",
            categoria: "Envios",
            cor: "#155457",
            descricao: "Programe seus envios para o melhor horário de engajamento.",
            conteudo: "Agende com até 30 dias de antecedência. Configure envios recorrentes semanais ou mensais.",
            passos: ["Escolha data/hora", "Configure recorrência", "Defina timezone", "Confirme"]
        },
        {
            icon: Users,
            titulo: "Gestão de contatos",
            categoria: "Contatos",
            cor: "#268c90",
            descricao: "Organize e gerencie sua base de contatos de forma eficiente.",
            conteudo: "Importe, exporte e segmente. Remova duplicatas e valide números automaticamente.",
            passos: ["Importe contatos", "Remova duplicatas", "Valide números", "Crie grupos"]
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            {duvidas.map((item, index) => {
                const Icon = item.icon;
                const isExpanded = expandedCard === index;

                return (
                    <div
                        key={index}
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
                                ? `linear-gradient(135deg, ${item.cor} 0%, #3fbec5 100%)`
                                : undefined
                        }}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                                    isExpanded ? 'bg-white/20' : darkMode ? 'bg-gray-800' : 'bg-gray-50'
                                }`}
                            >
                                <Icon
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
                {item.categoria}
              </span>
                        </div>

                        <h3
                            className={`text-xl font-bold mb-3 ${
                                isExpanded ? 'text-white' : darkMode ? 'text-white' : 'text-[#155457]'
                            }`}
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            {item.titulo}
                        </h3>

                        <p
                            className={`text-sm mb-4 leading-relaxed ${
                                isExpanded ? 'text-white/90' : darkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}
                        >
                            {item.descricao}
                        </p>

                        {isExpanded && (
                            <div className="mt-4 pt-4 border-t border-white/20">
                                <p className="text-white/90 text-sm mb-4">{item.conteudo}</p>
                                <div className="space-y-2">
                                    {item.passos.map((passo, i) => (
                                        <div key={i} className="flex items-center text-white/90 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-white/60 mr-2" />
                                            {passo}
                                        </div>
                                    ))}
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

export default DuvidasGerais;