import { Shield, Clock, TrendingUp, Info, XCircle, FileText } from 'lucide-react';

interface BlacklistProps {
    darkMode: boolean;
}

const Blacklist = ({ darkMode }: BlacklistProps) => {
    const estatisticas = [
        { label: "Números Bloqueados", valor: "1.247", icon: Shield, cor: "#155457" },
        { label: "Bloqueios Hoje", valor: "23", icon: Clock, cor: "#268c90" },
        { label: "Taxa de Opt-out", valor: "0.8%", icon: TrendingUp, cor: "#3fbec5" }
    ];

    const secoes = [
        {
            titulo: "O que é Blacklist?",
            icon: Info,
            cor: "#155457",
            conteudo: "A blacklist é uma lista de números de telefone que optaram por não receber mais mensagens SMS da sua empresa. É essencial manter essa lista atualizada para respeitar a privacidade dos usuários e manter sua reputação de envio."
        },
        {
            titulo: "Bloqueio Automático",
            icon: Shield,
            cor: "#268c90",
            conteudo: "Quando um destinatário responde com palavras-chave como 'SAIR', 'PARAR', 'CANCELAR' ou 'STOP', o número é automaticamente adicionado à blacklist. Este processo acontece em tempo real."
        },
        {
            titulo: "Gestão Manual",
            icon: XCircle,
            cor: "#3fbec5",
            conteudo: "Você pode adicionar ou remover números da blacklist manualmente através do painel. Útil para atender solicitações por outros canais ou corrigir bloqueios acidentais."
        },
        {
            titulo: "Importação em Massa",
            icon: FileText,
            cor: "#6ed3d8",
            conteudo: "Importe listas de números bloqueados via arquivo CSV ou Excel. Ideal para migração de sistemas ou atualização em lote da blacklist."
        }
    ];

    return (
        <div className="space-y-8" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {estatisticas.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={index}
                            className={`p-6 rounded-2xl border-2 ${
                                darkMode ? 'bg-[#1f1f1f] border-gray-800' : 'bg-white border-gray-100'
                            }`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                                    style={{ backgroundColor: `${stat.cor}20` }}
                                >
                                    <Icon className="w-6 h-6" style={{ color: stat.cor }} />
                                </div>
                                <span
                                    className="text-3xl font-bold"
                                    style={{ color: stat.cor, fontFamily: 'Poppins, sans-serif' }}
                                >
                  {stat.valor}
                </span>
                            </div>
                            <p className={`text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {stat.label}
                            </p>
                        </div>
                    );
                })}
            </div>

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
        </div>
    );
};

export default Blacklist;