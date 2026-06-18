# check-invest

## Input esperado

- Card M1 ou M2 completo
- Contexto do chat (fase, papel de quem pediu)

## Output gerado

Resultado silencioso se tudo estiver OK — não gera output
visível quando não há problemas. Só gera output quando detecta
problema em algum critério.

### Formato de problema detectado

```
⚠️ [critério em linguagem natural]: [problema encontrado]
→ Impacto: [o que pode dar errado se não corrigir]
→ Sugestão: [ação concreta para corrigir]
```

### Formato de bloqueio (problema grave)

```
⛔ [critério]: [problema grave]
→ Não é possível avançar para [próxima fase] com esta situação.
→ O que fazer: [ação concreta]
```

## Critérios e perguntas internas (não expor ao time)

| Critério         | O que verificar                                                                                                            | Severidade se falhar                |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| **Independente** | Sobreposição com outra feature? Dependência de ordem tem contorno? Contenção tratada como sequência?                       | ⚠️ Aviso                            |
| **Negociável**   | Card prescreve o "como" em vez do "quê"? Figma marcado como especificação em vez de referência? Decisões técnicas no card? | ⚠️ Aviso                            |
| **Valioso**      | Entrega valor externo ao usuário? É fatia vertical (front + back)? PO consegue explicar o por quê?                         | ⛔ Bloqueio se não há valor externo |
| **Estimável**    | Time consegue estimar? Falta conhecimento de domínio ou tecnologia?                                                        | ⚠️ Aviso + sugerir spike            |
| **Escalável**    | Tem versão esqueletal? Cabe em poucos dias por dev? É uma camada técnica sem valor externo?                                | ⚠️ Aviso                            |
| **Testável**     | CAs têm comportamento esperado claro? Trigger words vagas? Subjetividade não operacionalizada?                             | ⛔ Bloqueio se CA não é testável    |

## Trigger words que indicam problema de testabilidade

Se qualquer uma aparecer nos CAs, sinalizar e pedir reformulação:
"correto", "apropriado", "certo", "melhor", "pior", "fácil",
"intuitivo", "rápido", "eu reconheço quando vejo", "qualquer",
"todas as combinações", "adequado", "natural"

## Regras de aplicação

- Executar silenciosamente — não narrar o processo ("vou verificar...")
- Só gerar output quando houver problema
- Nunca usar as palavras INVEST, I, N, V, E, S, T como labels
- Usar linguagem natural: "esta história não entrega valor externo",
  "não conseguimos saber quando está pronto", "depende de outra
  história sem contorno definido"
- Bloqueio só para Valioso (sem valor externo) e Testável (CA inviável)
- Tudo mais é aviso — o time pode prosseguir com consciência do risco
