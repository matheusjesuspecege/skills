# Asset: format-entry

## Função

Define o formato de cada entrada em `docs/patterns.md`. Toda entrada é **acionável** — quem lê toma uma decisão imediatamente — e **aponta para o alvo** (Point the Target): começa com verbo no imperativo descrevendo o estado-alvo desejado.

## Formato de entrada

```markdown
- **[Regra curta no imperativo apontando o alvo.]** [Complemento, cauda contrastiva ou condição de fronteira.]
```

### Regras de redação

- **Iniciar com verbo no imperativo** descrevendo o que existir (ex: "Usar", "Manter", "Extrair", "Selecionar").
- **Fronteiras viram condição positiva** sobre o lado válido (ex: "manter abaixo de ~500 linhas", "via `watch()` / `setValue()`").
- **Cauda contrastiva curta** com "em vez de X" é aceitável quando o alvo já apareceu na principal e o contraste agrega informação acionável.
- **Referenciar tipo de arquivo** (ex: "componente de seleção", "seeder de ingresso"), em vez de nomes de feature.

### Exemplos válidos

```markdown
- **Colocar o teste ao lado do componente testado**, no mesmo diretório, com sufixo `.test.tsx`.
- **Manter componentes reutilizáveis entre páginas em `ui/components/`.** Componentes específicos de uma tela viram subcomponente interno no próprio arquivo, dentro do mesmo módulo.
- **Usar `cn()` de `@/lib/utils` para composição de classes condicionais.**
- **Roteamento de strings visíveis via `useTranslation()` + `t('chave')`.** O JSX recebe apenas chaves.
- **Disparar interações com `userEvent`** em vez de `fireEvent`.
- **Selecionar elementos por papel semântico (`getByRole`) ou texto visível (`getByText`).**
```

### Exemplos a reescrever — antes/depois

| Antes (problema)                                                            | Depois (alvo positivo)                                                                                                                                         |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| O RadioCard foi criado porque o UsageLimitField já usava a mesma estrutura. | **Reaproveitar primitivos visuais existentes para variações da mesma estrutura** (ex: cards de seleção compartilham o primitivo base e variam por composição). |
| Componentes do Arandu ficam em arandu/.                                     | _(remover — já vive em `docs/code-style.md`)_                                                                                                                  |
| Usar userEvent para clicar.                                                 | **Disparar interações com `userEvent`** em vez de `fireEvent`.                                                                                                 |
| Não criar `useState` paralelo ao form.                                      | **Derivar valores via `watch()` / `setValue()` do form.**                                                                                                      |

## Formato de seção em docs/patterns.md

```markdown
## [Nome da Categoria]

- **[Regra 1.]** [Complemento.]
- **[Regra 2.]** [Complemento.]
```

## Seções padrão (usar nomes consistentes)

- `Localização de Arquivos`
- `Componentes`
- `Testes`
- `Rotas`
- `Internacionalização (i18n)`
- `API — Seeders e Factories`
- `Estilo e Classes CSS`

Criar nova seção só se nenhuma das existentes for adequada.
