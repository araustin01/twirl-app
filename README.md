# twirl.fm

twirl.fm is a browser-based, real-time social music platform inspired by [plug.dj](https://en.wikipedia.org/wiki/Plug.dj).

The project is focused on:

- Live, synchronized listening rooms (in progress)
- Visual avatars and environments (not implemented)
- Community-driven DJ rotation (not implemented)
- Interactive chat and reactions (not implemented)

This repository is an active work in progress. The current application is a Phoenix umbrella project with a React and TypeScript frontend. The backend and frontend are still evolving toward the full twirl.fm experience described above. Music streaming is currently served by the YouTube client API.

## Development Environment

Development runs Phoenix on the host for fast code reloading and PostgreSQL in Docker Compose.

### Prerequisites

Install the following tools before starting:

- Elixir 1.14 or later
- Erlang/OTP compatible with the installed Elixir version
- Docker Compose
- Node.js and npm
- Git

The production Dockerfile currently uses Elixir 1.13.1 with Erlang/OTP 24.2, while the application declares Elixir 1.14 or later. Use a current local Elixir/Erlang installation for development and consult the project configuration if changing versions.

### First-time setup

From the repository root:

```sh
make db
mix setup
cd src/app/assets
npm install
cd ../../..
mix ecto.create
```

`mix setup` fetches the umbrella's Elixir dependencies. The frontend dependencies are kept in `src/app/assets/package.json` and are installed separately with npm. `mix ecto.create` creates the `core_dev` database in the local PostgreSQL service.

### Run the application

Start the development environment from the repository root:

```sh
make dev
```

This command:

1. Starts the `postgres` service from `docker-compose.yml` in the background.
2. Runs Phoenix on the host with `mix phx.server`.

Open [http://localhost:4000](http://localhost:4000) in a browser. Phoenix starts the esbuild and Tailwind watchers automatically, so changes to the React/TypeScript or CSS assets are rebuilt during development.

To stop the background PostgreSQL service:

```sh
make stop
```

The database uses these development defaults:

| Setting  | Value       |
| -------- | ----------- |
| Host     | `localhost` |
| Port     | `5432`      |
| Database | `core_dev`  |
| User     | `postgres`  |
| Password | `postgres`  |

If port `5432` is already in use, update `docker-compose.yml` and the development database configuration in `config/dev.exs` together.

## Useful Commands

Run commands from the repository root:

```sh
make dev       # Start PostgreSQL and Phoenix
make db        # Start PostgreSQL only
make stop      # Stop Docker Compose services
make test      # Run Elixir tests
make lint      # Run TypeScript, Prettier, Mix Format, and Credo checks
make build     # Build the production Docker image
```

For frontend dependencies and source, see [src/app/assets](src/app/assets). The umbrella applications live in [src/core](src/core) and [src/app](src/app). Shared environment configuration is in [config](config).

## Project Structure

- `src/core` contains the core application, data access, Ecto repository, and domain logic.
- `src/app` contains the Phoenix endpoint, routes, controllers, templates, tests, and frontend assets.
- `config` contains shared and environment-specific Elixir configuration.
- `docker-compose.yml` defines the local PostgreSQL service.
- `Dockerfile` builds a production release image.
- `Makefile` provides the common development, test, lint, and build commands.

## Documentation

The [docs](docs) directory contains internal development notes. This README focuses on the high-level overview of the project, its development environment, and commands that contributors can run today.
