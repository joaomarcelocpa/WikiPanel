import { HelpCircle } from 'lucide-react';

interface FAQProps {
    darkMode: boolean;
}

const FAQ = ({ darkMode }: FAQProps) => {
    const faqItems = [
        {
            pergunta: "Qual o limite de caracteres por SMS?",
            resposta: "160 caracteres para mensagens simples. Acima disso, a mensagem é dividida em múltiplos SMS (até 765 caracteres em 5 SMS concatenados)."
        },
        {
            pergunta: "Posso personalizar o remetente?",
            resposta: "Sim! Você pode usar um nome de até 11 caracteres como remetente. Requer aprovação prévia e está sujeito a regulamentações locais."
        },
        {
            pergunta: "Como funciona a cobrança?",
            resposta: "Cobrança por créditos pré-pagos ou planos mensais. Cada SMS consumido é descontado do seu saldo. Valores variam por operadora e país."
        },
        {
            pergunta: "Há limite de envios por hora?",
            resposta: "Sim, para proteger sua reputação. Limites variam por plano: Básico (5.000/h), Profissional (15.000/h), Enterprise (50.000/h)."
        },
        {
            pergunta: "Posso enviar para números internacionais?",
            resposta: "Sim! Suportamos mais de 200 países. Tarifas internacionais variam por destino. Consulte nossa tabela de preços."
        },
        {
            pergunta: "Como rastrear cliques em links?",
            resposta: "Use nosso encurtador de URLs integrado. Cada link é rastreado automaticamente e as estatísticas aparecem no dashboard."
        }
    ];

    return (
        <div className="space-y-4" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            {faqItems.map((item, index) => (
                <div
                    key={index}
                    className={`p-6 rounded-2xl border-2 transition-all ${
                        darkMode ? 'bg-[#1f1f1f] border-gray-800 hover:border-[#3fbec5]' : 'bg-white border-gray-100 hover:border-[#3fbec5]'
                    }`}
                >
                    <h3
                        className={`text-lg font-bold mb-3 flex items-start ${darkMode ? 'text-white' : 'text-[#155457]'}`}
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                        <HelpCircle className="w-5 h-5 text-[#3fbec5] mr-3 mt-1 flex-shrink-0" />
                        {item.pergunta}
                    </h3>
                    <p className={`leading-relaxed ml-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {item.resposta}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default FAQ;