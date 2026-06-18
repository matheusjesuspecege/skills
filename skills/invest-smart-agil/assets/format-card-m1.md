# format-card-m1

## Input esperado

Output estruturado do `refiner-po-idea`:

- headline (role + ação + contexto)
- por quê (dor, para quem, consequência)
- tipo de valor
- regras firmes identificadas
- perguntas em aberto por papel
- rascunho de testes (cenários extraídos)
- dependências identificadas
- versão esqueletal proposta
- ambiguidades numeradas

## Output gerado

```
══════════════════════════════════════════════
[HEADLINE]: [Role] [Ação] [Contexto]
══════════════════════════════════════════════

POR QUÊ
[dor que resolve · para quem · consequência se não resolver]
Valor: [ ] Receita  [ ] Custo  [ ] Serviço  [ ] Regulação
       [ ] Reputação  [ ] Opção  [ ] Informação

FIGMA
→ [link se houver] — referência de experiência, ajustes possíveis no refinamento
⚠️ Pontos abertos no Figma: [listar ou "a definir com UX/UI no refinamento"]

REGRAS FIRMES
[o que já está decidido e não muda — uma por linha]

EM ABERTO (para o refinamento)
  Para UX/UI + Frontend:
  - [perguntas]
  Para Backend:
  - [perguntas]
  Para todos:
  - [perguntas]

RASCUNHO DE TESTES
- Dado [contexto], quando [ação], então [resultado]

DEPENDÊNCIAS
[tipo: ordem / sobreposição / contenção]
[contorno proposto se houver]

INTENSIDADE
- Esqueleto (menor entrega com valor real): [descrever]
- Próxima intensificação: [descrever]

⚠️ AMBIGUIDADES
A1 — [descrição] — para: [papel responsável por decidir]
A2 — [descrição] — para: [papel responsável por decidir]
══════════════════════════════════════════════
```

## Regras de aplicação

- Headline no formato Role-Ação-Contexto — nunca apenas substantivo
  (correto: "Organizador cria sessões individuais para um ingresso")
  (errado: "Criação de sessões")
- "EM ABERTO" deve ter pelo menos uma pergunta por papel — se não há
  pergunta para algum papel, omitir aquele papel
- Rascunho de testes: mínimo 2 cenários, máximo 4 — não é especificação
  completa, é ponto de partida para conversa no refinamento
- Ambiguidades devem ter o papel responsável por decidir — não deixar sem dono
- Ao finalizar, sempre adicionar:

```
---
Próximo passo: compartilhe este card com o time e agende o refinamento.
O que ainda não está aqui vai emergir na conversa.
```
