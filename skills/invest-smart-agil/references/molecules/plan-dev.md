# plan-dev

## Triggers

- Dev (frontend ou backend) pede tasks
- detect-phase retorna PHASE_DEV
- "preciso das tasks", "pode gerar as tasks", "planning"

## Sequência de execução

```
[dev pede tasks]
       ↓
scope-guard
  ↓
role-detect (se necessário)
  ↓ papel = Frontend ou Backend
detect-phase → PHASE_DEV
  ↓
gate-prereq
  ↓ M2 com CAs existe? → continua
  ↓ M2 ausente? → bloqueio total
  ↓ contrato API ausente (front pede tasks)? → aviso + confirmação
[leitura do card M2 e dos CAs]
  ↓ flag --with-docs ativa?
    ↓ sim → load-project-context (escopo: domínio do M2)
    ↓ não → segue direto
  ↓
[geração das tasks por papel]
  ↓ format-task-smart (repetido por task)
  ↓ checkpoint entre tasks (instruction sandwich)
  ↓
[verificação de cobertura]
  ↓
[ordem de execução]
  ↓
[tasks entregues + instrução]
```

## Geração de tasks por papel

**Frontend recebe tasks de:**

- Componentes de UI e telas
- Integração com endpoints do backend
- Responsividade (desktop/mobile)
- Validações visuais e mensagens de erro
- Testes E2E dos CAs de comportamento visual

**Backend recebe tasks de:**

- Modelagem e migrations
- Endpoints (conforme contrato de API do M2)
- Validações de negócio
- Testes unitários e de integração
- Respostas de erro (status + payload)

**Com `--with-docs`:** cada task referencia `arquivo:linha` quando reusa código existente (componente em `packages/ui`, service em `apps/api/src/modules/...`, padrão de migration, etc.). A cobertura ganha bloco `REUSO IDENTIFICADO` listando o que foi aproveitado.

**Tasks compartilhadas (Frontend + Backend):**

- Integração end-to-end
- Testes de concorrência (se aplicável)
- Teste E2E do fluxo completo

## Checkpoint entre tasks (instruction sandwich)

Após cada task, antes do cabeçalho da próxima, sempre inserir o bloco:

```markdown
---
- [ ] **Checkpoint** — antes de iniciar a próxima task:
  - [ ] Testes desta task verdes + lint/format (`pnpm lint`) + typecheck (`pnpm -w exec tsc --noEmit`)
  - [ ] Commit seguindo Conventional Commits (`docs/commit.md`)
---
```

Limite: máximo de 2 itens no checkpoint. Excesso de reminders dilui o efeito.
O primeiro item agrupa o portão de qualidade da task (testes + lint + typecheck)
numa linha só; o segundo é o commit. O checkpoint é sobre **transição** entre
tasks — não repetir os demais sub-itens do `M`.

Após a última task da lista, antes do bloco `ORDEM DE EXECUÇÃO`, inserir um
checkpoint final estendido:

```markdown
---
- [ ] **Checkpoint final** — antes de abrir PR:
  - [ ] Suite completa de testes verde (`pnpm test`)
  - [ ] Lint/format OK (`pnpm lint`) e typecheck OK (`pnpm -w exec tsc --noEmit`)
  - [ ] Padrões aplicáveis revisitados em `docs/patterns.md`
---
```

## Ordem de execução

Sempre incluir após as tasks:

```
ORDEM DE EXECUÇÃO SUGERIDA:
1. Backend: [tasks de modelo e endpoints] — frontend depende disto
2. Frontend: [tasks de componentes — pode paralelar com back até integração]
3. Frontend + Backend: [integração e teste E2E conjunto]
```

## Verificação de cobertura

Sempre fechar com o bloco de cobertura do `format-task-smart`:

```
COBERTURA:
✅ CA[N] — Task [X] + Task [Y]
✅ CA[N] — Task [Z]
⚠️ CA[N] — não coberto [indicar o que falta e por quê]
```

Se algum CA ficar sem cobertura → sinalizar antes de entregar as tasks.

## Output final

Tasks + ordem + cobertura + instrução:

```
---
O que colar no Azure DevOps:
· Criar child items (Tasks) para cada task acima
· Definir responsável e estimativa em cada task
· Tasks compartilhadas: colocar ambos como responsáveis
```
