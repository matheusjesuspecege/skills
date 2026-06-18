---
name: extract-patterns
description: Entrevista o dev, analisa o diff e atualiza docs/patterns.md com padrões abstratos e acionáveis. Usado ao final de uma implementação, antes ou depois de criar a PR.
---

# Skill: extract-patterns

Entrevista o desenvolvedor sobre as decisões tomadas na implementação, analisa o diff da branch e atualiza `docs/patterns.md` com padrões **abstratos e acionáveis**. Cada novo Claude lê esse arquivo antes de implementar qualquer coisa.

## Quando usar

Ao final de uma implementação, antes ou depois de criar a PR.

## Componentes

```
references/
  molecules/extract-workflow.md   ← orquestra o fluxo completo
  atoms/classify.md               ← extrai padrão abstrato de cada tipo de mudança
  atoms/reframe-positive.md       ← reescreve cada regra como alvo positivo (Point the Target)
  atoms/dedup.md                  ← decide: adicionar / atualizar / manter / alertar
  refiners/pattern-interview.md   ← entrevista guiada com o desenvolvedor
assets/
  format-entry.md                 ← como escrever cada entrada em docs/patterns.md
```

## Sequência de alto nível

```
pattern-interview (refiner)
        ↓
classify (atom) — diff + respostas do dev
        ↓
reframe-positive (atom) — cada regra vira alvo positivo
        ↓
dedup (atom) — compara com docs/patterns.md
        ↓
editar docs/patterns.md
        ↓
verificar CLAUDE.md
```

Detalhamento completo em `references/molecules/extract-workflow.md`.

## Escopo do que registrar

- Registrar **o padrão de implementação abstraído**, referenciado pelo tipo de arquivo (ex: "componente de seleção", "seeder de ingresso"). Nomes concretos de feature, componente, rota e campo ficam de fora.
- Registrar **como** algo foi feito. O motivo do requisito vive na PR.
- Quando um padrão divergir de `docs/code-style.md`, pausar e confirmar com o dev antes de escrever.
- Toda regra final segue _Point the Target_: começa com verbo no imperativo descrevendo o estado-alvo. O passo `reframe-positive` garante isso antes do dedup.
