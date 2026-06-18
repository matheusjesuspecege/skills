# Asset: format-diagnostic

## Função

Define o formato do diagnóstico final entregue ao dev. O diagnóstico é **escaneável** (o dev acha o que importa em segundos), **citado** (todo achado tem `arquivo:linha` + regra) e **acionável** (todo desvio tem recomendação concreta).

## Estrutura do diagnóstico

```markdown
# Diagnóstico — <alvo da revisão>

<Veredito geral em 1–2 frases: a feature segue os padrões com alta/parcial/baixa fidelidade,
com destaque para o que está exemplar e onde estão os desvios.>

## ✅ Conformidade forte

| Padrão | Evidência |
|--------|-----------|
| <padrão central seguido> (origem §seção) | `arquivo:linha` — <como foi aplicado> |
| ... | ... |

## ⚠️ Desvios e pontos de atenção

**1. <título curto do achado> — <severidade: 🔴/🟡/🔵>**
[arquivo.tsx:NN](caminho/arquivo.tsx#LNN):
```tsx
<trecho mínimo que evidencia o achado>
```
<Explicação curta + a regra citada.> **Recomendação:** <ação concreta>.

**2. ...**

## Pontos neutros / corretos que parecem desvio mas não são

- <item> — <por que é defensável / não é violação>

## Resumo acionável (prioridade)

1. **<correção de maior ganho>** — <1 linha>.
2. **<próxima>** — <1 linha>.
3. ...

<Fechamento: oferecer aplicar as correções de baixo risco (rápidas) — só se --fix, ou perguntar.>
```

## Regras de redação

- **Veredito primeiro.** O dev lê uma frase e já sabe se passou bem ou não. Não enterrar a conclusão.
- **Conformidade antes dos problemas.** Abrir reconhecendo o que foi bem feito — dá calibração e evita tom de "lista de erros".
- **Todo achado cita `arquivo:linha`** em formato de link markdown clicável (`[arquivo.tsx:NN](caminho#LNN)`), conforme convenção do projeto para referências de código.
- **Todo desvio tem `Recomendação:`** com a ação concreta — nunca apontar problema sem o caminho.
- **Severidade visível** (🔴/🟡/🔵) no título de cada achado.
- **Citar a regra e a origem** (`patterns.md §Componentes`, `code-style.md §TypeScript`) — o dev confia mais e aprende o padrão.
- **Seção "pontos neutros"** existe para desarmar falsos positivos: itens que parecem desvio mas são corretos (ex: arquivo abaixo de 500 linhas não precisa ser dividido). Mostra que a análise foi criteriosa.
- **Resumo acionável priorizado** fecha o diagnóstico — ordem de `classify-findings`.
- **Tom técnico e direto.** Sem narrar processo interno, sem jargão de skill.

## Exemplo de achado bem formatado

```markdown
**1. Vagas hardcoded `{10}` no JSX — 🔴 viola "zero strings literais" e é valor mágico**
[session-item-list.tsx:254](apps/organizer/src/ui/pages/event/steps/tickets/sessions-manager/components/session-item-list.tsx#L254):
```tsx
<span className='ts-paragraph-xxs text-ctx-content-title'>{10}</span>
```
Número fixo renderizado quando `!session.quantity`, sem TODO marcando dado provisório
(`patterns.md §Mock-First`). **Recomendação:** usar `session.quantity ?? ticketDefaults.quantity`,
ou no mínimo um `// TODO: ... — substituir por dados do backend`.
```

## Tamanho

- Diagnóstico de uma feature média: caber em uma tela rolável. Não transformar em relatório de auditoria.
- Quando houver muitos ✅, condensar na tabela — não dedicar um parágrafo a cada.
- Quando não houver desvio nenhum: dizer claramente "Nenhum desvio encontrado" e listar a conformidade. Não inventar problema para parecer útil.
