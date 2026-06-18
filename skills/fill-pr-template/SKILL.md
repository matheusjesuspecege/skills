---
name: fill-pr-template
description: Preenche o template de pull request com tudo que foi realizado na feature para ser adicionado na descrição da PR do azure devops. Use quando finalizar uma feature e estiver criando uma PR no azure devops.
user-invocable: true
---

# Introdução

Esta SKILL tem o objetivo de preencher o template de pull request, para que o desenvolvedor possa adicionar na descrição da PR no azure devops.

---

## Regras Fundamentais

- **SIGA O REQUISITO ORIGINAL EXATAMENTE COMO FORNECIDO. SEM INVENTAR, ADICIONAR OU SUPOR ALGO QUE NÃO ESTEJA EXPRESSAMENTE DEFINIDO NA US.**
- Se há ambiguidade, pergunte ao usuário antes de prosseguir.
- Gere um diagrama navegacional em **mermaid** para que o dev possa incluir facilmente na descrição.
- Sugira um titulo eficaz e enxuto para descrever o que foi feito.
- Remova os itens que não foram marcados (checked) pois não estão no escopo da PR.
- O tom de voz da descrição deve ser em terceira pessoa estilo **realizado**.
- Não grave arquivos, apenas retorne no proprio terminal para que o usuário possa copiar e colar no azure devops.
- O arquivo teve ter no máximo 4000 caracteres, caso ultrapasse, resuma o conteúdo para caber nesse limite, mantendo as informações mais relevantes.

---

## Passo a Passo

1. **Sempre derive o contexto da branch atual** — execute `git branch --show-current` para obter o nome da branch e use-a como fonte primária de informação.
2. Analise o conteúdo da branch atual em relação à branch base (`main`):
   - `git log main..HEAD --oneline` para o histórico de commits da branch.
   - `git diff main...HEAD --stat` para identificar quais projetos (apps/_ ou packages/_) e arquivos foram alterados.
   - A partir dos diretórios modificados, infira automaticamente o(s) projeto(s) afetado(s).
3. Se houver ambiguidade real (ex.: branch sem padrão reconhecível), pergunte ao usuário **apenas o necessário para desambiguar**, citando o que já foi detectado a partir da branch.
4. Correlacione o diff e os commits da branch com o template em **./assets/pull_request_template.md** e preencha-o seguindo as **Regras Fundamentais**.
5. Retorne para o usuário, a descrição feita no próprio terminal para que o usuário possa copiar com facilidade. Inclua no início um cabeçalho curto indicando a branch detectada (para que o usuário confirme rapidamente o contexto).

---

## Saída

Retorne um feedback amigavel para o usuário para que ele saiba os proximos passos, principalmente como poderá visualizar o mermaid online, e sugira que ele tire uma print com f12 e cole no azure devops para facilitar a visualização.
