# Atom: reframe-positive

## Função

Receber candidatos do `classify` e devolver cada regra como descrição do **estado-alvo** desejado, em imperativo positivo. Aplica o pattern *Point the Target* — instruções e padrões viram descrições do que existir, em vez de proibições do que evitar.

## Entrada

Lista de candidatos no formato:

```
CATEGORIA: [categoria]
REGRA: [enunciado]
OBSERVADO EM: [tipo de arquivo]
```

## Saída

Mesma estrutura, com `REGRA` reescrita conforme heurísticas abaixo.

## Heurísticas de reescrita

1. **Iniciar com verbo no imperativo** descrevendo o que existir no código.
   - Entrada: "Não criar `useState` paralelo ao form."
   - Saída: "Derivar valores via `watch()` / `setValue()` do form."

2. **Fronteiras viram condição positiva** sobre o lado válido.
   - Entrada: "Não passar de ~500 linhas por arquivo."
   - Saída: "Manter o arquivo abaixo de ~500 linhas — ao chegar perto, extrair subcomponentes locais."

3. **Trocar query/escolha de alternativa pelo alvo nomeado.**
   - Entrada: "Nunca selecionar por classe CSS."
   - Saída: "Selecionar por papel semântico (`getByRole`) ou texto visível (`getByText`)."

4. **Quando o contraste agregar informação acionável**, manter o alvo na principal e a alternativa rejeitada como cauda curta com "em vez de".
   - Entrada: "Usar `userEvent` — não `fireEvent`."
   - Saída: "Disparar interações com `userEvent` em vez de `fireEvent`."

5. **Listas de exclusão viram lista de inclusão.**
   - Entrada: "Não registrar nome de feature, componente, rota nem campo."
   - Saída: "Referenciar o tipo de arquivo (ex: 'componente de seleção', 'seeder de ingresso')."

## Gatilhos para reescrita

Tratar como candidato a reescrita qualquer regra que contenha — isoladamente, sem alvo nomeado na mesma frase:

- "não", "nunca", "jamais", "evitar", "sem " (como preposição), "Quando NÃO"
- Construções "deixar de", "parar de", "abster-se de"
- Cabeçalhos negativos em listas ("Quando NÃO acionar", "Exemplos inválidos")

## Quando consultar o dev

Acionar `AskUserQuestion` apenas quando a inversão tiver mais de um alvo plausível e a escolha mudar o significado da regra. Apresentar 2–3 reescritas e pedir uma seleção.

Exemplo:

> A regra "não duplicar estrutura do objeto" pode virar:
> 1. "Reaproveitar o método existente chamando-o internamente."
> 2. "Concentrar a montagem do objeto em uma única factory."
>
> Qual reflete melhor a decisão?

Para reescritas óbvias (com alvo único e implícito), aplicar direto sem perguntar.

## Validação antes de passar adiante

Cada regra final precisa satisfazer:

- Inicia com verbo no imperativo.
- Nomeia o estado-alvo (arquivo, helper, formato, localização).
- Quando há cauda contrastiva, o alvo já apareceu na principal.

Passar a lista validada para `atoms/dedup.md`.
