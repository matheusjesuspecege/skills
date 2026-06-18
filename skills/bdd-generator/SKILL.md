---
name: bdd-generator
description: "Gerador de cenários BDD para testes de software. Use este skill para criar cenários de teste claros e estruturados, seguindo a metodologia BDD (Behavior-Driven Development)."
user-invocable: true
---

# Introdução

O **BDD Generator** é uma skill projetada para auxiliar na criação de cenários de teste baseados em casos de uso e critérios de aceitação. Ele segue a metodologia BDD, que enfatiza a colaboração entre desenvolvedores, testadores e stakeholders para garantir que os requisitos sejam compreendidos e testados de forma eficaz. O skill gera arquivos de especificação executáveis no formato Gerkin, que podem ser usados para automatizar testes de software e servir como documentação viva do sistema.

---

## Regras Importantes

- A estrutura do arquivo deve ser uma **especificação executável**, servindo tanto como documentação quanto como base para testes.
- A estrutura do arquivo deve seguir o formato **Gerkin**.
- A extensão do arquivo deve ser **.feature**.
- Os cenários de testes devem ser gerados apartir dos critérios de aceitação definidos no caso de uso.
- Certifique-se de que os cenários sejam claros, consisos e reflitam fielmente os critérios de aceitação.
- As features e os casos de uso estão localizadas na pasta **specs/features/<projeto>/**.
- Os arquivos **.feature** devem ser salvos na mesma pasta dos casos de uso, com o mesmo padrão de nomeação, garantindo que estejam organizados e facilmente acessíveis para a equipe de desenvolvimento e testes.
- Use tags para identificar o que é frotend, backend, api, etc. Exemplo: **@frontend**, **@backend**, **@api**.

---

## Passo a Passo

1. Primeiro, solicite ao usuário o nome do projeto onde a feature será criada (api, backoffice, organizer, participant, domain, ui, ngrok).
2. Valide se o projeto existe em apps/ ou packages/.
3. Solicite ao usuário o nome da feature e do caso de uso ou requisito específico para o qual deseja gerar cenários BDD. Caso não exista, encerre a operação informando que o caso de uso é necessário para prosseguir.
4. Analise o caso de uso e identifique os critérios de aceitação.
5. Para cada critério de aceitação, crie um cenário BDD usando a estrutura que pode ser ser localizada na sessão: **Estrutura do Arquivo**.
6. Organize os cenários em um arquivo **.feature**, seguindo a estrutura definida na sessão **Estrutura do Arquivo**.
7. Salve o arquivo ao lado do caso de uso original, garantindo que o nome do arquivo seja descritivo e relacionado ao caso de uso.
8. Informe o usuário sobre a criação do arquivo e forneça um resumo dos cenários gerados.
9. Encerre a operação, garantindo que o usuário tenha acesso ao arquivo gerado e esteja ciente de como utilizá-lo para testes de software.

---

## Estrutura do Arquivo

### Título

Titulo descritivo que foca em uma atividade que o usuário deseja realizar, como **"Ganhando pontos de milhagem por voos"**. Segue uma narrativa de texto livre para explicar o valor de negócio. Apenas um breve resumo pequeno o suficiente para caber em um cartão de índice.

**Exemplo:** Para planejar minhas viagens com mais eficiência, como passageiro diário, eu quero saber o itinerário ideal entre duas estações.\*\*

**A ordem aqui é importante:** ao planejar funcionalidades e histórias, o principal objetivo deve ser entregar valor ao negócio.

- Começe definindo qual valor de negócio pretende oferecer.
- Quem precisa da funcionalidade que está propondo.
- Finalmente, qual funcionalidade acredita que dará suporte a esse resultado.

Isso ajuda a garantir que cada funcionalidade contribua ativamente para atingir um objetivo de negócios, reduzindo assim o risco de desvio de escopo. Também serve como um lembrete importante do motivo pelo qual você está implementando essa funcionalidade.

### Contexto Compartilhado (Background)

Para evitar a repetição de passos em multiplos cenários da mesma funcionalidade, aqui, define pré-condições comuns, como **Dado que o usuário está logado**, que serão executadas antes de cada cenário individual.

### Cenários

Um ou mais cenários que ilustram exemplos concretos de comportamento. Cada cenário deve ser independente e seguir a estrutura:

- **Given** (Dado): Define o estado inicial ou as pré-condições para o cenário.
- **When** (Quando): Descreve a ação ou evento que ocorre.
- **Then** (Então): Especifica o resultado esperado ou a resposta do sistema.
- **And/But** (E/Mas): Pode ser usado para adicionar condições adicionais ou ações dentro de um cenário.

---

## Saída

Gere um feedback claro e conciso sobre a criação do arquivo, incluindo o nome do arquivo, a localização onde foi salvo e um resumo dos cenários gerados. Certifique-se de que o usuário tenha acesso ao arquivo e esteja ciente de como utilizá-lo para testes de software.
