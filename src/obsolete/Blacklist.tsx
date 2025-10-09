import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface BlacklistProps {
    darkMode: boolean;
}

const Blacklist = ({ darkMode }: BlacklistProps) => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const duvidas = [
        {
            pergunta: "O que é a Blacklist e para que serve?",
            resposta: "A blacklist é uma lista de números de telefone que optaram por não receber mais mensagens SMS da sua empresa. É essencial para respeitar a privacidade dos usuários, cumprir regulamentações de proteção de dados (LGPD) e manter uma boa reputação de envio. Números na blacklist são automaticamente excluídos de todas as campanhas."
        },
        {
            pergunta: "Como um número é adicionado à blacklist automaticamente?",
            resposta: "Quando um destinatário responde com palavras-chave específicas como 'SAIR', 'PARAR', 'CANCELAR', 'STOP', 'REMOVER' ou 'DESCADASTRAR', o sistema adiciona automaticamente o número à blacklist em tempo real. O processo é instantâneo e o número não receberá mais mensagens."
        },
        {
            pergunta: "Posso adicionar números manualmente à blacklist?",
            resposta: "Sim! Acesse 'Blacklist' > 'Adicionar Número' e insira o telefone desejado. Isso é útil para atender solicitações recebidas por outros canais (telefone, email, chat) ou corrigir adições acidentais. Você pode adicionar números individuais ou em lote."
        },
        {
            pergunta: "Como remover um número da blacklist?",
            resposta: "Para remover: vá em 'Blacklist', localize o número na lista, clique no ícone de três pontos e selecione 'Remover da Blacklist'. Importante: só remova números se o contato solicitar explicitamente voltar a receber mensagens. Remoções sem consentimento podem violar a LGPD."
        },
        {
            pergunta: "Como importar uma lista de números bloqueados em massa?",
            resposta: "Acesse 'Blacklist' > 'Importar' e faça upload de um arquivo CSV ou Excel com os números. O formato deve ter uma coluna com os telefones (com ou sem DDD/DDI). O sistema valida e adiciona todos os números à blacklist. Ideal para migração de outros sistemas."
        },
        {
            pergunta: "Posso exportar a lista de números bloqueados?",
            resposta: "Sim! Clique em 'Exportar Blacklist' para baixar um arquivo CSV com todos os números bloqueados, incluindo data de bloqueio e motivo. Útil para backups, auditorias ou integração com outros sistemas."
        },
        {
            pergunta: "O que acontece se eu tentar enviar para um número na blacklist?",
            resposta: "O sistema bloqueia automaticamente o envio. O número será removido da lista de destinatários antes do envio da campanha. Você verá um aviso no resumo da campanha informando quantos números foram filtrados pela blacklist."
        },
        {
            pergunta: "A blacklist é compartilhada entre diferentes empresas na minha conta?",
            resposta: "Depende da configuração. Por padrão, cada empresa tem sua própria blacklist independente. No entanto, você pode configurar uma blacklist global compartilhada entre todas as empresas da conta em 'Configurações' > 'Blacklist Global'."
        },
        {
            pergunta: "Como visualizar o histórico de bloqueios?",
            resposta: "Acesse 'Blacklist' > 'Histórico' para ver todos os bloqueios com data, hora, origem (automática ou manual) e usuário responsável (em casos manuais). Você pode filtrar por período, origem do bloqueio e exportar relatórios."
        },
        {
            pergunta: "Qual a taxa de opt-out considerada normal?",
            resposta: "Uma taxa de opt-out (saídas da lista) entre 0.5% e 2% é considerada normal e saudável. Taxas acima de 3% podem indicar problemas como frequência excessiva de envios, conteúdo irrelevante ou falta de segmentação. Monitore suas métricas regularmente."
        }
    ];

    return (
        <div className="space-y-4" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            {duvidas.map((item, index) => (
                <div
                    key={index}
                    className={`rounded-2xl border-2 overflow-hidden transition-all ${
                        darkMode ? 'bg-[#1f1f1f] border-gray-800 hover:border-[#3fbec5]' : 'bg-white border-gray-100 hover:border-[#3fbec5]'
                    }`}
                >
                    <button
                        onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                        className="w-full p-6 flex items-center justify-between text-left"
                    >
                        <h3
                            className={`text-lg font-bold flex items-center flex-1 ${darkMode ? 'text-white' : 'text-[#155457]'}`}
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            <HelpCircle className="w-5 h-5 text-[#3fbec5] mr-3 flex-shrink-0" />
                            {item.pergunta}
                        </h3>
                        <ChevronDown
                            className={`w-5 h-5 text-[#3fbec5] transition-transform flex-shrink-0 ml-4 ${
                                expandedIndex === index ? 'rotate-180' : ''
                            }`}
                        />
                    </button>

                    {expandedIndex === index && (
                        <div className={`px-6 pb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            <div className="ml-8 leading-relaxed">
                                {item.resposta}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Blacklist;