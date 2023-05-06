Este repositório é uma aplicação desenvolvida como parte de uma entrevista de emprego.
___

## Descrição da solução

Para o desenvolvimento da aplicação procurei utilizar o menor número de bibliotecas ou frameworks.

A Solução foi dividida em duas aplicações que estão neste repositório:

- web - Na pasta web encontra-se a aplicação front-end desenvolvida para ser utilizada em browsers;
- api - Na pasta api encontra-se a aplicação back-end desenvolvida para ser executada em Node.js;

Para executar as aplicações recomendo abrir dois consoles distintos.

O desafio maior foi a implementação utilizando o módulo `cluster` que ainda não havia utilizado.

### API

A API foi desenvolvida utilizando o framework [Express](https://expressjs.com/) e a biblioteca [socket.io](https://socket.io/) para o servidor socket.


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
