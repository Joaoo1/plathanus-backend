# API Plathanus - Portal de notícias

Esta é a API desenvolvida para o teste da Plathanus. A documentação detalhadas dos endpoints da API se encontra em [API Plathanus](https://api-plathanus.utamo.com.br/docs/).

**O app já consta com CI/CD configurado, portanto, qualquer alteração na branch main já irá refletir no app.**

A branch main está protegida contra push direto, então, caso queira realizar alguma alteração, crie uma nova branch e abra um PR para a main. Não é necessário ninguém aprovar o PR antes de fazer o merge, mas é obrigatório que o workflow de testes e linting finalize sem erros. 

### Pré-requisitos para executar localmente

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:

**[Node.js](https://nodejs.org)**

**[Docker](https://www.docker.com)**

### 🧭 Executando o projeto localmente

```bash
# Instale as dependências
$ npm install

# Crie um arquivo .env com base no .env.test

# Suba os containers dos bancos de dados no docker 
docker compose up -d

# Execute a aplicação em modo desenvolvimento
$ npm run dev
```
