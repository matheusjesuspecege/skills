#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const SKILL_ROOT = path.resolve(__dirname, '..');
const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..');
const OUT = path.join(SKILL_ROOT, 'dist', 'claude-projects');
const KB = path.join(OUT, 'knowledge');

function read(rel) {
  return fs.readFileSync(path.join(SKILL_ROOT, rel), 'utf8');
}

function write(dir, name, content) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, name), content, 'utf8');
  console.log(`  ✓ ${path.relative(REPO_ROOT, path.join(dir, name))}`);
}

function replaceOrFail(text, anchor, replacement, file) {
  if (!text.includes(anchor)) {
    throw new Error(`Anchor não encontrado em ${file}. O arquivo fonte mudou — atualize o script.\nAnchor:\n${anchor}`);
  }
  return text.replace(anchor, replacement);
}

function stripScopeGuardFlags(text) {
  return replaceOrFail(
    text,
    '- Dúvidas sobre o processo ou sobre o que foi gerado\n- Flags da skill (`--with-docs`, `--no-docs`) — modificadores válidos, não recusar\n',
    '- Dúvidas sobre o processo ou sobre o que foi gerado\n',
    'scope-guard.md',
  );
}

function stripRefineFeatureWithDocs(text) {
  let out = replaceOrFail(
    text,
    '[loop de contribuições por papel]\n  ↓ flag --with-docs ativa AND papel ∈ {Frontend, Backend}?\n    ↓ sim → load-project-context (antes de cada pendência técnica)\n    ↓ não → segue direto\n  ↓\nformat-ca (para cada CA gerado)',
    '[loop de contribuições por papel]\n  ↓\nformat-ca (para cada CA gerado)',
    'refine-feature.md',
  );
  out = replaceOrFail(
    out,
    '- Não decide: regras de negócio, modelagem de banco\n- Com `--with-docs`: recebe contexto do projeto (componentes em `packages/ui`, telas próximas em `apps/*`) com citações `arquivo:linha` antes de cada pendência técnica.\n',
    '- Não decide: regras de negócio, modelagem de banco\n',
    'refine-feature.md (FE bullet)',
  );
  out = replaceOrFail(
    out,
    '- Não decide: layout, componentes de UI\n- Com `--with-docs`: recebe contexto do projeto (módulos NestJS, `schema.prisma`, specs anteriores) com citações `arquivo:linha` antes de cada pendência técnica.\n',
    '- Não decide: layout, componentes de UI\n',
    'refine-feature.md (BE bullet)',
  );
  return out;
}

const MAPPING = [
  { src: 'references/atoms/scope-guard.md', dst: 'atom-scope-guard.md', transform: stripScopeGuardFlags },
  { src: 'references/atoms/detect-phase.md', dst: 'atom-detect-phase.md' },
  { src: 'references/atoms/gate-prereq.md', dst: 'atom-gate-prereq.md' },
  { src: 'references/atoms/check-invest.md', dst: 'atom-check-invest.md' },
  { src: 'references/refiners/role-detect.md', dst: 'refiner-role-detect.md' },
  { src: 'references/refiners/phase-confirm.md', dst: 'refiner-phase-confirm.md' },
  { src: 'references/refiners/po-idea.md', dst: 'refiner-po-idea.md' },
  { src: 'references/molecules/create-feature.md', dst: 'molecule-create-feature.md' },
  {
    src: 'references/molecules/refine-feature.md',
    dst: 'molecule-refine-feature.md',
    transform: stripRefineFeatureWithDocs,
  },
  { src: 'references/molecules/evolve-feature.md', dst: 'molecule-evolve-feature.md' },
  { src: 'assets/format-card-m1.md', dst: 'format-card-m1.md' },
  { src: 'assets/format-card-m2.md', dst: 'format-card-m2.md' },
  { src: 'assets/format-ca.md', dst: 'format-ca.md' },
  { src: 'assets/format-evolution-entry.md', dst: 'format-evolution-entry.md' },
];

const INSTRUCOES_CUSTOMIZADAS = `# Linka Eventos – Produto · Instruções Customizadas

> **Como usar:** cole este conteúdo inteiro (a partir da seção "Identidade") no campo **"Custom Instructions"** do Project no Claude.ai. Em seguida, faça upload de todos os arquivos da pasta \`knowledge/\` para o Project Knowledge.

---

## Identidade

Você é o assistente de produto do time **Linka Eventos** (Pecege). Ajuda PO e UX/UI a criar e manter histórias de usuário (features) ao longo do ciclo de vida. **Cada chat = uma feature.**

## Bootstrap obrigatório em toda mensagem

Antes de qualquer geração, na ordem:

1. **scope-guard** — verifique se o pedido é sobre a feature. Consulte \`atom-scope-guard.md\`. Se fora de escopo, recuse no formato do atom.
2. **role-detect** — se o papel da pessoa não está claro, consulte \`refiner-role-detect.md\` e pergunte uma única vez por chat.
3. **detect-phase** — leia o histórico do chat e determine a fase. Consulte \`atom-detect-phase.md\`. Em caso de dúvida (\`PHASE_UNKNOWN\`), use \`refiner-phase-confirm.md\`.
4. **gate-prereq** — verifique pré-requisitos da fase. Consulte \`atom-gate-prereq.md\`. Bloqueio total se faltar pré-requisito crítico.

## Mapa fase → arquivos da Knowledge Base

| Fase | Use estes arquivos |
| --- | --- |
| \`PHASE_CREATE\` | \`molecule-create-feature.md\` · \`refiner-po-idea.md\` · \`format-card-m1.md\` |
| \`PHASE_REFINE\` | \`molecule-refine-feature.md\` · \`atom-check-invest.md\` · \`format-card-m2.md\` · \`format-ca.md\` |
| \`PHASE_EVOLVE\` / \`PHASE_DEPRECATE\` | \`molecule-evolve-feature.md\` · \`format-evolution-entry.md\` |

> Planning (geração de tasks) acontece no Claude Code CLI dos devs, não aqui.

## Tom & comportamento

- Direto, sem narrar processo interno.
- **Nunca** mencione "INVEST", "SMART", "atom", "molecule", "refiner" ao time.
- Use linguagem natural: "card inicial" (não M1), "card refinado" (não M2), "tasks" (não SMART tasks).
- Uma pergunta por vez quando precisar esclarecer.
- Erros do time (ex: pular refinamento) → sinalizar com gentileza e explicar o motivo.
- Pré-requisito ausente → bloqueio total. Nunca gerar parcialmente.

## Saída para Azure DevOps

Os artefatos de output devem seguir o seguinte formato para azure devops:
- Use markdown limpo (headers \`##\` e \`###\`, listas com \`-\`, blocos de código com triple-backtick para contratos de API e queries)
- Sem \`═══\` decorativos (viram texto cru no editor do ADO)
- Negrito (\`**\`) nas labels importantes (Cobre, Depende, Estimativa, Risco, Mensagem, Visual)
- Cada CA ou task como sub-seção autocontida
- O conteúdo deve renderizar bem tanto no editor rich-text quanto no modo HTML edit do ADO

## Adaptação por papel

- **PO** — tom estratégico, sem detalhe técnico. Recebe: análise de negócio, card inicial/refinado, ambiguidades. → Chame o usuário de Ana.
- **UX/UI** — tom colaborativo. Recebe: pontos do Figma a validar, fluxo visual, notas de ajuste.
- **Frontend/Backend** — se aparecerem aqui (devs normalmente estão no CLI), responda no tom técnico mas sem contexto de código. Para contexto de projeto, oriente a abrir o Claude Code CLI no repo.

## Como começar um chat

- **Feature nova:** "Sou o PO. Quero criar [headline ou ideia]..."
- **Feature existente:** cole o último estado do Azure DevOps (Descrição + AC + Discussão) no primeiro turno. \`detect-phase\` vai re-sincronizar.

## O que colar no Azure DevOps após cada fase

- **Após card inicial:** Work Item novo · Título = headline · Descrição = card · AC = rascunho.
- **Após refinamento:** Descrição = card refinado (substitui o inicial) · AC = co-escritos · Discussão = decisões.
- **Após evolução:** append na Discussão · notificar canais impactados.

## Glossário

| Termo | Definição |
| --- | --- |
| Card inicial (M1) | Criado pelo PO antes do refinamento |
| Card refinado (M2) | Co-criado com o time no refinamento |
| CA | Critério de aceitação — Dado/Quando/Então com mensagem e visual |
| Headline | Nome da feature no formato Role-Ação-Contexto |
| Esqueleto | Menor entrega com valor real verificável |
| Intensificação | Adição incremental de valor a partir do esqueleto |
| Work Item | Unidade de trabalho no Azure DevOps |
`;

const CONTEXTO = `# Contexto — Linka Eventos

Plataforma digital de gestão de eventos do Pecege. Monorepo com pnpm workspaces (API NestJS + três frontends React: Organizer, Backoffice, Participant).

## Papéis no time

- **PO** — Product Owner. Cria card inicial, decide regras de negócio, valida intensidade.
- **UX/UI** — Designer. Apresenta Figma, define fluxo visual, sinaliza ajustes pós-refinamento.
- **Frontend** — Devs das apps web (Organizer, Backoffice, Participant). Implementam interface.
- **Backend** — Devs da API NestJS. Implementam endpoints, modelagem, validações.

## Ciclo de vida de uma feature

1. **Criação** (este Project · PO no browser) → gera card inicial.
2. **Refinamento** (Claude Code CLI · time todo no call) → gera card refinado.
3. **Planning** (Claude Code CLI · devs em paralelo) → gera tasks.
4. **Evolução** (Claude Code CLI · contínuo durante dev) → registra mudanças.

> PO e UX usam este Project. Devs usam Claude Code CLI no repo para refinamento e planning (com a flag \`--with-docs\` para consultar o código existente).

## Fonte da verdade

**Azure DevOps Work Item** é o estado canônico. Chats Claude são colaboradores efêmeros que produzem outputs para colar no Work Item.

## Convenções deste Project

- Um chat por feature. Nome do chat: \`[ID ADO] · [headline]\`.
- Sempre cole o último estado do ADO no início do chat quando retomar uma feature.
- Nunca abra um segundo chat para a mesma feature sem atualizar o ADO antes.
`;

const README = `# Bundle Claude Projects — Linka Eventos

Gerado automaticamente por \`.claude/skills/invest-smart-agil/scripts/build-claude-projects-bundle.js\`. **Não edite manualmente** — altere a fonte em \`.claude/skills/invest-smart-agil/\` e rode \`pnpm claude:bundle\` novamente.

## Como subir no Claude.ai

1. Acesse https://claude.ai/projects e crie (ou abra) o Project **"Linka Eventos – Produto"**.
2. Abra \`INSTRUCOES-CUSTOMIZADAS.md\` deste diretório, copie o conteúdo a partir da seção "Identidade" e cole no campo **"Custom Instructions"** do Project.
3. Faça upload de **todos os arquivos** dentro de \`knowledge/\` como Project Knowledge.
4. Pronto. Cada feature nova = um chat novo dentro deste Project.

## Quando re-rodar o script

- Sempre que alterar qualquer arquivo em \`.claude/skills/invest-smart-agil/\`.
- O script falha em runtime se um trecho que ele precisa transformar não existe mais no fonte — isso protege contra drift silencioso.

## O que o script faz

- Copia atoms, refiners, molecules e formats relevantes para PO/UX.
- Remove tudo relacionado ao \`--with-docs\` (que só faz sentido no CLI).
- **Exclui** \`load-project-context\`, \`plan-dev\` e \`task-smart\` (dev-only).
- Gera \`INSTRUCOES-CUSTOMIZADAS.md\` e \`knowledge/00-contexto-linka-eventos.md\` a partir de templates inline no script.
`;

function clean(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function main() {
  console.log('→ Limpando destino...');
  clean(OUT);

  console.log('→ Gerando arquivos da Knowledge Base...');
  for (const { src, dst, transform } of MAPPING) {
    let content = read(src);
    if (transform) content = transform(content);
    write(KB, dst, content);
  }
  write(KB, '00-contexto-linka-eventos.md', CONTEXTO);

  console.log('→ Gerando instruções customizadas e README...');
  write(OUT, 'INSTRUCOES-CUSTOMIZADAS.md', INSTRUCOES_CUSTOMIZADAS);
  write(OUT, 'README.md', README);

  const kbCount = fs.readdirSync(KB).length;
  console.log(`\n✓ Bundle gerado em ${path.relative(REPO_ROOT, OUT)}`);
  console.log(`  ${kbCount} arquivos em knowledge/ + INSTRUCOES-CUSTOMIZADAS.md + README.md`);
  console.log(`\nPróximo passo: ler ${path.relative(REPO_ROOT, path.join(OUT, 'README.md'))}`);
}

try {
  main();
} catch (err) {
  console.error('\n✗ Falha na geração do bundle:');
  console.error(`  ${err.message}`);
  process.exit(1);
}
