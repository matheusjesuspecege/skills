---
atom: format-card-m2
version: 1.0
reusable_in: [molecule-refine-feature]
description: >
  Monta o card M2 (card refinado, pós-refinamento com o time) a partir
  das decisões tomadas na conversa. Este é o documento que o dev usa
  para implementar — deve ter detalhe suficiente para que ninguém precise
  voltar a perguntar o que já foi decidido.
---

# Atom: format-card-m2

## Input esperado
- Card M1 existente no chat
- Decisões tomadas na conversa de refinamento:
  - Ambiguidades resolvidas (quem decidiu, o quê)
  - CAs co-escritos (com mensagens e visual)
  - Validações e mensagens de erro
  - Fluxo visual (desktop/mobile/estados)
  - Contrato de API (endpoints, payloads, responses)
  - Ajustes no Figma sinalizados
  - Intensidade acordada

## Output gerado

```
══════════════════════════════════════════════
[HEADLINE] — REFINADO em [data]
Participantes: [PO · UX/UI · Frontend · Backend]
══════════════════════════════════════════════

REGRAS FIRMES (atualizadas)
[originais do M1]
[+ decisões do refinamento marcadas — NOVO]

RESOLVIDO NO REFINAMENTO
A[N] "[descrição original]" → [decisão tomada · quem decidiu]

CRITÉRIOS DE ACEITAÇÃO (co-escritos)
CA[N]
Dado [contexto],
quando [ação],
então [resultado]
→ Mensagem: "[texto exato]"
→ Visual: [comportamento na tela · estado do componente]

VALIDAÇÕES E MENSAGENS DE ERRO
- [campo ou ação]: [regra] → mensagem: "[texto]" → visual: [onde · como]

FLUXO VISUAL
- Desktop: [comportamento]
- Mobile: [comportamento]
- Estados: [loading · erro · sucesso · vazio]

FIGMA
→ [link] — ajustes pós-refinamento:
  - [item] (UX/UI atualiza antes do sprint)

NOTAS TÉCNICAS
- Contrato de API:
  [MÉTODO] [endpoint]
  body: {[campos]}
  [status]: {[response]}
- Riscos: [o que os devs sinalizaram]
- Decisões: [arquiteturais que afetam comportamento]

INTENSIDADE ACORDADA
- Implementar nesta iteração: [o que entra]
- Fora desta iteração: [o que fica — próxima intensificação]
══════════════════════════════════════════════
```

## Regras de aplicação

- Este card substitui o M1 na descrição do Work Item no Azure DevOps
- "RESOLVIDO NO REFINAMENTO" deve cobrir todas as ambiguidades do M1 —
  se alguma ficou aberta, mover para seção "AINDA EM ABERTO" com prazo
- Cada CA deve ter mensagem exata e visual — CAs sem esses campos
  não estão prontos para implementação
- Contrato de API é obrigatório para qualquer feature que envolva
  comunicação front-back — se ausente, sinalizar como lacuna
- Ao finalizar, sempre adicionar:

```
---
O que colar no Azure DevOps:
· Descrição → este card completo (substitui o M1)
· Acceptance Criteria → seção CAs acima
· Discussão → seção "RESOLVIDO NO REFINAMENTO"
```
