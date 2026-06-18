# Atom: read-diff

## Função

Lê o diff da branch atual e agrupa os arquivos alterados por tipo, para que o confronto com os padrões seja feito categoria a categoria.

## Comandos

| Flag | Comando |
| ---- | ------- |
| (padrão) | `git diff main..HEAD --name-only` + `git diff main..HEAD` |
| `--staged` | `git diff --staged --name-only` + `git diff --staged` |
| `--target <caminho>` | `git diff main..HEAD --name-only -- <caminho>` + `git diff main..HEAD -- <caminho>` |

> Se a branch principal do repo não for `main`, usar a base correta (ex: `git merge-base HEAD origin/main`). Confirmar com `git rev-parse --abbrev-ref HEAD` qual é a branch atual antes de comparar.

## Agrupamento por tipo

Classificar cada arquivo alterado em uma das categorias (espelham as seções de `docs/patterns.md`):

| Categoria | Sinais |
| --------- | ------ |
| Componentes | `*.tsx` em `ui/components/` ou `ui/pages/` sem ser form/teste |
| Formulários | `*.tsx`/`*.ts` com `useForm`, `useFormContext`, `*-schema.ts` |
| Schemas zod | `*-schema.ts` |
| Dados de servidor | hooks de query, `use-*.ts`, `*Keys`, `useMutation` |
| Helpers puros | `*.ts` sem JSX, funções exportadas puras (ex: parsing, conversão) |
| Testes | `*.test.ts` / `*.test.tsx` |
| Rotas | `routes.*.tsx` |
| i18n | `messages/**/*.json` |
| API — Seeders/Factories | `*.factory.ts`, `*.seeder.ts`, `*.service.ts` em `apps/api` |
| Config/lock | `package.json`, `*.lock`, `biome.json`, `tsconfig.*` |

## Condições de encerramento antecipado

- Diff vazio → retornar `DIFF_EMPTY`. O workflow encerra com a mensagem padrão.
- Diff só com Config/lock → retornar `DIFF_CONFIG_ONLY`. O workflow comunica que não há código de aplicação para revisar.

## Output

```
GRUPO: [categoria]
ARQUIVOS:
  - [caminho relativo]
  - ...
```

Passar o agrupamento para `atoms/check-conformance.md`. Os arquivos de cada grupo serão lidos por inteiro (não só o trecho do diff) na etapa de confronto.
