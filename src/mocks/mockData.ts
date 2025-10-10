export interface Duvida {
    id: number;
    pergunta: string;
    resposta: string;
    type: string;
    category: string; // 'sms' ou 'backoffice'
}

export const mockDuvidas: Duvida[] = [
    // ==================== SMS - CAMPANHAS ====================
    {
        id: 1,
        category: 'sms',
        type: 'campaigns',
        pergunta: "Como criar uma nova campanha de SMS?",
        resposta: "Para criar uma campanha: 1) Acesse o menu 'Campanhas' e clique em 'Nova Campanha'. 2) Defina um nome para sua campanha. 3) Selecione os destinatários (contatos individuais, grupos ou importação de lista). 4) Configure sua mensagem usando variáveis dinâmicas como {nome}, {codigo}, etc. 5) Escolha entre envio imediato ou agendado. 6) Revise e confirme o envio."
    },
    {
        id: 2,
        category: 'sms',
        type: 'campaigns',
        pergunta: "Como usar templates de mensagens?",
        resposta: "Templates permitem reutilizar mensagens frequentes. Para criar: vá em 'Campanhas' > 'Templates' > 'Novo Template'. Dê um nome, escreva sua mensagem e salve. Use variáveis como {nome}, {codigo}, {data} para personalização. Para usar um template, selecione-o ao criar uma campanha e as variáveis serão substituídas automaticamente pelos dados dos contatos."
    },
    {
        id: 3,
        category: 'sms',
        type: 'campaigns',
        pergunta: "Como funciona o agendamento de campanhas?",
        resposta: "Você pode agendar campanhas para envio futuro com até 30 dias de antecedência. Ao criar a campanha, selecione 'Agendar envio' e escolha data e horário. É possível configurar campanhas recorrentes (diárias, semanais, mensais). O sistema ajusta automaticamente para o timezone de cada destinatário se configurado."
    },

    // ==================== SMS - BLACKLIST ====================
    {
        id: 4,
        category: 'sms',
        type: 'blacklist',
        pergunta: "O que é a Blacklist e para que serve?",
        resposta: "A blacklist é uma lista de números de telefone que optaram por não receber mais mensagens SMS da sua empresa. É essencial para respeitar a privacidade dos usuários, cumprir regulamentações de proteção de dados (LGPD) e manter uma boa reputação de envio. Números na blacklist são automaticamente excluídos de todas as campanhas."
    },
    {
        id: 5,
        category: 'sms',
        type: 'blacklist',
        pergunta: "Como um número é adicionado à blacklist automaticamente?",
        resposta: "Quando um destinatário responde com palavras-chave específicas como 'SAIR', 'PARAR', 'CANCELAR', 'STOP', 'REMOVER' ou 'DESCADASTRAR', o sistema adiciona automaticamente o número à blacklist em tempo real. O processo é instantâneo e o número não receberá mais mensagens."
    },
    {
        id: 6,
        category: 'sms',
        type: 'blacklist',
        pergunta: "Como importar uma lista de números bloqueados em massa?",
        resposta: "Acesse 'Blacklist' > 'Importar' e faça upload de um arquivo CSV ou Excel com os números. O formato deve ter uma coluna com os telefones (com ou sem DDD/DDI). O sistema valida e adiciona todos os números à blacklist. Ideal para migração de outros sistemas."
    },

    // ==================== SMS - FINANCEIRO ====================
    {
        id: 7,
        category: 'sms',
        type: 'financial',
        pergunta: "Como comprar créditos para envio de SMS?",
        resposta: "Para comprar créditos: 1) Acesse 'Financeiro' > 'Comprar Créditos'. 2) Escolha um pacote ou insira valor customizado. 3) Selecione forma de pagamento (cartão, boleto, PIX). 4) Confirme a compra. Créditos via PIX e cartão são liberados instantaneamente. Boleto leva até 2 dias úteis para compensação. Você receberá nota fiscal por email."
    },
    {
        id: 8,
        category: 'sms',
        type: 'financial',
        pergunta: "Quais são as formas de pagamento aceitas?",
        resposta: "Aceitamos: Cartão de crédito (Visa, Master, Elo, Amex) em até 12x, Boleto bancário à vista, PIX (aprovação instantânea), e Transferência bancária (para valores acima de R$ 10.000). Para empresas Enterprise, oferecemos faturamento mensal com pagamento em até 30 dias."
    },
    {
        id: 9,
        category: 'sms',
        type: 'financial',
        pergunta: "Como funciona o sistema de créditos?",
        resposta: "Cada SMS enviado consome créditos do seu saldo. O custo varia por operadora e tamanho da mensagem: mensagens até 160 caracteres = 1 crédito, 161-306 caracteres = 2 créditos, 307-459 caracteres = 3 créditos, etc. SMS internacionais têm custo diferenciado. Você pode consultar preços detalhados em 'Financeiro' > 'Tabela de Preços'."
    },

    // ==================== SMS - EMPRESAS ====================
    {
        id: 10,
        category: 'sms',
        type: 'companies',
        pergunta: "Como criar uma nova empresa no sistema?",
        resposta: "Para criar uma empresa: 1) Acesse 'Configurações' > 'Empresas' > 'Nova Empresa'. 2) Preencha os dados: Nome, CNPJ, telefone e email. 3) Configure o remetente padrão para SMS. 4) Defina permissões e limites de envio. 5) Salve e a empresa estará pronta para uso. Você pode criar múltiplas empresas para gerenciar diferentes clientes ou unidades de negócio."
    },
    {
        id: 11,
        category: 'sms',
        type: 'companies',
        pergunta: "O que são empresas filhas e como funcionam?",
        resposta: "Empresas filhas são sub-contas vinculadas à sua empresa principal (matriz). Elas têm acesso limitado aos recursos conforme você definir. Útil para agências que gerenciam múltiplos clientes, franquias ou empresas com várias filiais. Cada empresa filha tem: seus próprios contatos, campanhas, blacklist (ou compartilhada), créditos separados e usuários específicos."
    },
    {
        id: 12,
        category: 'sms',
        type: 'companies',
        pergunta: "Como gerenciar permissões de empresas filhas?",
        resposta: "Ao criar ou editar uma empresa filha, você define: limite de créditos, acesso a funcionalidades (campanhas, relatórios, API), permissão para criar usuários, acesso ao financeiro, e se pode visualizar dados de outras empresas. A matriz sempre tem controle total sobre todas as filhas."
    },

    // ==================== SMS - SERVIÇOS ====================
    {
        id: 13,
        category: 'sms',
        type: 'services',
        pergunta: "O que são serviços de SMS?",
        resposta: "Serviços são diferentes tipos de envio de SMS disponíveis na plataforma: SMS Marketing (promocional), SMS Transacional (confirmações, alertas), SMS OTP (códigos de verificação), e SMS em Massa. Cada serviço tem características específicas de entrega, velocidade e custo."
    },
    {
        id: 14,
        category: 'sms',
        type: 'services',
        pergunta: "Como escolher o melhor serviço para meu envio?",
        resposta: "SMS Marketing: para campanhas promocionais e comunicação em massa. SMS Transacional: para notificações importantes, alertas de segurança, confirmações de pedido. SMS OTP: para autenticação de dois fatores e códigos de verificação. Escolha baseado na urgência, tipo de conteúdo e regulamentações aplicáveis."
    },
    {
        id: 15,
        category: 'sms',
        type: 'services',
        pergunta: "Posso configurar diferentes remetentes para cada serviço?",
        resposta: "Sim! Em 'Configurações' > 'Serviços', você pode definir um Sender ID específico para cada tipo de serviço. Isso permite usar remetentes personalizados como 'SuaLoja' para marketing e 'Alertas' para mensagens transacionais, melhorando a identificação e taxa de abertura."
    },

    // ==================== SMS - RELATÓRIOS ====================
    {
        id: 16,
        category: 'sms',
        type: 'reports',
        pergunta: "Quais relatórios estão disponíveis?",
        resposta: "A plataforma oferece: Relatório de Envios (status detalhado de cada SMS), Relatório de Campanhas (performance geral), Relatório Financeiro (consumo de créditos), Relatório de Entregas (taxas de sucesso por operadora), Relatório de Blacklist (números bloqueados), e Relatório de API (uso de endpoints). Todos podem ser exportados em PDF ou Excel."
    },
    {
        id: 17,
        category: 'sms',
        type: 'reports',
        pergunta: "Como gerar um relatório de envios?",
        resposta: "Acesse 'Relatórios' > 'Envios', selecione o período desejado, aplique filtros (campanha, status, operadora), e clique em 'Gerar Relatório'. O relatório mostrará: número de destino, status (enviado, entregue, falhou), data/hora, operadora, custo e motivo de falha (se houver). Exporte em PDF ou Excel."
    },
    {
        id: 18,
        category: 'sms',
        type: 'reports',
        pergunta: "Posso agendar relatórios automáticos?",
        resposta: "Sim! Em 'Relatórios' > 'Agendamentos', configure relatórios recorrentes (diários, semanais, mensais). Defina os filtros, formato de exportação e destinatários de email. Os relatórios serão gerados e enviados automaticamente conforme a programação."
    },

    // ==================== SMS - API EXTERNA ====================
    {
        id: 19,
        category: 'sms',
        type: 'api',
        pergunta: "Como obter as credenciais da API?",
        resposta: "Para obter suas credenciais: 1) Acesse 'Configurações' > 'API'. 2) Clique em 'Gerar Nova Chave'. 3) Copie o API Key e o API Secret exibidos (eles só serão mostrados uma vez). 4) Armazene-os de forma segura. Você pode gerar múltiplas chaves para diferentes aplicações e revogá-las individualmente quando necessário."
    },
    {
        id: 20,
        category: 'sms',
        type: 'api',
        pergunta: "Qual a URL base da API?",
        resposta: "A URL base da API é: https://api.m2c.com.br/v1/. Todas as requisições devem ser feitas para endpoints sob essa URL. Exemplo: https://api.m2c.com.br/v1/sms/send para envio de SMS. Mantenha sempre o /v1/ na URL para garantir compatibilidade com a versão atual da API."
    },
    {
        id: 21,
        category: 'sms',
        type: 'api',
        pergunta: "Como enviar SMS via API?",
        resposta: "Faça uma requisição POST para /sms/send com o body: {\"to\": \"+5511999999999\", \"message\": \"Sua mensagem aqui\", \"from\": \"SuaMarca\"}. Campos opcionais: schedule (para agendar), callback_url (para receber status), custom_id (seu ID interno). A resposta incluirá o message_id para rastreamento."
    },

    // ==================== SMS - FAQ ====================
    {
        id: 22,
        category: 'sms',
        type: 'faq',
        pergunta: "Qual o limite de caracteres por SMS?",
        resposta: "160 caracteres para mensagens simples. Acima disso, a mensagem é dividida em múltiplos SMS (até 765 caracteres em 5 SMS concatenados). Cada SMS adicional consome créditos extras. Caracteres especiais (ç, á, é, etc) podem reduzir o limite para 70 caracteres por SMS."
    },
    {
        id: 23,
        category: 'sms',
        type: 'faq',
        pergunta: "Posso personalizar o remetente (Sender ID)?",
        resposta: "Sim! Você pode usar um nome de até 11 caracteres como remetente. O Sender ID requer aprovação prévia (processo leva até 48h úteis) e está sujeito a regulamentações locais de cada operadora. Alguns países não permitem Sender ID alfanumérico, usando apenas números curtos."
    },

    // ==================== BACKOFFICE - OPERACIONAL ====================
    {
        id: 100,
        category: 'backoffice',
        type: 'operational',
        pergunta: "Como gerenciar operações diárias no backoffice?",
        resposta: "O módulo Operacional permite gerenciar todas as operações diárias da plataforma: monitoramento de envios em tempo real, gestão de filas de processamento, análise de performance dos sistemas, resolução de tickets de suporte, e acompanhamento de SLAs. Acesse o dashboard operacional para uma visão consolidada de todas as métricas críticas."
    },
    {
        id: 101,
        category: 'backoffice',
        type: 'operational',
        pergunta: "Como resolver problemas de envio em massa?",
        resposta: "Para diagnosticar problemas: 1) Acesse 'Operacional' > 'Monitor de Envios'. 2) Identifique campanhas com taxa de erro elevada. 3) Verifique logs detalhados para identificar causa raiz (gateway indisponível, blacklist, formato incorreto). 4) Aplique correções necessárias. 5) Considere reenvio automático para mensagens falhadas. 6) Configure alertas para prevenção futura."
    },
    {
        id: 102,
        category: 'backoffice',
        type: 'operational',
        pergunta: "Como configurar alertas operacionais?",
        resposta: "Em 'Operacional' > 'Alertas', configure notificações para: taxa de falha acima de X%, tempo de resposta de gateway excedendo Y segundos, fila de processamento acima de Z mensagens, e indisponibilidade de serviços críticos. Defina canais de notificação (email, SMS, Slack, webhook) e recipients."
    },

    // ==================== BACKOFFICE - FINANCEIRO ====================
    {
        id: 103,
        category: 'backoffice',
        type: 'backoffice-financial',
        pergunta: "Como gerenciar faturamento de empresas?",
        resposta: "Em 'Backoffice' > 'Financeiro' > 'Faturamento', você pode: visualizar consumo detalhado por empresa, gerar faturas mensais automaticamente, aplicar descontos e promoções, gerenciar planos e pacotes, configurar regras de cobrança personalizadas, e exportar relatórios contábeis. Faturas podem ser enviadas automaticamente por email."
    },
    {
        id: 104,
        category: 'backoffice',
        type: 'backoffice-financial',
        pergunta: "Como configurar preços por operadora?",
        resposta: "Acesse 'Financeiro' > 'Tabela de Preços' > 'Operadoras'. Configure preços diferenciados por: operadora (Vivo, Claro, TIM, Oi), tipo de serviço (marketing, transacional, OTP), destino (nacional, internacional por país), e volume (descontos progressivos). Aplique markup sobre custos de fornecedor. Preços podem ser personalizados por empresa."
    },
    {
        id: 105,
        category: 'backoffice',
        type: 'backoffice-financial',
        pergunta: "Como processar reembolsos e ajustes?",
        resposta: "Em 'Financeiro' > 'Ajustes', você pode: processar reembolsos de créditos, aplicar créditos bônus, corrigir cobranças indevidas, ajustar saldos manualmente (com justificativa obrigatória), e gerar notas de crédito. Todos os ajustes ficam registrados em auditoria com usuário responsável, data/hora e motivo."
    },

    // ==================== BACKOFFICE - EMPRESAS ====================
    {
        id: 106,
        category: 'backoffice',
        type: 'backoffice-companies',
        pergunta: "Como criar e configurar empresas no backoffice?",
        resposta: "Acesse 'Backoffice' > 'Empresas' > 'Nova Empresa'. Preencha: dados cadastrais (razão social, CNPJ, contatos), configurações técnicas (limites de envio, APIs habilitadas, sender IDs), configurações financeiras (plano, preços customizados, forma de pagamento), e permissões de acesso. Defina se é empresa matriz ou filha."
    },
    {
        id: 107,
        category: 'backoffice',
        type: 'backoffice-companies',
        pergunta: "Como gerenciar usuários de empresas?",
        resposta: "Em 'Empresas' > [Selecionar Empresa] > 'Usuários', você pode: criar novos usuários, definir níveis de acesso (admin, operador, visualização), configurar permissões granulares por módulo, resetar senhas, bloquear/desbloquear acessos, visualizar logs de atividade, e configurar autenticação de dois fatores (2FA)."
    },
    {
        id: 108,
        category: 'backoffice',
        type: 'backoffice-companies',
        pergunta: "Como migrar empresas entre planos?",
        resposta: "Acesse a empresa desejada e vá em 'Planos' > 'Alterar Plano'. Selecione o novo plano, defina data de vigência (imediato ou próximo ciclo), configure se haverá cobrança proporcional, e confirme. O sistema ajustará automaticamente limites, funcionalidades e preços. Notificação automática será enviada para a empresa."
    },

    // ==================== BACKOFFICE - FORNECEDORES ====================
    {
        id: 109,
        category: 'backoffice',
        type: 'suppliers',
        pergunta: "Como cadastrar um novo fornecedor?",
        resposta: "Em 'Fornecedores' > 'Novo Fornecedor', preencha: nome, tipo (gateway SMS, provedor de números), dados de contato, informações de faturamento, e capacidades técnicas. Configure credenciais de API, endpoints, e parâmetros de conexão. Defina prioridade de uso e regras de fallback para alta disponibilidade."
    },
    {
        id: 110,
        category: 'backoffice',
        type: 'suppliers',
        pergunta: "Como gerenciar contas de fornecedores?",
        resposta: "Em 'Fornecedores' > [Selecionar Fornecedor] > 'Contas', você pode: adicionar múltiplas contas por fornecedor, configurar credenciais e autenticação, definir limites de uso (TPS - transactions per second, cota diária), monitorar saldo de créditos, configurar alertas de saldo baixo, e ativar/desativar contas conforme necessidade."
    },
    {
        id: 111,
        category: 'backoffice',
        type: 'suppliers',
        pergunta: "O que são SIDs e como gerenciá-los?",
        resposta: "SIDs (Service Identifiers) são identificadores únicos de serviços de fornecedores. Em 'Fornecedores' > 'SIDs', você pode: cadastrar novos SIDs, associá-los a contas e serviços específicos, configurar roteamento automático por operadora/região, definir custos por SID, monitorar performance (taxa de entrega, latência), e desativar SIDs problemáticos."
    },

    // ==================== BACKOFFICE - MENSAGERIA ====================
    {
        id: 112,
        category: 'backoffice',
        type: 'messaging',
        pergunta: "Como configurar e gerenciar gateways?",
        resposta: "Em 'Mensageria' > 'Gateways', você pode: adicionar novos gateways SMS, configurar protocolos (SMPP, HTTP, HTTPS), definir parâmetros de conexão (host, porta, credenciais), configurar pools de conexão, definir timeout e retry, monitorar status em tempo real, e testar conectividade. Configure balanceamento de carga e failover automático."
    },
    {
        id: 113,
        category: 'backoffice',
        type: 'messaging',
        pergunta: "Como gerenciar serviços de mensageria?",
        resposta: "Acesse 'Mensageria' > 'Serviços' para configurar: tipos de serviço (marketing, transacional, OTP), regras de roteamento por operadora/país, priorização de entregas, configuração de DLR (delivery reports), templates de mensagem, validações de conteúdo, e limites de throughput. Associe serviços a gateways específicos."
    },
    {
        id: 114,
        category: 'backoffice',
        type: 'messaging',
        pergunta: "O que são Painéis e como configurá-los?",
        resposta: "Painéis são dashboards customizados para monitoramento. Em 'Mensageria' > 'Painéis', crie painéis com: widgets de métricas em tempo real (envios/minuto, taxa de sucesso), gráficos de performance por gateway/operadora, alertas visuais, comparativos período a período, e drill-down para análises detalhadas. Painéis podem ser compartilhados com empresas."
    },
    {
        id: 115,
        category: 'backoffice',
        type: 'messaging',
        pergunta: "Como gerenciar números Procon?",
        resposta: "Em 'Mensageria' > 'Números Procon', gerencie números registrados no Procon: cadastre novos números, associe a empresas responsáveis, configure regras de opt-out automático, monitore reclamações vinculadas, gere relatórios de conformidade, e mantenha histórico de todas as solicitações de descadastro para auditoria e compliance com LGPD."
    },

    // ==================== BACKOFFICE - MONITORAMENTO ====================
    {
        id: 116,
        category: 'backoffice',
        type: 'monitoring',
        pergunta: "Como funciona o histórico de Fake DLR?",
        resposta: "Fake DLRs são delivery reports simulados quando o gateway não retorna status real. Em 'Monitoramento' > 'Histórico Fake DLR', visualize: mensagens que receberam DLR simulado, gateway/fornecedor responsável, timestamp de simulação, motivo da simulação, e taxa de ocorrência. Use para identificar problemas de integração com fornecedores."
    },
    {
        id: 117,
        category: 'backoffice',
        type: 'monitoring',
        pergunta: "Como monitorar histórico de serviços?",
        resposta: "Acesse 'Monitoramento' > 'Histórico Serviços' para análise temporal: uptime/downtime de cada serviço, alterações de configuração, incidentes registrados, performance ao longo do tempo, comparação entre períodos, e identificação de padrões de degradação. Exporte relatórios para análise de SLA e planejamento de capacidade."
    },
    {
        id: 118,
        category: 'backoffice',
        type: 'monitoring',
        pergunta: "Como auditar histórico de gateways?",
        resposta: "Em 'Monitoramento' > 'Histórico Gateways', acompanhe: todas as alterações de configuração, conexões/desconexões, erros e exceções, throughput por período, latência média, mensagens processadas, e manutenções realizadas. Histórico completo com usuário responsável por cada ação, essencial para troubleshooting e auditoria."
    },
    {
        id: 119,
        category: 'backoffice',
        type: 'monitoring',
        pergunta: "Como rastrear histórico de empresas?",
        resposta: "Acesse 'Monitoramento' > 'Histórico Empresas' para visualizar linha do tempo completa: criação e ativação, alterações cadastrais, mudanças de plano, ajustes financeiros, criação/remoção de usuários, alterações de limites, e ações administrativas. Filtros avançados por tipo de evento, período e usuário responsável."
    },
    {
        id: 120,
        category: 'backoffice',
        type: 'monitoring',
        pergunta: "Como auditar histórico de usuários?",
        resposta: "Em 'Monitoramento' > 'Histórico Usuários', rastreie: logins e logouts, alterações de permissões, ações realizadas no sistema, acessos negados, tentativas de login falhadas, alterações de senha, ativação/desativação de contas, e exportação de dados. Essencial para segurança e compliance com LGPD."
    },
    {
        id: 121,
        category: 'backoffice',
        type: 'monitoring',
        pergunta: "Como analisar histórico de SMS PDUs?",
        resposta: "PDUs (Protocol Data Units) são unidades de dados do protocolo SMS. Em 'Monitoramento' > 'Histórico SMS PDUs', visualize: PDUs enviados e recebidos, parsing de campos (destination, source, message, encoding), erros de codificação, análise de concatenação de mensagens longas, e troubleshooting de problemas de entrega em nível de protocolo."
    },
    {
        id: 122,
        category: 'backoffice',
        type: 'monitoring',
        pergunta: "Como monitorar histórico de clicks?",
        resposta: "Para SMS com links encurtados, acesse 'Monitoramento' > 'Histórico Clicks': rastreie cada clique em links enviados, identifique origem geográfica (IP, cidade, estado), dispositivo utilizado, horário de clique, campanha associada, e taxa de conversão. Dados anonimizados conforme LGPD. Use para otimizar timing e conteúdo de campanhas."
    },

    // ==================== BACKOFFICE - USUÁRIOS BACKOFFICE ====================
    {
        id: 123,
        category: 'backoffice',
        type: 'backoffice-users',
        pergunta: "Como criar usuários do backoffice?",
        resposta: "Em 'Usuários Backoffice' > 'Novo Usuário', preencha: nome completo, email corporativo, senha inicial, departamento, e nível de acesso. Defina permissões granulares por módulo (operacional, financeiro, empresas, fornecedores, etc.). Configure 2FA obrigatório para usuários com acesso administrativo. Envie convite de ativação por email."
    },
    {
        id: 124,
        category: 'backoffice',
        type: 'backoffice-users',
        pergunta: "Como gerenciar permissões de usuários backoffice?",
        resposta: "Acesse 'Usuários Backoffice' > [Selecionar Usuário] > 'Permissões'. O sistema usa RBAC (Role-Based Access Control) com perfis predefinidos: Admin (acesso total), Financeiro (apenas módulos financeiros), Operacional (monitoramento e suporte), Desenvolvedor (APIs e integrações). Crie perfis customizados combinando permissões específicas."
    },
    {
        id: 125,
        category: 'backoffice',
        type: 'backoffice-users',
        pergunta: "Como gerar e resetar senhas de usuários?",
        resposta: "Para gerar senha: em 'Usuários Backoffice' > [Usuário] > 'Gerar Nova Senha'. O sistema criará senha forte aleatória e enviará por email seguro. Para reset: usuário pode solicitar via 'Esqueci minha senha' (link expira em 1 hora). Administradores podem forçar reset. Todas as ações ficam registradas em auditoria."
    },

    // ==================== BACKOFFICE - FAQ ====================
    {
        id: 126,
        category: 'backoffice',
        type: 'backoffice-faq',
        pergunta: "Como acessar logs do sistema?",
        resposta: "Logs completos estão disponíveis em 'Ferramentas' > 'Logs do Sistema'. Filtre por: nível (INFO, WARNING, ERROR, CRITICAL), módulo, período, usuário, e empresa. Logs incluem: ações de usuários, erros de sistema, integrações externas, e alterações de configuração. Exporte em CSV para análise externa. Retenção de 90 dias por padrão."
    },
    {
        id: 127,
        category: 'backoffice',
        type: 'backoffice-faq',
        pergunta: "Como fazer backup das configurações?",
        resposta: "Em 'Ferramentas' > 'Backup', você pode: exportar configurações completas do sistema (empresas, usuários, gateways, fornecedores), agendar backups automáticos (diário, semanal), armazenar em storage seguro (S3, Azure), restaurar configurações de backups anteriores, e testar integridade dos backups. Backups são criptografados e versionados."
    },
    {
        id: 128,
        category: 'backoffice',
        type: 'backoffice-faq',
        pergunta: "Qual a diferença entre SMS e Backoffice?",
        resposta: "O módulo SMS é voltado para usuários finais (empresas clientes) que enviam mensagens e gerenciam suas campanhas. O Backoffice é para administradores da plataforma que gerenciam a infraestrutura, fornecedores, empresas clientes, financeiro, e monitoramento do sistema. Backoffice tem acesso completo a todas as configurações e dados do sistema."
    }
];