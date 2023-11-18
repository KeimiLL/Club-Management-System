# Club Management System

Club Management System is a project for BSc thesis developed by Dominik Sigulski, Kamil Giziński, and Bartosz Rolnik. It is designed to streamline the management of a football (soccer) club, with the help of some basic AI.

## Features

...

## Tech stack

...

## Installation

...

## Development

1. To run any commands locally that require Python dependencies, you need to be inside the virtual environment (it is also required for commiting, since `pre-commit` is used to run hooks) and have all the dependencies installed, obviously. Make sure you are inside the `backend/` directory:

   ```bash
   cd backend
   pipenv shell
   pipenv sync --dev
   ```

1. To enter the docker container, use `docker compose exec`:

   ```bash
   docker compose exec -it <compose service name> <command to be executed>
   ```

   For example, to enter the bash shell inside the `backend` container:

   ```bash
   docker compose exec -it backend /bin/bash
   ```

   Create a database migration with Alembic:

   ```bash
   docker compose exec -it backend pipenv run alembic revision --autogenerate -m "<message>"
   ```

1. To allow your IDE to detect frontend packages install frontend dependencies inside the `frontend/` directory using:

   ```bash
   yarn install --frozen-lockfile
   ```

1. To create and start Docker containers defined in a `docker-compose.yml` file. The `-V` option recreate anonymous volumes instead of retrieving data from the previous containers:

   ```bash
   docker compose up -V```

### Working with the database

1. Run `psql` inside the database container to be able to work with the database and connect to it:

   ```bash
   docker compose exec -it db psql -U postgres cms_dev
   ```

1. List all tables:

   ```
   \dt
   ```

1. Describe a table:
   ```
   \d+ <table name>
   ```

   #### Queries examples

1. Selecting every record from the table:

   ```sql
   SELECT * FROM users;
   ```

   Deleting everything from the table:

   ```sql
   DELETE FROM users;
   ```

   Clearing the table and resetting the counter:

   ```sql
   TRUNCATE TABLE users RESTART IDENTITY;
   ```

### Tests

1. To run backend tests locally with `pytest` inside the `backend/` directory:

   ```bash
   pipenv run coverage run -m pytest && pipenv run coverage report -m
   ```

   Or inside the backend container:

   ```bash
   docker compose exec -it backend app/run-pytest.sh
   ```

1. To run frontend tests locally inside the `frontend/` directory:

   ```bash
   yarn test
   ```

## Authors

- Dominik Sigulski
- Kamil Giziński
- Bartosz Rolnik
