# format-task-smart

## Input esperado

- Papel: Frontend ou Backend
- Nome descritivo da task
- Escopo técnico (o que exatamente está envolvido)
- Definição de pronto (como saber que terminou)
- Pré-requisitos e dependências (o que precisa existir antes)
- Qual critério de aceitação esta task viabiliza
- Estimativa de duração e sinal de alerta

## Output gerado

```markdown
### TASK [N] [PAPEL]: [nome descritivo]

- [ ] **S** — [escopo técnico concreto — o que exatamente está envolvido,
       sem ambiguidade de fronteira com outras tasks]
- [ ] **M** — Definição de pronto:
  - [ ] Funcionalidade entrega o comportamento descrito em S
  - [ ] Testes incluídos: [tipo conforme papel — unit/integração/E2E/contrato]
  - [ ] Lint/format OK (`pnpm lint`) e typecheck OK (`pnpm -w exec tsc --noEmit`)
  - [ ] Code review aprovado
- [ ] **A** — [pré-requisitos · dependência de outras tasks · a quem pedir ajuda]
- [ ] **R** — Viabiliza [CA[N], CA[M]...]
- [ ] **T** — [estimativa] · alerta se passar de [limite]
```

## Regras de aplicação

**S — Specific:**

- Escopo deve ser específico o suficiente para não sobrepor com outra task
- Incluir: o que é feito, onde, com que input/output
- Não incluir: decisões de implementação que pertencem ao dev

**M — Measurable:**

- Sempre incluir quatro sub-checkboxes fixos: funciona + testes + lint/typecheck + code review
- O tipo de teste varia por papel e deve aparecer no sub-item de testes:
  - Frontend: unitário, E2E ou visual
  - Backend: unitário, integração ou contrato
- O sub-item de lint/typecheck é fixo: `pnpm lint` (Biome) + `pnpm -w exec tsc --noEmit`
- Não adicionar outros sub-itens além desses quatro — o checkpoint entre tasks cobre transição

**A — Achievable:**

- Declarar dependência de tasks de outra pessoa explicitamente
  (ex: "depende da Task 2 do backend — endpoint precisa estar disponível")
- Indicar a quem pedir ajuda se a estimativa estourar

**R — Relevant:**

- Referenciar o CA pelo número (ex: "viabiliza CA1, CA3")
- Se a task não se conecta a nenhum CA, questionar se deve existir

**T — Time-boxed:**

- Estimativa em horas ou dias (não story points)
- Sempre incluir o sinal de alerta ("alerta se passar de X")
- Se estimativa for incerta → indicar spike antes de estimar

## Bloco de cobertura (obrigatório ao final de um conjunto de tasks)

Após gerar todas as tasks de uma feature, sempre fechar com:

```
COBERTURA:
✅ CA[N] — Task [X] + Task [Y]
✅ CA[N] — Task [Z]
⚠️ CA[N] — não coberto [indicar o que falta]
```

## Exemplo

```markdown
### TASK 2 [BACKEND]: Endpoint de criação de sessão

- [ ] **S** — POST /ingressos/{id}/sessoes: recebe {dia, hora_inicio, hora_fim,
       credenciamento_inicio, credenciamento_fim, vagas, valor}. Valida conflito
       de horário (bordas exclusivas). Pré-preenche vagas e valor com defaults
       do ingresso se não informados. Respostas: 201, 409 (conflito + id e
       horário da conflitante), 422 (validação de campo).
- [ ] **M** — Definição de pronto:
  - [ ] Endpoint responde 201 no happy path, 409 em conflito, 422 em validação
  - [ ] Testes de integração: happy path, conflito detectado, bordas exclusivas
        OK, ingressos diferentes não conflitam, validações de campo individuais
  - [ ] Lint/format OK (`pnpm lint`) e typecheck OK (`pnpm -w exec tsc --noEmit`)
  - [ ] Code review aprovado
- [ ] **A** — Depende da Task 1 (modelo de Sessão no banco). Se concorrência
       gerar problema, usar FOR UPDATE — pedir ajuda ao tech lead.
- [ ] **R** — Viabiliza CA2, CA3, CA4, CA5.
- [ ] **T** — ~4h · alerta se passar de 1 dia.
```
