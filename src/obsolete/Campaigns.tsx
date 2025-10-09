import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface CampanhasProps {
    darkMode: boolean;
}

const Campaigns = ({ darkMode }: CampanhasProps) => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const duvidas = [
        {
            pergunta: "Como criar uma nova campanha de SMS?",
            resposta: "Para criar uma campanha: 1) Acesse o menu 'Campanhas' e clique em 'Nova Campanha'. 2) Defina um nome para sua campanha. 3) Selecione os destinatários (contatos individuais, grupos ou importação de lista). 4) Configure sua mensagem usando variáveis dinâmicas como {nome}, {codigo}, etc. 5) Escolha entre envio imediato ou agendado. 6) Revise e confirme o envio."
        },
        {
            pergunta: "Como usar templates de mensagens?",
            resposta: "Templates permitem reutilizar mensagens frequentes. Para criar: vá em 'Campanhas' > 'Templates' > 'Novo Template'. Dê um nome, escreva sua mensagem e salve. Use variáveis como {nome}, {codigo}, {data} para personalização. Para usar um template, selecione-o ao criar uma campanha e as variáveis serão substituídas automaticamente pelos dados dos contatos."
        },
        {
            pergunta: "Como funciona o agendamento de campanhas?",
            resposta: "Você pode agendar campanhas para envio futuro com até 30 dias de antecedência. Ao criar a campanha, selecione 'Agendar envio' e escolha data e horário. É possível configurar campanhas recorrentes (diárias, semanais, mensais). O sistema ajusta automaticamente para o timezone de cada destinatário se configurado."
        },
        {
            pergunta: "O que são variáveis dinâmicas e como usá-las?",
            resposta: "Variáveis dinâmicas personalizam mensagens automaticamente. Use {nome} para o nome do contato, {codigo} para códigos promocionais, {data} para datas, {empresa} para nome da empresa, etc. Exemplo: 'Olá {nome}, seu código é {codigo}'. Ao enviar, cada destinatário recebe a mensagem com seus dados específicos."
        },
        {
            pergunta: "Como segmentar contatos para uma campanha?",
            resposta: "Use filtros avançados para segmentar: região, estado, cidade, comportamento de compra, histórico de interação, tags personalizadas, ou qualquer campo customizado. Você pode criar segmentos dinâmicos que se atualizam automaticamente conforme novos contatos atendem aos critérios definidos."
        },
        {
            pergunta: "Posso testar uma campanha antes do envio em massa?",
            resposta: "Sim! Recomendamos sempre fazer um teste. Use a opção 'Enviar Teste' antes de confirmar a campanha. Você pode enviar para até 5 números de teste para verificar formatação, variáveis e conteúdo. Isso evita erros em envios grandes."
        },
        {
            pergunta: "Como adicionar links rastreáveis nas mensagens?",
            resposta: "Use nosso encurtador integrado de URLs. Ao inserir um link na mensagem, ele será automaticamente encurtado e rastreado. Você verá no dashboard quantos cliques o link recebeu, quando e de quais destinatários. Útil para medir engajamento e conversões."
        },
        {
            pergunta: "Qual o limite de envios por campanha?",
            resposta: "O limite varia por plano: Plano Básico até 10.000 SMS por campanha, Plano Profissional até 50.000 SMS, Plano Enterprise sem limite. Campanhas maiores são processadas em lotes para garantir alta taxa de entrega. Entre em contato para aumentar seus limites."
        },
        {
            pergunta: "Como cancelar uma campanha agendada?",
            resposta: "Acesse 'Campanhas' > 'Agendadas', encontre a campanha desejada e clique em 'Cancelar'. Campanhas podem ser canceladas até 5 minutos antes do horário de envio programado. Após esse período, o processo de envio já terá iniciado."
        },
        {
            pergunta: "Posso duplicar uma campanha existente?",
            resposta: "Sim! No histórico de campanhas, clique no ícone de três pontos ao lado da campanha desejada e selecione 'Duplicar'. Isso cria uma cópia com as mesmas configurações, mensagem e segmentação. Útil para campanhas recorrentes com pequenas alterações."
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

export default Campaigns;