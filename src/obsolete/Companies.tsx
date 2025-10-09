import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface EmpresasProps {
    darkMode: boolean;
}

const Companies = ({ darkMode }: EmpresasProps) => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const duvidas = [
        {
            pergunta: "Como criar uma nova empresa no sistema?",
            resposta: "Para criar uma empresa: 1) Acesse 'Configurações' > 'Empresas' > 'Nova Empresa'. 2) Preencha os dados: Nome, CNPJ, telefone e email. 3) Configure o remetente padrão para SMS. 4) Defina permissões e limites de envio. 5) Salve e a empresa estará pronta para uso. Você pode criar múltiplas empresas para gerenciar diferentes clientes ou unidades de negócio."
        },
        {
            pergunta: "O que são empresas filhas e como funcionam?",
            resposta: "Empresas filhas são sub-contas vinculadas à sua empresa principal (matriz). Elas têm acesso limitado aos recursos conforme você definir. Útil para agências que gerenciam múltiplos clientes, franquias ou empresas com várias filiais. Cada empresa filha tem: seus próprios contatos, campanhas, blacklist (ou compartilhada), créditos separados e usuários específicos."
        },
        {
            pergunta: "Como gerenciar permissões de empresas filhas?",
            resposta: "Ao criar ou editar uma empresa filha, você define: limite de créditos, acesso a funcionalidades (campanhas, relatórios, API), permissão para criar usuários, acesso ao financeiro, e se pode visualizar dados de outras empresas. A matriz sempre tem controle total sobre todas as filhas."
        },
        {
            pergunta: "Posso transferir créditos entre empresas?",
            resposta: "Sim! A empresa matriz pode redistribuir créditos entre empresas filhas. Acesse 'Empresas' > selecione a empresa > 'Gerenciar Créditos'. Informe a quantidade a transferir. Isso permite controle centralizado do orçamento. Empresas filhas não podem transferir créditos entre si, apenas receber da matriz."
        },
        {
            pergunta: "Como alternar entre diferentes empresas?",
            resposta: "Use o seletor de empresas no canto superior direito da tela (ícone de empresa ao lado do seu nome). Selecione a empresa desejada e todo o dashboard será atualizado para exibir dados e funcionalidades específicas daquela empresa. Usuários com acesso a múltiplas empresas podem alternar livremente."
        },
        {
            pergunta: "Posso ter usuários específicos para cada empresa?",
            resposta: "Sim! Cada empresa pode ter seus próprios usuários com permissões específicas. Em 'Empresas' > 'Usuários', adicione novos usuários definindo: nome, email, senha, nível de acesso (admin, operador, apenas visualização) e recursos permitidos. Um mesmo usuário pode ter acesso a múltiplas empresas com diferentes níveis de permissão."
        },
        {
            pergunta: "Como configurar o remetente (sender ID) para cada empresa?",
            resposta: "Cada empresa pode ter seu próprio remetente personalizado. Acesse 'Empresas' > selecione a empresa > 'Configurações' > 'Remetente'. Defina um nome de até 11 caracteres. O remetente precisa ser aprovado (leva até 48h úteis) e está sujeito a regulamentações. Campanhas dessa empresa exibirão o remetente configurado."
        },
        {
            pergunta: "Posso compartilhar contatos entre empresas?",
            resposta: "Não diretamente por segurança e LGPD. Cada empresa mantém sua base de contatos independente. Se necessário, você pode exportar contatos de uma empresa e importar em outra, mas isso deve ser feito com consentimento dos contatos e seguindo as regras de proteção de dados."
        },
        {
            pergunta: "Como visualizar relatórios consolidados de todas as empresas?",
            resposta: "A empresa matriz tem acesso ao 'Dashboard Consolidado' em 'Relatórios' > 'Visão Geral'. Lá você vê métricas agregadas de todas as empresas: total de envios, taxas de entrega, consumo de créditos, opt-outs, etc. É possível filtrar por período e exportar relatórios comparativos."
        },
        {
            pergunta: "Como desativar ou excluir uma empresa filha?",
            resposta: "Para desativar: vá em 'Empresas' > selecione a empresa > 'Desativar'. A empresa fica inativa mas os dados são preservados. Para excluir permanentemente: selecione 'Excluir Empresa'. ATENÇÃO: exclusão é irreversível e apaga todos os dados (campanhas, contatos, relatórios). Recomendamos fazer backup antes."
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

export default Companies;