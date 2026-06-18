# load-project-context

## Quando acionar

- Flag `--with-docs` está ativa no chat
- Papel atual ∈ {Frontend, Backend}
- Workflow em curso é `refine-feature` (antes de cada pendência técnica)
  ou `plan-dev` (antes de gerar as tasks)

## Quando NÃO acionar

- Flag ausente ou `--no-docs` em vigor
- Papel é PO ou UX/UI
- Pendência é puramente de negócio (sem implicação técnica visível)
- Pedido fora de feature (já barrado por `scope-guard`)

## Input esperado

- Headline da feature + domínio identificado
- Papel atual (Frontend ou Backend)
- Contexto pontual:
  - Em `refine-feature`: a pendência aberta sob discussão (A[N])
  - Em `plan-dev`: o card M2 completo + CAs

## Áreas do repositório por papel

**Backend:**

- `apps/api/src/modules/**` — módulos NestJS existentes
- `apps/api/prisma/schema.prisma` — modelo de dados atual
- `specs/features/**/prd.md` e `research.md` — decisões prévias
- `docs/structure.md`, `docs/code-style.md`, `docs/testing.md` — convenções

**Frontend:**

- `apps/{organizer,backoffice,participant}/src/**` — telas e fluxos
- `packages/ui/**` — componentes reutilizáveis
- `specs/features/ui/**` — decisões de UI prévias
- `docs/structure.md`, `docs/code-style.md` — convenções

## Estratégia de busca

1. Extrair termos-chave da headline e da pendência (domínio + verbo + entidade).
2. Glob nas áreas do papel para localizar arquivos do domínio.
3. Grep dirigido pelos termos-chave nos arquivos encontrados.
4. Ler apenas o necessário para responder a pendência — sem varredura
   exaustiva. Se nada relevante aparecer em duas tentativas, parar.
5. **Não ler arquivos `.pen`** — usar tools MCP `pencil` se design for
   relevante.

## Output entregue ao dev no chat

Antes da pergunta original do loop (refinamento) ou antes da task (planning),
apresentar:

```
📎 Contexto do projeto para [pendência | escopo da task]:

· Já existe: [achado em linguagem direta] — `caminho/arquivo.ts:linha`
· Convenção aplicável: [regra] — `docs/...`
· Lacuna real: [o que NÃO existe e precisa decidir agora]
· Sugestão para revisar: [proposta concreta marcada como sugestão]

Faz sentido seguir por aqui ou prefere outro caminho?
```

Em `plan-dev`, o output integra cada task SMART:

- Descrição da task cita `arquivo:linha` quando reusa código existente.
- Fechar a cobertura com linha extra:

```
REUSO IDENTIFICADO:
· [recurso reusado] — `caminho:linha`
· [recurso reusado] — `caminho:linha`
```

## Regras críticas

- **Nunca decidir pelo dev.** O atom traz fatos e marca propostas como
  sugestão. O dev valida ou rejeita.
- **Sempre citar `arquivo:linha`.** Sem citação verificável, não afirmar
  que algo "já existe".
- **Quando não achar nada relevante, dizer isso.** Frase padrão:
  *"Não achei contexto relevante para essa pendência no projeto —
  decida pelo card e pela conversa do time."* Nunca inventar achado.
- **Não duplicar a varredura.** Se a mesma área já foi consultada no
  mesmo turno, reusar o resultado.
- **Não escrever no projeto.** Este atom é read-only.

## Saída interna (para o molecule chamador)

```
CONTEXTO — load-project-context
Pendência/Escopo: [texto]
Achados:
  · [achado] — arquivo:linha
  · [achado] — arquivo:linha
Convenções:
  · [regra] — docs/...
Lacuna: [o que falta decidir]
Sugestão: [proposta]
```
