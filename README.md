# API Plathanus - Portal de notícias

Esta é a API desenvolvida para o teste da Plathanus. A documentação detalhadas dos endpoints da API se encontra em [API Plathanus](https://api-plathanus.utamo.com.br/docs/).

**O app já consta com CI/CD configurado, portanto, qualquer alteração na branch main já irá refletir no app.**

A branch main está protegida contra push direto, então, caso queira realizar alguma alteração, crie uma nova branch e abra um PR para a main. Não é necessário ninguém aprovar o PR antes de fazer o merge, mas é obrigatório que o workflow de testes e linting finalize sem erros. 

## 📁 Estrutura de pastas da API
Todo o código da API se encontra dentro da pasta `src`, que possui a seguinte estrutura:

```
    └── 📁src
        └── 📁common
        └── 📁database
        └── 📁modules
        └── 📁server
```
Explicação do intuito de cada pasta:

- **modules**: Esta é a pasta onde se encontra toda a regra de negócio da aplicação, utilizando aqui um estrutura inspirada no DDD, onde quebramos a aplicação em domínios. Dessa forma, cada pasta dentro dessa é um domínio totalmente independente e desacoplado dos outros. Optei por manter uma estrutura simples dentro de cada módulo, então a organização das pastas de cada módulo é basicamente separado por tipos de arquivo.

- **common**: Esta é a pasta que se encontra arquivos diversos, que não possuem regra de negócio, e são compartilhados entre todos os módulos, para seguir aqui o princípio DRY e evitar repetição de código.

- **database**: O nome é auto explicativo, contém todos os arquivos relacionados a parte de infraestrutura do banco de dados, ou seja, como se conectar com o banco, como criar as tabelas, etc. 

- **server** - E por fim, temos a pasta server que contém todos os arquivos pertinentes ao servidor HTTP que está rodando. 


## 🔧 Executando o projeto
### Pré-requisitos para executar localmente

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:

**[Node.js](https://nodejs.org)**

**[Docker](https://www.docker.com)**

### Executando o projeto localmente

```bash
# Instale as dependências
$ npm install

# Crie um arquivo .env com base no .env.test

# Suba os containers dos bancos de dados no docker 
docker compose up -d

# Execute a aplicação em modo desenvolvimento
$ npm run dev
```
