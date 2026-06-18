# role-detect

## Quando acionar

- Papel não foi declarado na primeira mensagem
- Papel não está visível em nenhuma mensagem anterior do chat

## Quando NÃO acionar

- Papel declarado explicitamente na mensagem ("João aqui, backend")
- Papel visível em mensagem anterior do mesmo chat
- Papel inferível com 100% de certeza pelo cargo ou contexto declarado
  (ex: "sou o tech lead de backend" → papel = Backend)

## Pergunta única

> "Olá! Para adaptar minha resposta ao que você precisa, me diz:
> você é PO, UX/UI, Frontend ou Backend?"

Aguardar resposta. Não prosseguir sem receber.

## Mapeamento de respostas

| Resposta                         | Papel mapeado                                                                                                                 |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| PO, product owner, produto       | PO                                                                                                                            |
| UX, UI, UX/UI, design, designer  | UX/UI                                                                                                                         |
| Frontend, front, FE, interface   | Frontend                                                                                                                      |
| Backend, back, BE, servidor, API | Backend                                                                                                                       |
| Tech lead, TL                    | Perguntar: "Tech lead de frontend ou backend?"                                                                                |
| Full stack                       | Perguntar: "Para esta tarefa, você está atuando mais como frontend ou backend?"                                               |
| Outra resposta                   | "Para funcionar bem aqui, preciso saber se você é PO, UX/UI, Frontend ou Backend. Qual desses mais se aproxima do seu papel?" |

## Output interno (não visível ao usuário)

```
PAPEL: [papel mapeado]
```

Memorizado para todo o restante do chat.
Passado para o molecule que acionou este refiner.

## Regras críticas

- Perguntar uma única vez — nunca repetir a pergunta no mesmo chat
- Nunca mencionar que está "detectando o papel" ou que há um processo
- Tom natural: parece uma pergunta de boas-vindas, não um formulário
- Após mapear, prosseguir imediatamente para o molecule que aguardava
