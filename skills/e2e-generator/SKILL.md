---
name: e2e-generator
description: "Gerador de cenarios de testes playwright apartir dos cenarios BDD dos casos de uso. Use esta SKILL para gerar os cenarios de teste (implementação) a partir dos cenarios BDD (especificação) dos casos de uso, garantindo que os testes sejam alinhados com os requisitos e critérios de aceitação definidos."
user-invocable: true
---

# Introdução

Gera os cenários de teste (implementação) a partir dos cenários BDD (especificação) dos casos de uso, garantindo que os testes sejam alinhados com os requisitos e critérios de aceitação definidos. O TDD Generator é uma skill projetada para auxiliar na criação de testes automatizados usando a metodologia TDD (Test-Driven Development). Ele analisa os cenários BDD gerados anteriormente e cria os arquivos de teste correspondentes, seguindo as melhores práticas de desenvolvimento de software e garantindo que os testes sejam claros, concisos e eficazes.

---

## Regras Importantes

- Use o padrão kebab-case para nomear os arquivos e pastas de teste, garantindo que os testes estejam organizados de forma lógica e fácil de navegar.
- Os cenários de teste devem ser gerados a partir dos cenários BDD definidos nos casos de uso.
- Os testes seguem o padrão **Page Object Model (POM)** e funções auxiliares para garantir a organização e manutenção dos testes.
- Os arquivos de teste devem ser salvos na pasta **packages/e2e/tests/<projeto>** dentro da pasta com o nome do caso de uso representando um substantivo, e o cenario de teste representando o que realmente é o caso de uso ex: **packages/e2e/tests/`<projeto>`/checkout/classificar-tipo-pedido/classificar-tipo-pedido.spec.ts**.
- A extensão dos arquivos de teste deve ser **.spec.ts** para garantir a consistência e facilitar a identificação dos arquivos de teste dentro do projeto.
- A nomenclatura dos arquivos de teste deve seguir o padrão kebab-case, garantindo que os testes estejam organizados de forma lógica e fácil de navegar.
- Os page objects devem ser salvos na pasta **packages/e2e/tests/`<projeto>`/page-objects**.
- As funções auxiliares devem ser salvas na pasta **packages/e2e/helpers** no arquivo representando o macro da feature para centralizar a logica da feature.
- O nome do arquivo de teste deve ser descritivo e relacionado ao caso de uso, seguindo o padrão de nomenclatura estabelecido.
- Certifique-se de que os cenários de teste sejam claros, concisos e reflitam fielmente os cenários BDD, garantindo que os testes sejam eficazes na validação dos requisitos e critérios de aceitação.
- Os cenários de teste devem ser implementados usando a biblioteca Playwright, garantindo que sejam compatíveis com as práticas recomendadas para testes de ponta a ponta (E2E) e possam ser facilmente integrados ao processo de desenvolvimento e automação de testes.
- Os arquivos de teste devem ser organizados de forma lógica e acessível, facilitando a navegação e manutenção por parte da equipe de desenvolvimento e testes.
- Somente o primeiro teste deve ter uma implementação completa, os demais devem conter apenas a estrutura do teste, sem a implementação dos passos Given, When e Then, para que o usuário possa completar a implementação posteriormente.
- Os testes devem seguir **AAA (Arrange, Act, Assert)** para garantir uma estrutura clara e consistente, facilitando a compreensão e manutenção dos testes ao longo do tempo.
- Todos os code snippets devem vir comentados para que o usuário possa entender a estrutura do teste e completar a implementação conforme necessário, garantindo que os testes sejam personalizados de acordo com os requisitos específicos do caso de uso e dos cenários BDD.

- **ATENÇÃO:** Cada teste deve possuir a tag `@real-api` para indicar que são testes que interagem com a API real.

**Importante:**

- Os cenários de teste devem ser centralizados no mesmo arquivo de teste, garantindo que todos os testes relacionados a um caso de uso específico estejam organizados em um único local, facilitando a navegação e manutenção dos testes por parte da equipe de desenvolvimento e testes.
- A sessão **Resultado Esperado** deve ser seguida rigorosamente para garantir que os testes gerados atendam aos critérios de qualidade e eficácia necessários para validar os requisitos e critérios de aceitação definidos no caso de uso.
- Os nomes do BDD e do cenário de teste devem ser os mesmos para garantir a rastreabilidade e clareza entre a especificação e a implementação dos testes, facilitando a compreensão e manutenção dos testes ao longo do tempo.
- Todos os testes devem vir com skip por padrão, para que o usuário possa habilitar os testes conforme necessário, garantindo que os testes sejam executados de forma controlada e evitando falhas inesperadas durante a execução dos testes automatizados.

---

## Passo a Passo

1. Primeiro, solicite ao usuário o nome do projeto onde a feature será criada (api, backoffice, organizer, participant, domain, ui, ngrok).
2. Valide se o projeto existe em apps/ ou packages/.
3. Solicite ao usuário o nome da feature e do caso de uso ou requisito específico para o qual deseja gerar os cenários de teste. Caso não exista, encerre a operação informando que o caso de uso é necessário para prosseguir.
4. Analise os cenários BDD associados ao caso de uso e identifique os passos Given, When e Then.
5. Para cada cenário BDD, crie um cenário de teste correspondente usando a estrutura definida.
6. Organize os cenários de teste em um arquivo de teste, seguindo as melhores práticas de organização e nomenclatura.
7. Salve o arquivo de teste na raiz do projeto dentro da pasta **packages/e2e/tests/<projeto>**, garantindo que o nome do arquivo seja descritivo e relacionado ao caso de uso.
8. Informe o usuário sobre a criação do arquivo de teste e forneça um resumo dos cenários de teste gerados.

---

## Resultado Esperado

- Um arquivo de teste é criado na pasta **packages/e2e/tests/<projeto>** com o nome do caso de uso e do cenário de teste, seguindo o padrão de nomenclatura estabelecido.
- O arquivo de teste contém os cenários de teste gerados a partir dos cenários BDD, organizados de forma clara e concisa, refletindo fielmente os requisitos e critérios de aceitação definidos no caso de uso.
- O primeiro cenário de teste contém uma implementação completa, enquanto os demais cenários de teste contêm apenas a estrutura do teste, permitindo que o usuário complete a implementação posteriormente.
- Os cenários de teste seguem a estrutura AAA (Arrange, Act, Assert) e estão organizados de forma lógica e acessível, facilitando a navegação e manutenção por parte da equipe de desenvolvimento e testes.
- Todos os testes vêm com skip por padrão, permitindo que o usuário habilite os testes conforme necessário e garantindo que os testes sejam executados de forma controlada, evitando falhas inesperadas durante a execução dos testes automatizados.
- Os nomes do BDD e do cenário de teste são os mesmos, garantindo a rastreabilidade e clareza entre a especificação e a implementação dos testes, facilitando a compreensão e manutenção dos testes ao longo do tempo.
- Os page objects e funções auxiliares são organizados de forma lógica e acessível, facilitando a navegação e manutenção por parte da equipe de desenvolvimento e testes, e garantindo que os testes sejam eficazes na validação dos requisitos e critérios de aceitação definidos no caso de uso.
- Os cenários de teste são implementados usando a biblioteca Playwright, garantindo que sejam compatíveis com as práticas recomendadas para testes de ponta a ponta (E2E) e possam ser facilmente integrados ao processo de desenvolvimento e automação de testes.
- O usuário está satisfeito com os cenários de teste gerados e tem as informações necessárias para prosseguir com a implementação ou execução dos testes, garantindo que os testes sejam eficazes na validação dos requisitos e critérios de aceitação definidos no caso de uso.
- Os cenarios devem estar centralizados no mesmo arquivo de teste, garantindo que todos os testes relacionados a um caso de uso específico estejam organizados em um único local, facilitando a navegação e manutenção dos testes por parte da equipe de desenvolvimento e testes.

---

## Saída

Informe o usuário sobre a criação do arquivo de teste e forneça um resumo dos cenários de teste gerados, destacando os principais casos de teste e os critérios de aceitação que foram validados. Certifique-se de que o usuário tenha acesso ao arquivo gerado e esteja ciente de como utilizá-lo para validar os requisitos e critérios de aceitação definidos no caso de uso. Encerre a operação, garantindo que o usuário esteja satisfeito com os cenários de teste gerados e tenha as informações necessárias para prosseguir com a implementação ou execução dos testes.
