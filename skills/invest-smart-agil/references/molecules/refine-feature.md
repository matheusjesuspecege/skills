# refine-feature

### Triggers

- Qualquer papel pede refinamento
- detect-phase retorna PHASE_REFINE
- PO diz "vamos refinar" ou "está pronto para refinar"

## Sequência de execução

```
[pedido de refinamento]
       ↓
scope-guard
  ↓
role-detect (se necessário)
  ↓
detect-phase → PHASE_REFINE
  ↓
gate-prereq
  ↓ M1 existe? → continua
  ↓ M1 ausente? → bloqueio total
[abertura do refinamento]
  ↓
[loop de contribuições por papel]
  ↓ flag --with-docs ativa AND papel ∈ {Frontend, Backend}?
    ↓ sim → load-project-context (antes de cada pendência técnica)
    ↓ não → segue direto
  ↓
format-ca (para cada CA gerado)
  ↓
check-invest (silencioso — sinaliza se houver problema)
  ↓
format-card-m2
  ↓
[card M2 entregue + instrução de próximo passo]
```

## Contribuições por papel no loop

Adapta as perguntas e o foco conforme o papel identificado.
Todos os papéis contribuem para o mesmo card M2 — não são documentos separados.

**PO:**

- Confirma e atualiza regras firmes
- Decide ambiguidades de negócio (A[N] marcadas como "para PO")
- Valida a intensidade acordada
- Não decide: contrato de API, componentes visuais

**UX/UI:**

- Apresenta o Figma e explica decisões de experiência
- Recebe feedback do frontend sobre viabilidade visual
- Define fluxo visual (desktop/mobile/estados) com o frontend
- Sinaliza ajustes que fará no Figma após o refinamento
- Não decide: endpoints, modelagem de dados

**Frontend:**

- Avalia viabilidade dos componentes propostos no Figma
- Propõe simplificações visuais quando necessário
- Combina contrato de API com o backend
- Co-escreve CAs de comportamento visual
- Não decide: regras de negócio, modelagem de banco
- Com `--with-docs`: recebe contexto do projeto (componentes em `packages/ui`, telas próximas em `apps/*`) com citações `arquivo:linha` antes de cada pendência técnica.

**Backend:**

- Propõe contrato de API (endpoints, payloads, responses, status)
- Avalia viabilidade das regras de negócio
- Decide ambiguidades técnicas (A[N] marcadas como "para backend")
- Co-escreve CAs de validação e erro
- Sinaliza riscos técnicos
- Não decide: layout, componentes de UI
- Com `--with-docs`: recebe contexto do projeto (módulos NestJS, `schema.prisma`, specs anteriores) com citações `arquivo:linha` antes de cada pendência técnica.

## Abertura do refinamento

Ao iniciar, apresentar o card M1 em resumo e as ambiguidades abertas:

```
Card inicial: [headline]
Ambiguidades a resolver hoje: A1, A2, A3...
Vamos começar pelas mais críticas.
```

## Verificação de completude antes de fechar M2

Antes de acionar `format-card-m2`, verificar:

- Todas as ambiguidades do M1 foram resolvidas? (ou explicitamente postergadas)
- Cada CA tem mensagem exata e visual?
- Contrato de API está definido (se feature envolve front-back)?
- Fluxo visual cobre desktop e mobile?
- Intensidade foi acordada por todos?

Se algum item faltar → sinalizar e perguntar se o time quer prosseguir assim.

## Output final

Card M2 completo + instrução:

```
---
Próximo passo:
· Cole o card M2 na Descrição do Work Item (substitui o M1)
· Cole os CAs no campo Acceptance Criteria
· Cole as decisões do refinamento na Discussão
· UX/UI: atualizar o Figma antes do sprint com os ajustes listados
· Devs: quando prontos para o planning, abram este chat e peçam as tasks
```
