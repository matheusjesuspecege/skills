---
name: pattern-review
description: "Revisa o trabalho da branch atual contra docs/patterns.md e docs/code-style.md e entrega um diagnóstico de conformidade. Use ao final de uma implementação, antes ou depois de abrir a PR, quando o dev quer saber se a feature seguiu os padrões do projeto."
---

# Skill: pattern-review

Lê o diff da branch atual, confronta cada arquivo alterado contra `docs/patterns.md` (padrões emergentes de implementação) e `docs/code-style.md` (Biome, TypeScript, nomenclatura), e entrega um **diagnóstico de conformidade** com achados classificados por severidade e recomendações acionáveis.

Esta skill **não reescreve código** por padrão — ela diagnostica. A correção dos achados é uma etapa separada, oferecida ao dev ao final (ver flag `--fix`).

## Quando usar

- Ao final de uma implementação, antes ou depois de criar a PR.
- Quando o dev pergunta "essa feature seguiu os padrões?" ou pede revisão de conformidade.
- Quando quer um parecer antes de pedir review humano.

## Quando NÃO usar

- Para revisão de segurança ou de bugs de lógica → fora do escopo (esta skill mede **conformidade com os padrões documentados**, não correção funcional).
- Quando não há diff em relação a `main` → comunicar e encerrar.

---

## Componentes

```
references/
  molecules/review-workflow.md     ← orquestra o fluxo completo
  atoms/read-diff.md                ← lê e agrupa o diff da branch
  atoms/load-conventions.md         ← carrega patterns.md + code-style.md como checklist
  atoms/check-conformance.md        ← confronta cada arquivo com cada regra → achados
  atoms/classify-findings.md        ← atribui severidade e prioridade a cada achado
refiners/
  scope-confirm.md                  ← confirma o alvo da revisão quando o diff é ambíguo
assets/
  format-diagnostic.md              ← formato do diagnóstico final entregue ao dev
```

## Sequência de alto nível

```
read-diff (atom) — git diff main..HEAD
        ↓
load-conventions (atom) — patterns.md + code-style.md → checklist
        ↓
[scope-confirm] — só se o diff for grande/ambíguo (refiner)
        ↓
check-conformance (atom) — cada arquivo × cada regra → lista de achados
        ↓
classify-findings (atom) — severidade + prioridade
        ↓
format-diagnostic (asset) — diagnóstico final
        ↓
[--fix] — oferecer aplicar correções de baixo risco (opt-in)
```

Detalhamento completo em `references/molecules/review-workflow.md`.

---

## Flags

- `--target <caminho>` — restringe a revisão a um diretório/arquivo específico em vez de todo o diff da branch (ex: `--target apps/organizer/src/ui/pages/event/steps/tickets/sessions-manager/`). Útil quando a branch toca vários módulos e o dev quer focar em um.
- `--fix` — ao final do diagnóstico, oferecer aplicar as correções de baixo risco (severidade média/baixa, mecânicas) com confirmação. Sem a flag, a skill apenas diagnostica.
- `--staged` — revisa apenas o que está em staging (`git diff --staged`) em vez de `main..HEAD`. Útil para revisar antes de commitar.
- Sem flag: diagnostica todo o diff `main..HEAD`, sem aplicar correções.

---

## Escopo do que avaliar

- Avaliar **somente** conformidade com `docs/patterns.md` e `docs/code-style.md`. Não opinar sobre arquitetura de produto, escolha de lib ou correção funcional — isso é fora do escopo.
- Cada achado **cita o arquivo:linha** e **a regra** que está sendo violada (ou seguida). Sem citação, não é achado.
- Distinguir **desvio real** de **dívida consciente já marcada** (ex: `// TODO: ... — substituir por dados do backend`). Dívida marcada conforme o padrão Mock-First não é desvio — é conformidade.
- Reconhecer **conformidade forte** explicitamente, não só listar problemas. O diagnóstico abre com o que foi bem feito.
- Quando uma regra de `patterns.md` divergir de `code-style.md`, sinalizar o conflito entre os docs ao dev — não escolher um lado silenciosamente.

---

## Tom e Comportamento Geral

- Direto e técnico — o público é o dev que escreveu o código.
- Nunca narrar o processo interno ("vou ler o diff", "agora classifico") — entregar o diagnóstico.
- Não mencionar "atom", "molecule", "refiner", "checklist interno" ao dev.
- Achado de conformidade sempre vem com a **regra citada** e a **recomendação concreta** — nunca "está errado" sem o caminho de correção.
- Falso positivo é pior que falso negativo: quando em dúvida se algo é desvio, classificar como "ponto de atenção" e explicar, não afirmar violação.
- Não aplicar correção sem `--fix` e sem confirmação explícita.

---

## Severidades

| Severidade | Significado | Exemplo |
| ---------- | ----------- | ------- |
| 🔴 Alta | Viola regra explícita de `patterns.md`/`code-style.md` com impacto em manutenção ou no contrato | String literal no JSX (zero-literais), `any` onde cabe `unknown`, prop drilling onde o padrão manda `useFormContext` |
| 🟡 Média | Desvio real, mas localizado e de baixo impacto | Anotação de tipo redundante onde a inferência basta, ternário-statement por efeito colateral, duplicação de helper puro |
| 🔵 Baixa | Inconsistência estética ou dívida não marcada | `export function` vs arrow const, nome de arquivo que esconde segundo papel, valor mágico sem TODO |
| ✅ Conformidade | Padrão seguido corretamente — registrar como reforço positivo | Schema zod composto, React Query como fonte única, teste com `render` helper + `userEvent` |

---

## Glossário Rápido

| Termo | Definição |
| ----- | --------- |
| Desvio | Código que contraria uma regra documentada |
| Dívida consciente | Atalho deliberado já marcado com `// TODO` conforme o padrão Mock-First |
| Ponto de atenção | Algo que parece desvio mas é defensável ou ambíguo — sinalizado sem acusar |
| Conformidade forte | Padrão seguido à risca — registrado como reforço positivo |
| Diff da branch | `git diff main..HEAD` — o trabalho feito na branch atual |
