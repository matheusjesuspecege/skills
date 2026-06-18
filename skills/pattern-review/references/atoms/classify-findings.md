# Atom: classify-findings

## Função

Atribui severidade e prioridade de correção a cada achado bruto de `check-conformance`, para que o diagnóstico final apresente o que importa primeiro.

## Severidade

| Severidade | Critério | Exemplos |
| ---------- | -------- | -------- |
| 🔴 Alta | Viola regra explícita com impacto em manutenção, contrato ou consistência do padrão central | String literal no JSX (zero-literais), `any` evitável, prop drilling onde o padrão manda `useFormContext`, `useState` paralelo ao form, componente reutilizado sem subir para ancestral comum |
| 🟡 Média | Desvio real, localizado e de baixo impacto; correção mecânica | Anotação de tipo redundante, ternário-statement por efeito colateral, helper puro duplicado, query por `getByTestId` onde cabe `getByRole` |
| 🔵 Baixa | Inconsistência estética ou dívida não marcada | `export function` vs arrow const, nome de arquivo que esconde papel secundário, valor mágico sem TODO, `id` reescrito sem comentário |
| ✅ Conformidade | Padrão central seguido corretamente | Schema zod composto, React Query como fonte única, `variant` union, teste com helper + `userEvent`, pluralização i18n, TODOs Mock-First marcados |
| ⚠️ Conflito-docs | `patterns.md` contradiz `code-style.md` no ponto | Sinalizar a divergência entre os docs, não culpar o dev |

## Regra de prioridade

Ordenar os desvios para o "Resumo acionável" assim:

1. 🔴 que também são correção rápida e de baixo risco (ganho imediato).
2. 🔴 que exigem decisão de design (sinalizar que precisa do dev).
3. 🟡 mecânicos.
4. 🔵 estéticos.

Dívida marcada (Mock-First com TODO) **não entra** na lista de desvios — vai para conformidade.

## Disciplina de classificação

- **Falso positivo é pior que falso negativo.** Em dúvida entre 🟡 e ✅, ou entre violação e ponto defensável, classificar como ponto de atenção (não como violação dura) e explicar o porquê.
- **Não inflar severidade.** Inconsistência estética é 🔵, não 🔴. Reservar 🔴 para o que de fato dói manter ou quebra um padrão central.
- **Conformidade forte é parte do diagnóstico** — não suprimir os ✅ para "só mostrar problema".

## Output

Cada achado classificado:

```
SEVERIDADE: [🔴 | 🟡 | 🔵 | ✅ | ⚠️]
CATEGORIA: [seção de patterns.md / code-style.md]
ARQUIVO: [caminho:linha]
DESCRIÇÃO: [observação]
REGRA: [enunciado + origem]
RECOMENDAÇÃO: [ação concreta — vazio para ✅]
PRIORIDADE: [1..N — só para desvios]
```

Passar para `assets/format-diagnostic.md`.
