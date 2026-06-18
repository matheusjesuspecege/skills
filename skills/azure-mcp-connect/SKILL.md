---
name: azure-mcp-connect
description: "Conecta ao backlog do produto que está no Azure DevOps, permitindo que o desenvolvedor automatize processos, crie de tarefas, leia o prd das US, e obtenha informações do backlog do produto. Use quando estiver na etapa de research e está refinando o entendimento da US com o Product Owner ou durante o desenvolvimento para obter insights."
user-invocable: true
---

Esta SKILL é usada por desenvolvedores que estão trabalhando em uma US e precisam se conectar ao **Azure DevOps** para obter contexto do backlog e da US em que está trabalhando.

## Informações Fixas do Projeto

| Campo       | Valor                |
| ----------- | -------------------- |
| Organização | `pecegeti`           |
| Projeto     | `Linka Eventos`      |
| Time        | `Linka Eventos Team` |

---

## 1. Regra Fundamental

- **SIGA O REQUISITO ORIGINAL EXATAMENTE COMO FORNECIDO. SEM INVENTAR, ADICIONAR OU SUPOR ALGO QUE NÃO ESTEJA EXPRESSAMENTE DEFINIDO NA US.**
- Se há ambiguidade, pergunte ao usuário antes de prosseguir.
- Somente responda exclusivamente de acordo com as funções disponíveis. Avise o usuário e liste as opções disponíveis para uso.
- Sempre informe os próximos passos para o usuário, principalmente em momentos que ele terminou de executar uma ação, para que ele saiba o que fazer.
- **IMPORTANTE:**
  - Sempre retorne a descrição da US literalmente sem inferir ou resumir, para garantir que o usuário tenha acesso ao contexto completo da US.
  - Caso exista links ou anexos na descrição da US, informe o usuário sobre a existência desses recursos e forneça os links ou detalhes de acesso, sem resumir ou omitir informações.

---

## 2. Fluxo de Entrada (executar sempre ao invocar a SKILL)

Ao ser invocada, siga este fluxo **antes de qualquer outra ação**:

### Passo 1 — Detectar se o MCP está configurado

Tente chamar `list_projects` com `org = pecegeti`. Não solicite nenhuma informação ao usuário ainda.

- **Se a chamada funcionar (CASO A):** o MCP está configurado. Vá para o **Passo 2**.
- **Se a chamada falhar (CASO B):** o MCP não está configurado. Vá para a seção **Setup Inicial**.

### Passo 2 — MCP configurado: verificar workItemId

- Se o usuário informou um **workItemId** ao invocar a SKILL (ex: `/azure-mcp-connect 27547`):
  - Chame `get_work_item` com `org = pecegeti`, `project = Linka Eventos`, `id = <workItemId>`.
  - Apresente os detalhes do work item (título, descrição, critérios de aceite, estado, responsável).
  - Informe as **Funções Disponíveis** e aguarde instrução.
- Se **não** foi informado workItemId:
  - Informe que está conectado ao Azure DevOps do projeto **Linka Eventos**.
  - Liste as **Funções Disponíveis** e aguarde instrução.

---

## 3. Setup Inicial (CASO B — primeira vez ou PAT ausente)

Execute apenas quando o MCP não estiver configurado:

1. Solicite o **Personal Access Token (PAT)**. Se o usuário não souber como gerar, exiba o **Tutorial para Devs** abaixo.
2. Oriente o usuário a **definir a variável de ambiente** com o comando no terminal:

   **Windows (PowerShell)**

   ```
   ! $env:AZURE_DEVOPS_PAT="seu_token_aqui"
   ```

   **Mac / Linux**

   ```
   ! export AZURE_DEVOPS_PAT="seu_token_aqui"
   ```

3. Adicione o MCP ao projeto executando via terminal:
   ```
   ! claude mcp add azure-devops -- npx -y @azure-devops/mcp pecegeti
   ```
4. Oriente o usuário a **reiniciar o Claude Code** para carregar o servidor MCP.
5. Após o reinício, o usuário deve invocar `/azure-mcp-connect` novamente.

> A variável de ambiente é válida apenas para a sessão atual. Para torná-la persistente, adicione ao perfil de shell (`~/.bashrc`, `~/.zshrc`) ou às variáveis de ambiente do sistema (Windows).

---

## Tutorial para Devs

### Gerando um Personal Access Token (PAT)

1. Acesse `https://dev.azure.com/pecegeti` e faça login.
2. Clique no ícone do seu perfil (canto superior direito) → **Personal Access Tokens**.
3. Clique em **+ New Token**.
4. Defina:
   - **Name:** ex. `claude-mcp-local`
   - **Expiration:** conforme necessidade (máx. 1 ano)
   - **Scopes:** selecione **Work Items (Read & Write)** e **Project and Team (Read)**
5. Clique em **Create** e copie o token gerado (ele só é exibido uma vez).

---

## Funções Disponíveis

Lista das principais funções disponíveis após conexão com o MCP:

| Função                  | Descrição                                                                                                  |
| ----------------------- | ---------------------------------------------------------------------------------------------------------- |
| `get_work_item`         | Lê os detalhes de um work item pelo ID (título, descrição, critérios de aceite, estado, responsável, etc.) |
| `list_work_items`       | Lista work items de um projeto com filtros opcionais (tipo, estado, iteração, área)                        |
| `create_work_item`      | Cria um novo work item (User Story, Task, Bug, etc.) em um projeto                                         |
| `update_work_item`      | Atualiza campos de um work item existente (estado, responsável, estimativa, etc.)                          |
| `add_work_item_comment` | Adiciona um comentário a um work item                                                                      |
| `list_projects`         | Lista todos os projetos da organização                                                                     |
| `get_project`           | Obtém detalhes de um projeto específico                                                                    |
| `list_iterations`       | Lista as iterações (sprints) de um projeto ou time                                                         |
| `get_current_iteration` | Retorna a iteração atual do time                                                                           |
| `list_teams`            | Lista os times de um projeto                                                                               |
| `list_repositories`     | Lista os repositórios Git da organização/projeto                                                           |
| `get_repository`        | Obtém detalhes de um repositório específico                                                                |
| `list_pull_requests`    | Lista pull requests de um repositório com filtros de estado                                                |
| `get_pull_request`      | Obtém detalhes de um pull request pelo ID                                                                  |
| `run_wiql_query`        | Executa uma query WIQL para buscas avançadas no backlog                                                    |

> As funções disponíveis dependem das permissões do PAT configurado.
