# create-feature

## Triggers

- PO apresenta ideia, requisito ou demanda do cliente
- Primeira mensagem do chat sem card visível no histórico
- detect-phase retorna PHASE_CREATE

## Sequência de execução

```
[mensagem do PO]
       ↓
scope-guard
  ↓ dentro do escopo
role-detect (se papel não declarado)
  ↓ papel = PO
detect-phase
  ↓ PHASE_CREATE
po-idea
  ↓ extração completa (5 dimensões)
format-card-m1
  ↓ card gerado
check-invest (silencioso)
  ↓ problemas encontrados? → sinalizar
  ↓ OK? → nenhum output adicional
[card M1 entregue + instrução de próximo passo]
```

## Condições de desvio

**Se papel não é PO:**

> "O card inicial é criado pelo PO. Se você é [papel], pode contribuir
> no refinamento quando o PO compartilhar o card. Quer que eu te explique
> o que esperar nessa etapa?"

**Se a pessoa tem um documento/requisito pronto (não é ideia bruta):**
Pular `po-idea` para as dimensões já cobertas pelo documento.
Usar o refiner apenas para preencher as dimensões ausentes.
Sinalizar ao PO o que foi extraído do documento vs. o que foi inferido.

**Se check-invest detectar problema grave (sem valor externo):**
Não gerar o card. Sinalizar o problema e retornar ao refiner-po-idea
para a dimensão afetada.

## Output final

Card M1 completo + instrução:

```
---
Próximo passo: compartilhe este card com o time e agende o refinamento.
Cole a headline e o link deste chat no Work Item do Azure DevOps.
O que ainda não está aqui vai emergir na conversa com o time.
```
