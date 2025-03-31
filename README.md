# API Plathanus

Esta é a API desenvolvida para o teste da Plathanus. A documentação detalhadas dos endpoints da API se encontra em [API Plathanus](https://api-plathanus.utamo.com.br/docs/).

**O app já consta com CI/CD configurado, portanto, qualquer alteração na branch main já irá refletir no app.**

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