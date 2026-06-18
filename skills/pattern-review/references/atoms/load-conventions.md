# Atom: load-conventions

## Função

Carrega `docs/patterns.md` e `docs/code-style.md` e os transforma em um **checklist interno** de regras verificáveis, indexado por categoria. É a base de comparação de toda a revisão — sem ele não há critério objetivo.

## Como carregar

1. Ler `docs/patterns.md` por inteiro.
2. Ler `docs/code-style.md` por inteiro.
3. Para cada bullet/regra, extrair: **categoria · enunciado da regra · como verificar no código**.

> Não memorizar de cabeça nem assumir que conhece as regras — **sempre reler os dois arquivos**. Eles são atualizados pela skill `extract-patterns` ao final de cada feature e mudam com frequência.

## Categorias de `docs/patterns.md` (mapa de verificação)

| Categoria | O que verificar no código |
| --------- | ------------------------- |
| Localização de Arquivos | Componente reutilizável em `ui/components/`? Subcomponente de tela inline ou em `components/` local? Helper puro `.ts` colocalizado com `.test.ts`? Teste ao lado do testado? Import cruza fronteira de módulo vizinho? |
| Componentes | Props tipadas com `interface`? `cn()` para classes condicionais? Constantes/funções sem dep do render declaradas fora do componente? `variant` com union literal despachando p/ subcomponentes locais? Accordion do Arandu em vez de `useState(expanded)`? Dado buscado internamente em vez de prop drilling? |
| Testes | Usa o helper `render` de `tests/test-utils/render.tsx`? `userEvent` (não `fireEvent`)? Query por texto/role (não classe CSS)? Primeiro `it` valida estado inicial? Mock de Arandu select/toggle como primitivo HTML nativo? Lógica pura testada em `describe` próprio? Mock do hook de query? |
| Formulários | `watch()`/`setValue()` em vez de `useState` paralelo? Erro de regra via `setError('root')`? Schema em `*-schema.ts`? `superRefine` para cross-field? `defaultValues` como função nomeada? `useFormContext` em subcomponentes? `useFieldArray` para lista dinâmica? `JSON.stringify` em deps de objetos de `watch()`? Hook derivado privado colocalizado? |
| Dados de Servidor | Cache do React Query como fonte única? Cada componente chama o próprio hook? Reconciliação por `invalidateQueries` no `onSuccess`? `queryKey` hierárquico? Efeito pós-mutation via `mutate(payload, { onSuccess })`? |
| Rotas | Tela nova registrada como lazy com named export em `routes.private.tsx`? |
| i18n | Zero strings literais no JSX? Reutiliza chave genérica antes de criar? Pluralização `_one`/`_other`? Strings com `\n` + `whitespace-pre-line`? Arquivo de destino correto? |
| API — Seeders e Factories | Factory `static create()` retornando objeto plano? Named constructors chamam `create()`? Seeder `@Injectable()`? Seeder injeta outro seeder via DI? Tempo recorrente em minutos desde meia-noite? |
| Mock-First / TODOs | Dado provisório do FE marcado com `// TODO: ... — substituir por dados do backend`? Stub via `initialData` na query com JSDoc de troca? |

## Categorias de `docs/code-style.md` (mapa de verificação)

| Categoria | O que verificar |
| --------- | --------------- |
| Biome | Indent 2 espaços, line width 120, single quotes, sempre semicolons, trailing comma `all`, LF |
| TypeScript | `interface` sobre `type` para objetos? `unknown` em vez de `any`? **Inferência preferida a anotação redundante** (omitir `: tipo` de retorno/variável quando o compilador infere)? |
| Nomenclatura | camelCase (var/fn), PascalCase (componente), `use*` (hook), SCREAMING_SNAKE_CASE (constante), CONSTANT_CASE (enum), kebab-case (arquivo/pasta) |
| Imports | Path alias `@/*`? Organização automática Biome? Aliases da API (`@app/`, `@auth/`, `@common/`)? |
| Error Handling | API com exception filters NestJS? FE com `react-hook-form` + `zod` + toast? |

## Output

Checklist interno (não exibido ao dev), pronto para `atoms/check-conformance.md` consultar regra a regra. Manter a referência da origem de cada regra (qual doc e seção) para citar no diagnóstico.
