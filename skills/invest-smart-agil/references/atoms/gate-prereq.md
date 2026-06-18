# gate-prereq

## Input esperado

- Fase detectada por `detect-phase`
- O que foi solicitado (refinamento, tasks, evolução, depreciação)
- Papel de quem solicitou

## Matriz de pré-requisitos

| Solicitado             | Pré-requisito         | Tipo     | O que verificar no histórico                |
| ---------------------- | --------------------- | -------- | ------------------------------------------- |
| Refinamento / card M2  | Card M1 existir       | Bloqueio | Headline + seção "EM ABERTO" visíveis       |
| Tasks (qualquer papel) | Card M2 com CAs       | Bloqueio | Header "REFINADO em [data]" + CAs numerados |
| Tasks (qualquer papel) | Contrato de API no M2 | Aviso    | Seção "NOTAS TÉCNICAS" com endpoints        |
| Decisão técnica        | Tasks existirem       | Bloqueio | Pelo menos uma TASK gerada no histórico     |
| Atualizar estado       | Card M2 existir       | Bloqueio | Header "REFINADO em [data]" visível         |
| Depreciação            | Feature ativa com M2  | Bloqueio | Card M2 + pelo menos uma task               |

## Output: bloqueio total

```
⛔ Não consigo [o que foi pedido] ainda.

O que falta: [pré-requisito ausente em linguagem direta]

O que fazer: [quem deve fazer e o quê — ação concreta]

Quando isso estiver pronto, volte aqui e continuamos.
```

## Output: aviso com confirmação

```
⚠️ Posso [o que foi pedido], mas identifiquei uma lacuna:

Lacuna: [o que está incompleto]

Risco: [o que pode ficar errado ou incompleto no output]

Quer prosseguir assim mesmo, ou prefere resolver isso antes?
```

Aguardar resposta. Só continuar se confirmado explicitamente.
Se confirmado, gerar normalmente e adicionar nota ao final:

```
⚠️ Nota: [o que ficou incompleto por causa da lacuna confirmada]
```

## Regras de aplicação

- Sempre executar antes de qualquer geração de artefato
- Nunca gerar parcialmente para "ajudar mesmo assim"
- O bloqueio é sobre o artefato, não sobre a conversa —
  o Claude pode continuar conversando, apenas não gera o artefato bloqueado
- Se o papel for dev e o card M2 existir mas o dev não participou do refinamento:
  sinalizar que tasks geradas sem contexto do refinamento podem estar incompletas
  (aviso, não bloqueio — o dev pode ter lido o histórico)
