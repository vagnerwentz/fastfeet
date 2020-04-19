<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="https://github.com/Rocketseat/bootcamp-gostack-desafio-02/raw/master/.github/logo.png" width="300px" />
</h1>

<h4 align="center">
  O FastFeet é um sistema para gerenciamento de encomendas.
</h4>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/vagnerwentz/bootcamp-10-desafio-final?color=%237d40e7">

  <a href="https://github.com/vagnerwentz">
    <img alt="Made by Rocketseat" src="https://img.shields.io/badge/made%20by-Vagner Wentz-%237d40e7">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%237d40e7">

  <img alt="Stargazers" src="https://img.shields.io/github/stars/vagnerwentz/bootcamp-10-desafio-final?style=social">
</p>

---

## ✨ Funcionalidades

- Cadastro de Administradores
- Cadastro de Entregadores
 - *Retirada e Confirmação de entregas*
 - *Upload e Delete de arquivos*
- Cadastro de Encomendas
 - *Encomendas só podem ser retiradas entre 8h e 18h*
 - *Cada entregador pode retirar até 5 encomendas por dia*
- Cadastro de Problema nas entregas
- Cancelamento de Entregas

---

## ⚙ Tecnologias

 - ReactJS
 - Node.js
 - Postgres
 - Redis
 - Sequelize
 - Styled-Components
 - Redux/Sagas
 - React Native (0.62.1)
 - React Native Camera
 - Nodemailer
 - Multer

---

> Para executar o projeto, você precisará, antes de tudo, clonar o repositório localmente na sua máquina
```bash
  git clone https://github.com/vagnerwentz/fastfeet.git

  # Acessar o back end
  cd backend
  
  # Acessar o front end
  cd frontend

  # Acessar o mobile
  cd mobile
```

---

## 💻 Backend

Você precisa ter na sua máquina o **Node.js**, o **Yarn** e o **Docker**. Feitas as configurações, seguem os passos para executar o backend da aplicação:

 - Execute o comando `yarn` para fazer o dowload de todas as dependências que são necessárias para executar o projeto;

 - Instalar duas imagens de dois bancos de dados: Postgres, para armazenar nossas tabelas; e o Redis, que será utilizado para envio de e-mails com filas (Que nos permitirá um grande poder). Abaixo, os comandos para realizar o download:
    ```bash
      # Criando um container com a imagem do postgres
      docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres

      # Criando um container com a imagem do redis
      docker run --name redis -p 6379:6379 -d -t redis:alpine
    ```
 - Execute `yarn queue` para que a fila de processamento de emails esteja funcionando.

 - Execute as `migrations` para que as tabelas sejam criadas:
   ```
   yarn sequelize db:migrate
   ```

 - Se quiser, gerar certos dados, como usuário administrador, executando os `seeds`:
   ```
   yarn sequelize db:seed:all
   ```
   *Com isso, você terá um usuário administrador com email admin@fastfeet.com e a senha 123456 para fazer autenticação.*

  - Na raiz do projeto, crie um arquivo `.env` e preencha as informações de acordo com o modelo `.env.example` que está no arquivo do backend;

 - Após isso, execute `yarn dev` para que o backend esteja funcionando.

---

## 💻 Frontend

 - Executar o comando `yarn` para fazer o download de todas as dependências necessárias para executar o projeto;

 - Feitos os downloads de todas as dependências, execute `yarn start` para inicilizar o frontend;

---

## 📱 Mobile
 > O projeto teve seu desenvolvimento focado em dispositivos ANDROID.
 
 - Executar o comando `yarn` para fazer o download de todas as dependências necessárias para executar o projeto;

 - Feitos os downloads de todas as dependências, execute `yarn android`, caso seja a primeira execução, ou `yarn start` para inicializar o aplicativo;

---
