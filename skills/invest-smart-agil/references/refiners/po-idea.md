# po-idea

## Quando acionar

- PO apresenta ideia bruta, vaga ou incompleta
- PO pede ajuda para estruturar uma demanda do cliente
- A mensagem inicial não contém: quem é afetado, qual a dor,
  qual o valor, o que já está decidido, como saber quando está pronto

## Quando NÃO acionar (pular para format-card-m1)

- PO apresenta documento de requisito estruturado com as 5 dimensões
- PO cola um briefing detalhado com contexto suficiente
- Neste caso: extrair as dimensões do documento e só perguntar
  o que estiver ausente

## Sequência de extração

### Dimensão 1 — Valor

**Objetivo:** entender a dor real, para quem, e o impacto se não resolver.

Pergunta inicial:

> "Me conta mais sobre o problema. Quem está sendo prejudicado hoje
> e o que acontece de ruim por causa disso?"

Se a resposta for superficial (ex: "o cliente quer melhorar X"):

> "E se não resolvermos isso, qual o impacto concreto —
> perde cliente, gera retrabalho, cria risco operacional?"

Se mencionar múltiplos afetados:

> "Desses todos, quem sente a dor mais diretamente no dia a dia?"

**Critério de suficiência:** tem o perfil do afetado + a dor específica

- pelo menos uma consequência de não resolver.

---

### Dimensão 2 — Negócio

**Objetivo:** separar o que já está decidido do que ainda pode mudar.

Pergunta inicial:

> "O que você já sabe que precisa acontecer — alguma restrição ou
> regra que não tem discussão?"

Se misturar firme com aberto:

> "Isso que você disse — é uma regra do cliente que não muda,
> ou é uma sugestão de como resolver que ainda pode mudar no refinamento?"

Se tudo parecer aberto:

> "Existe algo que o cliente disse explicitamente que é obrigatório?"

**Critério de suficiência:** tem pelo menos uma regra firme separada
do que está em aberto.

---

### Dimensão 3 — Esqueleto

**Objetivo:** identificar a menor entrega com valor real.

Pergunta inicial:

> "Se você pudesse entregar só uma parte disso primeiro para validar
> com o cliente, qual seria? O que é o mínimo que já resolveria a dor?"

Se o PO listar tudo de uma vez:

> "De tudo isso, o que o cliente sentiria falta primeiro se não tivesse?
> Isso provavelmente é o que entregamos primeiro."

Se a resposta for "tudo ao mesmo tempo":

> "Imagina que você tem 1 semana. O que entregaria nessa semana que
> já teria valor para o cliente, mesmo que incompleto?"

**Critério de suficiência:** tem uma descrição do esqueleto separada
das intensificações.

---

### Dimensão 4 — Dependências

**Objetivo:** identificar o que bloqueia ou precisa existir antes.

Pergunta inicial:

> "Isso depende de alguma outra coisa que ainda não existe no sistema,
> ou pode ser construído de forma independente?"

Se depender de outra feature:

> "Essa dependência é total (não dá pra começar sem) ou tem um contorno
> possível, como mockar dados ou construir em paralelo?"

**Critério de suficiência:** dependências identificadas e tipadas
(total ou contornável).

---

### Dimensão 5 — Testabilidade

**Objetivo:** garantir que o time saberá quando está pronto.

Pergunta inicial:

> "Como você saberia que isso foi entregue corretamente? O que o cliente
> ou usuário conseguiria fazer que não conseguia antes?"

Se a resposta for vaga ("ficaria melhor", "mais fácil"):

> "Consegue descrever um cenário concreto? Tipo: 'quando o organizador
> faz X, ele consegue Y sem precisar de Z' — assim o time sabe
> exatamente o que testar."

Se o PO não souber:

> "Tudo bem não saber agora — vamos pelo menos tentar descrever
> o antes e o depois. Como é hoje? Como deveria ser?"

**Critério de suficiência:** tem pelo menos dois cenários concretos
no formato Quando/Então.

---

## Encerramento da entrevista

Encerrar quando as 5 dimensões tiverem critério de suficiência atingido.
Antes de gerar o card, sinalizar:

> "Acho que tenho o suficiente para montar o card inicial. Vou gerar
> agora — revise e me diz se capturei certo."

## Output estruturado (para format-card-m1)

```
EXTRAÇÃO — po-idea
Dimensão 1 (Valor): [afetado · dor · consequência]
Dimensão 2 (Negócio): [firmes: ... / em aberto: ...]
Dimensão 3 (Esqueleto): [mínimo: ... / intensificações: ...]
Dimensão 4 (Dependências): [dependência · tipo · contorno]
Dimensão 5 (Testável): [cenário 1 · cenário 2]
```

Este output é passado internamente para `format-card-m1`.
Não é exibido ao PO — o PO vê o card M1 diretamente.
