## Description

Password validation API

## Installation

```bash
$ yarn i
```

## Running the app

- Open a console in root folder and run `docker compose up`
  (_Make sure docker is up and running_)

- Open another console in root folder and
  - run `yarn db-migrate` (this will create DB schema )
  - run `yarn start:dev` (start the application)
- Call `GET http://localhost:3000/passwords`
  _(this will import the data to mysql DB)_
- Call `POST http://localhost:3000/passwords`
  _(Check the validity of the password)_
- Open another terminal and run `yarn cli`
  _(this will console the result of password update 1/0 and compromised passwords)_
- API doc is available at `http://localhost:3000/api#/`

_Note: .env file added to the repo with DB connection details_

## Build with

- NestJS
- Prisma
- winston
- mysql
- docker
