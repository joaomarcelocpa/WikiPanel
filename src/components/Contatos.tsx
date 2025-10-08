import { Phone, Mail, MessageSquare, MapPin, Clock } from 'lucide-react';

interface ContatosProps {
    darkMode: boolean;
}

const Contatos = ({ darkMode }: ContatosProps) => {
    const canais = [
        { icon: Phone, label: "Telefone", valor: "+55 (11) 3456-7890", descricao: "Seg-Sex, 8h às 18h", cor: "#155457" },
        { icon: Mail, label: "Email", valor: "suporte@m2c.com.br", descricao: "Resposta em até 2h", cor: "#268c90" },
        { icon: MessageSquare, label: "Chat Online", valor: "Chat ao vivo", descricao: "Disponível agora", cor: "#3fbec5" },
        { icon: MapPin, label: "Endereço", valor: "Av. Paulista, 1000 - São Paulo/SP", descricao: "CEP 01310-100", cor: "#6ed3d8" }
    ];

    const horarios = [
        "Segunda a Sexta: 8h às 18h",
        "Sábados: 9h às 13h",
        "Domingos e Feriados: Fechado",
        "Suporte emergencial 24/7 para clientes Enterprise"
    ];

    return (
        <div className="space-y-8" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {canais.map((canal, index) => {
                    const Icon = canal.icon;
                    return (
                        <div
                            key={index}
                            className={`p-8 rounded-2xl border-2 ${
                                darkMode ? 'bg-[#1f1f1f] border-gray-800' : 'bg-white border-gray-100'
                            }`}
                        >
                            <div className="flex items-start">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center mr-4 flex-shrink-0"
                                    style={{ backgroundColor: `${canal.cor}20` }}
                                >
                                    <Icon className="w-6 h-6" style={{ color: canal.cor }} />
                                </div>
                                <div>
                                    <h3
                                        className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-[#155457]'}`}
                                        style={{ fontFamily: 'Poppins, sans-serif' }}
                                    >
                                        {canal.label}
                                    </h3>
                                    <p className="text-xl font-bold mb-2" style={{ color: canal.cor }}>
                                        {canal.valor}
                                    </p>
                                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {canal.descricao}
                                    </p>
                                </div>
                            </div>
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
                    Horário de Atendimento
                </h3>
                <div className="space-y-3">
                    {horarios.map((item, index) => (
                        <div key={index} className="flex items-center">
                            <Clock className="w-5 h-5 text-[#3fbec5] mr-3" />
                            <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {item}
              </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Contatos;