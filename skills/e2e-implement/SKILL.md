---
name: e2e-implement
description: Implementa os cenários de testes apartir dos cenários TDD dos casos de uso. Use esta SKILL para implementar os cenários de teste (implementação) a partir dos cenários TDD (especificação) dos casos de uso, garantindo que os testes sejam alinhados com os requisitos e critérios de aceitação definidos.
user-invocable: true
effort: low
---

# Introdução

Implementa o código da feature para que os cenários de testes fiquem verdes, garantindo que os testes sejam alinhados com os requisitos e critérios de aceitação definidos. O e2e-implement é uma skill projetada para auxiliar na implementação dos cenários de teste usando a metodologia TDD (Test-Driven Development). Ele analisa os cenários de teste gerados anteriormente e implementa o código necessário para que os testes sejam aprovados, seguindo as melhores práticas de desenvolvimento de software e garantindo que a implementação seja clara, concisa e eficaz. Com o objetivo de diminuir falsos positivos implementando os testes usando a api real e depois convertendo para o mock-server de testes.

---

## Regras Importantes

- Os cenários de teste devem ser implementados usando a biblioteca Playwright, garantindo que sejam compatíveis com as práticas recomendadas para testes de ponta a ponta (E2E) e possam ser facilmente integrados ao processo de desenvolvimento e automação de testes.
- Caso os cenarios de testes possuam a tag `@real-api`, a implementação deve ser feita utilizando a API real, garantindo que os testes sejam executados em um ambiente que reflata as condições de produção e validem a funcionalidade de forma eficaz.
- A cada teste passando, o código de mocks, stubs, handlers correspondente deve ser criado e armazenado na pasta correta no msw (dentro do package e2e).
- Caso o cenário não possua a tag `@real-api`, a implementação deve ser feita utilizando mocks, stubs ou handlers, garantindo que os testes sejam executados de forma controlada e isolada, permitindo a simulação de diferentes cenários e condições sem depender da API real, o que é especialmente útil para testes de unidade e integração.
- Sempre execute os testes após a implementação para garantir que estejam passando e que a funcionalidade esteja funcionando conforme o esperado, garantindo a qualidade e eficácia dos testes implementados.
- Analise os detalhes da feature (prd.md, research.md, plan.md) e os casos de uso, para entender onde encontrar os arquivos necessários para desenvolver a feature.

**ATENÇÃO:**

- A cada teste verde, pergunte ao usuário antes de continuar.
- As interfaces de frontend devem seguir fielmente o prototipo. as screenshots das telas podem ser localizadas dentro da pasta `prototype` dentro da pasta da feature. Caso não encontre, avise o usuário antes de prosseguir.
- Caso o projeto seja `participant` e já exista um build disponível, reutilize-o.

---

## Passo a Passo

1. Primeiro, solicite ao usuário o nome do projeto onde a feature será criada (api, backoffice, organizer, participant, domain, ui, ngrok).
2. Valide se o projeto existe em apps/ ou packages/.
3. Solicite ao usuário o nome da feature e do caso de uso ou requisito específico para o qual deseja implementar os cenários de teste. Caso não exista, encerre a operação informando que o caso de uso é necessário para prosseguir.
4. Analise os cenários de teste associados ao caso de uso.
5. Para cada cenário de teste, implemente o código necessário para que o teste seja aprovado.
6. Informe o usuário sobre a implementação do código e forneça um resumo dos cenários de teste implementados.

---

## Rodando os servidores de testes

- Caso o teste tenha a tag **@real-api**, execute os testes batendo na api real (consulte o comando correto no package.json do package e2e).
- Após o teste da api real estiver verde, e os mocks, stubs etc... para o mock server estiverem sido criados, execute este mesmo teste, mas agora usando o mock-server, ele precisa ficar verde.
- Após ambos os testes (real-api, mock-server) estiverem passando (verdes), passe para o próximo teste e repita esse ciclo até finalizar todos os testes.

---

## Resultado Esperado

- Os cenários de teste associados ao caso de uso estão implementados com o código necessário para que os testes sejam aprovados, garantindo que a funcionalidade esteja funcionando conforme o esperado e atendendo aos requisitos e critérios de aceitação definidos no caso de uso.
- O código de mocks, stubs, handlers correspondente é criado e armazenado na pasta correta no msw (dentro do package e2e) para cada teste que possui a tag `@real-api`, garantindo que os testes sejam executados de forma controlada e isolada, permitindo a simulação de diferentes cenários e condições sem depender da API real.
- Todos os testes associados ao caso de uso estão passando, garantindo a qualidade e eficácia dos testes implementados e validando a funcionalidade de forma eficaz.
- O usuário tem acesso ao código implementado e está ciente de como os testes foram implementados, permitindo que ele entenda a estrutura do código e possa realizar manutenções ou ajustes conforme necessário no futuro.

---

## Saída

Informe o usuário sobre a implementação do código e forneça um resumo dos cenários de teste implementados, incluindo quais cenários foram implementados com a API real e quais foram implementados com mocks, stubs ou handlers, garantindo que o usuário tenha uma visão clara do trabalho realizado e possa entender a estrutura do código implementado.
