import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface APIExternaProps {
    darkMode: boolean;
}

const ExternalAPI = ({ darkMode }: APIExternaProps) => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const duvidas = [
        {
            pergunta: "Como obter as credenciais da API?",
            resposta: "Para obter suas credenciais: 1) Acesse 'Configurações' > 'API'. 2) Clique em 'Gerar Nova Chave'. 3) Copie o API Key e o API Secret exibidos (eles só serão mostrados uma vez). 4) Armazene-os de forma segura. Você pode gerar múltiplas chaves para diferentes aplicações e revogá-las individualmente quando necessário."
        },
        {
            pergunta: "Qual a URL base da API?",
            resposta: "A URL base da API é: https://api.m2c.com.br/v1/. Todas as requisições devem ser feitas para endpoints sob essa URL. Exemplo: https://api.m2c.com.br/v1/sms/send para envio de SMS. Mantenha sempre o /v1/ na URL para garantir compatibilidade com a versão atual da API."
        },
        {
            pergunta: "Como autenticar requisições na API?",
            resposta: "Use autenticação via headers HTTP. Inclua em todas as requisições: 'Authorization: Bearer {seu_api_key}' e 'Content-Type: application/json'. Exemplo em cURL: curl -X POST https://api.m2c.com.br/v1/sms/send -H 'Authorization: Bearer seu_api_key' -H 'Content-Type: application/json' -d '{...}'"
        },
        {
            pergunta: "Como enviar SMS via API?",
            resposta: "Faça uma requisição POST para /sms/send com o body: {\"to\": \"+5511999999999\", \"message\": \"Sua mensagem aqui\", \"from\": \"SuaMarca\"}. Campos opcionais: schedule (para agendar), callback_url (para receber status), custom_id (seu ID interno). A resposta incluirá o message_id para rastreamento."
        },
        {
            pergunta: "Como consultar o status de um SMS enviado?",
            resposta: "Faça um GET para /sms/status/{message_id} onde message_id é o ID retornado no envio. A resposta incluirá: status (sent, delivered, failed), timestamp, operadora, custo e detalhes de erro (se houver). Você também pode configurar webhooks para receber atualizações automaticamente."
        },
        {
            pergunta: "Como configurar webhooks para receber notificações?",
            resposta: "Em 'Configurações' > 'API' > 'Webhooks', adicione uma URL de callback. Seu servidor receberá POSTs com atualizações de status: {\"message_id\": \"...\", \"status\": \"delivered\", \"timestamp\": \"...\"}. Configure webhooks para: delivery reports, respostas de destinatários, ou erros. Implemente segurança validando a assinatura HMAC enviada no header."
        },
        {
            pergunta: "Existe limite de requisições (rate limit) na API?",
            resposta: "Sim. Limites por plano: Básico (10 req/s), Profissional (50 req/s), Enterprise (200 req/s). Headers de resposta indicam limites: X-RateLimit-Limit (total), X-RateLimit-Remaining (restantes), X-RateLimit-Reset (reset timestamp). Se exceder, receberá HTTP 429 (Too Many Requests). Implemente retry com backoff exponencial."
        },
        {
            pergunta: "Como enviar SMS em massa via API?",
            resposta: "Use o endpoint /sms/batch para envios em lote. Body: {\"messages\": [{\"to\": \"+5511...\", \"message\": \"...\"}, {...}]}. Processa até 1000 mensagens por requisição. A resposta incluirá um batch_id e array com message_id de cada SMS. Consulte status do lote em /sms/batch/{batch_id}."
        },
        {
            pergunta: "Como gerenciar contatos via API?",
            resposta: "Endpoints disponíveis: POST /contacts (criar), GET /contacts (listar), GET /contacts/{id} (buscar), PUT /contacts/{id} (atualizar), DELETE /contacts/{id} (excluir). Você pode adicionar campos customizados e tags. Para importação em massa use POST /contacts/import com array de contatos."
        },
        {
            pergunta: "Como consultar saldo de créditos via API?",
            resposta: "Faça um GET para /account/balance. A resposta incluirá: {\"credits\": 5000, \"currency\": \"BRL\", \"credit_value\": 0.10}. Útil para integrar verificação de saldo em sua aplicação antes de enviar campanhas grandes."
        },
        {
            pergunta: "A API suporta envio de SMS internacional?",
            resposta: "Sim! Use o número completo com código do país no formato E.164: +{código_país}{número}. Exemplo: +1234567890 para EUA. Custos variam por país. Consulte /pricing/countries para lista de países suportados e tarifas. Alguns países requerem remetente registrado."
        },
        {
            pergunta: "Como tratar erros da API?",
            resposta: "A API retorna códigos HTTP padrão: 200 (sucesso), 400 (bad request), 401 (não autorizado), 429 (rate limit), 500 (erro servidor). Body de erro: {\"error\": {\"code\": \"INVALID_PHONE\", \"message\": \"Descrição do erro\"}}. Implemente logs de erros e retry lógica para códigos 5xx e 429."
        },
        {
            pergunta: "Onde encontro a documentação completa da API?",
            resposta: "Documentação completa em: https://docs.m2c.com.br/api. Inclui: referência de todos os endpoints, exemplos de código em múltiplas linguagens (PHP, Python, Node.js, Java), tutoriais de integração, e coleção Postman para testes. Também disponível biblioteca SDK para facilitar integração."
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

export default ExternalAPI;