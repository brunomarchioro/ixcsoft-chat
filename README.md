Este repositório é uma aplicação desenvolvida como parte de uma entrevista de emprego.
___

## Descrição da solução

Para o desenvolvimento da aplicação procurei utilizar o menor número de bibliotecas ou frameworks.
Também não utilizei um banco de dados para concentrar o tempo nas funcionalidades requeridas.

A Solução foi dividida em duas aplicações que estão neste repositório:

- web - Na pasta web encontra-se a aplicação front-end desenvolvida para ser utilizada em browsers;
- api - Na pasta api encontra-se a aplicação back-end desenvolvida para ser executada em Node.js;

Para executar as aplicações recomendo abrir dois consoles distintos. Seria possível utilizar outras maneiras, como utilizar o módulo `concurrently`, mas acho mais claro ter dois consoles.

### API

A API foi desenvolvida utilizando o framework [Express](https://expressjs.com/) e a biblioteca [ws](https://github.com/websockets/ws) para o servidor WebSocket.   

Infelizmente, não tive tempo para terminar um dos requisitos que era a utilização do módulo `cluster`.
Foi iniciada a implementação, mas não tive êxito ao sincronizar as mensagens do WebSocket entre os workers.
Ainda não havia utilizado esse módulo, apesar de já ter configurado o deploy de aplicações utilizando o [pm2](https://pm2.keymetrics.io/).


#### Iniciando

Entras na pasta:

```
cd api
```

#### Instalar as dependências:

```
npm i
```

#### Iniciar a aplicação:

```
npm run dev:single
```

### WEB

O cliente web fui desenvolvido utilizando a ferramenta [Vite](https://vitejs.dev/guide/) para construir o código.
Foi utilizada a biblioteca [React](https://react.dev/) e o framework CSS [bulma](https://bulma.io/).

#### Iniciando

Entras na pasta:

```
cd web
```

#### Instalar as dependências:

```
npm i
```

#### Iniciar a aplicação:

```
npm run dev
```
