import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FAQProps {
    darkMode: boolean;
}

const FAQ = ({ darkMode }: FAQProps) => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const faqItems = [
        {
            pergunta: "Qual o limite de caracteres por SMS?",
            resposta: "160 caracteres para mensagens simples. Acima disso, a mensagem é dividida em múltiplos SMS (até 765 caracteres em 5 SMS concatenados). Cada SMS adicional consome créditos extras. Caracteres especiais (ç, á, é, etc) podem reduzir o limite para 70 caracteres por SMS."
        },
        {
            pergunta: "Posso personalizar o remetente (Sender ID)?",
            resposta: "Sim! Você pode usar um nome de até 11 caracteres como remetente. O Sender ID requer aprovação prévia (processo leva até 48h úteis) e está sujeito a regulamentações locais de cada operadora. Alguns países não permitem Sender ID alfanumérico, usando apenas números curtos."
        },
        {
            pergunta: "Como funciona a cobrança dos envios?",
            resposta: "Cobrança por créditos pré-pagos ou planos mensais. Cada SMS consumido é descontado do seu saldo. Valores variam por operadora e país de destino. SMS nacionais custam em média R$ 0,08-0,12 por mensagem. Consulte a tabela completa de preços em 'Financial' > 'Preços'."
        },
        {
            pergunta: "Há limite de envios por hora?",
            resposta: "Sim, para proteger sua reputação e evitar bloqueios por operadoras. Limites variam por plano: Básico (5.000/hora), Profissional (15.000/hora), Enterprise (50.000/hora). Se precisar de limites maiores, entre em contato com o time comercial para planos customizados."
        },
        {
            pergunta: "Posso enviar para números internacionais?",
            resposta: "Sim! Suportamos mais de 200 países. Tarifas internacionais variam por destino e são geralmente mais altas que envios nacionais. Consulte nossa tabela de preços internacionais em 'Financial' > 'Preços Internacionais'. Alguns países requerem registro prévio de remetente."
        },
        {
            pergunta: "Como rastrear cliques em links enviados?",
            resposta: "Use nosso encurtador de URLs integrado. Ao inserir um link na mensagem, ele será automaticamente encurtado e rastreado. Estatísticas de cliques aparecem no dashboard da campanha: total de cliques, cliques únicos, taxa de cliques (CTR), horários de maior engajamento e origem geográfica."
        },
        {
            pergunta: "SMS enviados têm garantia de entrega?",
            resposta: "Trabalhamos com taxas médias de entrega acima de 98% para números válidos. Não entregam: números inexistentes, inválidos, fora de área, desligados ou em áreas sem cobertura. Você recebe relatório detalhado com status de cada mensagem. Não há reembolso para números inválidos fornecidos pelo cliente."
        },
        {
            pergunta: "Posso agendar envios para horários específicos?",
            resposta: "Sim! Agende campanhas com até 30 dias de antecedência. Configure envios recorrentes (diário, semanal, mensal). O sistema pode ajustar automaticamente para o timezone de cada destinatário. Útil para respeitar fusos horários em campanhas nacionais ou internacionais."
        },
        {
            pergunta: "Como funciona o opt-out (cancelamento de inscrição)?",
            resposta: "Destinatários podem responder com palavras-chave como SAIR, PARAR ou STOP para não receberem mais mensagens. O número é automaticamente adicionado à blacklist. É obrigatório por lei (LGPD) respeitar solicitações de opt-out. Inclua sempre instruções de cancelamento em suas mensagens."
        },
        {
            pergunta: "Posso integrar o sistema com meu CRM ou ERP?",
            resposta: "Sim! Oferecemos API REST completa para integração com qualquer sistema. Documentação em https://docs.m2c.com.br/api. Também temos integrações nativas com: Salesforce, HubSpot, RD Station, Pipedrive, e Zapier (para conectar com 3000+ aplicativos). Consulte nosso time técnico para integrações customizadas."
        }
    ];

    return (
        <div className="space-y-4" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            {faqItems.map((item, index) => (
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

export default FAQ;