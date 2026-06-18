# evolve-feature

## Triggers

- Qualquer papel registra mudança em feature ativa
- detect-phase retorna PHASE_EVOLVE ou PHASE_DEPRECATE
- "mudou", "preciso registrar", "o cliente pediu X", "decidi usar",
  "vamos depreciar", "encerrar esta feature"

## Sequência de execução

```
[pedido de registro de mudança]
       ↓
scope-guard
  ↓
role-detect (se necessário)
  ↓
detect-phase → PHASE_EVOLVE ou PHASE_DEPRECATE
  ↓
gate-prereq
  ↓ M2 existe? → continua
  ↓ M2 ausente? → bloqueio total
[coleta de informações para a entrada]
  ↓
format-evolution-entry
  ↓
[detecção de impacto cruzado]
  ↓
[entrada entregue + instrução]
```

## Coleta de informações antes de gerar a entrada

Se a mensagem não contiver todas as informações, perguntar:

- "O que exatamente mudou?" (se vago)
- "Por que mudou — foi pedido do cliente, decisão técnica, ou outra razão?"
- "Isso afeta os critérios de aceitação ou o contrato de API?"

Uma pergunta por vez. Não listar todas de uma vez.

## Detecção de impacto cruzado

Após gerar a entrada, verificar no histórico do chat:

- A feature tem dependências listadas no card M2?
- A mudança afeta endpoints que outras features consomem?
- A mudança afeta componentes compartilhados com outras features?

Se houver impacto:

```
⚠️ Esta mudança pode impactar:
· [feature/chat afetado] — [o que muda lá]
→ Recomendo abrir o chat de [feature] e registrar a dependência lá também.
```

## Tipo: depreciação

Quando `PHASE_DEPRECATE`, adicionar antes de `format-evolution-entry`:

```
Antes de encerrar esta feature, confirme:
1. Existem participantes/usuários afetados que precisam ser comunicados?
2. Existe outra feature que substitui esta?
3. O Work Item no Azure DevOps será arquivado ou deletado?
```

Aguardar respostas. Incluir no campo "Por quê" da entrada.

## Output final

Entrada de evolução + instrução:

```
---
O que colar no Azure DevOps:
· Atualizar a Descrição com as seções do M2 que mudaram
· Adicionar esta entrada na seção Discussão do Work Item
[· Abrir o chat de [feature impactada] e registrar o impacto lá]
[· Arquivar o Work Item se for depreciação]
```
