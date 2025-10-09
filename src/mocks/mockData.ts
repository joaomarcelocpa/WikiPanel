export interface Duvida {
    id: number;
    pergunta: string;
    resposta: string;
    type: string;
}

export const mockDuvidas: Duvida[] = [
    // BLACKLIST
    {
        id: 1,
        type: 'blacklist',
        pergunta: "O que é a Blacklist e para que serve?",
        resposta: "A blacklist é uma lista de números de telefone que optaram por não receber mais mensagens SMS da sua empresa. É essencial para respeitar a privacidade dos usuários, cumprir regulamentações de proteção de dados (LGPD) e manter uma boa reputação de envio. Números na blacklist são automaticamente excluídos de todas as campanhas."
    },
    {
        id: 2,
        type: 'blacklist',
        pergunta: "Como um número é adicionado à blacklist automaticamente?",
        resposta: "Quando um destinatário responde com palavras-chave específicas como 'SAIR', 'PARAR', 'CANCELAR', 'STOP', 'REMOVER' ou 'DESCADASTRAR', o sistema adiciona automaticamente o número à blacklist em tempo real. O processo é instantâneo e o número não receberá mais mensagens."
    },
    {
        id: 3,
        type: 'blacklist',
        pergunta: "Posso adicionar números manualmente à blacklist?",
        resposta: "Sim! Acesse 'Blacklist' > 'Adicionar Número' e insira o telefone desejado. Isso é útil para atender solicitações recebidas por outros canais (telefone, email, chat) ou corrigir adições acidentais. Você pode adicionar números individuais ou em lote."
    },
    {
        id: 4,
        type: 'blacklist',
        pergunta: "Como remover um número da blacklist?",
        resposta: "Para remover: vá em 'Blacklist', localize o número na lista, clique no ícone de três pontos e selecione 'Remover da Blacklist'. Importante: só remova números se o contato solicitar explicitamente voltar a receber mensagens. Remoções sem consentimento podem violar a LGPD."
    },
    {
        id: 5,
        type: 'blacklist',
        pergunta: "Como importar uma lista de números bloqueados em massa?",
        resposta: "Acesse 'Blacklist' > 'Importar' e faça upload de um arquivo CSV ou Excel com os números. O formato deve ter uma coluna com os telefones (com ou sem DDD/DDI). O sistema valida e adiciona todos os números à blacklist. Ideal para migração de outros sistemas."
    },
    {
        id: 6,
        type: 'blacklist',
        pergunta: "Posso exportar a lista de números bloqueados?",
        resposta: "Sim! Clique em 'Exportar Blacklist' para baixar um arquivo CSV com todos os números bloqueados, incluindo data de bloqueio e motivo. Útil para backups, auditorias ou integração com outros sistemas."
    },

    // CAMPANHAS
    {
        id: 7,
        type: 'campaigns',
        pergunta: "Como criar uma nova campanha de SMS?",
        resposta: "Para criar uma campanha: 1) Acesse o menu 'Campanhas' e clique em 'Nova Campanha'. 2) Defina um nome para sua campanha. 3) Selecione os destinatários (contatos individuais, grupos ou importação de lista). 4) Configure sua mensagem usando variáveis dinâmicas como {nome}, {codigo}, etc. 5) Escolha entre envio imediato ou agendado. 6) Revise e confirme o envio."
    },
    {
        id: 8,
        type: 'campaigns',
        pergunta: "Como usar templates de mensagens?",
        resposta: "Templates permitem reutilizar mensagens frequentes. Para criar: vá em 'Campanhas' > 'Templates' > 'Novo Template'. Dê um nome, escreva sua mensagem e salve. Use variáveis como {nome}, {codigo}, {data} para personalização. Para usar um template, selecione-o ao criar uma campanha e as variáveis serão substituídas automaticamente pelos dados dos contatos."
    },
    {
        id: 9,
        type: 'campaigns',
        pergunta: "Como funciona o agendamento de campanhas?",
        resposta: "Você pode agendar campanhas para envio futuro com até 30 dias de antecedência. Ao criar a campanha, selecione 'Agendar envio' e escolha data e horário. É possível configurar campanhas recorrentes (diárias, semanais, mensais). O sistema ajusta automaticamente para o timezone de cada destinatário se configurado."
    },
    {
        id: 10,
        type: 'campaigns',
        pergunta: "O que são variáveis dinâmicas e como usá-las?",
        resposta: "Variáveis dinâmicas personalizam mensagens automaticamente. Use {nome} para o nome do contato, {codigo} para códigos promocionais, {data} para datas, {empresa} para nome da empresa, etc. Exemplo: 'Olá {nome}, seu código é {codigo}'. Ao enviar, cada destinatário recebe a mensagem com seus dados específicos."
    },
    {
        id: 11,
        type: 'campaigns',
        pergunta: "Como segmentar contatos para uma campanha?",
        resposta: "Use filtros avançados para segmentar: região, estado, cidade, comportamento de compra, histórico de interação, tags personalizadas, ou qualquer campo customizado. Você pode criar segmentos dinâmicos que se atualizam automaticamente conforme novos contatos atendem aos critérios definidos."
    },
    {
        id: 12,
        type: 'campaigns',
        pergunta: "Posso testar uma campanha antes do envio em massa?",
        resposta: "Sim! Recomendamos sempre fazer um teste. Use a opção 'Enviar Teste' antes de confirmar a campanha. Você pode enviar para até 5 números de teste para verificar formatação, variáveis e conteúdo. Isso evita erros em envios grandes."
    },

    // EMPRESAS
    {
        id: 13,
        type: 'companies',
        pergunta: "Como criar uma nova empresa no sistema?",
        resposta: "Para criar uma empresa: 1) Acesse 'Configurações' > 'Empresas' > 'Nova Empresa'. 2) Preencha os dados: Nome, CNPJ, telefone e email. 3) Configure o remetente padrão para SMS. 4) Defina permissões e limites de envio. 5) Salve e a empresa estará pronta para uso. Você pode criar múltiplas empresas para gerenciar diferentes clientes ou unidades de negócio."
    },
    {
        id: 14,
        type: 'companies',
        pergunta: "O que são empresas filhas e como funcionam?",
        resposta: "Empresas filhas são sub-contas vinculadas à sua empresa principal (matriz). Elas têm acesso limitado aos recursos conforme você definir. Útil para agências que gerenciam múltiplos clientes, franquias ou empresas com várias filiais. Cada empresa filha tem: seus próprios contatos, campanhas, blacklist (ou compartilhada), créditos separados e usuários específicos."
    },
    {
        id: 15,
        type: 'companies',
        pergunta: "Como gerenciar permissões de empresas filhas?",
        resposta: "Ao criar ou editar uma empresa filha, você define: limite de créditos, acesso a funcionalidades (campanhas, relatórios, API), permissão para criar usuários, acesso ao financeiro, e se pode visualizar dados de outras empresas. A matriz sempre tem controle total sobre todas as filhas."
    },
    {
        id: 16,
        type: 'companies',
        pergunta: "Posso transferir créditos entre empresas?",
        resposta: "Sim! A empresa matriz pode redistribuir créditos entre empresas filhas. Acesse 'Empresas' > selecione a empresa > 'Gerenciar Créditos'. Informe a quantidade a transferir. Isso permite controle centralizado do orçamento. Empresas filhas não podem transferir créditos entre si, apenas receber da matriz."
    },
    {
        id: 17,
        type: 'companies',
        pergunta: "Como alternar entre diferentes empresas?",
        resposta: "Use o seletor de empresas no canto superior direito da tela (ícone de empresa ao lado do seu nome). Selecione a empresa desejada e todo o dashboard será atualizado para exibir dados e funcionalidades específicas daquela empresa. Usuários com acesso a múltiplas empresas podem alternar livremente."
    },
    {
        id: 18,
        type: 'companies',
        pergunta: "Posso ter usuários específicos para cada empresa?",
        resposta: "Sim! Cada empresa pode ter seus próprios usuários com permissões específicas. Em 'Empresas' > 'Usuários', adicione novos usuários definindo: nome, email, senha, nível de acesso (admin, operador, apenas visualização) e recursos permitidos. Um mesmo usuário pode ter acesso a múltiplas empresas com diferentes níveis de permissão."
    },

    // API EXTERNA
    {
        id: 19,
        type: 'api',
        pergunta: "Como obter as credenciais da API?",
        resposta: "Para obter suas credenciais: 1) Acesse 'Configurações' > 'API'. 2) Clique em 'Gerar Nova Chave'. 3) Copie o API Key e o API Secret exibidos (eles só serão mostrados uma vez). 4) Armazene-os de forma segura. Você pode gerar múltiplas chaves para diferentes aplicações e revogá-las individualmente quando necessário."
    },
    {
        id: 20,
        type: 'api',
        pergunta: "Qual a URL base da API?",
        resposta: "A URL base da API é: https://api.m2c.com.br/v1/. Todas as requisições devem ser feitas para endpoints sob essa URL. Exemplo: https://api.m2c.com.br/v1/sms/send para envio de SMS. Mantenha sempre o /v1/ na URL para garantir compatibilidade com a versão atual da API."
    },
    {
        id: 21,
        type: 'api',
        pergunta: "Como autenticar requisições na API?",
        resposta: "Use autenticação via headers HTTP. Inclua em todas as requisições: 'Authorization: Bearer {seu_api_key}' e 'Content-Type: application/json'. Exemplo em cURL: curl -X POST https://api.m2c.com.br/v1/sms/send -H 'Authorization: Bearer seu_api_key' -H 'Content-Type: application/json' -d '{...}'"
    },
    {
        id: 22,
        type: 'api',
        pergunta: "Como enviar SMS via API?",
        resposta: "Faça uma requisição POST para /sms/send com o body: {\"to\": \"+5511999999999\", \"message\": \"Sua mensagem aqui\", \"from\": \"SuaMarca\"}. Campos opcionais: schedule (para agendar), callback_url (para receber status), custom_id (seu ID interno). A resposta incluirá o message_id para rastreamento."
    },
    {
        id: 23,
        type: 'api',
        pergunta: "Como consultar o status de um SMS enviado?",
        resposta: "Faça um GET para /sms/status/{message_id} onde message_id é o ID retornado no envio. A resposta incluirá: status (sent, delivered, failed), timestamp, operadora, custo e detalhes de erro (se houver). Você também pode configurar webhooks para receber atualizações automaticamente."
    },
    {
        id: 24,
        type: 'api',
        pergunta: "Como configurar webhooks para receber notificações?",
        resposta: "Em 'Configurações' > 'API' > 'Webhooks', adicione uma URL de callback. Seu servidor receberá POSTs com atualizações de status: {\"message_id\": \"...\", \"status\": \"delivered\", \"timestamp\": \"...\"}. Configure webhooks para: delivery reports, respostas de destinatários, ou erros. Implemente segurança validando a assinatura HMAC enviada no header."
    },

    // FINANCEIRO
    {
        id: 25,
        type: 'financial',
        pergunta: "Como comprar créditos para envio de SMS?",
        resposta: "Para comprar créditos: 1) Acesse 'Financeiro' > 'Comprar Créditos'. 2) Escolha um pacote ou insira valor customizado. 3) Selecione forma de pagamento (cartão, boleto, PIX). 4) Confirme a compra. Créditos via PIX e cartão são liberados instantaneamente. Boleto leva até 2 dias úteis para compensação. Você receberá nota fiscal por email."
    },
    {
        id: 26,
        type: 'financial',
        pergunta: "Quais são as formas de pagamento aceitas?",
        resposta: "Aceitamos: Cartão de crédito (Visa, Master, Elo, Amex) em até 12x, Boleto bancário à vista, PIX (aprovação instantânea), e Transferência bancária (para valores acima de R$ 10.000). Para empresas Enterprise, oferecemos faturamento mensal com pagamento em até 30 dias."
    },
    {
        id: 27,
        type: 'financial',
        pergunta: "Como funciona o sistema de créditos?",
        resposta: "Cada SMS enviado consome créditos do seu saldo. O custo varia por operadora e tamanho da mensagem: mensagens até 160 caracteres = 1 crédito, 161-306 caracteres = 2 créditos, 307-459 caracteres = 3 créditos, etc. SMS internacionais têm custo diferenciado. Você pode consultar preços detalhados em 'Financeiro' > 'Tabela de Preços'."
    },
    {
        id: 28,
        type: 'financial',
        pergunta: "Os créditos têm prazo de validade?",
        resposta: "Créditos pré-pagos não expiram! Permanecem na sua conta indefinidamente. Apenas créditos bônus promocionais podem ter prazo de validade específico, que será informado no momento da promoção. Você pode consultar validade de bônus em 'Financeiro' > 'Meus Créditos'."
    },
    {
        id: 29,
        type: 'financial',
        pergunta: "Como visualizar meu histórico de transações?",
        resposta: "Acesse 'Financeiro' > 'Transações'. Lá você verá todas as compras, consumos e ajustes de crédito com: data, tipo (compra/consumo), quantidade, valor, forma de pagamento e saldo resultante. Filtre por período, tipo de transação e exporte relatórios em PDF ou Excel."
    },
    {
        id: 30,
        type: 'financial',
        pergunta: "Como emitir segunda via de nota fiscal?",
        resposta: "Vá em 'Financeiro' > 'Notas Fiscais', localize a transação desejada e clique em 'Baixar NF'. Notas fiscais são emitidas automaticamente para todas as compras. Se houver erro nos dados cadastrais, atualize em 'Configurações' > 'Dados da Empresa' e solicite reemissão via suporte."
    },

    // FAQ
    {
        id: 31,
        type: 'faq',
        pergunta: "Qual o limite de caracteres por SMS?",
        resposta: "160 caracteres para mensagens simples. Acima disso, a mensagem é dividida em múltiplos SMS (até 765 caracteres em 5 SMS concatenados). Cada SMS adicional consome créditos extras. Caracteres especiais (ç, á, é, etc) podem reduzir o limite para 70 caracteres por SMS."
    },
    {
        id: 32,
        type: 'faq',
        pergunta: "Posso personalizar o remetente (Sender ID)?",
        resposta: "Sim! Você pode usar um nome de até 11 caracteres como remetente. O Sender ID requer aprovação prévia (processo leva até 48h úteis) e está sujeito a regulamentações locais de cada operadora. Alguns países não permitem Sender ID alfanumérico, usando apenas números curtos."
    },
    {
        id: 33,
        type: 'faq',
        pergunta: "Como funciona a cobrança dos envios?",
        resposta: "Cobrança por créditos pré-pagos ou planos mensais. Cada SMS consumido é descontado do seu saldo. Valores variam por operadora e país de destino. SMS nacionais custam em média R$ 0,08-0,12 por mensagem. Consulte a tabela completa de preços em 'Financeiro' > 'Preços'."
    },
    {
        id: 34,
        type: 'faq',
        pergunta: "Há limite de envios por hora?",
        resposta: "Sim, para proteger sua reputação e evitar bloqueios por operadoras. Limites variam por plano: Básico (5.000/hora), Profissional (15.000/hora), Enterprise (50.000/hora). Se precisar de limites maiores, entre em contato com o time comercial para planos customizados."
    },
    {
        id: 35,
        type: 'faq',
        pergunta: "Posso enviar para números internacionais?",
        resposta: "Sim! Suportamos mais de 200 países. Tarifas internacionais variam por destino e são geralmente mais altas que envios nacionais. Consulte nossa tabela de preços internacionais em 'Financeiro' > 'Preços Internacionais'. Alguns países requerem registro prévio de remetente."
    },
    {
        id: 36,
        type: 'faq',
        pergunta: "Como rastrear cliques em links enviados?",
        resposta: "Use nosso encurtador de URLs integrado. Ao inserir um link na mensagem, ele será automaticamente encurtado e rastreado. Estatísticas de cliques aparecem no dashboard da campanha: total de cliques, cliques únicos, taxa de cliques (CTR), horários de maior engajamento e origem geográfica."
    },
];