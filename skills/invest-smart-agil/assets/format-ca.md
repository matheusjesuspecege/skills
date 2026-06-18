# format-ca

## Input esperado

- Contexto (estado do sistema ou do usuário)
- Ação executada
- Resultado esperado
- Mensagem exata (se houver texto visível ao usuário)
- Comportamento visual (onde aparece, como se comporta)

## Output gerado

```
CAN — [número sequencial]
Dado [contexto],
quando [ação],
então [resultado]
→ Mensagem: "[texto exato que aparece na tela]"
→ Visual: [onde aparece · como se comporta · estado do componente]
```

## Regras de aplicação

- Mensagem é obrigatória sempre que houver texto visível ao usuário
  (erro, confirmação, tooltip, placeholder, label dinâmico)
- Visual descreve o comportamento do componente, não o layout
  (ex: "botão desabilitado com tooltip" — não "botão cinza à direita")
- Se o resultado esperado tiver variação por plataforma (desktop vs. mobile),
  criar um CA por variação — não um CA com condicionais
- Trigger words proibidas nos CAs: "correto", "apropriado", "melhor",
  "fácil", "intuitivo", "rápido" — se aparecerem, operacionalizar
  (ex: "fácil" → "usuário completa em menos de 3 cliques")

## Exemplo

Input:

- Contexto: sessão com 50 inscritos
- Ação: organizador reduz vagas para 30
- Resultado: sistema bloqueia e exibe erro
- Mensagem: "O limite de vagas não pode ser inferior às 50 inscrições já realizadas"
- Visual: campo vagas marcado em vermelho, mensagem abaixo do campo, botão salvar desabilitado

Output:

```
CA3
Dado uma sessão com 50 inscrições realizadas,
quando reduzo o limite de vagas para 30,
então o sistema bloqueia o salvamento
→ Mensagem: "O limite de vagas não pode ser inferior às 50 inscrições já realizadas"
→ Visual: campo vagas em vermelho · mensagem abaixo do campo · botão salvar desabilitado
```
