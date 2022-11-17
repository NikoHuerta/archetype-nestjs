## Description

Archetype based on Hexagonal Architecture using NestJS, integrated with MongoDB.

## Features
* Hexagonal Architecture
* JWT Auth
* Users CRUD
* Telegram Bot
* External API integration
* Log features
* Swagger Documentation (OpenAPI)

## Structure
```
.
├── README.md
├── docker-compose.yaml
├── env.d.ts
├── nest-cli.json
├── package-lock.json
├── package.json
├── src
│   ├── __test__
│   │   └── app.controller.spec.ts
│   ├── _common
│   │   ├── constants
│   │   │   └── index.ts
│   │   ├── decorators
│   │   │   └── index.ts
│   │   ├── dtos
│   │   │   └── index.ts
│   │   ├── entities
│   │   │   ├── canal.entity.ts
│   │   │   ├── evento.entity.ts
│   │   │   ├── index.ts
│   │   │   ├── rol.entity.ts
│   │   │   ├── tipo-evento.entity.ts
│   │   │   ├── token-key.entity.ts
│   │   │   ├── token.entity.ts
│   │   │   ├── usuario-canal.entity.ts
│   │   │   └── usuario.entity.ts
│   │   ├── enums
│   │   │   └── index.ts
│   │   ├── guards
│   │   │   └── index.ts
│   │   ├── interfaces
│   │   │   └── index.ts
│   │   ├── migrations
│   │   └── pipes
│   │       └── index.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── auth
│   │   ├── __test__
│   │   │   ├── auth.controller.spec.ts
│   │   │   └── auth.service.spec.ts
│   │   ├── auth.controller.js
│   │   ├── auth.controller.ts
│   │   ├── auth.module.js
│   │   ├── auth.module.ts
│   │   ├── auth.service.js
│   │   ├── auth.service.ts
│   │   └── dto
│   └── main.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
├── tsconfig.json
└── type-orm-config.ts


```
## Instalation

```bash
$ npm install
$ npm run composer-up
```


## File .env 

Generate a file based on .env.example, fill the values and rename to:
* .env is used in cloud pipelines
* .env.local is used for local development

```bash
.env
.env.local
```


## Running the app

```bash
# development
$ npm run dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
