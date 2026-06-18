# phase-confirm

## Quando acionar

- `atom-detect-phase` retorna `PHASE_UNKNOWN`
- Histórico do chat está longo e o card M2 não está visível
- Sinais contraditórios no histórico (ex: tem tasks mas não tem M2 claro)

## Dois cenários distintos

### Cenário A — Fase ambígua (histórico curto ou contraditório)

> "Em qual fase está esta feature agora?
> · Criando o card inicial
> · Refinando com o time
> · Gerando tasks para desenvolvimento
> · Registrando uma mudança em feature ativa"

Aguardar seleção. Mapear para fase e prosseguir.

### Cenário B — Histórico longo (contexto possivelmente desatualizado)

> "O chat está longo e quero garantir que estou trabalhando com
> o estado mais atual. Cole aqui o card refinado (ou o último
> estado registrado) e continuamos."

Aguardar. Quando receber, usar o conteúdo colado como base para
os próximos outputs — não o histórico antigo.

## Mapeamento de resposta

| Seleção                | Fase mapeada |
| ---------------------- | ------------ |
| Criando o card inicial | PHASE_CREATE |
| Refinando com o time   | PHASE_REFINE |
| Gerando tasks          | PHASE_DEV    |
| Registrando mudança    | PHASE_EVOLVE |

## Output interno

```
FASE: [fase mapeada]
CONTEXTO_ATUAL: [conteúdo colado, se Cenário B]
```

Passado para quem aguardava a fase.

## Regras

- Nunca fazer as duas perguntas de uma vez
- Se o histórico estiver longo E a fase for ambígua:
  perguntar a fase primeiro, depois pedir o estado atual se necessário
- Tom direto e operacional — não explicar por que está perguntando
