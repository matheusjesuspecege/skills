# detect-phase

## Input esperado

- Histórico completo do chat atual

## Output interno (não visível ao time)

Retorna uma das fases abaixo para uso por quem acionou:

| Fase            | Código            | Sinais de identificação                                                                                    |
| --------------- | ----------------- | ---------------------------------------------------------------------------------------------------------- |
| Criação         | `PHASE_CREATE`    | Primeira mensagem do chat · requisito bruto · ideia sem estrutura · nenhum card visível no histórico       |
| Refinamento     | `PHASE_REFINE`    | Card M1 visível no histórico · time discutindo ambiguidades · pedido de refinamento explícito              |
| Desenvolvimento | `PHASE_DEV`       | Card M2 visível com CAs · devs pedindo tasks · tasks já geradas no histórico                               |
| Evolução        | `PHASE_EVOLVE`    | Feature ativa com tasks · pedido de mudança de escopo · novo campo · decisão técnica durante implementação |
| Depreciação     | `PHASE_DEPRECATE` | Pedido explícito de encerramento · feature sendo substituída                                               |
| Ambígua         | `PHASE_UNKNOWN`   | Histórico insuficiente · sinais contraditórios                                                             |

## Regras de aplicação

- Se `PHASE_UNKNOWN`: acionar `refiner-phase-confirm` antes de prosseguir
- Se histórico está longo e o card M2 não está visível nas últimas mensagens:
  retornar `PHASE_UNKNOWN` e acionar `refiner-phase-confirm` para pedir
  que a pessoa cole o estado atual
- Nunca assumir fase por inferência fraca — quando em dúvida, `PHASE_UNKNOWN`
- A fase detectada é passada para `atom-gate-prereq` antes de qualquer geração
