# inventory-control
[![circleci](https://circleci.com/gh/seitin/inventory-control.svg?style=svg)](https://circleci.com/gh/circleci/circleci-docs)  
This project contains a REST API responsible for manage inventory storages across several bases.  

## Installing and requirements
It runs in `NodeJS` and saves data on a `PostgreSQL` database.  
Installing dependencies:  
`npm install`

## Enviroment variables
There are two settings to be configured related to environment variables:

### Startup variables
Startup variables are used when the server starts.
These variables must to be in root directory named as `.env` with the following keys:
```
PSQL_PASSWORD=
PSQL_USER=
PSQL_HOST=
PSQL_PORT=
PSQL_DATABASE=
PORT=
```

### Test variables
Test variables are used when running integration tests.
These varibles must to be in root directory named as `.env.test` with the following keys:
```
PSQL_PASSWORD=
PSQL_USER=
PSQL_HOST=
PSQL_PORT=
PSQL_DATABASE=
```

## Running project

- Run all tests  
  `npm test`
- Run unit tests  
  `npm run test:p`
- Run integration tests  
  `npm run test:s`  
- Run tests with test coverage  
  `npm run coverage`
- Start server  
  `npm start`
