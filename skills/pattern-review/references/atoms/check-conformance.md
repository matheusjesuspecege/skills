# Atom: check-conformance

## Função

Confronta cada arquivo no escopo contra o checklist de regras (de `load-conventions`) e produz a lista bruta de achados. É o núcleo da revisão.

## Entrada

- Arquivos agrupados por tipo (`read-diff`)
- Checklist de regras indexado por categoria (`load-conventions`)

## Como confrontar

1. **Ler cada arquivo por inteiro** com a ferramenta Read — não apenas o trecho do diff. Estrutura, imports, naming e contexto precisam da visão completa.
2. Para cada arquivo, rodar **apenas as regras da(s) categoria(s) que se aplicam** ao tipo dele (um `*-schema.ts` roda as regras de Formulários/Schema; um `*.test.tsx` roda as de Testes; etc.).
3. Para cada regra aplicável, decidir um dos quatro resultados:
   - **Segue** → registrar como conformidade (✅) quando for um padrão central e bem executado (não listar trivialidades).
   - **Viola** → registrar como achado, com `arquivo:linha` e a regra citada.
   - **Dívida marcada** → se há `// TODO: ... — substituir por dados do backend` (ou equivalente Mock-First) cobrindo o ponto, **não é violação** — registrar como conformidade com o padrão Mock-First.
   - **Ambíguo** → registrar como ponto de atenção, explicando por que é defensável.

## Regras de disciplina

- **Sempre citar `arquivo:linha`.** Achado sem localização não entra na lista.
- **Sempre citar a regra** (qual doc/seção). "Está errado" sem regra não é achado de conformidade.
- **Não inventar regra.** Se o comportamento não é coberto por `patterns.md` nem `code-style.md`, não é achado desta skill — ignorar (ou, se relevante e fora de escopo, mencionar de leve nos pontos neutros).
- **Distinguir desvio de dívida consciente.** O padrão Mock-First trata `// TODO` marcado como conformidade, não desvio. Um valor mágico **sem** TODO é desvio; **com** TODO é dívida aceitável.
- **Conformidade forte conta.** Reservar ✅ para os padrões centrais bem executados (schema composto, React Query como fonte única, variant union, teste com helper + userEvent). Não encher de ✅ triviais.
- **Conflito entre docs.** Se a regra de `patterns.md` contradiz `code-style.md`, marcar como `CONFLITO-DOCS` — não classificar como violação do dev.

## Sinais comuns por categoria (atalhos de detecção)

| Sinal no código | Regra provavelmente violada |
| --------------- | --------------------------- |
| String em PT/EN literal dentro de JSX (fora de `t(...)`) | i18n: zero strings literais |
| `: string` / `: number` / `: Tipo[]` em fn cujo corpo já infere | code-style: inferência preferida a anotação redundante |
| `useState` espelhando um campo que já está no form | Formulários: derivar via `watch()`/`setValue()` |
| `form`/`control` passado por prop a um filho dentro do mesmo `<Form>` | Formulários: usar `useFormContext` |
| Mesma fn pura definida em 2+ arquivos (ex: `toMin`) | Componentes/Localização: reúso de helper puro colocalizado |
| `any` onde caberia `unknown` ou tipo concreto | code-style: `unknown` em vez de `any` |
| Cond. ternário usado só pelo efeito colateral (`a ? x() : y()`) | Biome: expressão-statement; preferir `if/else` |
| Valor numérico/string fixo no JSX sem TODO | Mock-First: marcar dado provisório, ou i18n |
| Componente local usado por 2 módulos sem subir para ancestral comum | Localização: mover para `ui/components/` ancestral |
| `fireEvent` em teste | Testes: usar `userEvent` |
| `getByTestId`/seletor de classe onde cabe `getByRole`/`getByText` | Testes: query por papel/texto |

## Output

Lista bruta de achados:

```
REGRA: [enunciado + origem (patterns.md §X / code-style.md §Y)]
ARQUIVO: [caminho:linha]
OBSERVAÇÃO: [o que foi encontrado, em uma frase]
TIPO: [segue | viola | divida-marcada | ambiguo | conflito-docs]
RECOMENDAÇÃO: [ação concreta — obrigatória quando TIPO=viola ou ambiguo]
```

Passar para `atoms/classify-findings.md`.
