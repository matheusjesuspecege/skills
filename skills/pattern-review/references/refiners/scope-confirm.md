# Refiner: scope-confirm

## Função

Confirma o alvo da revisão quando o diff da branch é grande ou toca múltiplos módulos, para não desperdiçar análise em arquivos que o dev não quer revisar agora.

## Quando acionar

- O diff toca **mais de um módulo** (ex: `apps/organizer` + `apps/api` + `packages/i18n`), **ou**
- O diff tem **mais de ~15 arquivos**, **e**
- Não há flag `--target` (que já delimita o escopo).

Quando o diff for pequeno ou já houver `--target`: **não acionar** — seguir direto para o confronto.

## Como confirmar

Usar `AskUserQuestion`, uma única pergunta, com opções derivadas dos módulos/diretórios que o diff revelou.

**Pergunta:** "O diff toca vários módulos. Onde quer focar a revisão de conformidade?"

Montar as opções dinamicamente a partir dos grupos do diff. Exemplos de opções:

| Opção | Descrição |
| ----- | --------- |
| Todo o diff da branch | Revisar tudo que mudou em relação a `main` |
| Só `<módulo A>` (Recomendado) | Limitar ao módulo com mais mudanças no diff |
| Só `<módulo B>` | Limitar ao segundo módulo |
| Só os testes | Revisar apenas conformidade dos `*.test.*` |

**Como escolher o (Recomendado):** o módulo com maior número de arquivos de aplicação alterados (excluindo config/lock).

## Regras

- Uma pergunta só — não transformar em formulário.
- Aceitar a escolha do dev como definitiva.
- Se o dev escolher um subconjunto, aplicar o equivalente a `--target <caminho>` no resto do fluxo.
- Se o dev não responder ou pedir "tudo", revisar o diff inteiro.

## Output

```
ESCOPO CONFIRMADO: [todo o diff | caminho(s) específico(s)]
```

Passar o escopo confirmado de volta ao `review-workflow` (Passo 4 usa esse recorte).
