<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="https://github.com/Rocketseat/bootcamp-gostack-desafio-02/raw/master/.github/logo.png" width="300px" />
</h1>

# Etapa 1 - Desafio 
O desenvolvimento desta aplicação é relacionada a um aplicativo de uma transportadora fictícia, o Fastfeet.

<h3> Ferramentas utilizadas na primeira parte do desafio </h3>
Foi criada a aplicação utilizando o Express, e algumas ferramentas que são:
<br>

* Sucrase + Nodemon; <br>
* ESLint + Prettier + EditorConfig;
* Sequelize (Utilizei PostgresSQL); <br>
<h2> Funcionalidades </h2> 

## 1. Autenticação
Permita que um usuário se autentique em sua aplicação utilizando e-mail e uma senha.

Crie um usuário administrador utilizando a funcionalidade de seeds do sequelize, essa funcionalidade serve para criarmos registros na base de dados de forma automatizada.

Para criar um seed utilize o comando:

```
yarn sequelize seed:generate --name admin-user
```
No arquivo gerado na pasta ```src/database/seeds``` 
adicione o código referente à criação de um usuário administrador:

```
const bcrypt = require("bcryptjs");

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      "users",
      [
        {
          name: "Distribuidora FastFeet",
          email: "admin@fastfeet.com",
          password_hash: bcrypt.hashSync("123456", 8),
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: () => {}
};
```
E depois executar o comando:
```yarn sequelize db:seed:all```

Agora temos um admin no nosso banco de dados, e iremos utilizar ele para logins, lembrando que o login só poderá ser acessado pelo admin.
* Autenticação deve ser feita utilizando o [JWT](https://jwt.io/);
* Realizar a validação dos dados de entrada (Neste caso foi usado o [Yup](https://github.com/jquense/yup) como validador de schema);

## 2. Gestão de destinatários
Você agora precisa permitir que destinatários sejam mantidos (cadastrados/atualizados) na aplicação, e esses devem ter o nome do destinatário e campos de endereço: **rua, número, complemento, estado, cidade e CEP**.

Utilize uma nova tabela no banco de dados chamada ```recipients``` para guardar informações do destinatário.

O cadastro de destinatários só pode ser feito por administradores autenticados na aplicação.

O destinatário não pode se autenticar no sistema, ou seja, não possui senha.

# Etapa 2 - Desafio

<h2> Ferramentas utilizadas </h2>

* [Sentry](https://sentry.io)

* [Multer](https://github.com/expressjs/multer)

* [Youch](https://github.com/poppinss/youch)<br>



 ##  Funcionalidades do administrador 


## 1. Gestão de entregadores

Permita que o administrador possa cadastrar entregadores para a plataforma, o entregador deve possuir os seguintes campos:

* id (id do entregador)
* name (nome do entregador);
* avatar_id (foto do entregador);
* email (email do entregador)
* created_at;
* updated_at; <br>


Crie rotas para ```listagem/cadastro/atualização/remoção``` de entregadores;

Obs.: Essa funcionalidade é para administradores autenticados na aplicação.


## 2. Gestão de encomendas
Apesar do entregador estar cadastrado, ele não é independente dentro da plataforma, e você deve cadastrar encomendas para os entregadores.

Nessa funcionalidade criaremos um cadastro de encomendas por entregador, a encomenda possui os campos:

* id (id da entrega)
* recipient_id (referência ao destinatário);
* deliveryman_id (referência ao entregador);
* signature_id (referência à uma assinatura do destinatário, que será uma imagem);
* product (nome do produto a ser entregue);
* canceled_at (data de cancelamento, se cancelada);
* start_date (data de retirada do produto);
* end_date (data final da entrega);
* created_at;
* updated_at;

A **data de início** deve ser cadastrada assim que for feita a retirada do produto pelo entregador, 
e as retiradas só podem ser feitas entre as **08:00 e 18:00h**.

A **data de término** da entrega deve ser cadastrada quando o entregador finalizar a entrega:

Os campos ```recipient_id``` e ```deliveryman_id``` devem ser cadastrados no momento que for cadastrada a encomenda.

Quando a encomenda é cadastrada para um entregador, o entregador **recebe um e-mail com detalhes da encomenda**, 
com nome do produto e uma mensagem informando-o que o produto já está disponível para a retirada.

Crie rotas para ```listagem/cadastro/atualização/remoção``` de encomendas;

Obs.: Essa funcionalidade é para administradores autenticados na aplicação.

## Funcionalidades do entregador
Abaixo estão descritas as funcionalidades que você deve adicionar em sua aplicação para os entregadores.

## 1. Visualizar encomendas
Para que o entregador possa visualizar suas encomendas, ele deverá informar apenas seu ID de cadastro (ID do entregador no banco de dados). Essa funcionalidade deve retornar as encomendas atribuidas a ele, que não estejam entregues ou canceladas;

Permita também que ele liste apenas as encomendas que já foram entregues por ele, com base em seu ID de cadastro;

Exemplo de requisição: ```GET https://fastfeet.com/deliveryman/1/deliveries```

## 2. Alterar status de encomendas
Você deve permitir que o entregador tenha rotas para incluir uma data de retirada **(start_date)** e data de entrega **(end_date)** para as encomendas. O entregador só pode fazer 5 retiradas por dia.

Obs.: Para a funcionalidade de finalizar a entrega, você deverá permitir o envio de uma imagem que irá preencher o campo signature_id da tabela de encomendas.

## 3. Cadastrar problemas nas entregas
O entregador nem sempre conseguirá entregar as encomendas com sucesso, algumas vezes o destinatário pode estar ausente, ou o próprio entregador poderá ter algum problema com seu veículo na hora de entregar.

A tabela delivery_problems deve conter os seguintes campos:

* delivery_id (referência da encomenda);
* description (descrição do problema que o entregador teve);
* created_at;
* updated_at;

Crie uma rota para a distribuidora listar todas as entregas com algum problema;

Crie uma rota para listar todos os problemas de uma encomenda baseado no ID da encomenda.

Exemplo de requisição: ```GET https://fastfeet.com/delivery/2/problems```

Crie uma rota para o entregador cadastrar problemas na entrega apenas informando seu ID de cadastro (ID da encomenda no banco de dados);

Exemplo de requisição: ```POST https://fastfeet.com/delivery/3/problems```

Crie uma rota para a distribuidora cancelar uma entrega baseado no ID do problema. Esse cancelamento pode acontecer devido a gravidade do problema da entrega, por exemplo, em caso de perda da encomenda.

Exemplo de requisição: ```DELETE https://fastfeet.com/problem/1/cancel-delivery```

Quando uma encomenda for cancelada, o entregador deve receber um e-mail informando-o sobre o cancelamento.

