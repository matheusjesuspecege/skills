# Atom: classify

## Função

Recebe grupos de mudanças do diff e extrai padrões abstratos. Cada padrão é referenciado pelo **tipo de arquivo** (ex: "componente de seleção", "seeder de ingresso") — nomes concretos de feature, componente e campo ficam de fora.

## Condições de encerramento antecipado

- Encerrar quando o diff for somente conteúdo (strings i18n, textos, valores de seed) com a estrutura preservada.
- Encerrar quando o diff devolver o código a um estado anterior já registrado.

## Categorias de padrão a observar

### Localização de arquivo

Pergunta: "Onde esse tipo de coisa vai parar?"

- Componente criado em `ui/components/` → reutilizável entre páginas
- Componente criado dentro da própria página como subcomponente local → específico, vive no mesmo arquivo
- Teste criado junto do componente → colocalizado
- Teste criado em `tests/` → integração ou utilitário compartilhado

### Estrutura de componente

Pergunta: "Como ele foi estruturado internamente?"

- Props explicitamente tipadas com interface
- Composição com `cn()` para classes condicionais
- Subcomponentes locais mantidos privados ao arquivo (sem export)
- Constantes de mapeamento declaradas fora do componente (ex: `Record<Enum, IconName>`)

### Padrão de teste

Pergunta: "Como os testes foram escritos?"

- Qual helper de render foi usado
- O que foi mockado e como
- Como as interações foram disparadas (userEvent vs fireEvent)
- Qual foi o primeiro teste (estado inicial/vazio)
- Queries usadas (getByText, getByRole, getByTestId)

### Rota / navegação

Pergunta: "Como uma nova tela é registrada?"

- Lazy import com named export
- Arquivo de registro centralizado

### i18n

Pergunta: "Como strings são organizadas?"

- Namespace adotado
- Arquivo de destino
- Onde ficam strings com quebra de linha

### API / Backend

Pergunta: "Como seeders e factories são estruturados?"

- Método estático vs instância
- Formato de retorno (objeto plano vs Prisma model)
- Como o seeder service é injetado

## Output

Lista de padrões no formato:

```
CATEGORIA: [categoria]
REGRA: [enunciado abstrato e acionável]
OBSERVADO EM: [tipo de arquivo — ex: "componente de seleção", "seeder de ingresso"]
```

Passar para `atoms/reframe-positive.md` — este atom entrega o enunciado bruto; o reframe garante a forma de alvo positivo antes do dedup.
