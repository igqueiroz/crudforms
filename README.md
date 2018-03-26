# CRUD Forms

Este projeto é um simples form com CRUDs que conecta na API Google Maps v3 para ajudar no preenchimento de formulário e faz ações com um banco baseado em Firebase API também do Google.

Stack usado na aplicação:

## Client Side
> Create React App (React, Webpack, Autoprefixer, JSX, Babel)
> Redux
> Router
> SASS
> Bootstrap

## Server Side
> Firebase API

A documentação de cada componente registrada diretamente no código

## Como rodar o projeto

1. Faça o clone do projeto ou baixe o Zip na sua máquina (escolha um caminho de pasta sem espaços e caixa alta para evitar "Warnings" indesejados)

2. Abra o console na pasta recebida e digite:
```npm install```
```npm start```

3. Se precisar gerar o build, abra a pasta raiz do projeto novamente e digite:
```npm build```

## Login/ Logout
> localhost:3000 - Página de login, todas as outras páginas estão protegidas caso não faça login é impossível acessá-las

> localhost:3000/logout - Página que limpa o token (senha com Encode 64 que fica temporariamente disponível no Local Storage) enquanto a sessão está ativa

## Locais
> localhost:3000/register - Página de registro de usuários

> localhost:3000/users - Página de listagem e edição

> localhost:3000/modules - Página intermediária de escolha dos módulos