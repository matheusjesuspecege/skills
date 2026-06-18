# format-evolution-entry

## Input esperado

- Tipo da entrada (evolução / decisão técnica / correção / depreciação)
- Quem está registrando (nome e papel)
- O que mudou (descrição objetiva)
- Por quê mudou (motivo de negócio ou técnico)
- Impacto no card M2 (quais seções mudam)
- Impacto em outras features (se houver)

## Output gerado

```
══════════════════════════════════════════════
ENTRADA — [tipo: evolução / decisão técnica / correção / depreciação]
Data: [data de hoje] · Quem: [nome] ([papel])
══════════════════════════════════════════════

O que mudou:
[descrição objetiva — sem jargão, sem opinião]

Por quê:
[motivo — negócio ("cliente pediu X") ou técnico ("herança gerava risco Y")]

Impacto no card M2:
· REGRAS FIRMES → [o que adicionar / alterar]
· CAs → [novo CA ou alteração de CA existente]
· NOTAS TÉCNICAS → [alteração de contrato de API se houver]
· FIGMA → [ajuste a fazer — UX/UI notificado?]

Impacto em outras features:
· [nome da feature impactada] — [o que muda lá] · notificar no chat dela
[ou: Nenhum impacto identificado]
══════════════════════════════════════════════
```

## Regras de aplicação

- Nunca editar entrada existente — regra de ouro do histórico
- Se algo estava registrado errado, criar nova entrada do tipo "correção"
  referenciando a entrada anterior: "Corrige entrada de [data]: [o que estava errado]"
- Tipo "depreciação" exige:
  - Motivo obrigatório (não pode ficar em branco)
  - Lista de features impactadas
  - Confirmação de que o Work Item no Azure DevOps será arquivado
- Ao finalizar, sempre adicionar:

```
---
O que colar no Azure DevOps:
· Atualizar Descrição com as mudanças de M2 indicadas acima
· Adicionar esta entrada na seção Discussão do Work Item
[· Notificar chat da feature [X] se houver impacto cruzado]
```
