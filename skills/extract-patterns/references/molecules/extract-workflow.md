# Molecule: extract-workflow

## Função

Orquestra o fluxo completo de extração de padrões: entrevista o dev, analisa o diff e atualiza `docs/patterns.md`.

## Sequência

```
[1] Ler diff
        ↓
[2] pattern-interview   ←  perguntas ao dev (refiner)
        ↓
[3] classify            ←  diff + respostas → lista de padrões candidatos
        ↓
[4] reframe-positive    ←  cada regra vira alvo positivo (Point the Target)
        ↓
[5] dedup               ←  compara com docs/patterns.md atual
        ↓
[6] Editar docs/patterns.md
        ↓
[7] Verificar CLAUDE.md
```

---

## Passo 1 — Ler diff

> Antes de executar, exibir no terminal: `🔍 [extract-patterns] lendo diff da branch…`

Executar:

- `git diff main..HEAD --name-only` → lista de arquivos alterados
- `git diff main..HEAD` → conteúdo das mudanças

Agrupar por tipo: componentes, testes, rotas, i18n, schema/migration, seeders, utilitários.

Passar o agrupamento para o passo 3 (manter interno até a entrevista terminar).

---

## Passo 2 — Entrevistar o dev

> Antes de executar, exibir no terminal: `🎤 [extract-patterns] iniciando entrevista com o dev…`

Acionar `refiners/pattern-interview.md`.

Aguardar as respostas antes de prosseguir.

---

## Passo 3 — Classificar

> Antes de executar, exibir no terminal: `⚙️ [atom: classify] extraindo padrões do diff + respostas…`

Acionar `atoms/classify.md` com:

- Agrupamento do diff (passo 1)
- Respostas do dev (passo 2)

Output: lista de padrões candidatos no formato `CATEGORIA / REGRA / OBSERVADO EM`.

---

## Passo 4 — Reescrever como alvo positivo

> Antes de executar, exibir no terminal: `✨ [atom: reframe-positive] reescrevendo candidatos como alvos positivos…`

Acionar `atoms/reframe-positive.md` com a lista de padrões candidatos (passo 3).

Output: mesma lista, com cada `REGRA` em forma de alvo positivo conforme heurísticas de Point the Target.

---

## Passo 5 — Deduplicar

> Antes de executar, exibir no terminal: `🧹 [atom: dedup] comparando com docs/patterns.md…`

Acionar `atoms/dedup.md` com:

- Lista de padrões reescritos (passo 4)
- Conteúdo atual de `docs/patterns.md`

Output: lista de ações `[adicionar | atualizar | manter | alertar]`.

---

## Passo 6 — Editar docs/patterns.md

> Antes de executar, exibir no terminal: `📝 [extract-patterns] atualizando docs/patterns.md…`

Aplicar todas as ações do passo 5.
Formato de cada entrada: ver `assets/format-entry.md`.

Quando a ação for `alertar`: exibir o conflito com `docs/code-style.md` ao dev e aguardar confirmação antes de escrever.

---

## Passo 7 — Verificar CLAUDE.md

> Antes de executar, exibir no terminal: `✅ [extract-patterns] verificando CLAUDE.md…`

Quando `docs/patterns.md` ainda estiver fora da tabela de convenções do `CLAUDE.md`, adicionar:

```
| Padrões emergentes de implementação | [docs/patterns.md](./docs/patterns.md) |
```

---

## Desvios

| Situação                                             | Ação                                                                   |
| ---------------------------------------------------- | ---------------------------------------------------------------------- |
| Dev responde "nada a declarar" em todas as perguntas | Prosseguir com o que o diff revelou                                    |
| Diff contém apenas arquivos de config ou lock        | Encerrar e comunicar ao dev que este diff fica fora do escopo da skill |
| Padrão candidato diverge de `docs/code-style.md`     | Pausar, mostrar o conflito ao dev e seguir somente com confirmação     |
