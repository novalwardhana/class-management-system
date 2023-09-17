## Title & Description

```bash
Backend Class Management System. 
MengajiOnline.com Test
```

## Prepare Env & Database

```bash
APP_PORT=9000
DATABASE_TYPE=mongodb
DATABASE_HOST=127.0.0.1
DATABASE_PORT=27017
DATABASE_NAME=class_management_system
DATABASE_USERNAME=noval
DATABASE_PASSWORD=noval
DATABASE_SYNChRONIZE=true
DATABASE_LOGGER=simple-console
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

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

## Documentation API
```bash
Swagger local: http://localhost:9000/docs
Swaggerhub: https://app.swaggerhub.com/apis-docs/novalwardhana/mo-be-class-management-system-api/1.0
```

## Modules Created
```bash
1. Teachers: CRUD Class
2. Subjects: CRUD Teacher
3. Classes: Assign and unassign teachers to be assigned to specified classes and fill in the subjects
```
