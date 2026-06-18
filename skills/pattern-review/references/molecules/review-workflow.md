# Molecule: review-workflow

## Função

Orquestra o fluxo completo da revisão de conformidade: lê o diff da branch, carrega os padrões documentados, confronta arquivo por arquivo e entrega o diagnóstico.

## Sequência

```
[1] read-diff           ←  git diff main..HEAD → arquivos agrupados por tipo
        ↓
[2] load-conventions    ←  patterns.md + code-style.md → checklist de regras
        ↓
[3] scope-confirm       ←  só se o diff for grande/ambíguo (refiner)
        ↓
[4] check-conformance   ←  cada arquivo × cada regra → lista de achados
        ↓
[5] classify-findings   ←  severidade + prioridade por achado
        ↓
[6] format-diagnostic   ←  monta e entrega o diagnóstico final
        ↓
[7] oferecer --fix      ←  só se a flag estiver ativa (opt-in)
```

---

## Passo 1 — Ler o diff

> Antes de executar, exibir no terminal: `🔍 [pattern-review] lendo diff da branch…`

Acionar `atoms/read-diff.md`.

- Sem flag: `git diff main..HEAD`.
- Com `--staged`: `git diff --staged`.
- Com `--target <caminho>`: limitar o diff ao caminho (`git diff main..HEAD -- <caminho>`).

Output: arquivos alterados agrupados por tipo (componentes, forms, schemas, hooks/query, testes, rotas, i18n, helpers puros, seeders/factories, config).

Quando o diff vier vazio: encerrar e comunicar `Nenhuma alteração em relação a main — nada a revisar.`

---

## Passo 2 — Carregar convenções

> Antes de executar, exibir no terminal: `📋 [pattern-review] carregando docs/patterns.md e docs/code-style.md…`

Acionar `atoms/load-conventions.md`.

Output: checklist interno de regras, indexado por categoria, pronto para confronto. Manter em memória — não exibir ao dev.

---

## Passo 3 — Confirmar escopo (condicional)

> Só executar quando o diff tocar **mais de um módulo** ou **mais de ~15 arquivos** e não houver `--target`.

Acionar `refiners/scope-confirm.md` para confirmar o alvo da revisão antes de gastar análise em arquivos que o dev não quer revisar.

Quando o diff for pequeno ou já houver `--target`: **pular este passo**.

---

## Passo 4 — Confrontar conformidade

> Antes de executar, exibir no terminal: `⚙️ [pattern-review] confrontando arquivos com os padrões…`

Acionar `atoms/check-conformance.md` com:

- Arquivos agrupados (passo 1)
- Checklist de regras (passo 2)

Para isso é necessário **ler o conteúdo de cada arquivo no escopo** (não só o diff — o arquivo inteiro, para avaliar estrutura, imports, naming e contexto). Usar a ferramenta Read.

Output: lista bruta de achados no formato `REGRA / ARQUIVO:LINHA / OBSERVAÇÃO / TIPO`.

---

## Passo 5 — Classificar

> Antes de executar, exibir no terminal: `🏷️ [pattern-review] classificando achados por severidade…`

Acionar `atoms/classify-findings.md` com a lista bruta (passo 4).

Output: cada achado recebe severidade (🔴 alta / 🟡 média / 🔵 baixa / ✅ conformidade) e ordem de prioridade de correção.

---

## Passo 6 — Montar o diagnóstico

> Antes de executar, exibir no terminal: `📝 [pattern-review] montando diagnóstico…`

Aplicar `assets/format-diagnostic.md`. Entregar ao dev:

1. Veredito geral (uma frase).
2. Tabela de conformidade forte (✅).
3. Desvios e pontos de atenção, agrupados por severidade, cada um com arquivo:linha + regra + recomendação.
4. Pontos neutros (parecem desvio mas não são).
5. Resumo acionável priorizado.

---

## Passo 7 — Oferecer correção (condicional)

> Só executar quando `--fix` estiver ativa.

Listar os achados de severidade 🟡 média e 🔵 baixa que são mecânicos e de baixo risco. Pedir confirmação ao dev (uma `AskUserQuestion` com a lista) antes de aplicar. Nunca aplicar 🔴 alta automaticamente sem o dev revisar — essas costumam exigir decisão de design.

Após aplicar, rodar o lint local quando disponível (`pnpm biome check` ou equivalente do projeto) para confirmar que as correções não quebraram a formatação.

---

## Desvios

| Situação | Ação |
| -------- | ---- |
| Diff vazio (`main..HEAD` sem mudanças) | Encerrar: "Nenhuma alteração em relação a main — nada a revisar." |
| Diff contém apenas config/lock files | Comunicar que não há código de aplicação para revisar e encerrar |
| `docs/patterns.md` ou `docs/code-style.md` ausente | Avisar o dev que falta a base de comparação e revisar só contra o doc disponível |
| Regra de `patterns.md` conflita com `code-style.md` | Sinalizar o conflito entre os docs no diagnóstico, sem escolher um lado |
| Dev pediu revisão de bug/segurança | Esclarecer que esta skill mede conformidade com os padrões; sugerir a skill apropriada (`/security-review`, `/code-review` global) |
