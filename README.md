# Projeto de Testes K6 para API de Gerenciamento de Cinema

## Descrição

Este projeto visa realizar testes de desempenho em uma API de gerenciamento de cinemas, utilizando a ferramenta K6. Os testes são organizados seguindo a abordagem Page Object, que promove a reutilização de código e a legibilidade. Além disso, o projeto utiliza Docker para facilitar a execução dos testes em diferentes ambientes e a biblioteca Faker para gerar dados de teste realistas.

## Índice

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Executando os Testes](#executando-os-testes)
- [Contribuição](#contribuição)
- [Observação](#observação)
- [Licença](#licença)

## Tecnologias Utilizadas

- [K6](https://k6.io/) - Ferramenta de testes de carga e desempenho.
- [Docker](https://www.docker.com/) - Plataforma para containerização de aplicações.
- [Faker](https://github.com/faker-js/faker) - Biblioteca para geração de dados fictícios.
- [JavaScript](https://www.javascript.com/) - Linguagem utilizada para os scripts de teste.

## Estrutura do Projeto

A estrutura do projeto é a seguinte:

- **data/**: Contém os dados gerados para os testes.
- **docker/**: Arquivos relacionados à configuração do Docker.
- **results/**: Resultados dos testes executados.
- **services/**: Serviços utilizados pelos testes.
- **support/**: Classes de suporte, incluindo `baseRest`.
- **test/**: Scripts de teste organizados por fluxo e tipo de operação.

## Configuração do Ambiente

### Pré-requisitos

Certifique-se de que os seguintes softwares estejam instalados:

- [Node.js](https://nodejs.org/) (versão 20 ou superior)
- [Docker](https://www.docker.com/) (versão 27 ou superior)
- [K6](https://k6.io/docs/getting-started/installation) (instalação via Homebrew ou binário)

### Instalação

1. Clone o repositório:

Abra o terminal e execute o seguinte comando para clonar o repositório:

```bash
  git clone https://gitlab.com/Douglash701/testNestjsCinema.git
```
Após clonar, navegue até o diretório do repositório:
```

 cd seu-repositorio
```

2. Acesse a pasta Docker:
 
 Navegue até a pasta docker:

```bash
cd docker
```
3. Abra o arquivo docker-compose.yml:

Abra o arquivo docker-compose.yml em seu editor de código favorito para verificar ou modificar a configuração conforme necessário.

4. Inicie os serviços com Docker Compose:

Com o terminal ainda na pasta docker, execute o seguinte comando para iniciar os serviços definidos no arquivo docker-compose.yml:

```bash
docker-compose up
```
Isso iniciará os containers do Docker com a configuração especificada. Para rodar os containers em segundo plano, adicione a opção -d:
```
docker-compose up -d
```

5. Verifique se os containers estão em execução: 
```bash
docker ps
```


### executando-os-testes

Para executar os testes do seu projeto utilizando Docker, siga as etapas abaixo:

Certifique-se de que os containers estão em execução:

Antes de rodar os testes, você deve ter os serviços do projeto em execução. Se ainda não o fez, inicie os containers usando o docker-compose:

```bash
cd caminho/para/seu/repositorio/docker
docker-compose up 
```
 Executar os testes específicos:

Você pode executar diferentes testes modificando a configuração do comando no seu docker-compose.yml. Por exemplo:

Para executar testes de carga (Load):
```bash
command: run /test/tickets/POST/loadTicketsPost.js
```
Para executar testes de soak:
```bash
command: run /test/tickets/PUT/soakTicketsPut.js
```
Para executar testes de smoke:
```bash
command: run /test/tickets/DELETE/smokeTicketsDel.js
```
Verifique os resultados dos testes:

Após a execução dos testes, os resultados serão gerados em formato html para /results. Analise os resultados para verificar quais testes passaram e quais falharam.

Parar os containers (opcional):

Se você deseja parar todos os serviços e containers após a execução dos testes, execute o seguinte comando:
```bash
docker-compose down
```

# Contribuição
Agradeço aos seguintes colegas que contribuíram para o desenvolvimento deste projeto:

- Thiago
- Iarlon
- Lucas
- Jerfesson

Gostaria de expressar minha profunda gratidão a toda a turma. Seu suporte e colaboração foram essenciais para o sucesso deste projeto. Juntos, conseguimos superar desafios e aprimorar nossas habilidades. Obrigado a todos!



#### Observação
Ao executar os testes, seja pelo Docker ou localmente, por gentileza, altere o caminho dos relatórios de acordo com o ambiente:

Ao executar no Docker: utilize o caminho relativo para o relatório, como abaixo:


```bash
"results/spikeResult/spikeTestMovies.html";
```
Ao executar localmente: use o caminho absoluto para o relatório:
```bash
"/caminho/absoluto/para/results/spikeResult/spikeTestMovies.html";
```

Certifique-se de ajustar o caminho conforme necessário para o seu ambiente local.


Aqui está a seção Licença em formato Markdown, com a licença MIT:

# Licença
Este projeto está licenciado sob a Licença MIT. Veja o arquivo LICENSE para mais detalhes.



