# Atom: dedup

## Função

Compara os padrões classificados com o conteúdo atual de `docs/patterns.md` e decide o que fazer com cada um.

## Decisão por padrão

| Situação                               | Ação                                                 |
| -------------------------------------- | ---------------------------------------------------- |
| Padrão idêntico já existe              | Manter a entrada atual                               |
| Padrão existe e a regra evoluiu        | Atualizar a entrada existente no lugar               |
| Padrão novo, categoria existente       | Adicionar dentro da seção correta                    |
| Padrão novo, categoria inexistente     | Criar nova seção e adicionar                         |
| Padrão diverge de `docs/code-style.md` | Alertar o dev e aguardar confirmação antes de editar |

## Critério de "mesmo padrão"

Dois padrões representam a mesma decisão de design quando descrevem o mesmo alvo, mesmo com palavras diferentes. Manter a versão mais precisa:

- "Testes ficam ao lado do componente" + "arquivo `.test.tsx` no mesmo diretório do componente" → **mesmo padrão**; manter a versão com o sufixo nomeado.
- "Usar `cn()` para classes condicionais" + "usar `cn()` do `@/lib/utils`" → **mesmo padrão**; manter a versão com o caminho.
- "Componentes reutilizáveis em `ui/components/`" + "componentes específicos de tela ficam inline" → **padrões diferentes**; manter ambos.

## Output

Lista de ações a executar:

```
AÇÃO: [adicionar | atualizar | manter | alertar]
SEÇÃO: [nome da categoria em docs/patterns.md]
ENTRADA: [texto da entrada conforme format-entry.md]
MOTIVO: [por que a ação foi escolhida]
```
