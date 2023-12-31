## Title & Description

```bash
Backend Class Management System. 
MengajiOnline.com Test
```

## Prepare Database

```bash
MongoDB Database: https://github.com/novalwardhana/class-management-system/blob/master/class_management_system.zip
```

## Prepare Env

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

## API Documentation
```bash
Swagger local: http://localhost:9000/docs
Swaggerhub: https://app.swaggerhub.com/apis-docs/novalwardhana/mo-be-class-management-system-api/1.0
Postman: https://github.com/novalwardhana/class-management-system/blob/master/mo-be-class-management-system-api.postman_collection.json
```

## Modules Created
```bash
1. Teachers: module to manage teachers data such as create, read, update, and delete
2. Subjects: module to manage subjects data such as create, read, update, and delete
3. Classes:
    a. module to manage classes data such as create, read, update, delete
    b. list of classes with assigned or unassigned teachers
    c. set the date and time and duration of a class
    c. update to assign and reassign a teacher and a subject to a class
    e. set active, archived or delete a class
```
