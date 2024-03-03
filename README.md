<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

# How to build API

## Requirements

- Docker engine
- Docker compose
- Internet connection

## Step 1 - Set environment variables

First of all, create .env at root dir (or just rename .example.env) file and set variables like in example below:

```bash
# API
PORT=3000
API_VERSION='v1'
JWT_SECRET='qweQWE123!'

# database connection
DB_HOST='localhost'
DB_PORT=5432
DB_USER="alpa_admin"
DB_PASS="alpa_admin_password"
DB_NAME="alpa_test"
```

Now, do the same with .env in ./docker folder

```bash
POSTGRES_USER="alpa_admin"
POSTGRES_PASSWORD="alpa_admin_password"
POSTGRES_DB="alpa_test"
DB_PORT=5432
PGDATA="/data/postgres"
```

### Keep in mind that the username, password, and name for the base must match in both .env files

## Step 2 - Run with docker

Check the docker compose and docker engine version, depending on the version, use one of the following commands

```bash
docker compose up --build
```

OR

```bash
docker-compose up --build
```

## Step 3 - Testing

API include swagger documentation, declared at localhost:PORT/api/API_VERSION/explorer, if you used .env.example, it be declared <a href="http://localhost:3000/api/v1/explorer" target="_blank">here</a>

Also, you can use an Postman collection [./alpa_postman.json](alpa_postman.json)
