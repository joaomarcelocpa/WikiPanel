import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FinancialProps {
    darkMode: boolean;
}

const Financial = ({ darkMode }: FinancialProps) => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const duvidas = [
        {
            pergunta: "Como comprar créditos para envio de SMS?",
            resposta: "Para comprar créditos: 1) Acesse 'Financial' > 'Comprar Créditos'. 2) Escolha um pacote ou insira valor customizado. 3) Selecione forma de pagamento (cartão, boleto, PIX). 4) Confirme a compra. Créditos via PIX e cartão são liberados instantaneamente. Boleto leva até 2 dias úteis para compensação. Você receberá nota fiscal por email."
        },
        {
            pergunta: "Quais são as formas de pagamento aceitas?",
            resposta: "Aceitamos: Cartão de crédito (Visa, Master, Elo, Amex) em até 12x, Boleto bancário à vista, PIX (aprovação instantânea), e Transferência bancária (para valores acima de R$ 10.000). Para empresas Enterprise, oferecemos faturamento mensal com pagamento em até 30 dias."
        },
        {
            pergunta: "Como funciona o sistema de créditos?",
            resposta: "Cada SMS enviado consome créditos do seu saldo. O custo varia por operadora e tamanho da mensagem: mensagens até 160 caracteres = 1 crédito, 161-306 caracteres = 2 créditos, 307-459 caracteres = 3 créditos, etc. SMS internacionais têm custo diferenciado. Você pode consultar preços detalhados em 'Financial' > 'Tabela de Preços'."
        },
        {
            pergunta: "Os créditos têm prazo de validade?",
            resposta: "Créditos pré-pagos não expiram! Permanecem na sua conta indefinidamente. Apenas créditos bônus promocionais podem ter prazo de validade específico, que será informado no momento da promoção. Você pode consultar validade de bônus em 'Financial' > 'Meus Créditos'."
        },
        {
            pergunta: "Como visualizar meu histórico de transações?",
            resposta: "Acesse 'Financial' > 'Transações'. Lá você verá todas as compras, consumos e ajustes de crédito com: data, tipo (compra/consumo), quantidade, valor, forma de pagamento e saldo resultante. Filtre por período, tipo de transação e exporte relatórios em PDF ou Excel."
        },
        {
            pergunta: "Como emitir segunda via de nota fiscal?",
            resposta: "Vá em 'Financial' > 'Notas Fiscais', localize a transação desejada e clique em 'Baixar NF'. Notas fiscais são emitidas automaticamente para todas as compras. Se houver erro nos dados cadastrais, atualize em 'Configurações' > 'Dados da Empresa' e solicite reemissão via suporte."
        },
        {
            pergunta: "Como ativar recarga automática de créditos?",
            resposta: "Configure em 'Financial' > 'Recarga Automática'. Defina: saldo mínimo para acionamento (ex: 100 créditos), quantidade a recarregar (ex: 1000 créditos) e forma de pagamento (cartão ou PIX). Quando seu saldo atingir o mínimo, a recarga é processada automaticamente. Você pode pausar/cancelar a qualquer momento."
        },
        {
            pergunta: "Posso solicitar reembolso de créditos?",
            resposta: "Créditos não utilizados não são reembolsáveis conforme termos de uso. Exceções apenas em casos de: erro técnico comprovado do sistema, cobrança duplicada, ou cancelamento de conta solicitado em até 7 dias da primeira compra sem uso dos créditos. Abra chamado no suporte com detalhamento do caso."
        },
        {
            pergunta: "Como funciona o desconto por volume?",
            resposta: "Quanto mais créditos comprar, menor o custo unitário: até 5.000 créditos = R$ 0,10/crédito, 5.001-20.000 = R$ 0,09, 20.001-50.000 = R$ 0,08, 50.001-100.000 = R$ 0,07, acima de 100.000 = R$ 0,06. Valores exemplificativos. Consulte tabela atual em 'Financial' > 'Planos e Preços'."
        },
        {
            pergunta: "Como alterar dados de faturamento?",
            resposta: "Acesse 'Configurações' > 'Dados da Empresa'. Atualize: Razão Social, CNPJ/CPF, endereço completo, email para NFe, telefone. Alterações serão aplicadas às próximas compras. Para alterar NFes já emitidas, entre em contato com o suporte fiscal em até 30 dias da emissão."
        },
        {
            pergunta: "Posso parcelar a compra de créditos?",
            resposta: "Sim! Pagamentos via cartão de crédito podem ser parcelados em até 12x sem juros (valores acima de R$ 300). Parcelamento sujeito à aprovação da operadora do cartão. O valor total dos créditos é liberado imediatamente, independente do parcelamento. Boleto e PIX são apenas à vista."
        },
        {
            pergunta: "Como receber alertas de saldo baixo?",
            resposta: "Configure em 'Financial' > 'Alertas'. Defina saldo mínimo para notificação (ex: 500 créditos) e canais de alerta (email, SMS, WhatsApp). Você e outros usuários autorizados receberão notificações quando o saldo atingir o limite. Útil para evitar interrupção de campanhas importantes."
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

export default Financial;