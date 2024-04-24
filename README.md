# Backend para Gerenciador de Sessões de Votação

- [Funcionalidades Principais](#funcionalidades-principais)
- [Funcionalidades Bônus](#funcionalidades-bônus)
- [Arquitetura e Estrutura do Projeto](#arquitetura-e-estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Execução do Backend](#execução-do-backend)
- [Execução dos Testes](#execução-dos-testes)
- [Observações](#observações)

## Funcionalidades Principais

- Cadastro de novas pautas.
- Abertura de sessões de votação em uma pauta, com tempo determinado (ou 1 minuto por default).
- Recebimento de votos nas pautas (apenas 'Sim'/'Não').
- Contabilização dos votos e resultado da votação na pauta.

## Funcionalidades Bônus

- Controle de usuários, incluindo cadastro com CPFs válidos e definição de usuários admin.
- Performance otimizada para lidar com cenários com centenas de milhares de votos.
- Versionamento da API para garantir compatibilidade e evolução.

## Arquitetura e Estrutura do Projeto

- **Server:** Pasta principal do servidor.
  - **Controllers:** Responsáveis por receber as requisições HTTP e direcionar para os serviços correspondentes.
  - **Routes:** Define as rotas da API e vincula as requisições HTTP aos controllers.
  - **Database:** Pasta responsável pelo acesso ao banco de dados.
    - **Knex:** Configuração e inicialização do Knex.
    - **Migrations:** Migrations para controle de versão do banco de dados.
    - **Models:** Representam as entidades do sistema.
    - **Providers:** Provedores de serviços relacionados ao banco de dados.
  - **Shared:** Pasta contendo componentes compartilhados.
    - **Middlewares:** Middlewares utilizados na aplicação.
    - **Services:** Serviços compartilhados entre diferentes partes da aplicação.

## Tecnologias Utilizadas

- **Node.js:** Plataforma de desenvolvimento para construção de aplicações server-side utilizando JavaScript.
- **Express:** Framework web para Node.js que simplifica a criação de APIs RESTful.
- **Knex.js:** Um construtor de consultas SQL para Node.js que suporta vários bancos de dados, incluindo SQLite3.
- **SQLite3:** Um banco de dados SQL leve que não requer um processo de servidor separado.
- **Jest:** Framework de teste usado para testar os endpoints e regras de negócio da API
- **Yup:** Biblioteca de validação de esquemas JavaScript para garantir a integridade dos dados.

## Execução do Backend

1. Clone o repositório.
2. Certifique-se de ter o Node.js e o npm instalados em sua máquina.
3. Instale as dependências do projeto com o comando `npm install`.
4. Configure o banco de dados de acordo com as configurações definidas no arquivo de configuração do Knex.
5. Execute a aplicação com o comando `npm start`.

## Execução dos Testes

- Execute os testes unitários com o comando `npm test`.
  

  ## Desenvolvedores

| [<img src="https://avatars.githubusercontent.com/paolaarruee?v=4" width=115><br><sub>Paola Arrueé</sub>](https://github.com/paolaarruee) |
| :---: |
| [Paola Arrueé](https://github.com/paolaarruee) |
