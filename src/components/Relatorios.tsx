import { Send, FileText, Calendar, Filter } from 'lucide-react';

interface CampanhasProps {
    darkMode: boolean;
}

const Campanhas = ({ darkMode }: CampanhasProps) => {
    const secoes = [
        {
            titulo: "Criar Nova Campanha",
            icon: Send,
            cor: "#155457",
            conteudo: "Monte campanhas personalizadas com templates, variáveis dinâmicas e agendamento flexível. Adicione links rastreáveis e códigos de desconto."
        },
        {
            titulo: "Templates de Mensagens",
            icon: FileText,
            cor: "#268c90",
            conteudo: "Salve mensagens frequentes como templates reutilizáveis. Use variáveis como {nome}, {codigo}, {data} para personalização automática."
        },
        {
            titulo: "Agendamento Inteligente",
            icon: Calendar,
            cor: "#3fbec5",
            conteudo: "Programe envios para o horário ideal. Configure campanhas recorrentes e ajuste automaticamente para o timezone do destinatário."
        },
        {
            titulo: "Segmentação Avançada",
            icon: Filter,
            cor: "#6ed3d8",
            conteudo: "Filtre contatos por região, comportamento, perfil ou qualquer campo personalizado. Crie segmentos dinâmicos que se atualizam automaticamente."
        }
    ];

    const campanhasRecentes = [
        { nome: "Black Friday 2024", enviados: "45.234", entrega: "98.2%", status: "Concluída", cor: "#10b981" },
        { nome: "Lançamento Produto X", enviados: "12.567", entrega: "97.8%", status: "Em andamento", cor: "#3b82f6" },
        { nome: "Pesquisa Satisfação", enviados: "8.912", entrega: "99.1%", status: "Agendada", cor: "#f59e0b" }
    ];

    return (
        <div className="space-y-8" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {secoes.map((secao, index) => {
                    const Icon = secao.icon;
                    return (
                        <div
                            key={index}
                            className={`p-8 rounded-2xl border-2 ${
                                darkMode ? 'bg-[#1f1f1f] border-gray-800' : 'bg-white border-gray-100'
                            }`}
                        >
                            <div className="flex items-center mb-4">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center mr-4"
                                    style={{ backgroundColor: `${secao.cor}20` }}
                                >
                                    <Icon className="w-6 h-6" style={{ color: secao.cor }} />
                                </div>
                                <h3
                                    className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#155457]'}`}
                                    style={{ fontFamily: 'Poppins, sans-serif' }}
                                >
                                    {secao.titulo}
                                </h3>
                            </div>
                            <p className={`leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {secao.conteudo}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div
                className={`p-8 rounded-2xl border-2 ${
                    darkMode ? 'bg-[#1f1f1f] border-gray-800' : 'bg-white border-gray-100'
                }`}
            >
                <h3
                    className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-[#155457]'}`}
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                    Campanhas Recentes
                </h3>
                <div className="space-y-4">
                    {campanhasRecentes.map((campanha, index) => (
                        <div
                            key={index}
                            className={`flex items-center justify-between p-5 rounded-xl ${
                                darkMode ? 'bg-gray-800' : 'bg-gray-50'
                            }`}
                        >
                            <div>
                                <h4 className={`font-bold text-lg mb-1 ${darkMode ? 'text-white' : 'text-[#155457]'}`}>
                                    {campanha.nome}
                                </h4>
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {campanha.enviados} enviados · {campanha.entrega} entrega
                                </p>
                            </div>
                            <span
                                className="px-4 py-2 rounded-full text-sm font-semibold text-white"
                                style={{ backgroundColor: campanha.cor }}
                            >
                {campanha.status}
              </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Campanhas;