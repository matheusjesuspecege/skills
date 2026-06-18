# Refiner: pattern-interview

## Função

Entrevistar o desenvolvedor para capturar decisões que ficam fora do diff. Cada dimensão usa `AskUserQuestion` com opções pré-definidas e uma recomendação baseada no diff já analisado no Passo 1.

## Quando acionar

- Diff contém alteração estrutural (componentes, testes, rotas, schema, seeders, utilitários) além de config e lock files.

## Regras da entrevista

- Fazer **uma dimensão por vez** com `AskUserQuestion`, uma pergunta por chamada.
- Antes de chamar a ferramenta, escolher qual opção recebe o rótulo **(Recomendado)** com base no que o diff já revelou.
- Aceitar a seleção do dev como definitiva, mesmo quando divergir da recomendação.
- Avançar para a próxima dimensão somente após receber a resposta atual.
- Encerrar ao concluir as 5 dimensões.

---

## Dimensões

### Dimensão 1 — Localização e estrutura

**Pergunta:** "Como ficou a organização dos arquivos novos?"

**`multiSelect: true`** — o dev pode ter feito mais de uma coisa.

| Opção                              | Descrição                                                 |
| ---------------------------------- | --------------------------------------------------------- |
| Seguiu estrutura existente         | Encaixou tudo em diretórios já existentes                 |
| Criou pasta dentro do módulo       | Nova pasta com escopo local (ex: `steps/`, `components/`) |
| Criou pasta compartilhada          | Novo diretório em `ui/components/`, `shared/` ou similar  |
| Ficou em dúvida — local provisório | Localização incerta; pode mudar depois                    |

**Como escolher o (Recomendado):** se o diff mostra só arquivos em diretórios já existentes → "Seguiu estrutura existente". Se aparece diretório novo dentro do módulo → "Criou pasta dentro do módulo". Se aparece diretório fora do módulo → "Criou pasta compartilhada".

**Aprofundamento** (só se "Ficou em dúvida" for selecionado):

> "Onde ficou e qual seria o lugar certo?"

---

### Dimensão 2 — Decisões de componente

**Pergunta:** "Como você tratou os componentes — extraiu ou manteve inline?"

**`multiSelect: false`** — pede a escolha dominante.

| Opção                                    | Descrição                                                                  |
| ---------------------------------------- | -------------------------------------------------------------------------- |
| Tudo inline, sem extrações               | Nenhum subcomponente separado; lógica dentro da própria página/componente  |
| Extraiu para reutilização (cross-módulo) | Componente foi para `ui/components/` ou similar; outro módulo pode usar    |
| Extraiu só para organizar (local)        | Novo arquivo com escopo privado ao módulo — uso restrito à própria feature |
| Parte inline, parte extraída             | Mix dos dois critérios acima                                               |

**Como escolher o (Recomendado):** se diff mostra novo arquivo em `ui/components/` → "Extraiu para reutilização". Se novo arquivo fica dentro da própria feature/página → "Extraiu só para organizar". Se nenhum arquivo novo de componente → "Tudo inline".

**Aprofundamento** (se extraiu qualquer coisa):

> "Qual foi o critério que levou à extração — será usado em outro lugar ou foi só para encurtar o arquivo?"

---

### Dimensão 3 — Testes

**Pergunta:** "Como você estruturou os testes? Selecione tudo que se aplicar."

**`multiSelect: true`**

| Opção                                  | Descrição                                                         |
| -------------------------------------- | ----------------------------------------------------------------- |
| Testes diretos, sem mocks especiais    | Render simples; sem necessidade de providers extras               |
| Mockei dependências externas           | API, contexto, router, store — algum `vi.mock` ou `jest.mock`     |
| Precisei de wrapper/provider no render | `renderWithProviders`, `MemoryRouter`, `ThemeProvider` ou similar |
| Usei `userEvent` para interações       | Cliques, digitação, navegação via teclado simulados               |

**Como escolher o (Recomendado):** marcar as opções cujos sinais aparecem no diff (presença de `vi.mock`, `renderWith*`, `userEvent`, etc.).

**Aprofundamento** (se "Mockei dependências externas"):

> "Por que o mock foi necessário — erro, lentidão ou simplicidade?"

---

### Dimensão 4 — Armadilhas e surpresas

**Pergunta:** "Teve algo que o próximo dev provavelmente erraria? Selecione tudo que se aplicar."

**`multiSelect: true`**

| Opção                                          | Descrição                                     |
| ---------------------------------------------- | --------------------------------------------- |
| Nenhuma surpresa                               | Tudo funcionou como esperado desde o início   |
| Comportamento inesperado de lib/framework      | A lib fez algo diferente do que a doc sugeria |
| TypeScript forçou mudança de design            | Tipagem exigiu refatorar a abordagem original |
| Problema de timing ou assíncrono               | Race condition, `await`, ordem de eventos     |
| Ordem de inicialização ou dependência circular | Import/registro que precisou ser reordenado   |

**Como escolher o (Recomendado):** se diff mostra só código linear sem type assertions estranhos → "Nenhuma surpresa". Se há `as unknown as`, cast forçado ou comentário explicativo → outra opção relevante.

**Aprofundamento** (se qualquer armadilha for selecionada):

> "Isso ficou visível no código ou só quem passou pelo problema saberia?"

---

### Dimensão 5 — Padrões a reforçar

**Pergunta:** "Tem alguma convenção que você seguiu e quer garantir que fique registrada?"

**`multiSelect: true`**

| Opção                                  | Descrição                                                  |
| -------------------------------------- | ---------------------------------------------------------- |
| Nenhuma além do que já existe          | Tudo já está em `docs/patterns.md` ou `docs/code-style.md` |
| Convenção nova, ainda sem registro     | Algo que o time faz mas ninguém escreveu ainda             |
| Reforço de convenção existente         | Algo que existe mas é frequentemente ignorado              |
| Atualização de convenção desatualizada | O padrão antigo mudou — precisa substituir a entrada       |

**Como escolher o (Recomendado):** se diff segue estritamente padrões já listados → "Nenhuma além do que já existe". Se há estrutura nova que se repete ou comentário explicando um padrão → "Convenção nova, ainda sem registro".

**Aprofundamento** (se qualquer opção além de "Nenhuma" for selecionada):

> "Ela já está documentada em algum lugar ou só vivia na cabeça do time?"

---

## Output interno

Passar para `atoms/classify.md`:

```
EXTRAÇÃO — pattern-interview
D1 (Localização): [opções selecionadas · aprofundamento se houver]
D2 (Componente): [opção selecionada · critério de extração se houver]
D3 (Testes): [opções selecionadas · motivo do mock se houver]
D4 (Armadilhas): [opções selecionadas · visível no código?]
D5 (Padrões): [opções selecionadas · já documentado?]
```
