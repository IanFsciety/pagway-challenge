# Desafio Developer PSP - Pagway

É necessário docker para executar o banco de desenvolvimento.

```


Talvez seja necessário alterar o arquivo `.env` com as variáveis atualizadas, siga o modelo DATABASE_URL="postgresql://user:user@localhost:5432/mydb?schema=public"

Para instalar as dependencias, no diretório clonado, execute:
```shell
yarn
```

Inicie a migrate do prisma:
```shell
yarn prisma migrate dev
```

Os testes unitário são executados com o seguinte comando:
```shell
yarn test
```

Após ligar o banco, para iniciar o servidos excute:
```shell
yarn start:dev ou yarn start:prod
```
Rotas

```shell

método post para localhost:porta/users/ criará um novo usuário.
método get para localhost:porta/users/iddousuario listará as informações do usuário.

método post para localhost:porta/transactions/ criará uma nova transação para o id usuário.
método patch para localhost:porta/transactions/t/iddatransacao edita o status da transação solicitada.
método get para localhost:porta/transactions/iddousuario listará todas transações do usuário.
método get para localhost:porta/transactions/t/iddatransacao listará a transação solicitada.

método post para localhost:porta/checkouts/ criará um novo checkout para o id do usuário.
método get para localhost:porta/checkouts/iddousuario listará todos os checkouts do usuário.
método get para localhost:porta/checkouts/iddocheckout listará o checkout solicitado.

método get para localhost:porta/users/balance listará as informações dos saldo disponível para saque e o saldo projetado do  usuário.

```


